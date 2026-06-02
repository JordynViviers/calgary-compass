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

  const [loading, setLoading] = useState(true);

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
    if (!id) return;

    const fetchAll = async () => {
      setLoading(true);

      try {
        // 1. TECHNOLOGY
        const techRes = await axios.get(
          "https://calgary-compass-api.onrender.com/technologies"
        );

        const found = techRes.data.find((t: any) => t.id == id);
        setTechnology(found);

        // 2. WEIGHTED SCORES (SAFE)
        try {
          const scoreRes = await axios.get(
            `https://calgary-compass-api.onrender.com/technology/${id}/weighted-scores`
          );

          if (!scoreRes.data.error) {
            setScores(scoreRes.data);
          }
        } catch (err) {
          console.error("Weighted scores failed:", err);
        }

        // 3. AI vs HUMAN COMPARISON (SAFE)
        try {
          const compRes = await axios.get(
            `https://calgary-compass-api.onrender.com/technology/${id}/comparison`
          );

          if (!compRes.data.error) {
            setComparison(compRes.data);
          }
        } catch (err) {
          console.error("Comparison failed:", err);
        }

      } catch (err) {
        console.error("Technology fetch error:", err);
      }

      setLoading(false);
    };

    fetchAll();
  }, [id]);

  // =========================
  // SUBMIT VOTE
  // =========================
  const submitVote = async () => {
    try {
      await axios.post(
        "https://calgary-compass-api.onrender.com/vote",
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
  // LOADING STATE
  // =========================
  if (loading || !technology) {
    return (
      <main className="p-10">
        <h1 className="text-3xl">Loading technology...</h1>
      </main>
    );
  }

  // =========================
  // CHART DATA (SAFE)
  // =========================
  const chartData = comparison
    ? [
        {
          category: "Financial",
          Human: comparison.human?.financial_sustainability ?? 0,
          AI: comparison.ai?.financial_sustainability ?? 0
        },
        {
          category: "Operations",
          Human: comparison.human?.operational_excellence ?? 0,
          AI: comparison.ai?.operational_excellence ?? 0
        },
        {
          category: "People",
          Human: comparison.human?.people_culture ?? 0,
          AI: comparison.ai?.people_culture ?? 0
        },
        {
          category: "Governance",
          Human: comparison.human?.trusted_governance ?? 0,
          AI: comparison.ai?.trusted_governance ?? 0
        },
        {
          category: "Innovation",
          Human: comparison.human?.innovation_agility ?? 0,
          AI: comparison.ai?.innovation_agility ?? 0
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

      {/* AI VS HUMAN */}
      <div className="border rounded-2xl p-8 shadow mb-10">
        <h2 className="text-3xl font-semibold mb-6">
          AI vs Human Governance Comparison
        </h2>

        {comparison ? (
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis dataKey="category" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Human" />
                <Bar dataKey="AI" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500">
            AI comparison not available yet.
          </p>
        )}
      </div>

      {/* VOTING */}
      <div className="border rounded-2xl p-8 shadow mb-10">
        <h2 className="text-3xl font-semibold mb-6">
          Stakeholder Governance Vote
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            className="border p-3 rounded"
            placeholder="Stakeholder name"
            value={voteData.stakeholder}
            onChange={(e) =>
              setVoteData({ ...voteData, stakeholder: e.target.value })
            }
          />

          {Object.keys(voteData)
            .filter(k => k !== "stakeholder")
            .map((key) => (
              <input
                key={key}
                type="number"
                min="1"
                max="10"
                className="border p-3 rounded"
                value={(voteData as any)[key]}
                onChange={(e) =>
                  setVoteData({
                    ...voteData,
                    [key]: Number(e.target.value)
                  })
                }
              />
            ))}
        </div>

        <button
          onClick={submitVote}
          className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          Submit Vote
        </button>
      </div>

      {/* WEIGHTED SCORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scores ? (
          Object.entries(scores).map(([key, value]: any) => (
            <div key={key} className="border rounded-2xl p-6 shadow">
              <h3 className="text-xl font-semibold capitalize">
                {key.replaceAll("_", " ")}
              </h3>
              <p className="text-4xl font-bold">{value}/10</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            Weighted scores not available yet.
          </p>
        )}
      </div>

    </main>
  );
}
