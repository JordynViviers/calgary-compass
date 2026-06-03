"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function TechnologiesPage() {
  const [technologies, setTechnologies] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/technologies`)
      .then((response) => {
        setTechnologies(response.data);
      })
      .catch((error) => {
        console.error(
          "Technology load error:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 text-black">
        <div className="h-2 bg-red-700 w-full"></div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold">
            Loading technologies...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Navigation Bar */}
        <Navbar />

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-red-700 mb-4">
            Smart City Technologies
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Governance evaluations,
            strategic foresight,
            and AI-assisted analysis
            of emerging technologies.
          </p>
        </div>

        {technologies.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-500">
              No technologies found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {technologies.map((technology) => (
              <Link
                key={technology.id}
                href={`/technology/${technology.id}`}
              >
                <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer h-full">

                  <h2 className="text-2xl font-bold text-red-700 mb-3">
                    {technology.name}
                  </h2>

                  <p className="text-gray-700 mb-6">
                    {technology.description}
                  </p>

                  <span className="bg-red-700 text-white text-xs px-3 py-1 rounded-full">
                    {technology.current_status}
                  </span>

                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}
