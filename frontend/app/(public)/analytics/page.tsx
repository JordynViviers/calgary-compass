"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://calgary-compass-api.onrender.com";

function getChallengeIcon(
  challenge: string
) {

  const text =
    challenge.toLowerCase();

  if (
    text.includes("housing")
  ) return "🏘";

  if (
    text.includes("traffic")
  ) return "🚍";

  if (
    text.includes("economy")
  ) return "💼";

  if (
    text.includes("education")
  ) return "🎓";

  if (
    text.includes("environment")
  ) return "🌳";

  if (
    text.includes("crime")
  ) return "🚨";

  if (
    text.includes("safety")
  ) return "🚨";

  if (
    text.includes("growth")
  ) return "🏗";

  return "🏛";
}

export default function AnalyticsPage() {

  const [challengeSummary, setChallengeSummary] =
    useState<any[]>([]);

  const [solutions, setSolutions] =
    useState<any>({});

  const [selectedChallenge, setSelectedChallenge] =
    useState("");

  const [communitySummary, setCommunitySummary] =
    useState<any>(null);

  useEffect(() => {

    axios
      .get(
        `${API_URL}/challenge-summary`
      )
      .then((res) => {

        setChallengeSummary(
          res.data
        );

        if (
          res.data.length > 0
        ) {

          setSelectedChallenge(
            res.data[0].challenge
          );

        }

      });
    
    axios
      .get(
        `${API_URL}/community-summary`
      )
      .then((res) => {

        setCommunitySummary(
          res.data
        );

      });
    
    axios
      .get(
        `${API_URL}/challenge-solutions`
      )
      .then((res) => {

        setSolutions(
          res.data
        );

      });

  }, []);

  const technologies =
    solutions[
      selectedChallenge
    ] || [];

  return (

    <main className="min-h-screen bg-gray-50 text-black">

      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* HERO */}

        <section className="text-center mb-16">

          <h1 className="text-6xl font-bold text-red-700 mb-4">
            Calgary Community Priorities
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore the challenges identified
            by Calgarians and discover
            technologies that may help
            address them.
          </p>

        </section>

        {/* KEY INSIGHTS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
        
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Community Priorities
            </h3>
        
            <p className="text-gray-600">
              Explore the highest-ranked challenges identified by Calgary residents and stakeholders.
            </p>
          </div>
        
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Technology Applications
            </h3>
        
            <p className="text-gray-600">
              Discover technologies and applications linked to local challenges and opportunities.
            </p>
          </div>
        
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Community-Informed Insights
            </h3>
        
            <p className="text-gray-600">
              Results reflect community input and help identify areas where technology may provide value.
            </p>
          </div>
        
        </div>

        {/* TOP STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <p className="text-gray-500 mb-2">
              Community Challenges
            </p>

            <p className="text-5xl font-bold text-red-700">
              {challengeSummary.length}
            </p>

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <p className="text-gray-500 mb-2">
              Technologies Linked
            </p>

            <p className="text-5xl font-bold text-red-700">
              {
                Object.values(
                  solutions
                ).flat().length
              }
            </p>

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <p className="text-gray-500 mb-2">
              Community Responses
            </p>

            <p className="text-5xl font-bold text-red-700">

              {
                communitySummary
                  ? communitySummary.total_surveys
                  : "—"
              }

            </p>

          </div>

        </div>

        {/* PRIORITY RANKINGS */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-12">

          <h2 className="text-3xl font-bold text-red-700 mb-8">
            Calgary Priority Rankings
          </h2>

          <div className="space-y-4">

            {challengeSummary.map(
              (
                challenge,
                index
              ) => (

                <button
                  key={
                    challenge.challenge
                  }
                  onClick={() =>
                    setSelectedChallenge(
                      challenge.challenge
                    )
                  }
                  className={`
                    w-full
                    text-left
                    p-5
                    rounded-2xl
                    transition

                    ${
                      selectedChallenge ===
                      challenge.challenge

                        ? "bg-red-700 text-white"

                        : "bg-gray-50 hover:bg-white hover:shadow-md"
                    }
                  `}
                >

                  <div className="flex items-center gap-4">

                    <div className={`
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold

                      ${
                        selectedChallenge ===
                        challenge.challenge

                          ? "bg-white text-red-700"

                          : "bg-red-700 text-white"
                      }
                    `}>
                      {index + 1}
                    </div>

                    <div className="text-3xl">
                      {
                        getChallengeIcon(
                          challenge.challenge
                        )
                      }
                    </div>

                    <div className="flex-1">

                      <div className="font-bold text-lg">

                        {
                          challenge.challenge
                        }

                      </div>

                      <div className="text-sm opacity-80">

                        Average Rank:
                        {" "}
                        {
                          challenge.average_rank
                        }

                        {" • "}

                        Votes:
                        {" "}
                        {
                          challenge.votes
                        }

                      </div>

                    </div>

                  </div>

                </button>

              )
            )}

          </div>

        </div>

        {/* SOLUTIONS */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          <h2 className="text-4xl font-bold text-red-700 mb-3">

            {
              getChallengeIcon(
                selectedChallenge
              )
            }

            {" "}

            {selectedChallenge}

          </h2>

          <p className="text-gray-600 mb-10">

            Technologies and applications
            that may help address this
            challenge.

          </p>

          {technologies.length === 0 ? (

            <div className="text-center py-16">

              <p className="text-xl text-gray-500">

                No technologies have been
                linked yet.

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {technologies.map(
                (
                  item: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                      border
                      border-gray-200
                      rounded-3xl
                      overflow-hidden
                      bg-white
                      shadow-sm
                    "
                  >

                    {item.hero_image && (

                      <img
                        src={
                          item.hero_image
                        }
                        alt={
                          item.technology_name
                        }
                        className="
                          w-full
                          h-56
                          object-cover
                        "
                      />

                    )}

                    <div className="p-6">

                      <div className="flex justify-between items-center mb-4">

                        <h3 className="text-2xl font-bold">

                          {
                            item.technology_name
                          }

                        </h3>

                        <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">

                          Strength:
                          {" "}
                          {
                            item.strength
                          }

                        </span>

                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">

                        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">

                          Example Application

                        </p>

                        <p className="font-semibold">

                          {
                            item.application_name
                          }

                        </p>

                        <p className="text-gray-600 mt-2">

                          {
                            item.application_description
                          }

                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </main>

  );
}
