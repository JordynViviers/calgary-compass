"use client";

import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="flex justify-between items-center mb-12">

      <Link
        href="/"
        className="text-2xl font-bold text-red-700"
      >
        Calgary Compass
      </Link>

      <div className="flex gap-8 font-medium">

        <Link href="/technologies">
          Technologies
        </Link>

        <Link href="/community-input">
          Community Input
        </Link>

        <Link href="/signals">
          Signals
        </Link>

        <Link href="/foresight">
          Foresight
        </Link>

        <Link href="/analytics">
          Analytics
        </Link>

      </div>

    </nav>

  );

}
