"use client";

import Link from "next/link";
import { Users, Compass, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url(/calgary-bg.png)",
        }}
      >
        {/* Translucent Overlay */}
        <div className="absolute inset-0 bg-white/80"></div>

        {/* TECH COMPASS */}
        <div className="hidden md:flex absolute inset-y-0 right-0 w-1/2 items-center justify-center pointer-events-none">
        
          <div className="relative w-[90vw] max-w-[620px] aspect-square opacity-20">
        
            {/* OUTER RINGS */}
            <div className="absolute inset-0 rounded-full border-[4px] border-red-700" />
        
            <div className="absolute inset-10 rounded-full border border-dashed border-red-700 opacity-80" />
        
            <div className="absolute inset-20 rounded-full border border-red-700 opacity-50" />
        
            <div className="absolute inset-32 rounded-full border border-dashed border-red-700 opacity-30" />
        
            {/* MAIN AXES */}
            <div className="absolute left-1/2 top-0 h-full w-px bg-red-700 opacity-40 -translate-x-1/2" />
        
            <div className="absolute top-1/2 left-0 w-full h-px bg-red-700 opacity-40 -translate-y-1/2" />
        
            <div className="absolute inset-0 rotate-45">
              <div className="absolute left-1/2 top-0 h-full w-px bg-red-700 opacity-20 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-red-700 opacity-20 -translate-y-1/2" />
            </div>
        
            {/* TICK MARKS */}
        
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                }}
              >
                <div
                  className="absolute bg-red-700 opacity-40"
                  style={{
                    width: "1px",
                    height: i % 2 === 0 ? "14px" : "8px",
                    transform: "translateY(-285px)",
                  }}
                />
              </div>
            ))}
        
            {/* DATA NODES */}
        
            <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-3 h-3 bg-red-700 rounded-full animate-pulse" />
        
            <div className="absolute top-[28%] right-[18%] w-3 h-3 bg-red-700 rounded-full animate-pulse" />
        
            <div className="absolute bottom-[18%] right-[30%] w-3 h-3 bg-red-700 rounded-full animate-pulse" />
        
            <div className="absolute bottom-[22%] left-[24%] w-3 h-3 bg-red-700 rounded-full animate-pulse" />
        
            <div className="absolute top-[34%] left-[22%] w-3 h-3 bg-red-700 rounded-full animate-pulse" />
        
            <div className="absolute top-[42%] left-[62%] w-2 h-2 bg-red-700 rounded-full animate-pulse" />
        
            <div className="absolute bottom-[42%] right-[38%] w-2 h-2 bg-red-700 rounded-full animate-pulse" />
        
            {/* CARDINAL DIRECTIONS */}
        
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">
              N
            </span>
        
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">
              S
            </span>
        
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">
              W
            </span>
        
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">
              E
            </span>
        
            {/* NEEDLE */}
        
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative w-full h-full"
                style={{
                  animation: "compassFloat 8s ease-in-out infinite",
                }}
              >
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-0
                    h-0
                    border-l-[14px]
                    border-r-[14px]
                    border-b-[190px]
                    border-l-transparent
                    border-r-transparent
                    border-b-red-700
                    -translate-x-1/2
                    -translate-y-full
                    drop-shadow-[0_0_15px_rgba(185,28,28,0.6)]
                  "
                />
        
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-0
                    h-0
                    border-l-[14px]
                    border-r-[14px]
                    border-t-[190px]
                    border-l-transparent
                    border-r-transparent
                    border-t-gray-500
                    -translate-x-1/2
                  "
                />
        
                {/* CENTER HUB */}
        
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-8
                    h-8
                    bg-red-700
                    rounded-full
                    -translate-x-1/2
                    -translate-y-1/2
                    shadow-[0_0_20px_rgba(185,28,28,0.5)]
                  "
                />
              </div>
            </div>
        
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-black mb-5">
                Calgary Compass
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-6">
                AI-powered civic intelligence for evaluating emerging
                technologies.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed max-w-xl mb-8 md:mb-10">
                A platform for governments, industry, academia, and citizens to
                collaborate on foresight, governance analytics, and technology
                evaluation for smarter cities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/technologies">
                  <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                    Explore Technologies
                  </button>
                </Link>

                <Link href="/community-input">
                  <button className="w-full sm:w-auto border border-gray-300 text-black hover:border-gray-500 px-6 py-3 rounded-xl font-semibold transition bg-white/70">
                    Get Involved
                  </button>
                </Link>
              </div>
            </div>

            <div />
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-t border-gray-100 bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-center">
          <div className="bg-white border-t-4 border-red-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Evaluate Technologies
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Assess emerging innovations using structured data and AI insight.
            </p>
          </div>

          <div className="bg-white border-t-4 border-red-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Engage Citizens
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Collect meaningful input from community stakeholders.
            </p>
          </div>

          <div className="bg-white border-t-4 border-red-700 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Guide Decisions
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Support smarter city planning with foresight analytics.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              How Calgary Compass Works
            </h2>
      
            <p className="text-gray-600 max-w-3xl mx-auto">
              Calgary Compass connects community priorities, technology exploration,
              and evidence-informed discussion to support conversations about
              innovation in Calgary.
            </p>
          </div>
      
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <Users className="w-10 h-10 text-red-700 mb-4" />
      
              <h3 className="text-xl font-semibold mb-3">
                Community Priorities
              </h3>
      
              <p className="text-gray-600 leading-relaxed">
                Residents identify challenges, opportunities, and issues that matter
                most to Calgary.
              </p>
            </div>
      
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <Compass className="w-10 h-10 text-red-700 mb-4" />
      
              <h3 className="text-xl font-semibold mb-3">
                Technology Exploration
              </h3>
      
              <p className="text-gray-600 leading-relaxed">
                Technologies are explored through research, evidence, and practical
                applications.
              </p>
            </div>
      
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <MessageSquare className="w-10 h-10 text-red-700 mb-4" />
      
              <h3 className="text-xl font-semibold mb-3">
                Community Insights
              </h3>
      
              <p className="text-gray-600 leading-relaxed">
                Feedback helps connect technologies to local priorities and areas of
                community interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* STATS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
              Calgary Compass at a Glance
            </h2>

            <p className="text-gray-600">
              Bringing together technology, community insight, and strategic
              foresight.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm text-center">
              <p className="text-3xl md:text-5xl font-bold text-red-700">
                50+
              </p>

              <p className="mt-3 text-gray-600">
                Technologies Evaluated
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm text-center">
              <p className="text-3xl md:text-5xl font-bold text-red-700">
                500+
              </p>

              <p className="mt-3 text-gray-600">
                Community Responses
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm text-center">
              <p className="text-3xl md:text-5xl font-bold text-red-700">
                20+
              </p>
            
              <p className="mt-3 text-gray-600">
                Signals & Trends
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm text-center">
              <p className="text-3xl md:text-5xl font-bold text-red-700">
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
          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-6 md:p-16 text-white shadow-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Help Shape Calgary&apos;s Future
            </h2>

            <p className="text-base md:text-xl max-w-3xl mb-8 leading-relaxed">
              Join citizens, researchers, industry leaders, and city staff in
              exploring emerging technologies, evaluating smart city
              initiatives, and helping build a more innovative Calgary.
            </p>

            <Link
              href="/community-input"
              className="inline-block bg-white text-red-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Badge */}
      <section className="bg-white pb-16 text-center">
        <div className="inline-flex items-center px-5 py-2 rounded-full border border-red-100 bg-red-50 text-red-700 text-sm font-medium">
          Smart City Intelligence Platform
        </div>
      </section>

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
