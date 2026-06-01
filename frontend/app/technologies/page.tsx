"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";

export default function TechnologiesPage() {

  const [technologies, setTechnologies] = useState<any[]>([]);

  useEffect(() => {

    axios
      .get("https://calgary-compass-api.onrender.com/technologies")
      .then((response) => {

        setTechnologies(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  return (

    <main className="min-h-screen p-10">

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-5xl font-bold mb-2">
            Smart City Technologies
          </h1>

          <p className="text-gray-400">
            Governance evaluations and AI-assisted analysis
          </p>

        </div>

        <Link href="/">

          <button className="border px-4 py-2 rounded-xl hover:bg-gray-900 transition">

            Home

          </button>

        </Link>

      </div>

      {technologies.length === 0 ? (

        <div className="text-gray-500 text-lg">

          No technologies found.

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {technologies.map((technology) => (

            <Link
              key={technology.id}
              href={`/technology/${technology.id}`}
            >

              <div className="border rounded-2xl p-6 shadow hover:shadow-2xl hover:scale-[1.02] transition cursor-pointer h-full">

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-2xl font-semibold">
                    {technology.name}
                  </h2>

                  <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">

                    {technology.current_status}

                  </span>

                </div>

                <p className="text-gray-400 leading-relaxed">

                  {technology.description}

                </p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </main>
  );
}
