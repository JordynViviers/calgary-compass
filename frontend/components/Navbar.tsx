"use client";

import Link from "next/link";

export default function Navbar() {

  return (

      <nav className="relative z-20 flex justify-between items-center px-10 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-red-700">
          Calgary Compass
        </h1>

        <div className="flex items-center gap-8 text-lg font-medium">
          <Link
            href="/technologies"
            className="hover:text-red-700 transition"
          >
            Explore Technologies
          </Link>

          <Link
            href="/events"
            className="hover:text-red-700 transition"
          >
            In-Person Events
          </Link>

          <Link
            href="/community-input"
            className="hover:text-red-700 transition"
          >
            Community Input
          </Link>

          <Link 
            href="/signals"
            className="hover:text-red-700 transition"
          >
            Signals 
          </Link>

          <Link 
            href="/foresight"
            className="hover:text-red-700 transition"
          >
            Foresight 
          </Link>

          <Link 
            href="/analytics"
            className="hover:text-red-700 transition"
          >
            Analytics 
          </Link>

        </div>


    </nav>

  );

}
