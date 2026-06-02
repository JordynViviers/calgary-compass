"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [aiScores, setAiScores] = useState<any>({});

  useEffect(() => {
    axios
      .get("https://calgary-compass-api.onrender.com/technologies")
      .then((response) => {
        setTechnologies(response.data);

        // AFTER loading technologies → load AI scores
        response.data.forEach((tech: any) => {
          axios
            .get(
              `https://calgary-compass-api.onrender.com/technology/${tech.id}/comparison`
            )
            .then((res) => {
              setAiScores((prev: any) => ({
                ...prev,
                [tech.id]: res.data.ai,
              }));
            })
            .catch((err) => {
              console.error("AI load error:", err);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-black">

      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="relative mb-16 text-center">

          <h1 className="text-6xl font-bold text-red-700 mb-4">
            Smart City Technologies
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Governance evaluations, strategic foresight,
            and AI-assisted analysis of emerging technologies.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {technologies.map((technology) => (
            <Link
              key={technology.id}
              href={`/technology/${technology.id}`}
            >
              <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-red-700 mb-2">
                  {technology.name}
                </h2>

                <p className="text-gray-700 mb-4">
                  {technology.description}
                </p>

                {/* STATUS */}
                <span className="bg-red-700 text-white text-xs px-3 py-1 rounded-full">
                  {technology.current_status}
                </span>

                {/* AI PREVIEW (NEW) */}
                {aiScores[technology.id] && (
                  <div className="mt-4 text-sm text-gray-800 border-t pt-3">

                    <p className="font-semibold text-red-700 mb-1">
                      AI Insight
                    </p>

                    <p>
                      Innovation:{" "}
                      {aiScores[technology.id].innovation_agility}
                    </p>

                    <p>
                      Governance:{" "}
                      {aiScores[technology.id].trusted_governance}
                    </p>

                    <p className="text-gray-600 mt-2 italic">
                      {aiScores[technology.id].summary}
                    </p>

                  </div>
                )}

              </div>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}
