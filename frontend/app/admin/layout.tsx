"use client";

import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <AdminNavbar />

      {pathname !== "/admin" && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <Link
            href="/admin"
            className="
              inline-flex
              items-center
              gap-2
              text-red-700
              font-semibold
              hover:text-red-800
              transition
            "
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      )}

      {children}
    </>
  );
}
