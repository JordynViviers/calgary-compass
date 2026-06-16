"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://calgary-compass-api.onrender.com";

const CRITERIA = [
  { key: "financial_sustainability", label: "Financial Sustainability" },
  { key: "operational_excellence", label: "Operational Excellence" },
  { key: "innovation_agility", label: "Innovation and Agility" },
  { key: "trusted_governance", label: "Trusted and Transparent Governance" },
  { key: "people_culture", label: "People and Culture First" },
];


export default function AdminCommunityInputPage() {
  const [technologies, setTechnologies] = useState([]);
  const [votes, setVotes] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const loadResults = async () => {
    setLoading(true);
    setError("");
    try {
      const [techRes, votesRes, signalsRes] = await Promise.all([
        fetch(`${API_URL}/technologies`),
        fetch(`${API_URL}/votes`),
        fetch(`${API_URL}/community-signals`),
      ]);

      if (!techRes.ok || !votesRes.ok || !signalsRes.ok) {
        throw new Error("Request failed");
      }

      setTechnologies(await techRes.json());
      setVotes(await votesRes.json());
      setSignals(await signalsRes.json());
    } catch (err) {
      console.error(err);
      setError("Something went wrong loading results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSignalVisibility = async (signalId, currentIsPublic) => {
    setTogglingId(signalId);
    try {
      const res = await fetch(`${API_URL}/community-signal/${signalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_public: !currentIsPublic }),
      });
      if (!res.ok) throw new Error("Toggle failed");
      loadResults();
    } catch (err) {
      console.error(err);
      setError("Could not update signal visibility. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const techResults = technologies
    .map((t) => {
      const tVotes = votes.filter((v) => v.technology_id === t.id);
      const averages = {};
      CRITERIA.forEach((c) => {
        if (tVotes.length === 0) {
          averages[c.key] = null;
        } else {
          const sum = tVotes.reduce(
            (acc, v) => acc + (Number(v[c.key]) || 0),
            0,
          );
          averages[c.key] = sum / tVotes.length;
        }
      });
      return { id: t.id, name: t.name, count: tVotes.length, averages };
    })
    .sort((a, b) => b.count - a.count);

  const clearAllResponses = async () => {
  
    const confirmed = confirm(
      "Delete ALL community responses?"
    );
  
    if (!confirmed) return;
  
    try {
  
      await axios.delete(
        `${API_URL}/community-input`
      );
  
      loadResults();
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Failed to clear responses."
      );
  
    }
  
  };
  
  
  const deleteResponse = async (
    responseId
  ) => {
  
    const confirmed = confirm(
      "Delete this response?"
    );
  
    if (!confirmed) return;
  
    try {
  
      await axios.delete(
        `${API_URL}/community-input/${responseId}`
      );
  
      loadResults();
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Failed to delete response."
      );
  
    }
  
  };
  
  
  


  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-5xl mx-auto px-8 py-12">

        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-4xl font-bold text-red-700">
              Community Input
            </h1>
            <p className="text-gray-600 mt-1">
              {votes.length} ratings · {signals.length} written responses
            </p>
          </div>
          <button
            onClick={clearAllResponses}
            className="
              bg-red-700
              hover:bg-red-800
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            Clear All Responses
          </button>
              
          <button
            onClick={loadResults}
            disabled={loading}
            className="border-2 border-red-700 text-red-700 px-4 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {error && (
          <p className="text-red-700 font-medium mb-6">{error}</p>
        )}

        {loading && technologies.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
            Loading results…
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-5">Technology Ratings</h2>

            {techResults.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm mb-12">
                No technologies yet.
              </div>
            ) : (
              <div className="space-y-6 mb-14">
                {techResults.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-5">
                      <h3 className="text-2xl font-bold text-red-700">
                        {t.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {t.count} {t.count === 1 ? "rating" : "ratings"}
                      </span>
                    </div>

                    {t.count === 0 ? (
                      <p className="text-gray-500">No ratings yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {CRITERIA.map((c) => {
                          const avg = t.averages[c.key];
                          const pct = avg ? (avg / 10) * 100 : 0;
                          return (
                            <div key={c.key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">
                                  {c.label}
                                </span>
                                <span className="text-gray-900 font-semibold">
                                  {avg.toFixed(1)} / 10
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-red-700 h-2 rounded-full"
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold mb-5">Concerns &amp; Signals</h2>

            {signals.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
                No written responses yet.
              </div>
            ) : (
              <div className="space-y-4">
                {signals
                  .slice()
                  .sort((a, b) => (b.id || 0) - (a.id || 0))
                  .map((s) => (
                    <div
                      key={s.id}
                      className={`rounded-2xl p-6 shadow-sm border ${
                        s.is_public === false
                          ? "bg-gray-100 border-gray-300"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                        <div className="flex gap-2 items-center">
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            {s.stakeholder || "Unknown sector"}
                          </p>
                          {s.is_public === false && (
                            <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded font-semibold">
                              Hidden
                            </span>
                          )}
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              toggleSignalVisibility(
                                s.id,
                                s.is_public !== false
                              )
                            }
                            disabled={togglingId === s.id}
                            className={`text-sm px-3 py-1 rounded-lg font-medium transition ${
                              s.is_public === false
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-red-600 text-white hover:bg-red-700"
                            } disabled:opacity-60`}
                          >
                            {togglingId === s.id
                              ? "Updating..."
                              : s.is_public === false
                              ? "Show"
                              : "Hide"}
                          </button>
                        
                          <button
                            onClick={() =>
                              deleteResponse(s.id)
                            }
                            className="
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              px-3
                              py-1
                              rounded-lg
                            "
                          >
                            Delete
                          </button>
                        
                        </div>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {s.signal_text}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
