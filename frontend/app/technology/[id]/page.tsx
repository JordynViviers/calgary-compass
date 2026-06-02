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

      <main className="p-10">

        <h1 className="text-3xl">
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

  return (

    <main className="min-h-screen p-10">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          {technology.name}
        </h1>

        <p className="text-xl text-gray-400 mb-4">
          {technology.description}
        </p>

        <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">

          {technology.current_status}

        </span>

      </div>

      {/* COMMUNITY INPUT BUTTON */}

      <div className="mb-10">

        <Link
          href="/community-input"
        >

          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold">

            Provide Community Feedback

          </button>

        </Link>

      </div>

      {/* AI EVALUATION */}

      <div className="border rounded-2xl p-8 shadow mb-10">

        <h2 className="text-3xl font-semibold mb-6">

          AI Governance Assessment

        </h2>

        {aiEvaluation ? (

          <>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-3">

                AI Summary

              </h3>

              <p className="text-gray-400">

                {aiEvaluation.summary}

              </p>

            </div>

          </>

        ) : (

          <p className="text-gray-500">

            AI evaluation not available yet.

          </p>

        )}

      </div>

      {/* AI VS HUMAN */}

      <div className="border rounded-2xl p-8 shadow mb-10">

        <h2 className="text-3xl font-semibold mb-6">

          AI vs Community Comparison

        </h2>

        {comparison ? (

          <div style={{ width: "100%", height: 500 }}>

            <ResponsiveContainer>

              <BarChart
                data={chartData}
                layout="vertical"
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  type="number"
                  domain={[0, 10]}
                />

                <YAxis
                  dataKey="category"
                  type="category"
                />

                <Tooltip />

                <Legend />

                <Bar dataKey="Human" />

                <Bar dataKey="AI" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        ) : (

          <p className="text-gray-500">

            Waiting for community votes.

          </p>

        )}

      </div>

      {/* WEIGHTED SCORES */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {scores ? (

          Object.entries(scores).map(
            ([key, value]: any) => (

              <div
                key={key}
                className="border rounded-2xl p-6 shadow"
              >

                <h3 className="text-xl font-semibold capitalize">

                  {key.replaceAll("_", " ")}

                </h3>

                <p className="text-4xl font-bold">

                  {value}/10

                </p>

              </div>

            )
          )

        ) : (

          <p className="text-gray-500">

            Weighted scores not available yet.

          </p>

        )}

      </div>

    </main>
  );
}
