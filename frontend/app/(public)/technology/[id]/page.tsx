"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

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

const API_URL =
  "https://calgary-compass-api.onrender.com";

function getApplicationIcon(
  name: string
) {

  const text = name.toLowerCase();

  if (text.includes("housing"))
    return "🏘";

  if (text.includes("transport"))
    return "🚍";

  if (text.includes("mobility"))
    return "🚍";

  if (text.includes("health"))
    return "⚕";

  if (text.includes("education"))
    return "🎓";

  if (text.includes("emergency"))
    return "🚨";

  if (text.includes("infrastructure"))
    return "🏗";

  return "🏛";
}

export default function TechnologyDetailPage() {



  const params = useParams();
  const id = params.id;

  const [technology, setTechnology] =
    useState<any>(null);

  const [evidence, setEvidence] =
  useState<any>(null);

  const [weightedScores, setWeightedScores] =
    useState<any>(null);

  const [comparison, setComparison] =
    useState<any>(null);

  const [aiEvaluation, setAiEvaluation] =
    useState<any>(null);
  
  const [impactData, setImpactData] =
    useState<any>(null);

  const [applications, setApplications] =
    useState<any[]>([]);
  
  useEffect(() => {
    axios
      .get(
        `${API_URL}/technologies/${id}/applications`
      )
      .then((res) =>
        setApplications(res.data)
      );
  }, [id]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchAll = async () => {

      setLoading(true);
      try {
      
        const impactRes =
          await axios.get(
            `${API_URL}/technology/${id}/impact`
          );
      
        setImpactData(
          impactRes.data
        );
      
      } catch (err) {
      
        console.error(
          "Impact fetch failed:",
          err
        );
      
      }
      try {

        const techRes = await axios.get(
          `${API_URL}/technologies`
        );

        const found = techRes.data.find(
          (t: any) => t.id == id
        );

        setTechnology(found);

        try {

          const aiRes = await axios.get(
            `${API_URL}/technology/${id}/ai-evaluation`
          );

          if (!aiRes.data.error) {
            setAiEvaluation(aiRes.data);
          }

        } catch (err) {

          console.error(
            "AI evaluation failed:",
            err
          );

        }

        try {

          const scoreRes = await axios.get(
            `${API_URL}/technology/${id}/weighted-scores`
          );

          if (!scoreRes.data.error) {
            setWeightedScores(scoreRes.data);
          }

        } catch (err) {

          console.error(
            "Weighted scores failed:",
            err
          );

        }

        try {

          const compRes = await axios.get(
            `${API_URL}/technology/${id}/comparison`
          );

          if (!compRes.data.error) {
            setComparison(compRes.data);
          }

        } catch (err) {

          console.error(
            "Comparison failed:",
            err
          );

        }

        try {

          const evidenceRes = await axios.get(
            `${API_URL}/technology/${id}/evidence`
          );
        
          setEvidence(evidenceRes.data);
        
        } catch (err) {
        
          console.error(
            "Evidence failed:",
            err
          );
        
        }

      } catch (err) {

        console.error(
          "Technology fetch error:",
          err
        );

      }

      setLoading(false);

    };

    fetchAll();

  }, [id]);

  if (loading || !technology) {

    return (

      <main className="min-h-screen p-4 md:p-10 bg-white text-black">

        <h1 className="text-3xl md:text-5xl font-bold text-red-700 mb-3">
          Loading technology...
        </h1>

      </main>

    );
  }

  const chartData = comparison
    ? [
        {
          category: "Reliability",
          Human: Math.round(
            comparison.human?.reliable_infrastructure ?? 0
          ),
          AI: Math.round(
            comparison.ai?.reliable_infrastructure ?? 0
          )
        },
        {
          category: "Safety",
          Human: Math.round(
            comparison.human?.safe_city ?? 0
          ),
          AI: Math.round(
            comparison.ai?.safe_city ?? 0
          )
        },
        {
          category: "Transportation",
          Human: Math.round(
            comparison.human?.transportation_network ?? 0
          ),
          AI: Math.round(
            comparison.ai?.transportation_network ?? 0
          )
        },
        {
          category: "Wellbeing",
          Human: Math.round(
            comparison.human?.community_wellbeing ?? 0
          ),
          AI: Math.round(
            comparison.ai?.community_wellbeing ?? 0
          )
        },
        {
          category: "Growth",
          Human: Math.round(
            comparison.human?.balanced_growth ?? 0
          ),
          AI: Math.round(
            comparison.ai?.balanced_growth ?? 0
          )
        },

        {
          category: "Governance",
          Human: Math.round(
            comparison.human?.trusted_governance ?? 0
          ),
          AI: Math.round(
            comparison.ai?.trusted_governance ?? 0
          )
        }
      ]
    : [];

  const aiAverage =
    aiEvaluation
      ? Math.round((
          aiEvaluation.reliable_infrastructure +
          aiEvaluation.safe_city +
          aiEvaluation.transportation_network +
          aiEvaluation.community_wellbeing +
          aiEvaluation.balanced_growth + 
          aiEvaluation.trusted_governance
        ) / 6 )
      : 0;

const communityAverage =
  comparison
    ? Math.round(
        (
          comparison.human.reliable_infrastructure +
          comparison.human.safe_city +
          comparison.human.transportation_network +
          comparison.human.community_wellbeing +
          comparison.human.balanced_growth + 
          comparison.human.trusted_governance
        ) / 6 )
    : 0;

const weightedAverage =
  weightedScores
    ? Math.round(
        (
          weightedScores.reliable_infrastructure +
          weightedScores.safe_city +
          weightedScores.transportation_network +
          weightedScores.community_wellbeing +
          weightedScores.balanced_growth + 
          weightedScores.trusted_governance
        ) / 6 )
    : 0;


  return (

    <main className="min-h-screen p-4 md:p-10 bg-white text-black">

      {/* HERO */}

      

      {technology.hero_image && (
        <div className="relative mb-12 overflow-hidden rounded-3xl">
      
          <img
            src={technology.hero_image}
            alt={technology.name}
            className="
              w-full
              h-[550px]
              object-cover
            "
          />
      
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
      
          {/* Text Overlay */}
          <div
            className="
              absolute
              inset-0
              z-20
              flex
              flex-col
              justify-center
              items-center
              text-center
              px-8
            "
          >
            <p className="text-red-400 font-semibold tracking-[0.25em] uppercase mb-4">
              Emerging Technology
            </p>
      
            <h1
              style={{
                color: "white",
                backgroundColor: "red",
                padding: "20px",
                zIndex: 999,
                position: "relative",
              }}
            >
              {technology.name}
            </h1>
          </div>
      
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-200 p-10 mb-12 shadow-sm">
        <p className="text-xl text-gray-700 leading-relaxed">
          {technology.description}
        </p>
      </div>
      {/* COMMUNITY INPUT BUTTON */}

      <div className="mb-10">

        <Link
          href="/community-input"
        >

          <button
            className="
              bg-red-700
              hover:bg-red-800
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
              shadow-md
              transition
            "
          >
            Participate in Technology Assessment
          </button>

        </Link>

      </div>

      {aiEvaluation?.global_examples && (

        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">
      
          <h2 className="text-3xl font-semibold text-red-700 mb-6">
            Global Examples
          </h2>
      
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {aiEvaluation.global_examples}
          </p>
      
        </div>
      
      )}
      
      {applications.length > 0 && (

  <div className="border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm mb-8 md:mb-10 bg-white">

    <h2 className="text-2xl md:text-3xl font-semibold text-red-700 mb-4 md:mb-6">
      Technology Applications
    </h2>

    <div className="space-y-4">

      {applications.map((app: any) => (

        <div
          key={app.id}
          className="
            bg-gray-50
            border
            border-gray-200
            rounded-2xl
            p-5
            hover:bg-white
            hover:shadow-md
            transition
          "
        >

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">

            <div>
          
              <h3 className="font-semibold text-lg">
                {getApplicationIcon(app.name)}
                {" "}
                {app.name}
              </h3>
          
              {app.description && (
                <p className="text-gray-600 mt-2">
                  {app.description}
                </p>
              )}
          
            </div>
          

          </div>

        </div>

      ))}

    </div>

  </div>

)}

      {impactData && (

        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">
      
          <h2 className="text-3xl font-semibold text-red-700 mb-6">
            Technology Impact
          </h2>

          <div className="mb-8">

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Impact Matrix
            </h3>
          
            <div className="overflow-hidden rounded-2xl border border-gray-200">
          
              <div className="grid grid-cols-2 bg-gray-100 font-semibold">
          
                <div className="p-4">
                  Challenge
                </div>
          
                <div className="p-4">
                  Impact Level
                </div>
          
              </div>
          
              {Object.entries(impactData)
                .sort(
                  (a: any, b: any) =>
                    b[1].score -
                    a[1].score
                )
                .map(
                  (
                    [challenge, data]: any
                  ) => {
          
                    const dots =
                      Math.min(
                        Math.ceil(
                          data.score / 3
                        ),
                        5
                      );
          
                    return (
          
                      <div
                        key={challenge}
                        className="
                          grid
                          grid-cols-2
                          border-t
                          border-gray-200
                        "
                      >
          
                        <div className="p-4 font-medium">
                          {challenge}
                        </div>
          
                        <div className="p-4 flex items-center gap-2">
          
                          <div className="flex gap-1">
          
                            {[1, 2, 3, 4, 5].map(
                              (dot) => (
          
                                <div
                                  key={dot}
                                  className={`
                                    w-4
                                    h-4
                                    rounded-full
          
                                    ${
                                      dot <= dots
                                        ? "bg-red-700"
                                        : "bg-gray-200"
                                    }
                                  `}
                                />
          
                              )
                            )}
          
                          </div>
          
                          <span className="text-sm text-gray-500 ml-2">
                            {data.score}
                          </span>
          
                        </div>
          
                      </div>
          
                    );
          
                  }
                )}
          
            </div>
          
          </div>
      
          <p className="text-gray-600 mb-6">
            Based on community challenge mappings,
            this technology appears most relevant
            to the following Calgary priorities.
          </p>
      
          <div className="space-y-5">
      
            {Object.entries(impactData)
              .sort(
                (a: any, b: any) =>
                  b[1].score -
                  a[1].score
              )
              .map(
                ([challenge, data]: any) => {
      
                  const width =
                    Math.min(
                      data.score * 10,
                      100
                    );
      
                  return (
      
                    <div
                      key={challenge}
                    >
      
                      <div className="flex justify-between mb-2">
      
                        <span className="font-semibold">
                          {challenge}
                        </span>
      
                        <span className="font-bold text-red-700">
                          {data.score}
                        </span>
      
                      </div>
      
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
      
                        <div
                          className="h-full bg-red-700"
                          style={{
                            width:
                              `${width}%`
                          }}
                        />
      
                      </div>
      
                      <div className="flex flex-wrap gap-2">
      
                        {data.applications.map(
                          (
                            application: string
                          ) => (
      
                            <span
                              key={
                                application
                              }
                              className="
                                bg-red-50
                                text-red-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                              "
                            >
                              {application}
                            </span>
      
                          )
                        )}
      
                      </div>
      
                    </div>
      
                  );
      
                }
              )}
      
          </div>
      
        </div>
      
      )}
      

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="compass-card p-6 text-center">
      
          <p className="text-gray-500 mb-2">
            AI Assessment
          </p>
      
          <p className="text-5xl font-bold text-red-700">
            {aiAverage}
          </p>
      
          <p className="text-gray-500">
            out of 10
          </p>
      
        </div>
      
        <div className="compass-card p-6 text-center">
      
          <p className="text-gray-500 mb-2">
            Community Assessment
          </p>
      
          <p className="text-5xl font-bold text-red-700">
            {communityAverage}
          </p>
      
          <p className="text-gray-500">
            out of 10
          </p>
      
        </div>
      
        <div className="compass-card p-6 text-center">
      
          <p className="text-gray-500 mb-2">
            Combined Assessment
          </p>
      
          <p className="text-5xl font-bold text-red-700">
            {weightedAverage}
          </p>
      
          <p className="text-gray-500">
            out of 10
          </p>
      
        </div>
      
      </div>

      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-red-50">
        <h2 className="text-3xl font-semibold text-red-700 mb-4">
          Assessment Overview
        </h2>
      
        <p className="text-gray-700 leading-relaxed">
          Calgary Compass combines AI-supported evaluation with community input to
          provide a balanced perspective on each technology.
        </p>
      
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">
              AI Assessment
            </h3>
      
            <p className="text-gray-600 text-sm">
              Evaluates the technology against Calgary's strategic priorities using
              research and evidence sources.
            </p>
          </div>
      
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">
              Community Assessment
            </h3>
      
            <p className="text-gray-600 text-sm">
              Reflects how community participants score the technology across the
              same evaluation criteria.
            </p>
          </div>
      
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">
              Combined Assessment
            </h3>
      
            <p className="text-gray-600 text-sm">
              Integrates AI evaluation and community feedback into a single score.
            </p>
          </div>
        </div>
      </div>
      {/* AI VS COMMUNITY */}

      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">

        <h2 className="text-3xl font-semibold text-red-700 mb-6">

          AI vs Community Comparison

        </h2>

        {comparison ? (

          <div
            style={{
              width: "100%",
              height:
                typeof window !== "undefined" &&
                window.innerWidth < 768
                  ? 350
                  : 500
            }}
          >

            <ResponsiveContainer width="98%" height="100%">

              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 60,
                  bottom: 20
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  type="number"
                  domain={[0, 10]}
                  tickCount={11}
                />

                <YAxis
                  dataKey="category"
                  type="category"
                  width={90}
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="Human"
                  fill="#dc2626"
                  radius={[0, 6, 6, 0]}
                />

                <Bar
                  dataKey="AI"
                  fill="#6b7280"
                  radius={[0, 6, 6, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        ) : (

          <p className="text-gray-500">

            Waiting for community votes.

          </p>

        )}

      </div>

      {/* ASSESSMENTS */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="border border-gray-200 rounded-2xl p-6 mb-8 bg-gray-50">

          <h3 className="text-xl font-semibold text-red-700 mb-3">
            How Technologies Are Evaluated
          </h3>
        
          <p className="text-gray-700 mb-4">
            Calgary Compass evaluates technologies using Calgary City
            Council's six strategic priorities.
          </p>
        
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
        
            <li>Reliable and Sustainable Infrastructure</li>
        
            <li>Safe City</li>
        
            <li>Functional Transportation Network</li>
        
            <li>Community Livability and Well-being</li>
        
            <li>Balanced Growth and Evolving Neighbourhoods</li>
        
            <li>Trusted and Collaborative Government</li>
        
          </ul>
        
          <a
            href="https://www.calgary.ca/council/council-priorities.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-red-700 font-semibold hover:underline"
          >
            Learn more about Calgary's Council Priorities →
          </a>
        
        </div>

        {/* AI ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm bg-white">

          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-4 md:mb-6">

            AI Assessment

          </h2>

          {aiEvaluation ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div className="flex justify-between">
                  <span>Reliable Infrastructure</span>
                  <span className="font-bold text-red-700">
                    {aiEvaluation.reliable_infrastructure}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Safe City</span>
                  <span className="font-bold text-red-700">
                    {aiEvaluation.safe_city}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Transportation Network</span>
                  <span className="font-bold text-red-700">
                    {aiEvaluation.transportation_network}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Community Well-being</span>
                  <span className="font-bold text-red-700">
                    {aiEvaluation.community_wellbeing}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Balanced Growth</span>
                  <span className="font-bold text-red-700">
                    {aiEvaluation.balanced_growth}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Trusted Governance</span>
                  <span className="font-bold text-red-700">
                    {aiEvaluation.trusted_governance}/10
                  </span>
                </div>
              
              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">

                  Assessment Explanation

                </h3>

                <p className="text-gray-600 leading-relaxed">

                  The AI assessment for {technology.name}
                  reflects its expected value for municipal
                  operations, public impact, governance,
                  and long-term innovation potential.

                  <br /><br />

                  Higher scores indicate stronger projected
                  benefits in areas such as efficiency,
                  scalability, service delivery, and smart
                  city integration, while lower scores
                  reflect potential challenges related to
                  cost, implementation complexity,
                  governance, or public trust.

                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">

                  {aiAverage}/10

                </p>

                <p className="text-gray-500 mt-1">

                  Average AI Score

                </p>

              </div>

            </>

          ) : (

            <p className="text-gray-500">

              AI assessment not available yet.

            </p>

          )}

        </div>

        {/* COMMUNITY ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-2xl font-bold text-red-700 mb-6">

            Community Assessment

          </h2>

          {comparison ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div className="flex justify-between">
                  <span>Reliable Infrastructure</span>
                  <span className="font-bold text-red-700">
                    {comparison.human.reliable_infrastructure}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Safe City</span>
                  <span className="font-bold text-red-700">
                    {comparison.human.safe_city}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Transportation Network</span>
                  <span className="font-bold text-red-700">
                    {comparison.human.transportation_network}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Community Well-being</span>
                  <span className="font-bold text-red-700">
                    {comparison.human.community_wellbeing}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Balanced Growth</span>
                  <span className="font-bold text-red-700">
                    {comparison.human.balanced_growth}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Trusted Governance</span>
                  <span className="font-bold text-red-700">
                    {comparison.human.trusted_governance}/10
                  </span>
                </div>
              
              </div>
              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Community Participation
                </h3>

                <p className="text-gray-600">
                  Community votes represent the aggregated
                  perspectives of platform participants.
                </p>

                <p className="mt-4 text-gray-700 font-medium">
                  Total Community Participants:{" "}
                  {comparison?.vote_count ?? 0}
                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">
                  {communityAverage}/10
                </p>

                <p className="text-gray-500 mt-1">
                  Average Community Score
                </p>

              </div>

            </>

          ) : (

            <p className="text-gray-500">
              Community assessment not available yet.
            </p>

          )}

        </div>

        {/* WEIGHTED ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-2xl font-bold text-red-700 mb-6">

            Weighted Assessment

          </h2>

          {weightedScores ? (

            <>

              <div className="space-y-3 text-gray-700">

                <div className="flex justify-between">
                  <span>Reliable Infrastructure</span>
                  <span className="font-bold text-red-700">
                    {weightedScores.reliable_infrastructure}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Safe City</span>
                  <span className="font-bold text-red-700">
                    {weightedScores.safe_city}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Transportation Network</span>
                  <span className="font-bold text-red-700">
                    {weightedScores.transportation_network}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Community Well-being</span>
                  <span className="font-bold text-red-700">
                    {weightedScores.community_wellbeing}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Balanced Growth</span>
                  <span className="font-bold text-red-700">
                    {weightedScores.balanced_growth}/10
                  </span>
                </div>
              
                <div className="flex justify-between">
                  <span>Trusted Governance</span>
                  <span className="font-bold text-red-700">
                    {weightedScores.trusted_governance}/10
                  </span>
                </div>
              
              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Combined Assessment
                </h3>

                <p className="text-gray-600">
                  These scores combine AI evaluation and
                  community voting using the platform's
                  weighting methodology.
                </p>

              </div>

              <div className="mt-6">

                <p className="text-4xl font-bold text-black">
                  {weightedAverage}/10
                </p>

                <p className="text-gray-500 mt-1">
                  Weighted Score
                </p>

              </div>

            </>

          ) : (

            <p className="text-gray-500">
              Weighted assessment not available yet.
            </p>

          )}

        </div>

      </div>

    </main>
  );
}
