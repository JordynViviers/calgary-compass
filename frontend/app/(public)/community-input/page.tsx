"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://calgary-compass-api.onrender.com";

const criteria = [
  "Reliable and Sustainable Infrastructure",
  "Safe City",
  "Functional Transportation Network",
  "Community Livability and Well-being",
  "Balanced Growth and Evolving Neighbourhoods",
  "Trusted and Collaborative Government",
];

const challengeOptions = [
  "Infrastructure, traffic and roads",
  "Crime, safety and policing",
  "Growth and planning",
  "Transit",
  "Homelessness, poverty and affordable housing",
  "Economy",
  "Water supply/infrastructure",
  "Environment & Waste Management",
  "Recreation and parks",
  "Education",
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
    console.log("SUBMIT CLICKED");
  
    try {
  
      console.log("challengeRanking:", challengeRanking);
      console.log("sector:", sector);
      console.log("technologies:", technologies);
      console.log("ratings:", ratings);
  
      // Save ranked Calgary challenges
  
      const rankings = [
        challengeRanking.first,
        challengeRanking.second,
        challengeRanking.third,
        challengeRanking.fourth,
        challengeRanking.fifth,
      ];
  
      console.log("Rankings array:", rankings);
  
      for (let i = 0; i < rankings.length; i++) {
  
        if (!rankings[i]) continue;
  
        console.log(
          "Posting challenge vote:",
          rankings[i]
        );
  
        await axios.post(
          `${API_URL}/challenge-vote`,
          {
            stakeholder: sector,
            challenge: rankings[i],
            rank: i + 1,
          }
        );
  
        console.log(
          "Challenge vote posted:",
          rankings[i]
        );
      }
  
      // Save custom challenge
  
      if (otherChallenge.trim()) {
  
        console.log(
          "Posting custom challenge:",
          otherChallenge
        );
  
        await axios.post(
          `${API_URL}/challenge-vote`,
          {
            stakeholder: sector,
            challenge: otherChallenge,
            rank: 99,
          }
        );
  
        console.log(
          "Custom challenge posted"
        );
      }
  
      // Save technology ratings
  
      for (const technology of technologies) {

        const techRatings =
          ratings[technology.name];
      
        console.log(
          "Technology:",
          technology.name,
          "Ratings:",
          techRatings
        );
      
        if (!techRatings) {
          continue;
        }
  
        console.log(
          "Posting technology vote:",
          technology.name
        );
  
        await axios.post(
          `${API_URL}/vote`,
          {
            technology_id: technology.id,
            stakeholder: sector,
  
            reliable_infrastructure: Number(
              techRatings[
                "Reliable and Sustainable Infrastructure"
              ] || 0
            ),
  
            safe_city: Number(
              techRatings[
                "Safe City"
              ] || 0
            ),
  
            transportation_network: Number(
              techRatings[
                "Functional Transportation Network"
              ] || 0
            ),
  
            community_wellbeing: Number(
              techRatings[
                "Community Livability and Well-being"
              ] || 0
            ),
  
            balanced_growth: Number(
              techRatings[
                "Balanced Growth and Evolving Neighbourhoods"
              ] || 0
            ),
  
            trusted_governance: Number(
              techRatings[
                "Trusted and Collaborative Government"
              ] || 0
            ),
          }
        );
  
        console.log(
          "Technology vote posted:",
          technology.name
        );
      }
  
      // Save community signals
  
      if (signals.trim()) {
  
        console.log(
          "Posting community signal"
        );
  
        await axios.post(
          `${API_URL}/community-signal`,
          {
            stakeholder: sector,
            signal_text: signals,
          }
        );
  
        console.log(
          "Community signal posted"
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
  
      console.error(
        "FULL ERROR:",
        error
      );
  
      if (axios.isAxiosError(error)) {
  
        console.error(
          "Status:",
          error.response?.status
        );
  
        console.error(
          "Data:",
          error.response?.data
        );
      }
  
      alert(
        "Failed to submit community input."
      );
    }
  }
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-4">
            Community Input
          </h1>

          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Rate how emerging technologies align with Calgary Council Priorities. 
          </p>

        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-8 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-red-700 mb-3">
            Section 1: Technology Ratings
          </h2>

          <p className="text-gray-700 mb-8">
            First, tell us which sector you represent. Then rate each technology
            from 1 to 10 across the six priorities. (1 is lowest and 10 is highest)
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
            {technologies.map((technology: any) => {

              const techApplications =
                applications.filter(
                  (application) =>
                    application.technology_id ===
                    technology.id
                );
            
              return (
            
                <div
                  key={technology.id}
                  className="border border-gray-200 rounded-2xl p-6 bg-gray-50"
                >
                  <h3 className="text-2xl font-bold text-red-700 mb-6">
                    {technology.name}
                    {technology.description && (
                      <p className="text-sm md:text-base text-gray-600 mb-6">
                        {technology.description}
                      </p>
                    )}
                  </h3>
                
                  <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
                
                    <h3 className="text-lg font-semibold text-red-700 mb-2">
                      Calgary Council Priorities
                    </h3>
                
                    <p className="text-gray-700 mb-3">
                      Technologies are evaluated based on Calgary City Council's
                      priority areas.
                    </p>
                
                    <a
                      href="https://www.calgary.ca/council/council-priorities.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-700 font-semibold hover:underline"
                    >
                      Learn more about Calgary's Council Priorities →
                    </a>
                
                  </div>
                
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
                            {ratings[technology.name]?.[criterion] || 1}
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
                            ratings[technology.name]?.[criterion] || 1
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
                
                  <div className="space-y-2">
                
                    {techApplications.map(
                      (application: any) => (
                
                        <label
                          key={application.id}
                          className="flex items-center gap-3"
                        >
                
                          <input
                            type="checkbox"
                            disabled={!sector}
                          />
                
                          {application.name}
                
                        </label>
                
                      )
                    )}
                
                    {techApplications.length === 0 && (
                
                      <p className="text-gray-500 text-sm">
                        No applications available.
                      </p>
                
                    )}
                
                  </div>
                
                </div>

                
              </div>
            );

          })}
          </div>

          {!sector && (
            <p className="text-sm text-gray-500 mt-6">
              Please select your sector before rating technologies.
            </p>
          )}
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-8 mb-8 md:mb-12">

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
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-8 mb-8 md:mb-12">
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
