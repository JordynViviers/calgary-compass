"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-[1600px] mx-auto px-8">

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

              <p className="text-2xl font-bold text-gray-800">
                COMPASS
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="lg:flex items-center gap-4 mr-4">

            <Link
              href="/"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              Home
            </Link>

            <Link
              href="/about"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              About
            </Link>

            <Link
              href="/technologies"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              Explore Technologies
            </Link>

            <Link
              href="/events"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              In-Person Events
            </Link>

            <Link
              href="/community-input"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              Community Input
            </Link>

            <Link
              href="/signals"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              Signals
            </Link>

            <Link
              href="/foresight"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              Foresight
            </Link>

            <Link
              href="/analytics"
              className="
               text-sm
               font-semibold
               text-gray-800
               hover:text-red-700
               transition
               "
            >
              Analytics
            </Link>

          </nav>

          {/* CTA Button */}
          <Link
            href="/community-input"
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Community Input
          </Link>

        </div>

      </div>

    </header>
  );
}
