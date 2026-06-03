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

  const [scores, setScores] =
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
            setScores(scoreRes.data);
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
          Human:
            comparison.human?.financial_sustainability ?? 0,
          AI:
            comparison.ai?.financial_sustainability ?? 0
        },
        {
          category: "Operations",
          Human:
            comparison.human?.operational_excellence ?? 0,
          AI:
            comparison.ai?.operational_excellence ?? 0
        },
        {
          category: "People",
          Human:
            comparison.human?.people_culture ?? 0,
          AI:
            comparison.ai?.people_culture ?? 0
        },
        {
          category: "Governance",
          Human:
            comparison.human?.trusted_governance ?? 0,
          AI:
            comparison.ai?.trusted_governance ?? 0
        },
        {
          category: "Innovation",
          Human:
            comparison.human?.innovation_agility ?? 0,
          AI:
            comparison.ai?.innovation_agility ?? 0
        }
      ]
    : [];

  const aiAverage =
    aiEvaluation
      ? (
          aiEvaluation.financial_sustainability +
          aiEvaluation.operational_excellence +
          aiEvaluation.people_culture +
          aiEvaluation.trusted_governance +
          aiEvaluation.innovation_agility
        ) / 5
      : 0;

  const communityAverage =
    scores
      ? (
          scores.financial_sustainability +
          scores.operational_excellence +
          scores.people_culture +
          scores.trusted_governance +
          scores.innovation_agility
        ) / 5
      : 0;

  const overallAverage =
    (
      aiAverage +
      communityAverage
    ) / 2;

  return (

    <main className="min-h-screen p-10 bg-white text-black">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-red-700 mb-3">
          {technology.name}
        </h1>

        <p className="text-xl text-gray-500 mb-4">
          {technology.description}
        </p>

        <span className="bg-gray-200 text-red-700 px-4 py-2 rounded-full text-sm font-semibold border border-red-200">

          {technology.current_status}

        </span>

      </div>

      {/* AI SUMMARY */}

      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">

        <h2 className="text-3xl font-semibold text-red-700 mb-6">

          AI Summary

        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">

          {technology.name} is an emerging technology
          with potential applications in civic technology,
          smart infrastructure, and municipal governance.
          Cities and public organizations may use this
          technology to improve operational efficiency,
          enhance public services, support planning
          decisions, and strengthen community engagement.

          <br /><br />

          Example use cases may include transportation
          planning, environmental monitoring, infrastructure
          management, public safety systems, digital public
          services, or urban analytics initiatives.

          <br /><br />

          These examples are illustrative only and do not
          represent the full range of possible applications
          for this technology.

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

                  The AI assessment reflects the
                  technology’s perceived potential
                  benefits, implementation feasibility,
                  governance considerations, and long-term
                  innovation value in civic and municipal
                  settings. Higher scores indicate stronger
                  anticipated alignment with sustainable,
                  efficient, and community-oriented smart
                  city objectives.

                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">

                  {aiAverage.toFixed(1)}/10

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

          {scores ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div>
                  Financial Sustainability:
                  {" "}
                  {scores.financial_sustainability}/10
                </div>

                <div>
                  Operational Excellence:
                  {" "}
                  {scores.operational_excellence}/10
                </div>

                <div>
                  People & Culture:
                  {" "}
                  {scores.people_culture}/10
                </div>

                <div>
                  Trusted Governance:
                  {" "}
                  {scores.trusted_governance}/10
                </div>

                <div>
                  Innovation & Agility:
                  {" "}
                  {scores.innovation_agility}/10
                </div>

              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">

                  Community Participation

                </h3>

                <p className="text-gray-600">

                  Community votes represent the
                  aggregated perspectives of platform
                  participants evaluating this
                  technology’s potential impacts and
                  governance considerations.

                </p>

                <p className="mt-4 text-gray-700 font-medium">

                  Total Community Participants:
                  {" "}
                  {comparison?.vote_count ?? 0}

                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">

                  {communityAverage.toFixed(1)}/10

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

        {/* OVERALL ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-2xl font-bold text-red-700 mb-6">

            Overall Assessment

          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">

            The overall assessment combines both
            AI-generated governance analysis and
            community evaluation data to provide a
            balanced perspective on the technology’s
            potential role within civic and smart city
            environments.

          </p>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">

              <span className="font-medium">
                AI Average
              </span>

              <span>
                {aiAverage.toFixed(1)}/10
              </span>

            </div>

            <div className="flex justify-between border-b pb-2">

              <span className="font-medium">
                Community Average
              </span>

              <span>
                {communityAverage.toFixed(1)}/10
              </span>

            </div>

            <div className="flex justify-between pt-2">

              <span className="text-xl font-bold text-red-700">
                Combined Score
              </span>

              <span className="text-2xl font-bold">
                {overallAverage.toFixed(1)}/10
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
