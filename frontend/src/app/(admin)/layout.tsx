"use client";

import AdminAuthGuard from "@/components/AdminAuthGaurd";
import { usePreventBackAfterLogout } from "@/custom-hooks/usePreventBackAfterLogout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <AdminAuthGuard>
      {children}
    </AdminAuthGuard>
  );
}
