"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function WatchlistPage() {
  const [candidates, setCandidates] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadCandidates = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/technology-candidates`
      );

      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const discoverTechnologies = async () => {
    try {
      await axios.post(
        `${API_URL}/discover-technologies`
      );

      alert(
        "Technology discovery completed!"
      );

      loadCandidates();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to discover technologies."
      );
    }
  };

  const approveCandidate = async (
    candidateId: number
  ) => {
    try {
      await axios.post(
        `${API_URL}/technology-candidates/${candidateId}/approve`
      );

      alert(
        "Technology approved!"
      );

      loadCandidates();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to approve technology."
      );
    }
  };

  const rejectCandidate = async (
    candidateId: number
  ) => {
    try {
      await axios.post(
        `${API_URL}/technology-candidates/${candidateId}/reject`
      );

      alert(
        "Technology rejected."
      );

      loadCandidates();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to reject technology."
      );
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-red-700">
            Technology Watchlist
          </h1>

          <p className="text-gray-600 mt-2">
            AI-discovered technologies awaiting review.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={discoverTechnologies}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            🔍 Discover Technologies
          </button>

          <Link
            href="/admin"
            className="
              bg-gray-100
              hover:bg-gray-200
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            ← Back to Dashboard
          </Link>

        </div>

      </div>

      {/* Candidate List */}

      {loading ? (

        <div className="text-gray-500">
          Loading technologies...
        </div>

      ) : candidates.length === 0 ? (

        <div
          className="
            border
            border-gray-200
            rounded-2xl
            p-10
            bg-white
            shadow-sm
          "
        >

          <h2 className="text-2xl font-semibold mb-2">
            No technologies awaiting review
          </h2>

          <p className="text-gray-500">
            Click "Discover Technologies" to
            generate new candidates.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {candidates.map(
            (candidate) => (

              <div
                key={candidate.id}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  bg-white
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                <div className="flex justify-between gap-8">

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-red-700 mb-2">
                      {candidate.name}
                    </h2>

                    <p className="text-gray-700 mb-4">
                      {candidate.summary}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">

                      <span>
                        <strong>
                          Source:
                        </strong>{" "}
                        {candidate.source}
                      </span>

                      <span>
                        <strong>
                          Confidence:
                        </strong>{" "}
                        {candidate.confidence}%
                      </span>

                      <span>
                        <strong>
                          Status:
                        </strong>{" "}
                        {candidate.status}
                      </span>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

                    <button
                      onClick={() =>
                        approveCandidate(
                          candidate.id
                        )
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectCandidate(
                          candidate.id
                        )
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      Reject
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </main>
  );
}
