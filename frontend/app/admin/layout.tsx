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
        <div className="max-w-7xl mx-auto px-6 pt-4">

          <Link
            href="/admin"
            className="
              inline-flex
              items-center
              text-sm
              text-gray-600
              hover:text-red-700
              transition
            "
          >
            ← Back to Dashboard
          </Link>
        
        </div>
      )}

      {children}
    </>
  );
}
