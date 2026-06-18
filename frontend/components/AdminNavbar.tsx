"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* Calgary Red Bar */}
      <div className="h-1 bg-red-700 w-full" />

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-24">

          {/* Logo + Admin Label */}
          <div className="flex items-center gap-4">

            <Link
              href="/admin"
              className="flex items-center gap-3"
            >
              <img
                src="/compass-logo.png"
                alt="Calgary Compass"
                className="h-12 w-auto"
              />

              <div>
                <p className="text-red-700 text-xs tracking-[0.25em] font-medium">
                  CALGARY
                </p>

                <p className="text-3xl font-bold text-gray-900 leading-none">
                  COMPASS
                </p>
              </div>
            </Link>

            <div className="hidden md:block h-10 w-px bg-gray-300" />

            <span
              className="
                hidden md:inline-flex
                bg-red-100
                text-red-700
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
              "
            >
              Admin Portal
            </span>

          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">

            <Link
              href="/admin/technologies"
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-red-700
                border-b-2
                border-transparent
                hover:border-red-700
                pb-1
                transition
              "
            >
              Technologies
            </Link>

            <Link
              href="/admin/community-input"
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-red-700
                border-b-2
                border-transparent
                hover:border-red-700
                pb-1
                transition
              "
            >
              Community Input
            </Link>

            <Link
              href="/admin/events"
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-red-700
                border-b-2
                border-transparent
                hover:border-red-700
                pb-1
                transition
              "
            >
              Events
            </Link>

            <Link
              href="/admin/applications"
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-red-700
                border-b-2
                border-transparent
                hover:border-red-700
                pb-1
                transition
              "
            >
              Applications
            </Link>

            <Link
              href="/admin/techApplications"
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-red-700
                border-b-2
                border-transparent
                hover:border-red-700
                pb-1
                transition
              "
            >
              Tech Applications
            </Link>

            </Link>

            <Link
              href="/admin/challenge-mapping"
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-red-700
                border-b-2
                border-transparent
                hover:border-red-700
                pb-1
                transition
              "
            >
              Challenge Mapping
            </Link>

          </nav>

          {/* Public Site Button */}
          <Link
            href="/"
            className="
              bg-red-700
              hover:bg-red-800
              text-white
              px-5
              py-3
              rounded-xl
              text-sm
              font-semibold
              transition
              shadow-md
            "
          >
            View Public Site
          </Link>

        </div>

      </div>

    </header>
  );
}
