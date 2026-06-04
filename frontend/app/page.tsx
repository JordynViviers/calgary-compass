"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* HERO (PRIMARY FOCUS) */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

        {/* Background Compass (UNCHANGED) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[18px]">

          <div className="relative w-[90vw] max-w-[620px] aspect-square opacity-15">

            <div className="absolute inset-0 rounded-full border-[6px] border-red-700" />
            <div className="absolute inset-10 rounded-full border-2 border-red-700" />
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-red-700 -translate-x-1/2" />
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-700 -translate-y-1/2" />

            <div className="absolute inset-0 rotate-45">
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-700 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-700 -translate-y-1/2" />
            </div>

            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">N</span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">S</span>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">W</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">E</span>

          </div>

          <div className="absolute inset-0 flex items-center justify-center">

            <div
              className="relative w-[90vw] max-w-[620px] aspect-square"
              style={{ animation: "spin 12s ease-in-out infinite" }}
            >
              <div className="absolute left-1/2 top-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[180px] border-l-transparent border-r-transparent border-b-red-700 -translate-x-1/2 -translate-y-full" />

              <div className="absolute left-1/2 top-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[180px] border-l-transparent border-r-transparent border-t-gray-500 -translate-x-1/2" />

              <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-red-700 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

          </div>

        </div>

        {/* HERO CONTENT (CLEAN SAAS STYLE LAYOUT) */}
        <div className="relative z-10 max-w-3xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center mb-6 px-4 py-1 rounded-full border border-red-100 bg-red-50 text-red-700 text-sm font-medium">
            Smart City Intelligence Platform
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-5">
            Calgary Compass
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
            AI-powered civic intelligence for evaluating emerging technologies.
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto mb-10">
            A platform for governments, industry, academia, and citizens
            to collaborate on foresight, governance analytics, and
            technology evaluation for smarter cities.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/technologies">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Explore Technologies
              </button>
            </Link>

            <Link href="/community-input">
              <button className="border border-gray-300 text-gray-700 hover:border-gray-400 px-6 py-3 rounded-xl font-semibold transition">
                Get Involved
              </button>
            </Link>
          </div>

        </div>

      </section>

      {/* VALUE STRIP (NEW — replaces bulky sections) */}
      <section className="border-t border-gray-100 bg-white py-16">

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Evaluate Technologies
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Assess emerging innovations using structured data and AI insight.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Engage Citizens
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Collect meaningful input from community stakeholders.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Guide Decisions
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Support smarter city planning with foresight analytics.
            </p>
          </div>

        </div>

      </section>

      {/* FINAL CTA (CLEAN, NOT BLOCKY) */}
      <section className="bg-gray-50 py-20">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
            Build the future of Calgary together
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Join a collaborative platform where technology meets public insight.
          </p>

          <Link href="/community-input">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition">
              Get Involved
            </button>
          </Link>

        </div>

      </section>

      {/* Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(45deg); }
          40% { transform: rotate(-20deg); }
          60% { transform: rotate(120deg); }
          80% { transform: rotate(75deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </main>
  );
}
