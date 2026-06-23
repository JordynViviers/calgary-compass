"use client";

import Link from "next/link";
import {
  Radar,
  Lightbulb,
  Database,
  MessageSquare,
  Cpu,
  Bot,
  Building2,
  Satellite,
} from "lucide-react";

export default function ForesightPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      {/* HERO */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-red-700 mb-6">
            Technology Watchlist & Signals
          </h1>

          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Calgary Compass tracks technologies, applications, research activity,
            and community interests that may influence future conversations about
            innovation, governance, and city-building in Calgary.
          </p>
        </div>
      </section>

      {/* SIGNALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Signals We Monitor
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Calgary Compass brings together information from research,
              community engagement, and technology evaluations to identify areas
              of interest and discussion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <Database className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Research Activity
              </h3>

              <p className="text-gray-600">
                Technology developments identified through academic literature
                and research databases.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <MessageSquare className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Community Interest
              </h3>

              <p className="text-gray-600">
                Topics receiving attention through community engagement and
                public participation.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <Lightbulb className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Technology Applications
              </h3>

              <p className="text-gray-600">
                Potential uses and applications that may help address local
                opportunities and challenges.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
              <Radar className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Strategic Relevance
              </h3>

              <p className="text-gray-600">
                Technologies connected to multiple areas of community and civic
                interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WATCHLIST */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technology Watchlist
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Technologies currently being explored, discussed, or evaluated
              across Calgary Compass.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <Bot className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-2xl font-bold mb-3">
                Artificial Intelligence
              </h3>

              <p className="text-gray-600">
                AI systems supporting decision-making, automation, and data
                analysis.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <Building2 className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-2xl font-bold mb-3">
                Digital Twins
              </h3>

              <p className="text-gray-600">
                Virtual representations of infrastructure, systems, and urban
                environments.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <Cpu className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-2xl font-bold mb-3">
                Robotics
              </h3>

              <p className="text-gray-600">
                Automated systems supporting operations, inspection, and service
                delivery.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <Satellite className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-2xl font-bold mb-3">
                Advanced Sensors
              </h3>

              <p className="text-gray-600">
                Technologies that improve monitoring, measurement, and
                situational awareness.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <Cpu className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-2xl font-bold mb-3">
                Autonomous Systems
              </h3>

              <p className="text-gray-600">
                Systems capable of operating with varying levels of automation.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <Database className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-2xl font-bold mb-3">
                Data Platforms
              </h3>

              <p className="text-gray-600">
                Technologies that enable data sharing, analysis, and informed
                decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY SIGNALS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">
            <h2 className="text-4xl font-bold text-red-700 mb-6">
              Community Signals
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Signals can emerge from community discussions, technology
              evaluations, academic research, workshops, and engagement
              activities. Calgary Compass helps bring these perspectives
              together in one place to support ongoing learning and discussion.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Community Engagement
                </h3>

                <p className="text-gray-600">
                  Input from residents, organizations, and stakeholders.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Research & Evidence
                </h3>

                <p className="text-gray-600">
                  Insights drawn from publications and technology evaluations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">
              Continue Exploring Calgary Compass
            </h2>

            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Learn about technologies, explore community priorities, and
              discover how innovation connects to Calgary's challenges and
              opportunities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/technologies"
                className="bg-white text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Explore Technologies
              </Link>

              <Link
                href="/analytics"
                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-700 transition"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
