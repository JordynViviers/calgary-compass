"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import {
  useLanguage
} from "@/components/LanguageProvider";

import {
  translations
} from "@/lib/translations";

export default function Navbar() {
  const { language } =
    useLanguage();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const t =
    translations[
      language as keyof typeof translations
    ] ||
    translations.English;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-[1600px] mx-auto px-4 md:px-8">

        <div className="flex items-center h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 mr-auto"
          >
            <img
              src="/compass-logo.png"
              alt="Calgary Compass"
              className="h-10 md:h-12 w-auto"
            />

            <div>
              <p className="text-red-700 text-xs md:text-sm tracking-wider">
                CALGARY
              </p>

              <p className="text-lg md:text-2xl font-bold text-gray-900">
                COMPASS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">

            <nav className="flex items-center gap-5">

              <Link
                href="/"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.home}
              </Link>

              <Link
                href="/about"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.about}
              </Link>

              <Link
                href="/technologies"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.technologies}
              </Link>

              <Link
                href="/events"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.events}
              </Link>

              <Link
                href="/signals"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.signals}
              </Link>

              <Link
                href="/foresight"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.foresight}
              </Link>

              <Link
                href="/analytics"
                className="text-sm font-semibold text-gray-800 hover:text-red-700 transition"
              >
                {t.analytics}
              </Link>

            </nav>

            <Link
              href="/community-input"
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
                shadow-sm
              "
            >
              Community Input
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              lg:hidden
              text-3xl
              text-gray-800
              ml-4
            "
          >
            ☰
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (

          <div
            className="
              lg:hidden
              pb-6
              flex
              flex-col
              gap-4
              border-t
              border-gray-200
              pt-4
            "
          >

            <Link
              href="/"
              className="font-medium text-gray-800"
            >
              {t.home}
            </Link>

            <Link
              href="/about"
              className="font-medium text-gray-800"
            >
              {t.about}
            </Link>

            <Link
              href="/technologies"
              className="font-medium text-gray-800"
            >
              {t.technologies}
            </Link>

            <Link
              href="/events"
              className="font-medium text-gray-800"
            >
              {t.events}
            </Link>

            <Link
              href="/signals"
              className="font-medium text-gray-800"
            >
              {t.signals}
            </Link>

            <Link
              href="/foresight"
              className="font-medium text-gray-800"
            >
              {t.foresight}
            </Link>

            <Link
              href="/analytics"
              className="font-medium text-gray-800"
            >
              {t.analytics}
            </Link>

            <Link
              href="/community-input"
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-4
                py-3
                rounded-xl
                text-center
                font-semibold
                transition
              "
            >
              Community Input
            </Link>

          </div>

        )}

      </div>

    </header>
  );
}
