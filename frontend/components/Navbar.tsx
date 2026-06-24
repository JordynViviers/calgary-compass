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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="h-1 bg-red-700 w-full" />

      <div className="w-full px-8 lg:px-12 xl:px-16">

        <div className="flex items-center justify-between h-24 w-full">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <img
              src="/compass-logo.png"
              alt="Calgary Compass"
              className="h-10 md:h-12 w-auto"
            />

            <div>
              <p className="text-red-700 text-xs tracking-[0.25em] font-medium">
                CALGARY
              </p>

              <p className="text-xl md:text-3xl font-bold text-gray-900 leading-none">
                COMPASS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">

            <nav className="flex items-center gap-7 xl:gap-8">

              <Link
                href="/"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.home}
              </Link>

              <Link
                href="/about"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.about}
              </Link>

              <Link
                href="/technologies"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.technologies}
              </Link>

              <Link
                href="/analytics"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.analytics}
              </Link>
              
              <Link
                href="/signals"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.signals}
              </Link>

              <Link
                href="/foresight"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.foresight}
              </Link>


              <Link
                href="/events"
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-red-700
                  transition
                  pb-1
                  border-b-2
                  border-transparent
                  hover:border-red-700
                "
              >
                {t.events}
              </Link>

            </nav>

            <Link
              href="/community-input"
              className="
                bg-red-700
                hover:bg-red-800
                shadow-md
                hover:shadow-lg
                text-white
                px-7
                py-3.5
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
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-800"
            >
              {t.home}
            </Link>

            <Link
              href="/about"
              className="font-medium text-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {t.about}
            </Link>

            <Link
              href="/technologies"
              className="font-medium text-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {t.technologies}
            </Link>

            <Link
              href="/events"
              className="font-medium text-gray-800"
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
            >
              {t.foresight}
            </Link>

            <Link
              href="/analytics"
              className="font-medium text-gray-800"
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
            >
              Community Input
            </Link>

          </div>

        )}

      </div>

    </header>
  );
}
