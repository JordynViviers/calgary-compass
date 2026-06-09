"use client";

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

  const t =
    translations[
      language as keyof typeof translations
    ] ||
    translations.English;
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-[1600px] mx-auto px-8">

        <div className="flex items-center h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 mr-auto"
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

              <p className="text-2xl font-bold text-gray-900">
                COMPASS
              </p>
            </div>
          </Link>

          {/* Navigation + CTA Group */}
          <div className="flex items-center gap-8">

            <nav className="hidden lg:flex items-center gap-5">

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

        </div>

      </div>

    </header>
  );
}
