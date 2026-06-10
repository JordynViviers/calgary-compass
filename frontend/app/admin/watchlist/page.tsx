"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function WatchlistPage() {

  const [candidates, setCandidates] =
    useState<any[]>([]);

  const loadCandidates = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/technology-candidates`
      );

      setCandidates(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadCandidates();

  }, []);

  return (

    <main className="min-h-screen bg-white p-10">

      <div className="flex justify-between mb-10">

        <h1 className="text-5xl font-bold text-red-700">
          Technology Watchlist
        </h1>

        <Link
          href="/admin"
          className="bg-gray-100 px-4 py-2 rounded-xl"
        >
          Back
        </Link>

      </div>

      {candidates.length === 0 ? (

        <div className="text-gray-500">
          No candidate technologies found.
        </div>

      ) : (

        <div className="space-y-4">

          {candidates.map((candidate) => (

            <div
              key={candidate.id}
              className="
                border
                rounded-2xl
                p-6
                bg-white
                shadow-sm
              "
            >

              <h2 className="text-2xl font-bold text-red-700">
                {candidate.name}
              </h2>

              <p className="mt-2">
                {candidate.summary}
              </p>

              <div className="mt-4 text-sm text-gray-600">

                <p>
                  Source: {candidate.source}
                </p>

                <p>
                  Confidence: {candidate.confidence}%
                </p>

                <p>
                  Status: {candidate.status}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>

  );

}
