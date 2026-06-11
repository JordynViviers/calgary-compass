"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://calgary-compass-api.onrender.com";

const criteria = [
  "Financial Sustainability",
  "Operational Excellence",
  "Innovation and Agility",
  "Trusted and Transparent Governance",
  "People and Culture First",
];

const challengeOptions = [
  "Housing Affordability",
  "Transportation & Traffic",
  "Climate Resilience",
  "Public Safety",
  "Infrastructure Maintenance",
  "Economic Diversification",
  "Downtown Revitalization",
  "Accessibility & Inclusion",
  "Digital Services",
  "Water Management",
];

export default function CommunityInputPage() {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [sector, setSector] = useState("");
  const [signals, setSignals] = useState("");
  const [challengeRanking, setChallengeRanking] =
    useState({
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
    });
  const [otherChallenge, setOtherChallenge] = useState("");
  const [applications, setApplications] = useState<any[]>([]);

  const [ratings, setRatings] = useState<Record<string, Record<string, string>>>(
    {}
  );

  useEffect(() => {
  
    axios
      .get(`${API_URL}/technologies`)
      .then((response) => {
        setTechnologies(response.data);
      })
      .catch((error) => {
        console.error(
          "Failed to load technologies",
          error
        );
      });
  
    axios
      .get(`${API_URL}/technology-applications`)
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error(
          "Failed to load applications",
          error
        );
      });
  
  }, []);

  function updateRating(
    technology: string,
    criterion: string,
    value: string
  ) {
    setRatings((previousRatings) => ({
      ...previousRatings,
      [technology]: {
        ...previousRatings[technology],
        [criterion]: value,
      },
    }));
  }


  async function handleSubmit() {
    try {

      // Save ranked Calgary challenges

      const rankings = [
        challengeRanking.first,
        challengeRanking.second,
        challengeRanking.third,
        challengeRanking.fourth,
        challengeRanking.fifth,
      ];

      for (let i = 0; i < rankings.length; i++) {

        if (!rankings[i]) continue;

        await axios.post(
          `${API_URL}/challenge-vote`,
          {
            stakeholder: sector,
            challenge: rankings[i],
            rank: i + 1,
          }
        );
      }

      // Save custom challenge

      if (otherChallenge.trim()) {

        await axios.post(
          `${API_URL}/challenge-vote`,
          {
            stakeholder: sector,
            challenge: otherChallenge,
            rank: 99,
          }
        );
      }

      // Save technology ratings
  
      for (const technology of technologies) {
  
        const techRatings =
          ratings[technology.name];
  
        if (!techRatings) {
          continue;
        }
  
        await axios.post(
          `${API_URL}/vote`,
          {
            technology_id: technology.id,
            stakeholder: sector,
  
            financial_sustainability: Number(
              techRatings[
                "Financial Sustainability"
              ] || 0
            ),
  
            operational_excellence: Number(
              techRatings[
                "Operational Excellence"
              ] || 0
            ),
  
            innovation_agility: Number(
              techRatings[
                "Innovation and Agility"
              ] || 0
            ),
  
            trusted_governance: Number(
              techRatings[
                "Trusted and Transparent Governance"
              ] || 0
            ),
  
            people_culture: Number(
              techRatings[
                "People and Culture First"
              ] || 0
            ),
          }
        );
      }
  
      // Save community signals
  
      if (signals.trim()) {
  
        await axios.post(
          `${API_URL}/community-signal`,
          {
            stakeholder: sector,
            signal_text: signals,
          }
        );
      }
  
      alert(
        "Community input submitted successfully!"
      );
  
      // Reset form
  
      setRatings({});
      setSignals("");
      setSector("");
  
      setChallengeRanking({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
      });
  
      setOtherChallenge("");
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Failed to submit community input."
      );
    }
  }
  
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-6xl font-bold text-red-700 mb-4">
            Community Input
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Rate how emerging technologies align with Calgary&apos;s smart city
            governance priorities.
          </p>

          <div className="mt-6 inline-block bg-red-50 border border-red-200 text-red-700 px-6 py-3 rounded-xl font-medium">
            1 is the lowest ranking and 10 is the highest ranking.
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-red-700 mb-3">
            Section 1: Technology Ratings
          </h2>

          <p className="text-gray-700 mb-8">
            First, tell us which sector you represent. Then rate each technology
            from 1 to 10 across the five governance criteria.
          </p>

          <div className="mb-10">
            <label className="block text-xl font-semibold mb-3">
              Which sector do you represent?
            </label>

            <select
              value={sector}
              onChange={(event) => setSector(event.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 bg-white"
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

          <div className="space-y-8">
            {technologies.map((technology: any) => (
              <div
                key={technology.id}
                className="border border-gray-200 rounded-2xl p-6 bg-gray-50"
              >
                <h3 className="text-2xl font-bold text-red-700 mb-6">
                  {technology.name}
                  {technology.description && (
                    <p className="text-gray-600 mb-6">
                      {technology.description}
                    </p>
                  )}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {criteria.map((criterion) => (
                    <div key={criterion}>
                      <label className="block font-semibold mb-2">
                        {criterion}
                      </label>

                      <div className="space-y-2">

                        <div className="flex justify-between text-sm text-gray-600">
                          <span>1</span>

                          <span className="font-bold text-red-700 text-lg">
                            {ratings[technology.name]?.[criterion] || 5}
                          </span>

                          <span>10</span>
                        </div>

                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          disabled={!sector}
                          value={
                            ratings[technology.name]?.[criterion] || 5
                          }
                          onChange={(event) =>
                            updateRating(
                              technology.name,
                              criterion,
                              event.target.value
                            )
                          }
                          className="
                            w-full
                            accent-red-700
                            cursor-pointer
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                          "
                        />

                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-4">
                      Which applications would you support?
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          disabled={!sector}
                        />
                        Application #1
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          disabled={!sector}
                        />
                        Application #2
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          disabled={!sector}
                        />
                        Application #3
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          disabled={!sector}
                        />
                        Application #4
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          disabled={!sector}
                        />
                        Application #5
                      </label>

                    </div>

                  </div>

                
              </div>
            ))}
          </div>

          {!sector && (
            <p className="text-sm text-gray-500 mt-6">
              Please select your sector before rating technologies.
            </p>
          )}
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mb-12">

          <h2 className="text-3xl font-bold text-red-700 mb-3">
            Section 2: Calgary Challenges
          </h2>

          <p className="text-gray-700 mb-6">
            Which challenges facing Calgary are most important to you?
            Select all that apply.
          </p>

          <div className="space-y-4">

            {[
              ["first", "Priority #1"],
              ["second", "Priority #2"],
              ["third", "Priority #3"],
              ["fourth", "Priority #4"],
              ["fifth", "Priority #5"],
            ].map(([key, label]) => (

              <div key={key}>

                <label className="block font-semibold mb-2">
                  {label}
                </label>

                <select
                  value={
                    challengeRanking[
                      key as keyof typeof challengeRanking
                    ]
                  }
                  onChange={(event) =>
                    setChallengeRanking({
                      ...challengeRanking,
                      [key]: event.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                  "
                >
                  <option value="">
                    Select a challenge
                  </option>

                  {challengeOptions.map((challenge) => (
                    <option
                      key={challenge}
                      value={challenge}
                    >
                      {challenge}
                    </option>
                  ))}

                </select>

              </div>

            ))}

          </div>

          <div className="mt-6">

            <label className="block font-semibold mb-2">
              Other challenge not listed?
            </label>

            <input
              type="text"
              value={otherChallenge}
              onChange={(event) =>
                setOtherChallenge(event.target.value)
              }
              disabled={!sector}
              placeholder="Describe another challenge facing Calgary..."
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
                disabled:bg-gray-100
              "
            />

          </div>

        </section>
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-red-700 mb-3">
            Section 3: Community Concerns and Signals
          </h2>

          <p className="text-gray-700 mb-6">
            Are there any concerns, community needs, or early signals pointing
            toward an upcoming technology that Calgary should be aware of?
          </p>

          <textarea
            value={signals}
            onChange={(event) => setSignals(event.target.value)}
            disabled={!sector}
            placeholder="Examples: new transportation needs, climate resilience concerns, privacy concerns, public safety trends, accessibility issues, infrastructure pressure, digital inclusion..."
            className="w-full border border-gray-300 rounded-xl p-4 min-h-40 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          {!sector && (
            <p className="text-sm text-gray-500 mt-3">
              Please select your sector before adding comments.
            </p>
          )}
        </section>

        <button
          onClick={handleSubmit}
          disabled={!sector}
          className="w-full bg-red-700 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:bg-red-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Community Input
        </button>
      </div>
    </main>
  );
}
