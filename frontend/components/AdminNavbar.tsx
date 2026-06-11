"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/compass-logo.png"
              alt="Calgary Compass"
              className="h-12 w-auto"
            />

            <div>
              <p className="text-red-700 text-sm tracking-wider">
                CALGARY
              </p>

              <p className="text-3xl font-bold text-gray-800">
                COMPASS
              </p>
            </div>
          </Link>

          {/* Admin Navigation */}
          <nav className="flex items-center gap-8 text-lg font-medium">

            <Link
              href="/admin/technologies"
              className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
            >
              Technologies
            </Link>

            <Link
              href="/admin/events"
              className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
            >
              In-Person Events
            </Link>

            <Link
              href="/admin/community-input"
              className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
            >
              Community Input
            </Link>

            <Link
              href="/admin/applications"
              className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
            >
              Applications
            </Link>

            <Link
              href="/admin/techApplications"
              className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
            >
              Technology Applications
            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}
