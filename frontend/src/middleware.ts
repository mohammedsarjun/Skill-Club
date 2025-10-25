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
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.replace(/\/$/, "");
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    if (GUEST_ROUTES.includes(path)) {
      return NextResponse.next();
    }

    if (path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (path.startsWith("/client") || path.startsWith("/freelancer") || path.startsWith("/onboarding") || path.startsWith("/account")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const { 
      activeRole, 
      roles = [], 
      isOnboardingCompleted = false,
      isFreelancerBlocked = false,
      isClientBlocked = false
    } = payload;

    const needsOnboarding = roles.length === 0 || !activeRole;
    const isOnboardingPath = ONBOARDING_PATHS.some((base) => path.startsWith(base));

    // Check if user is blocked and trying to access routes
    if (activeRole === "freelancer") {
      if (isFreelancerBlocked) {
        // Allow access only to the blocked page
        if (path === "/freelancer/blocked") {
          return NextResponse.next();
        }
        // Redirect any other freelancer route to blocked page
        if (path.startsWith("/freelancer")) {
          return NextResponse.redirect(new URL("/freelancer/blocked", req.url));
        }
      } else {
        // If not blocked, redirect away from blocked page
        if (path === "/freelancer/blocked") {
          return NextResponse.redirect(new URL("/freelancer/profile", req.url));
        }
      }
    }

    if (activeRole === "client") {
      if (isClientBlocked) {
        // Allow access only to the blocked page
        if (path === "/client/blocked") {
          return NextResponse.next();
        }
        // Redirect any other client route to blocked page
        if (path.startsWith("/client")) {
          return NextResponse.redirect(new URL("/client/blocked", req.url));
        }
      } else {
        // If not blocked, redirect away from blocked page
        if (path === "/client/blocked") {
          return NextResponse.redirect(new URL("/client/", req.url));
        }
      }
    }

    if (isOnboardingCompleted && path === "/onboarding/role") {
      if (activeRole && DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTES[activeRole], req.url));
      }
    }

    if (needsOnboarding) {
      if (isOnboardingPath) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/onboarding/role", req.url));
    }

    if (GUEST_ROUTES.includes(path)) {
      if (activeRole && DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTES[activeRole], req.url));
      }
    }

    if (path.startsWith("/admin") && activeRole !== "admin") {
      if (DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTES[activeRole], req.url));
      }
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    if (path.startsWith("/client") && activeRole !== "client") {
      if (DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTES[activeRole], req.url));
      }
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    if (path.startsWith("/freelancer") && activeRole !== "freelancer") {
      if (DASHBOARD_ROUTES[activeRole]) {
        return NextResponse.redirect(new URL(DASHBOARD_ROUTES[activeRole], req.url));
      }
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    const response = path.startsWith("/admin")
      ? NextResponse.redirect(new URL("/admin/login", req.url))
      : NextResponse.redirect(new URL("/login", req.url));

    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|not-authorized).*)",
  ],
  runtime: "nodejs",
};