"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
  Database,
  MessageSquare,
  Lightbulb,
  Radar,
  Bot,
  Cpu,
  Building2,
  Satellite,
  TrendingUp,
} from "lucide-react";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function SignalsPage() {

  const [signals, setSignals] =
    useState<any[]>([]);

  const [technologies, setTechnologies] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    Promise.all([

      axios.get(
        `${API_URL}/community-signals`
      ),

      axios.get(
        `${API_URL}/technologies`
      ),

    ])

      .then(([signalsRes, techRes]) => {

        setSignals(
          signalsRes.data
        );

        setTechnologies(
          techRes.data
        );

      })

      .catch(console.error)

      .finally(() => {

        setLoading(false);

      });

  }, []);

  return (

    <main className="min-h-screen bg-gray-50 text-black">

      <div className="h-2 bg-red-700 w-full"></div>

      {/* HERO */}

      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-8 py-20 text-center">

          <h1 className="text-6xl font-bold text-red-700 mb-6">

            Signals & Technology Watchlist

          </h1>

          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">

            Calgary Compass brings together community observations,
            emerging technologies, academic research, and AI-assisted
            technology monitoring to identify trends that may influence
            Calgary's future.

          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-8 py-14">

        {/* LIVE OVERVIEW */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

            <MessageSquare className="w-10 h-10 text-red-700 mb-4" />

            <div className="text-5xl font-bold text-red-700">

              {signals.length}

            </div>

            <div className="mt-2 font-semibold">

              Community Signals

            </div>

            <p className="text-sm text-gray-500 mt-2">

              Ideas, concerns and opportunities submitted by residents.

            </p>

          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

            <Cpu className="w-10 h-10 text-red-700 mb-4" />

            <div className="text-5xl font-bold text-red-700">

              {technologies.length}

            </div>

            <div className="mt-2 font-semibold">

              Technologies

            </div>

            <p className="text-sm text-gray-500 mt-2">

              Technologies currently tracked within Calgary Compass.

            </p>

          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

            <Radar className="w-10 h-10 text-red-700 mb-4" />

            <div className="text-5xl font-bold text-red-700">

              10

            </div>

            <div className="mt-2 font-semibold">

              Community Challenges

            </div>

            <p className="text-sm text-gray-500 mt-2">

              Challenge areas currently represented in Calgary Compass.

            </p>

          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

            <TrendingUp className="w-10 h-10 text-red-700 mb-4" />

            <div className="text-5xl font-bold text-red-700">

              Live

            </div>

            <div className="mt-2 font-semibold">

              Technology Monitoring

            </div>

            <p className="text-sm text-gray-500 mt-2">

              Community input and technology research are continuously combined.

            </p>

          </div>

        </div>

                {/* SIGNAL SOURCES */}

        <section className="mb-20">

          <div className="text-center mb-10">

            <h2 className="text-4xl font-bold text-gray-900 mb-4">

              Signals We Monitor

            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">

              Calgary Compass combines multiple sources of information to
              identify technologies, trends, and opportunities that may shape
              Calgary's future.

            </p>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">

              <Database className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-bold mb-3">

                Research Signals

              </h3>

              <p className="text-gray-600 leading-relaxed">

                Emerging technologies and innovations identified through
                academic literature, research activity, and evidence reviews.

              </p>

            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">

              <MessageSquare className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-bold mb-3">

                Community Signals

              </h3>

              <p className="text-gray-600 leading-relaxed">

                Ideas, concerns, and opportunities identified through surveys,
                workshops, and public engagement.

              </p>

            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">

              <Lightbulb className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-bold mb-3">

                Technology Signals

              </h3>

              <p className="text-gray-600 leading-relaxed">

                Technologies appearing across multiple applications,
                community challenges, and strategic priorities.

              </p>

            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition">

              <Radar className="w-10 h-10 text-red-700 mb-4" />

              <h3 className="text-xl font-bold mb-3">

                Strategic Signals

              </h3>

              <p className="text-gray-600 leading-relaxed">

                AI-assisted observations highlighting technologies that
                may become increasingly relevant for Calgary.

              </p>

            </div>

          </div>

        </section>



        {/* TECHNOLOGY WATCHLIST */}

        <section className="mb-20">

          <div className="flex justify-between items-end mb-10">

            <div>

              <h2 className="text-4xl font-bold text-red-700 mb-3">

                Technology Watchlist

              </h2>

              <p className="text-gray-600 max-w-3xl">

                Technologies that Calgary Compass is actively monitoring
                because of their research activity, emerging applications,
                or potential relevance to Calgary's future.

              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">

              <Bot className="w-10 h-10 text-red-700 mb-5" />

              <h3 className="text-2xl font-bold mb-3">

                Artificial Intelligence

              </h3>

              <p className="text-gray-600 mb-5">

                AI systems supporting automation, decision-making,
                predictive analytics, and municipal service delivery.

              </p>

              <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">

                High Activity

              </span>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">

              <Building2 className="w-10 h-10 text-red-700 mb-5" />

              <h3 className="text-2xl font-bold mb-3">

                Digital Twins

              </h3>

              <p className="text-gray-600 mb-5">

                Virtual models supporting infrastructure planning,
                asset management, and scenario testing.

              </p>

              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">

                Emerging

              </span>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">

              <Cpu className="w-10 h-10 text-red-700 mb-5" />

              <h3 className="text-2xl font-bold mb-3">

                Robotics

              </h3>

              <p className="text-gray-600 mb-5">

                Autonomous systems supporting inspections,
                maintenance, and public services.

              </p>

              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">

                Growing Interest

              </span>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">

              <Satellite className="w-10 h-10 text-red-700 mb-5" />

              <h3 className="text-2xl font-bold mb-3">

                Advanced Sensors

              </h3>

              <p className="text-gray-600 mb-5">

                Real-time monitoring technologies supporting smarter
                infrastructure and environmental management.

              </p>

              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">

                Emerging

              </span>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">

              <Cpu className="w-10 h-10 text-red-700 mb-5" />

              <h3 className="text-2xl font-bold mb-3">

                Autonomous Systems

              </h3>

              <p className="text-gray-600 mb-5">

                Systems capable of operating with increasing levels
                of independence across municipal operations.

              </p>

              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">

                Growing Interest

              </span>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">

              <Database className="w-10 h-10 text-red-700 mb-5" />

              <h3 className="text-2xl font-bold mb-3">

                Data Platforms

              </h3>

              <p className="text-gray-600 mb-5">

                Platforms enabling secure sharing, integration,
                and analysis of municipal data.

              </p>

              <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">

                Strategic Priority

              </span>

            </div>

          </div>

        </section>

                {/* EMERGING THEMES */}

        <section className="mb-20">

          <div className="text-center mb-10">

            <h2 className="text-4xl font-bold text-gray-900 mb-4">

              Emerging Themes

            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">

              Themes appearing across community engagement,
              technology applications, and strategic discussions.

            </p>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

              <div className="text-4xl mb-3">🏗️</div>

              <h3 className="text-2xl font-bold mb-2">

                Infrastructure

              </h3>

              <p className="text-gray-600 mb-6">

                Smart infrastructure, asset management,
                inspection, and digital planning.

              </p>

              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="bg-red-700 h-full"
                  style={{ width: "92%" }}
                />

              </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

              <div className="text-4xl mb-3">🤖</div>

              <h3 className="text-2xl font-bold mb-2">

                Artificial Intelligence

              </h3>

              <p className="text-gray-600 mb-6">

                Decision support,
                automation,
                and municipal AI.

              </p>

              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="bg-red-600 h-full"
                  style={{ width: "85%" }}
                />

              </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

              <div className="text-4xl mb-3">🚍</div>

              <h3 className="text-2xl font-bold mb-2">

                Mobility

              </h3>

              <p className="text-gray-600 mb-6">

                Transit,
                connected vehicles,
                and transportation systems.

              </p>

              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="bg-red-500 h-full"
                  style={{ width: "73%" }}
                />

              </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

              <div className="text-4xl mb-3">🌎</div>

              <h3 className="text-2xl font-bold mb-2">

                Sustainability

              </h3>

              <p className="text-gray-600 mb-6">

                Environmental monitoring,
                waste,
                and resilient infrastructure.

              </p>

              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="bg-red-400 h-full"
                  style={{ width: "61%" }}
                />

              </div>

            </div>

          </div>

        </section>



        {/* COMMUNITY SIGNALS */}

        <section className="mb-20">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h2 className="text-4xl font-bold text-red-700 mb-3">

                Community Signals

              </h2>

              <p className="text-gray-600">

                Observations submitted by residents,
                industry,
                academia,
                and community organizations.

              </p>

            </div>

            {!loading && (

              <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4">

                <div className="text-3xl font-bold text-red-700">

                  {signals.length}

                </div>

                <div className="text-gray-600 text-sm">

                  Signals Collected

                </div>

              </div>

            )}

          </div>

          {loading ? (

            <div className="bg-white rounded-3xl border border-gray-200 p-12 shadow-sm">

              <p className="text-xl text-gray-500">

                Loading community signals...

              </p>

            </div>

          ) : signals.length === 0 ? (

            <div className="bg-white rounded-3xl border border-gray-200 p-12 shadow-sm">

              <p className="text-xl text-gray-500">

                No community signals have been submitted yet.

              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {signals.map((signal) => (

                <div
                  key={signal.id}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex justify-between items-center mb-5">

                    <span className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold">

                      {signal.stakeholder}

                    </span>

                    <span className="text-gray-400 text-sm">

                      Community Observation

                    </span>

                  </div>

                  <p className="text-lg leading-relaxed text-gray-800">

                    {signal.signal_text}

                  </p>

                </div>

              ))}

            </div>

          )}

        </section>

                {/* RESEARCH & EVIDENCE */}

        <section className="mb-20">

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">

            <div className="flex items-center gap-4 mb-8">

              <Database className="w-10 h-10 text-red-700" />

              <div>

                <h2 className="text-4xl font-bold text-red-700">

                  Research & Evidence

                </h2>

                <p className="text-gray-600 mt-2">

                  Calgary Compass combines multiple evidence sources to support
                  technology foresight and informed decision-making.

                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-gray-50 rounded-2xl p-6">

                <h3 className="font-bold text-lg mb-3">

                  Academic Literature

                </h3>

                <p className="text-gray-600">

                  Emerging technologies and applications identified through
                  OpenAlex and Semantic Scholar.

                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-6">

                <h3 className="font-bold text-lg mb-3">

                  AI Evaluation

                </h3>

                <p className="text-gray-600">

                  AI-generated assessments summarize evidence,
                  identify applications, and estimate potential impacts.

                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-6">

                <h3 className="font-bold text-lg mb-3">

                  Community Engagement

                </h3>

                <p className="text-gray-600">

                  Residents and stakeholders contribute observations,
                  concerns, and opportunities through Calgary Compass.

                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-6">

                <h3 className="font-bold text-lg mb-3">

                  Continuous Monitoring

                </h3>

                <p className="text-gray-600">

                  Technology applications, community priorities,
                  and emerging signals are continually reviewed
                  to identify future opportunities.

                </p>

              </div>

            </div>

          </div>

        </section>



        {/* CALGARY COMPASS APPROACH */}

        <section className="mb-20">

          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-12 text-white">

            <h2 className="text-4xl font-bold mb-6">

              How Calgary Compass Identifies Signals

            </h2>

            <div className="grid md:grid-cols-4 gap-8">

              <div>

                <div className="text-5xl font-bold mb-4">

                  1

                </div>

                <h3 className="text-xl font-semibold mb-2">

                  Monitor

                </h3>

                <p className="text-red-100">

                  Track emerging technologies, research,
                  and community observations.

                </p>

              </div>

              <div>

                <div className="text-5xl font-bold mb-4">

                  2

                </div>

                <h3 className="text-xl font-semibold mb-2">

                  Evaluate

                </h3>

                <p className="text-red-100">

                  Assess technologies using AI and
                  community priorities.

                </p>

              </div>

              <div>

                <div className="text-5xl font-bold mb-4">

                  3

                </div>

                <h3 className="text-xl font-semibold mb-2">

                  Connect

                </h3>

                <p className="text-red-100">

                  Link technologies,
                  applications,
                  and Calgary's community challenges.

                </p>

              </div>

              <div>

                <div className="text-5xl font-bold mb-4">

                  4

                </div>

                <h3 className="text-xl font-semibold mb-2">

                  Inform

                </h3>

                <p className="text-red-100">

                  Support conversations,
                  planning,
                  and future decision-making.

                </p>

              </div>

            </div>

          </div>

        </section>



        {/* CTA */}

        <section>

          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-12 text-white text-center">

            <h2 className="text-4xl font-bold mb-4">

              Continue Exploring Calgary Compass

            </h2>

            <p className="text-lg mb-8 max-w-3xl mx-auto">

              Discover technologies, explore community priorities,
              compare AI and community perspectives,
              and understand how emerging technologies
              may shape Calgary's future.

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

        </section>

      </div>

    </main>

  );

}

