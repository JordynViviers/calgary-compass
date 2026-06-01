"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/technologies")
      .then((response) => {
        setTechnologies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-black">

      {/* Calgary Red Banner */}
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="relative mb-16">

          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-700 mb-4">
              Smart City Technologies
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Governance evaluations, strategic foresight,
              and AI-assisted analysis of emerging technologies.
            </p>
          </div>

          <div className="absolute top-0 right-0">
            <Link href="/">
              <button className="border-2 border-red-700 text-red-700 px-5 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition-all duration-200">
                Home
              </button>
            </Link>
          </div>

        </div>

        {/* Results Count */}

        {technologies.length > 0 && (
          <div className="mb-8 text-gray-600 text-sm uppercase tracking-wide">
            {technologies.length} Technologies Available
          </div>
        )}

        {/* Empty State */}

        {technologies.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-3">
              No Technologies Found
            </h2>

            <p className="text-gray-600">
              Technologies will appear here once they have been added to the platform.
            </p>
          </div>
        ) : (

          /* Technology Grid */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {technologies.map((technology) => (
              <Link
                key={technology.id}
                href={`/technology/${technology.id}`}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">

                  <div className="flex items-start justify-between mb-5">

                    <h2 className="text-2xl font-bold text-red-700 pr-4">
                      {technology.name}
                    </h2>

                    <span className="bg-red-700 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap">
                      {technology.current_status}
                    </span>

                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {technology.description}
                  </p>

                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}
