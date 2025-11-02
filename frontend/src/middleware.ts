// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const GUEST_ROUTES = [
  "/login",
  "/signup",
  "/admin/login",
  "/otp",
  "/forgot-password",
  "/reset-password",
  "",
];

const ONBOARDING_PATHS = [
  "/onboarding/role",
  "/onboarding/client",
  "/onboarding/freelancer",
];

const DASHBOARD_ROUTES: Record<string, string> = {
  admin: "/admin/categories-skills",
  client: "/client",
  freelancer: "/freelancer/profile",
};

const BLOCKED_ROUTES: Record<string, string> = {
  client: "/client/blocked",
  freelancer: "/freelancer/blocked",
};

interface JWTPayload {
  role: string;
  roles?: string[];
  activeRole?: string;
  isOnboardingCompleted?: boolean;
  isFreelancerBlocked?: boolean;
  isClientBlocked?: boolean;
  freelancerProfile?: object | null;
  clientProfile?: object | null;
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/$/, "");
  const token = req.cookies.get("accessToken")?.value;

  // ===== NO TOKEN (GUEST USER) =====
  if (!token) {
    // Allow access to guest routes
    if (GUEST_ROUTES.includes(path)) {
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      return response;
    }

    // Redirect to appropriate login page
    if (path.startsWith("/admin"))
      return NextResponse.redirect(new URL("/admin/login", req.url));

    if (
      path.startsWith("/client") ||
      path.startsWith("/freelancer") ||
      path.startsWith("/onboarding") ||
      path.startsWith("/account")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
    return response;
  }

  // ===== HAS TOKEN (AUTHENTICATED USER) =====
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const {
      activeRole,
      roles = [],
      isOnboardingCompleted = false,
      isFreelancerBlocked = false,
      isClientBlocked = false,
      freelancerProfile,
      clientProfile,
    } = payload;

    const needsOnboarding = roles.length === 0 || !activeRole;
    const isOnboardingPath = ONBOARDING_PATHS.some((base) =>
      path.startsWith(base)
    );

    // ===== Blocked Users =====
    if (activeRole === "freelancer") {
      if (isFreelancerBlocked) {
        if (path === "/freelancer/blocked") {
          const response = NextResponse.next();
          response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
          return response;
        }
        if (path.startsWith("/freelancer"))
          return NextResponse.redirect(new URL("/freelancer/blocked", req.url));
      } else if (path === "/freelancer/blocked") {
        return NextResponse.redirect(new URL("/freelancer/profile", req.url));
      }
    }

    if (activeRole === "client") {
      if (isClientBlocked) {
        if (path === "/client/blocked") {
          const response = NextResponse.next();
          response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
          return response;
        }
        if (path.startsWith("/client"))
          return NextResponse.redirect(new URL("/client/blocked", req.url));
      } else if (path === "/client/blocked") {
        return NextResponse.redirect(new URL("/client/", req.url));
      }
    }

    // ===== Onboarding Redirects =====
    if (isOnboardingCompleted && path === "/onboarding/role") {
      if (activeRole && DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(
          new URL(DASHBOARD_ROUTES[activeRole], req.url)
        );
      }
    }

    if (needsOnboarding) {
      if (isOnboardingPath) {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
        return response;
      }
      return NextResponse.redirect(new URL("/onboarding/role", req.url));
    }

    // ===== GUEST ROUTE PROTECTION - MODIFIED =====
    // Only redirect from auth pages if user is fully onboarded and has active role
    if (GUEST_ROUTES.includes(path)) {
      if (activeRole && DASHBOARD_ROUTES[activeRole] && isOnboardingCompleted) {
        // Add a small delay or use replace to avoid history issues
        const redirectUrl = new URL(DASHBOARD_ROUTES[activeRole], req.url);
        const response = NextResponse.redirect(redirectUrl);
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
        return response;
      }
    }

    // ===== NEW RULES BELOW =====

    // 🚫 1. Admin cannot access /account or onboarding pages
    if (activeRole === "admin") {
      if (path.startsWith("/account") || path.startsWith("/onboarding")) {
        return NextResponse.redirect(
          new URL("/admin/categories-skills", req.url)
        );
      }
    }

    // 🚫 2. Freelancer with completed profile cannot access onboarding/freelancer
    if (activeRole === "freelancer" && freelancerProfile) {
      if (path.startsWith("/onboarding/freelancer")) {
        return NextResponse.redirect(new URL("/freelancer/profile", req.url));
      }
    }

    // 🚫 3. Client with completed profile cannot access onboarding/client
    if (activeRole === "client" && clientProfile) {
      if (path.startsWith("/onboarding/client")) {
        return NextResponse.redirect(new URL("/client", req.url));
      }
    }

    // ===== ROLE BASED ACCESS =====
    if (path.startsWith("/admin") && activeRole !== "admin") {
      if (DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(
          new URL(DASHBOARD_ROUTES[activeRole], req.url)
        );
      }
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    if (path.startsWith("/client") && activeRole !== "client") {
      if (DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(
          new URL(DASHBOARD_ROUTES[activeRole], req.url)
        );
      }
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    if (path.startsWith("/freelancer") && activeRole !== "freelancer") {
      if (DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(
          new URL(DASHBOARD_ROUTES[activeRole], req.url)
        );
      }
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (error) {
    const redirectResponse = path.startsWith("/admin")
      ? NextResponse.redirect(new URL("/admin/login", req.url))
      : NextResponse.redirect(new URL("/login", req.url));

    redirectResponse.cookies.delete("accessToken");
    redirectResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return redirectResponse;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|not-authorized).*)",
  ],
  runtime: "nodejs",
};