"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* HERO */}
      <section className="relative flex flex-col justify-center items-center min-h-[85vh] px-10 overflow-hidden">

        {/* Background Compass */}
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

        {/* HERO TEXT */}
        <div className="relative z-10 max-w-4xl text-center">

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-5 text-gray-900">
            Calgary Compass
          </h1>

          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
            AI-Assisted Smart City Governance Platform
          </p>

          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-gray-600">
            Calgary Compass helps governments,
            industry, academia, and civic leaders
            evaluate emerging smart city
            technologies using AI-powered
            governance analytics, stakeholder
            voting, and strategic foresight.
          </p>

          <Link href="/technologies">
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-base font-semibold transition">
              Explore Technologies
            </button>
          </Link>

        </div>

      </section>

      {/* PURPOSE */}
      <section className="py-24 bg-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <p className="text-red-600 font-semibold uppercase tracking-widest mb-3 text-sm">
            Our Purpose
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            Evidence. Collaboration. Impact.
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calgary Compass empowers citizens,
            industry, academia, and government to
            explore emerging technologies,
            participate in foresight activities,
            and shape Calgary's future together.
          </p>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-10">

            {[
              {
                title: "Explore Technologies",
                text: "Discover emerging technologies being evaluated for smart city applications.",
              },
              {
                title: "Community Input",
                text: "Share perspectives and help evaluate future technology pilots.",
              },
              {
                title: "Signals & Trends",
                text: "Monitor emerging trends and weak signals impacting cities worldwide.",
              },
              {
                title: "Foresight",
                text: "Participate in scenario planning and strategic foresight exercises.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center px-2">

                <h3 className="text-xl font-semibold text-red-700 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8">

            {[
              ["50+", "Technologies Evaluated"],
              ["500+", "Community Responses"],
              ["20+", "Signals & Trends"],
              ["1", "Smarter Calgary"],
            ].map(([num, label], i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center"
              >
                <p className="text-4xl md:text-5xl font-semibold text-red-700">
                  {num}
                </p>

                <p className="mt-3 text-gray-600 text-sm md:text-base">
                  {label}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-12 text-white text-center">

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Help Shape Calgary's Future
            </h2>

            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90 leading-relaxed">

              Join citizens, researchers,
              industry leaders, and city staff
              in evaluating emerging technologies
              and building a smarter Calgary.

            </p>

            <Link href="/community-input">
              <button className="bg-white text-red-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition text-base">
                Get Involved
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* Animation Styles */}
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
