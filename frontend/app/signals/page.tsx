"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

        console.error(
          error
        );

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  return (

    <main className="min-h-screen bg-gray-50 text-black">

      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-6xl mx-auto px-8 py-12">

        <nav className="flex justify-between items-center mb-16">

          <Link
            href="/"
            className="text-2xl font-bold text-red-700"
          >

            Calgary Compass

          </Link>

          <div className="flex gap-8">

            <Link
              href="/technologies"
            >
              Technologies
            </Link>

            <Link
              href="/community-input"
            >
              Community Input
            </Link>

            <Link
              href="/signals"
              className="font-semibold text-red-700"
            >
              Signals
            </Link>

          </div>

        </nav>

        <h1 className="text-5xl font-bold text-red-700 mb-4">

          Community Signals

        </h1>

        <p className="text-xl text-gray-700 mb-10">

          Emerging concerns, opportunities,
          and foresight signals submitted by
          citizens, industry, academia,
          and community stakeholders.

        </p>

        {loading ? (

          <p>
            Loading signals...
          </p>

        ) : signals.length === 0 ? (

          <p>
            No signals submitted yet.
          </p>

        ) : (

          <div className="space-y-6">

            {signals.map(
              (signal) => (

                <div
                  key={signal.id}
                  className="bg-white border rounded-2xl p-6 shadow-sm"
                >

                  <div className="mb-3">

                    <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">

                      {
                        signal.stakeholder
                      }

                    </span>

                  </div>

                  <p className="text-lg">

                    {
                      signal.signal_text
                    }

                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>

  );
}
