"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      <Navbar />

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

      {/* STATS */}

<section className="py-20 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-12">

      <h2 className="text-4xl font-semibold text-gray-900 mb-3">
        Calgary Compass at a Glance
      </h2>

      <p className="text-gray-600">
        Bringing together technology, community insight,
        and strategic foresight.
      </p>

    </div>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">

        <p className="text-5xl font-bold text-red-700">
          50+
        </p>

        <p className="mt-3 text-gray-600">
          Technologies Evaluated
        </p>

      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">

        <p className="text-5xl font-bold text-red-700">
          500+
        </p>

        <p className="mt-3 text-gray-600">
          Community Responses
        </p>

      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">

        <p className="text-5xl font-bold text-red-700">
          20+
        </p>

        <p className="mt-3 text-gray-600">
          Signals & Trends
        </p>

      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">

        <p className="text-5xl font-bold text-red-700">
          10+
        </p>

        <p className="mt-3 text-gray-600">
          Community Events
        </p>

      </div>

    </div>

  </div>

</section>

   {/* FEATURED CTA */}

<section className="py-24 bg-white">

  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-12 md:p-16 text-white shadow-xl">

      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Help Shape Calgary's Future
      </h2>

      <p className="text-xl max-w-3xl mb-8 leading-relaxed">
        Join citizens, researchers, industry leaders,
        and city staff in exploring emerging technologies,
        evaluating smart city initiatives, and helping
        build a more innovative Calgary.
      </p>

      <Link
        href="/community-input"
        className="
          inline-block
          bg-white
          text-red-700
          px-8
          py-4
          rounded-xl
          font-semibold
          hover:bg-gray-100
          transition
        "
      >
        Get Involved
      </Link>

    </div>

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
