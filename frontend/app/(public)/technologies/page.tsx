"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Search } from "lucide-react";

const API_URL = "https://calgary-compass-api.onrender.com";

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/technologies`)
      .then((response) => {
        setTechnologies(response.data);
      })
      .catch((error) => {
        console.error("Technology load error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTechnologies = technologies.filter(
    (technology) =>
      technology.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      technology.description
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

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

        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-red-700 mb-4">
            Smart City Technologies
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore technologies being evaluated through Calgary Compass and
            discover how they may connect to community priorities,
            applications, and civic innovation.
          </p>

          <p className="text-gray-500 mt-4">
            Tracking {technologies.length} technologies
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search technologies..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-2xl
                border
                border-gray-300
                bg-white
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-red-700
              "
            />
          </div>
        </div>

        {/* RESULTS */}
        {filteredTechnologies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No technologies found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnologies.map((technology) => (
              <Link
                key={technology.id}
                href={`/technology/${technology.id}`}
              >
                <div
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-3xl
                    p-6
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    h-full
                    cursor-pointer
                  "
                >
                  <h2 className="text-2xl font-bold text-red-700 mb-3">
                    {technology.name}
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {technology.description}
                  </p>

                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Calgary Compass Assessment
                    </span>

                    <span className="text-red-700 font-semibold">
                      View Assessment →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
