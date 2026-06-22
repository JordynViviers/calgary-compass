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

  if (text.includes("housing"))
    return "🏘";

  if (text.includes("traffic"))
    return "🚍";

  if (text.includes("economy"))
    return "💼";

  if (text.includes("education"))
    return "🎓";

  if (text.includes("environment"))
    return "🌳";

  if (text.includes("safety"))
    return "🚨";

  if (text.includes("growth"))
    return "🏗";

  return "🏛";
}

export default function AnalyticsPage() {

  const [challengeSummary, setChallengeSummary] =
    useState<any[]>([]);

  const [explorerData, setExplorerData] =
    useState<any>(null);

  const [selectedChallenge, setSelectedChallenge] =
    useState("");

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

      })
      .catch((err) =>
        console.error(err)
      );

    axios
      .get(
        `${API_URL}/challenge-explorer`
      )
      .then((res) => {

        setExplorerData(
          res.data
        );

      })
      .catch((err) =>
        console.error(err)
      );

  }, []);

  const getApplicationsForChallenge =
    () => {

      if (!explorerData)
        return [];

      return explorerData.links.filter(
        (link: any) =>
          link.challenge ===
          selectedChallenge
      );

    };

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
            by Calgarians and discover the
            technologies and applications that
            may help address them.
          </p>

        </section>

        {/* SUMMARY CARDS */}

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
              Applications Mapped
            </p>

            <p className="text-5xl font-bold text-red-700">
              {
                explorerData?.links
                  ?.length || 0
              }
            </p>

          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

            <p className="text-gray-500 mb-2">
              Technologies Tracked
            </p>

            <p className="text-5xl font-bold text-red-700">
              {
                explorerData?.technologies
                  ?.length || 0
              }
            </p>

          </div>

        </div>

        {/* CHALLENGE CARDS */}

        <h2 className="text-3xl font-bold text-red-700 mb-6">
          Community Priorities
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-12">

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
                  p-6
                  rounded-2xl
                  border
                  text-left
                  transition

                  ${
                    selectedChallenge ===
                    challenge.challenge

                      ? "bg-red-700 text-white shadow-lg"

                      : "bg-white hover:shadow-md"
                  }
                `}
              >

                <div className="flex items-center gap-3 mb-3">

                  <div
                    className={`
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-bold

                      ${
                        selectedChallenge ===
                        challenge.challenge

                          ? "bg-white text-red-700"

                          : "bg-red-700 text-white"
                      }
                    `}
                  >
                    {index + 1}
                  </div>

                  <span className="text-2xl">
                    {
                      getChallengeIcon(
                        challenge.challenge
                      )
                    }
                  </span>

                </div>

                <h3 className="font-bold text-lg mb-3">

                  {
                    challenge.challenge
                  }

                </h3>

                <p className="text-sm">

                  Average Rank:
                  {" "}
                  {
                    challenge.average_rank
                  }

                </p>

                <p className="text-sm">

                  Votes:
                  {" "}
                  {
                    challenge.votes
                  }

                </p>

              </button>

            )
          )}

        </div>

        {/* EXPLORER */}

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

          <div className="mb-8">

            <p className="text-gray-500 text-sm mb-2">

              Challenge

              <span className="mx-2">
                →
              </span>

              Application

              <span className="mx-2">
                →
              </span>

              Technology

            </p>

            <h2 className="text-4xl font-bold text-red-700">

              {selectedChallenge}

            </h2>

          </div>

          {getApplicationsForChallenge()
            .length === 0 ? (

            <div className="text-center py-12">

              <p className="text-xl text-gray-500">
                No applications have been
                linked to this challenge yet.
              </p>

            </div>

          ) : (

            <div className="space-y-8">

              {getApplicationsForChallenge()
                .map((link: any) => {

                  const application =
                    explorerData
                      .applications
                      .find(
                        (a: any) =>
                          a.id ===
                          link.application_id
                      );

                  if (
                    !application
                  ) return null;

                  const technology =
                    explorerData
                      .technologies
                      .find(
                        (t: any) =>
                          t.id ===
                          application.technology_id
                      );

                  return (

                    <div
                      key={link.id}
                      className="
                        border
                        border-gray-200
                        rounded-3xl
                        p-6
                        bg-gray-50
                      "
                    >

                      <div className="flex items-center justify-between mb-4">

                        <h3 className="text-2xl font-bold">

                          {
                            application.name
                          }

                        </h3>

                        <span className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium">

                          Strength:
                          {" "}
                          {
                            link.strength
                          }

                        </span>

                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6">

                        {
                          application.description
                        }

                      </p>

                      {technology && (

                        <div className="border-t pt-6">

                          <p className="text-sm text-gray-500 mb-4">

                            Enabled by Technology

                          </p>

                          <div className="flex items-center gap-4">

                            {technology.hero_image && (

                              <img
                                src={
                                  technology.hero_image
                                }
                                alt={
                                  technology.name
                                }
                                className="
                                  w-20
                                  h-20
                                  rounded-2xl
                                  object-cover
                                "
                              />

                            )}

                            <div>

                              <h4 className="text-xl font-bold">

                                {
                                  technology.name
                                }

                              </h4>

                              <p className="text-gray-500">

                                Emerging Smart City Technology

                              </p>

                            </div>

                          </div>

                        </div>

                      )}

                    </div>

                  );

                })}

            </div>

          )}

        </div>

      </div>

    </main>

  );
}
