"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* HERO */}
      <section className="relative flex flex-col justify-center items-center min-h-[90vh] px-6 md:px-10 overflow-hidden">

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

          {/* Animated Needle (UNCHANGED) */}
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

        {/* HERO CONTENT (REDESIGNED) */}
        <div className="relative z-10 max-w-3xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center mb-6 px-4 py-1 rounded-full border border-red-200 bg-red-50 text-red-700 text-sm font-medium">
            Smart City Intelligence Platform
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
            Calgary Compass
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-6">
            AI-assisted governance, foresight, and civic intelligence for emerging technologies.
          </p>

          {/* Body */}
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto mb-10">
            Calgary Compass helps governments, industry, academia, and civic leaders evaluate emerging smart city technologies using AI-powered governance analytics, stakeholder voting, and strategic foresight.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/technologies">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Explore Technologies
              </button>
            </Link>

            <Link href="/community-input">
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl font-semibold transition">
                Get Involved
              </button>
            </Link>
          </div>

        </div>

      </section>

      {/* PURPOSE SECTION */}
      <section className="py-28 bg-white border-t border-gray-100">

        <div className="max-w-4xl mx-auto text-center px-6">

          <p className="text-red-600 uppercase tracking-widest text-sm font-semibold mb-4">
            Our Purpose
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            Evidence-driven civic intelligence.
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Calgary Compass enables structured collaboration between citizens,
            government, industry, and academia to evaluate technologies,
            surface insights, and guide smarter city decisions.
          </p>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Technology Evaluation",
              desc: "Assess emerging technologies through structured data, AI analysis, and civic input."
            },
            {
              title: "Civic Participation",
              desc: "Enable citizens and stakeholders to contribute meaningfully to city decisions."
            },
            {
              title: "Strategic Foresight",
              desc: "Identify trends, risks, and opportunities shaping the future of cities."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="py-28 bg-white">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-12 text-white text-center">

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Help Shape Calgary’s Future
            </h2>

            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join a growing ecosystem of citizens, researchers, and leaders
              building a smarter, more responsive city through data and collaboration.
            </p>

            <Link href="/community-input">
              <button className="bg-white text-red-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition">
                Get Involved
              </button>
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
