"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Database,
  MessageSquare,
  Lightbulb,
  Radar,
} from "lucide-react";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function SignalsPage() {
  const [signals, setSignals] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/community-signals`
      )
      .then((response) => {
        setSignals(
          response.data
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      {/* HERO */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center"> 
          <h1 className="text-5xl md:text-6xl font-bold text-red-700 mb-4">
            Signals & Observations
          </h1>

          <p className="text-xl text-gray-700 max-w-4xl">
            Insights, observations, concerns, and opportunities submitted by
            residents, industry, academia, and community stakeholders.
            These signals help identify areas of interest and discussion
            across Calgary's innovation ecosystem.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* SIGNAL TYPES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <Database className="w-10 h-10 text-red-700 mb-4" />

            <h3 className="font-semibold text-red-700 mb-2">
              Research Signals
            </h3>

            <p className="text-sm text-gray-600">
              Developments identified through research activity and
              technology monitoring.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <MessageSquare className="w-10 h-10 text-red-700 mb-4" />

            <h3 className="font-semibold text-red-700 mb-2">
              Community Signals
            </h3>

            <p className="text-sm text-gray-600">
              Ideas, concerns, and opportunities raised through
              community engagement.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <Lightbulb className="w-10 h-10 text-red-700 mb-4" />

            <h3 className="font-semibold text-red-700 mb-2">
              Technology Signals
            </h3>

            <p className="text-sm text-gray-600">
              Technologies appearing across multiple applications
              or challenge areas.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <Radar className="w-10 h-10 text-red-700 mb-4" />

            <h3 className="font-semibold text-red-700 mb-2">
              Strategic Signals
            </h3>

            <p className="text-sm text-gray-600">
              Observations relevant to planning, innovation,
              and city-building discussions.
            </p>
          </div>
        </div>

        {/* SIGNAL COUNT */}
        {!loading && (
          <div className="mb-8">
            <p className="text-gray-500">
              {signals.length} signals submitted
            </p>
          </div>
        )}

        {/* SIGNALS */}
        {loading ? (
          <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm">
            <p className="text-xl text-gray-500">
              Loading signals...
            </p>
          </div>
        ) : signals.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm">
            <p className="text-xl text-gray-500">
              No signals submitted yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                <div className="mb-4">
                  <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">
                    {signal.stakeholder}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Community Observation
                </div>

                <p className="text-lg leading-relaxed text-gray-800">
                  {signal.signal_text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-3xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Continue Exploring Calgary Compass
            </h2>

            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Explore technologies, community priorities,
              technology watchlists, and civic innovation insights.
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
