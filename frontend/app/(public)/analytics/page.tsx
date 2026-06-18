"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://calgary-compass-api.onrender.com";

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

        {/* Header */}

        <section className="text-center mb-16">

          <h1 className="text-6xl font-bold text-red-700 mb-4">
            Calgary Community Priorities
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore the challenges identified
            by Calgarians and the technology
            applications that may help address
            them.
          </p>

        </section>

        {/* Challenge Cards */}

        <div className="grid md:grid-cols-3 gap-4 mb-12">

          {challengeSummary.map(
            (challenge) => (

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
                  p-5
                  rounded-2xl
                  border
                  text-left
                  transition

                  ${
                    selectedChallenge ===
                    challenge.challenge

                      ? "bg-red-700 text-white"

                      : "bg-white hover:shadow-md"
                  }
                `}
              >

                <h3 className="font-bold text-lg mb-2">
                  {challenge.challenge}
                </h3>

                <p>
                  Average Rank:
                  {" "}
                  {
                    challenge.average_rank
                  }
                </p>

                <p>
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

        {/* Explorer */}

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

          <h2 className="text-4xl font-bold text-red-700 mb-8">

            {selectedChallenge}

          </h2>

          {getApplicationsForChallenge()
            .length === 0 ? (

            <p className="text-gray-500">
              No applications linked
              yet.
            </p>

          ) : (

            <div className="space-y-6">

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
                        rounded-2xl
                        p-6
                        bg-gray-50
                      "
                    >

                      <div className="flex items-center justify-between mb-3">

                        <h3 className="text-2xl font-bold">

                          {
                            application.name
                          }

                        </h3>

                        <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm">

                          Strength:
                          {" "}
                          {
                            link.strength
                          }

                        </span>

                      </div>

                      <p className="text-gray-700 mb-4">

                        {
                          application.description
                        }

                      </p>

                      {technology && (

                        <div>

                          <p className="text-sm text-gray-500 mb-2">
                            Enabled by Technology
                          </p>

                          <div className="inline-block bg-white border border-gray-300 px-4 py-2 rounded-xl font-semibold">

                            {
                              technology.name
                            }

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
