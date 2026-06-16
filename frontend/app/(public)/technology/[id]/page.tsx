"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function TechnologyDetailPage() {

  const params = useParams();
  const id = params.id;

  const [technology, setTechnology] =
    useState<any>(null);

  const [weightedScores, setWeightedScores] =
    useState<any>(null);

  const [comparison, setComparison] =
    useState<any>(null);

  const [aiEvaluation, setAiEvaluation] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchAll = async () => {

      setLoading(true);

      try {

        const techRes = await axios.get(
          `${API_URL}/technologies`
        );

        const found = techRes.data.find(
          (t: any) => t.id == id
        );

        setTechnology(found);

        try {

          const aiRes = await axios.get(
            `${API_URL}/technology/${id}/ai-evaluation`
          );

          if (!aiRes.data.error) {
            setAiEvaluation(aiRes.data);
          }

        } catch (err) {

          console.error(
            "AI evaluation failed:",
            err
          );

        }

        try {

          const scoreRes = await axios.get(
            `${API_URL}/technology/${id}/weighted-scores`
          );

          if (!scoreRes.data.error) {
            setWeightedScores(scoreRes.data);
          }

        } catch (err) {

          console.error(
            "Weighted scores failed:",
            err
          );

        }

        try {

          const compRes = await axios.get(
            `${API_URL}/technology/${id}/comparison`
          );

          if (!compRes.data.error) {
            setComparison(compRes.data);
          }

        } catch (err) {

          console.error(
            "Comparison failed:",
            err
          );

        }

      } catch (err) {

        console.error(
          "Technology fetch error:",
          err
        );

      }

      setLoading(false);

    };

    fetchAll();

  }, [id]);

  if (loading || !technology) {

    return (

      <main className="min-h-screen p-10 bg-white text-black">

        <h1 className="text-3xl text-red-700">
          Loading technology...
        </h1>

      </main>

    );
  }

  const chartData = comparison
    ? [
        {
          category: "Financial",
          Human: Math.round(
            comparison.human?.financial_sustainability ?? 0
          ),
          AI: Math.round(
            comparison.ai?.financial_sustainability ?? 0
          )
        },
        {
          category: "Operations",
          Human: Math.round(
            comparison.human?.operational_excellence ?? 0
          ),
          AI: Math.round(
            comparison.ai?.operational_excellence ?? 0
          )
        },
        {
          category: "People",
          Human: Math.round(
            comparison.human?.people_culture ?? 0
          ),
          AI: Math.round(
            comparison.ai?.people_culture ?? 0
          )
        },
        {
          category: "Governance",
          Human: Math.round(
            comparison.human?.trusted_governance ?? 0
          ),
          AI: Math.round(
            comparison.ai?.trusted_governance ?? 0
          )
        },
        {
          category: "Innovation",
          Human: Math.round(
            comparison.human?.innovation_agility ?? 0
          ),
          AI: Math.round(
            comparison.ai?.innovation_agility ?? 0
          )
        }
      ]
    : [];

  const aiAverage =
  aiEvaluation
    ? Math.round((
        aiEvaluation.financial_sustainability +
        aiEvaluation.operational_excellence +
        aiEvaluation.people_culture +
        aiEvaluation.trusted_governance +
        aiEvaluation.innovation_agility
      ) / 5 )
    : 0;

const communityAverage =
  comparison
    ? Math.round(
        (
          comparison.human.financial_sustainability +
          comparison.human.operational_excellence +
          comparison.human.people_culture +
          comparison.human.trusted_governance +
          comparison.human.innovation_agility
        ) / 5
      )
    : 0;

const weightedAverage =
  weightedScores
    ? Math.round(
        (
          weightedScores.financial_sustainability +
          weightedScores.operational_excellence +
          weightedScores.people_culture +
          weightedScores.trusted_governance +
          weightedScores.innovation_agility
        ) / 5
      )
    : 0;


  return (

    <main className="min-h-screen p-10 bg-white text-black">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-red-700 mb-3">
          {technology.name}
        </h1>


      </div>

      {/* DESCRIPTION */}

      <div className="border border-gray-500 rounded-2xl p-8 shadow-sm mb-10 bg-white">

        <h2 className="text-3xl font-semibold text-red-700 mb-6">
          Description
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          {technology.description}
        </p>

      </div>

      {/* COMMUNITY INPUT BUTTON */}

      <div className="mb-10">

        <Link
          href="/community-input"
        >

          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold transition">

            Provide Community Feedback

          </button>

        </Link>

      </div>

      {/* AI VS COMMUNITY */}

      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">

        <h2 className="text-3xl font-semibold text-red-700 mb-6">

          AI vs Community Comparison

        </h2>

        {comparison ? (

          <div style={{ width: "100%", height: 500 }}>

            <ResponsiveContainer width="98%" height="100%">

              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 60,
                  bottom: 20
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  type="number"
                  domain={[0, 10]}
                  tickCount={11}
                />

                <YAxis
                  dataKey="category"
                  type="category"
                  width={130}
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="Human"
                  fill="#dc2626"
                  radius={[0, 6, 6, 0]}
                />

                <Bar
                  dataKey="AI"
                  fill="#6b7280"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        ) : (

          <p className="text-gray-500">

            Waiting for community votes.

          </p>

        )}

      </div>

      {/* ASSESSMENTS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-2xl font-bold text-red-700 mb-6">

            AI Assessment

          </h2>

          {aiEvaluation ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div>
                  Financial Sustainability:
                  {" "}
                  {aiEvaluation.financial_sustainability}/10
                </div>

                <div>
                  Operational Excellence:
                  {" "}
                  {aiEvaluation.operational_excellence}/10
                </div>

                <div>
                  People & Culture:
                  {" "}
                  {aiEvaluation.people_culture}/10
                </div>

                <div>
                  Trusted Governance:
                  {" "}
                  {aiEvaluation.trusted_governance}/10
                </div>

                <div>
                  Innovation & Agility:
                  {" "}
                  {aiEvaluation.innovation_agility}/10
                </div>

              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">

                  Assessment Explanation

                </h3>

                <p className="text-gray-600 leading-relaxed">

                  The AI assessment for {technology.name}
                  reflects its expected value for municipal
                  operations, public impact, governance,
                  and long-term innovation potential.

                  <br /><br />

                  Higher scores indicate stronger projected
                  benefits in areas such as efficiency,
                  scalability, service delivery, and smart
                  city integration, while lower scores
                  reflect potential challenges related to
                  cost, implementation complexity,
                  governance, or public trust.

                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">

                  {aiAverage}/10

                </p>

                <p className="text-gray-500 mt-1">

                  Average AI Score

                </p>

              </div>

            </>

          ) : (

            <p className="text-gray-500">

              AI assessment not available yet.

            </p>

          )}

        </div>

        {/* COMMUNITY ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-2xl font-bold text-red-700 mb-6">

            Community Assessment

          </h2>

          {comparison ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div>
                  Financial Sustainability:{" "}
                  {comparison.human.financial_sustainability}/10
                </div>

                <div>
                  Operational Excellence:{" "}
                  {comparison.human.operational_excellence}/10
                </div>

                <div>
                  People & Culture:{" "}
                  {comparison.human.people_culture}/10
                </div>

                <div>
                  Trusted Governance:{" "}
                  {comparison.human.trusted_governance}/10
                </div>

                <div>
                  Innovation & Agility:{" "}
                  {comparison.human.innovation_agility}/10
                </div>

              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Community Participation
                </h3>

                <p className="text-gray-600">
                  Community votes represent the aggregated
                  perspectives of platform participants.
                </p>

                <p className="mt-4 text-gray-700 font-medium">
                  Total Community Participants:{" "}
                  {comparison?.vote_count ?? 0}
                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">
                  {communityAverage}/10
                </p>

                <p className="text-gray-500 mt-1">
                  Average Community Score
                </p>

              </div>

            </>

          ) : (

            <p className="text-gray-500">
              Community assessment not available yet.
            </p>

          )}

        </div>

        {/* WEIGHTED ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-2xl font-bold text-red-700 mb-6">

            Weighted Assessment

          </h2>

          {weightedScores ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div>
                  Financial Sustainability:{" "}
                  {weightedScores.financial_sustainability}/10
                </div>

                <div>
                  Operational Excellence:{" "}
                  {weightedScores.operational_excellence}/10
                </div>

                <div>
                  People & Culture:{" "}
                  {weightedScores.people_culture}/10
                </div>

                <div>
                  Trusted Governance:{" "}
                  {weightedScores.trusted_governance}/10
                </div>

                <div>
                  Innovation & Agility:{" "}
                  {weightedScores.innovation_agility}/10
                </div>

              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Combined Assessment
                </h3>

                <p className="text-gray-600">
                  These scores combine AI evaluation and
                  community voting using the platform's
                  weighting methodology.
                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">
                  {weightedAverage}/10
                </p>

                <p className="text-gray-500 mt-1">
                  Weighted Score
                </p>

              </div>

            </>

          ) : (

            <p className="text-gray-500">
              Weighted assessment not available yet.
            </p>

          )}

        </div>

      </div>

    </main>
  );
}
