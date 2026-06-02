"use client";

import { useState } from "react";
import Link from "next/link";

export default function CommunityInputPage() {
  const [sector, setSector] = useState("");
  const [technology, setTechnology] = useState("");
  const [reason, setReason] = useState("");
  const [signals, setSignals] = useState("");
  const [futureVision, setFutureVision] = useState("");

  function handleSubmit() {
    console.log({
      sector,
      technology,
      reason,
      signals,
      futureVision,
    });

    alert("Community input submitted!");
  }

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <nav className="flex justify-between items-center mb-16">
          <Link href="/" className="text-2xl font-bold text-red-700">
            Calgary Compass
          </Link>

          <div className="flex gap-8 text-lg font-medium">
            <Link href="/technologies" className="hover:text-red-700 transition">
              Explore Technologies
            </Link>

            <Link href="/events" className="hover:text-red-700 transition">
              In-Person Events
            </Link>

            <Link href="/community-input" className="text-red-700 font-semibold">
              Community Input
            </Link>
          </div>
        </nav>

        <section className="text-center mb-16">
          <h1 className="text-6xl font-bold text-red-700 mb-4">
            Community Input
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Help shape Calgary&apos;s smart city future by sharing your
            perspectives, priorities, and observations.
          </p>
        </section>

        <section className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-red-700 mb-3">
              1. Which sector do you represent?
            </h2>

            <p className="text-gray-700 mb-5">
              Select the sector that best describes your perspective.
            </p>

            <select
              value={sector}
              onChange={(event) => setSector(event.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3"
            >
              <option value="">Select a sector</option>
              <option value="Citizen">Citizen</option>
              <option value="Municipal Government">Municipal Government</option>
              <option value="Industry">Industry</option>
              <option value="Academia">Academia</option>
              <option value="Non-Profit Organization">
                Non-Profit Organization
              </option>
              <option value="Community Association">
                Community Association
              </option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-red-700 mb-3">
              2. Which technology should Calgary prioritize?
            </h2>

            <p className="text-gray-700 mb-5">
              Vote for the technology you feel is most likely to be needed.
            </p>

            <select
              value={technology}
              onChange={(event) => setTechnology(event.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3"
              disabled={!sector}
            >
              <option value="">Select a technology</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Digital Twins">Digital Twins</option>
              <option value="Smart Mobility">Smart Mobility</option>
              <option value="IoT Sensors">IoT Sensors</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Autonomous Vehicles">Autonomous Vehicles</option>
            </select>

            {!sector && (
              <p className="text-sm text-gray-500 mt-2">
                Please select your sector before voting.
              </p>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-red-700 mb-3">
              3. Why is this technology needed?
            </h2>

            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              disabled={!sector || !technology}
              placeholder="Describe the opportunity, challenge, or community need this technology could address."
              className="w-full border border-gray-300 rounded-xl p-4 min-h-36"
            />
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-red-700 mb-3">
              4. Community signals and concerns
            </h2>

            <p className="text-gray-700 mb-4">
              Share any emerging issues, concerns, trends, or signals you are
              noticing in your community.
            </p>

            <textarea
              value={signals}
              onChange={(event) => setSignals(event.target.value)}
              disabled={!sector}
              placeholder="Examples: housing affordability, traffic congestion, climate resilience, public safety, digital inclusion..."
              className="w-full border border-gray-300 rounded-xl p-4 min-h-36"
            />
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-red-700 mb-3">
              5. What should Calgary look like in 10 years?
            </h2>

            <textarea
              value={futureVision}
              onChange={(event) => setFutureVision(event.target.value)}
              disabled={!sector}
              placeholder="Describe one outcome you would like smart city technologies to help Calgary achieve."
              className="w-full border border-gray-300 rounded-xl p-4 min-h-36"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!sector || !technology || !reason}
            className="w-full bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Community Input
          </button>
        </section>
      </div>
    </main>
  );
}
