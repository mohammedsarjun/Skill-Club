"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import { setUser } from "@/store/slices/authSlice";
import { userApi } from "@/api/userApi";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true); // verifying user
  const [authorized, setAuthorized] = useState(false); // only render children if true

  const guestRoutes = ["/login", "/signup", "/admin/login", "/otp","/forgot-password","/reset-password","/"];
  const onboardingPaths = [
    "/onboarding/role",
    "/onboarding/client",
    "/onboarding/freelancer",
  ];

  useEffect(() => {
    const verifyUser = async () => {
      try {
        let currentUser = user;

        if (!user) {
          const response = await userApi.me();
          console.log(response)
          if (response.success) {
            dispatch(setUser(response.data));
            currentUser = response.data;
          }
        }

        const allowed = handleRedirect(pathname, currentUser);
        setAuthorized(allowed);
      } catch {
        if (!guestRoutes.includes(pathname)) {
          router.replace("/login");
          setAuthorized(false);
          return;
        }
        setAuthorized(true);
      } finally {
        setChecking(false);
      }
    };

    const handleRedirect = (path: string, currentUser?: any): boolean => {
      if (!currentUser) {
        if (guestRoutes.includes(path)) return true;
        if (path.startsWith("/admin")) router.replace("/admin/login");
        else router.replace("/login");
        return false;
      }

      const { activeRole, roles, isOnboardingCompleted } = currentUser;

      if (isOnboardingCompleted && path === "/onboarding/role") {
        redirectByRole(activeRole);
        return false;
      }

      if (roles?.length === 0 || !activeRole) {
        const isOnboardingPath = onboardingPaths.some((base) =>
          path.startsWith(base)
        );

        if (!isOnboardingPath) {
          router.replace("/onboarding/role");
          return false; // block other pages
        }
        return true; // allow rendering any onboarding page
      }

      if (guestRoutes.includes(path)) {
        redirectByRole(activeRole);
        return false;
      }

      if (
        (path.startsWith("/admin") && activeRole !== "admin") ||
        (path.startsWith("/freelancer") && activeRole !== "freelancer") ||
        (path.startsWith("/client") && activeRole !== "client")
      ) {
        redirectByRole(activeRole);
        return false;
      }

      return true; // ✅ user is allowed
    };

    const redirectByRole = (role: string) => {
      if (role === "admin") router.replace("/admin/categories-skills");
      else if (role === "freelancer") router.replace("/freelancer/profile");
      else if (role === "client") router.replace("/client/profile");
    };

    verifyUser();
  }, [user, dispatch, router, pathname]);

  if (checking) return <p>Loading...</p>;
  if (!authorized) return null; // 🚫 block unauthorized content completely

  return <>{children}</>;
}
