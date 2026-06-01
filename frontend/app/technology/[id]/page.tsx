"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "next/navigation";

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

export default function TechnologyDetailPage() {

  const params = useParams();

  const id = params.id;

  const [technology, setTechnology] = useState<any>(null);

  const [scores, setScores] = useState<any>(null);

  const [comparison, setComparison] = useState<any>(null);

  const [voteData, setVoteData] = useState({

    stakeholder: "",

    financial_sustainability: 5,

    operational_excellence: 5,

    people_culture: 5,

    trusted_governance: 5,

    innovation_agility: 5
  });

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {

    // TECHNOLOGY INFO

    axios
      .get("https://calgary-compass-ai.onrender.com/technologies")
      .then((response) => {

        const foundTechnology = response.data.find(
          (t: any) => t.id == id
        );

        setTechnology(foundTechnology);

      })
      .catch((error) => {

        console.error(
          "Technology fetch error:",
          error
        );

      });

    // WEIGHTED SCORES

    axios
      .get(
        `https://calgary-compass-ai.onrender.com/technology/${id}/weighted-scores`
      )
      .then((response) => {

        if (!response.data.error) {

          setScores(response.data);

        }

      })
      .catch((error) => {

        console.error(
          "Weighted scores error:",
          error
        );

      });

    // AI VS HUMAN COMPARISON

    axios
      .get(
        `https://calgary-compass-ai.onrender.com/technology/${id}/comparison`
      )
      .then((response) => {

        if (!response.data.error) {

          setComparison(response.data);

        }

      })
      .catch((error) => {

        console.error(
          "Comparison error:",
          error
        );

      });

  }, [id]);

  // =========================
  // SUBMIT VOTE
  // =========================

  const submitVote = async () => {

    try {

      await axios.post(
        "https://calgary-compass-ai.onrender.com/vote",
        {

          technology_id: Number(id),

          ...voteData
        }
      );

      alert("Vote submitted successfully!");

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert("Vote submission failed.");

    }
  };

  // =========================
  // LOADING STATES
  // =========================

  if (!technology) {

    return (

      <main className="p-10">

        <h1 className="text-3xl">

          Loading technology...

        </h1>

      </main>

    );
  }

  if (!scores || !comparison) {

    return (

      <main className="min-h-screen p-10">

        <h1 className="text-5xl font-bold mb-4">

          {technology.name}

        </h1>

        <p className="text-xl text-yellow-500 mb-3">

          Governance analytics are not available yet.

        </p>

        <p className="text-gray-400">

          Make sure this technology has:
          <br />
          • AI evaluation
          <br />
          • stakeholder votes

        </p>

      </main>

    );
  }

  // =========================
  // BAR CHART DATA
  // =========================

  const chartData = [

    {
      category: "Financial",

      Human:
        comparison.human
          .financial_sustainability,

      AI:
        comparison.ai
          .financial_sustainability
    },

    {
      category: "Operations",

      Human:
        comparison.human
          .operational_excellence,

      AI:
        comparison.ai
          .operational_excellence
    },

    {
      category: "People",

      Human:
        comparison.human
          .people_culture,

      AI:
        comparison.ai
          .people_culture
    },

    {
      category: "Governance",

      Human:
        comparison.human
          .trusted_governance,

      AI:
        comparison.ai
          .trusted_governance
    },

    {
      category: "Innovation",

      Human:
        comparison.human
          .innovation_agility,

      AI:
        comparison.ai
          .innovation_agility
    }
  ];

  // =========================
  // PAGE
  // =========================

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

      {/* AI VS HUMAN CHART */}

      <div className="border rounded-2xl p-8 shadow mb-10">

        <h2 className="text-3xl font-semibold mb-6">

          AI vs Human Governance Comparison

        </h2>

        <div style={{ width: "100%", height: 500 }}>

          <ResponsiveContainer>

            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 20,
                right: 40,
                left: 40,
                bottom: 20
              }}
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

              <Bar
                dataKey="Human"
                radius={[0, 8, 8, 0]}
              />

              <Bar
                dataKey="AI"
                radius={[0, 8, 8, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* VOTING PANEL */}

      <div className="border rounded-2xl p-8 shadow mb-10">

        <h2 className="text-3xl font-semibold mb-6">

          Stakeholder Governance Vote

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Stakeholder */}

          <div>

            <label className="block mb-2">

              Stakeholder Name

            </label>

            <input
              type="text"
              className="w-full border rounded-xl p-3 bg-black"
              value={voteData.stakeholder}
              onChange={(e) =>
                setVoteData({
                  ...voteData,
                  stakeholder: e.target.value
                })
              }
            />

          </div>

          {/* Financial */}

          <div>

            <label className="block mb-2">

              Financial Sustainability

            </label>

            <input
              type="number"
              min="1"
              max="10"
              className="w-full border rounded-xl p-3 bg-black"
              value={voteData.financial_sustainability}
              onChange={(e) =>
                setVoteData({
                  ...voteData,
                  financial_sustainability:
                    Number(e.target.value)
                })
              }
            />

          </div>

          {/* Operations */}

          <div>

            <label className="block mb-2">

              Operational Excellence

            </label>

            <input
              type="number"
              min="1"
              max="10"
              className="w-full border rounded-xl p-3 bg-black"
              value={voteData.operational_excellence}
              onChange={(e) =>
                setVoteData({
                  ...voteData,
                  operational_excellence:
                    Number(e.target.value)
                })
              }
            />

          </div>

          {/* People */}

          <div>

            <label className="block mb-2">

              People & Culture

            </label>

            <input
              type="number"
              min="1"
              max="10"
              className="w-full border rounded-xl p-3 bg-black"
              value={voteData.people_culture}
              onChange={(e) =>
                setVoteData({
                  ...voteData,
                  people_culture:
                    Number(e.target.value)
                })
              }
            />

          </div>

          {/* Governance */}

          <div>

            <label className="block mb-2">

              Trusted Governance

            </label>

            <input
              type="number"
              min="1"
              max="10"
              className="w-full border rounded-xl p-3 bg-black"
              value={voteData.trusted_governance}
              onChange={(e) =>
                setVoteData({
                  ...voteData,
                  trusted_governance:
                    Number(e.target.value)
                })
              }
            />

          </div>

          {/* Innovation */}

          <div>

            <label className="block mb-2">

              Innovation & Agility

            </label>

            <input
              type="number"
              min="1"
              max="10"
              className="w-full border rounded-xl p-3 bg-black"
              value={voteData.innovation_agility}
              onChange={(e) =>
                setVoteData({
                  ...voteData,
                  innovation_agility:
                    Number(e.target.value)
                })
              }
            />

          </div>

        </div>

        <button
          onClick={submitVote}
          className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
        >

          Submit Governance Vote

        </button>

      </div>

      {/* WEIGHTED SCORES */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {Object.entries(scores).map(
          ([key, value]: any) => (

            <div
              key={key}
              className="border rounded-2xl p-6 shadow"
            >

              <h3 className="text-xl font-semibold mb-3 capitalize">

                {key.replaceAll("_", " ")}

              </h3>

              <p className="text-4xl font-bold">

                {value}/10

              </p>

            </div>

          )
        )}

      </div>

    </main>
  );
}
