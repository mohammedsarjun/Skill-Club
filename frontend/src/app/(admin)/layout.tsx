"use client";

import { usePreventBackAfterLogout } from "@/custom-hooks/usePreventBackAfterLogout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  usePreventBackAfterLogout();

  return <>{children}</>;
}
