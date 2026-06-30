"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import CompassLoader from "@/components/CompassLoader";

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
          
          console.log(
            "Weighted Response:",
            scoreRes.data
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
          
          console.log(
            "Comparison Response:",
            compRes.data
          );
          
          if (!compRes.data.error) {
            setComparison(compRes.data);

              console.log(
                "Comparison:",
                compRes.data
              );
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

    return <CompassLoader />;
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
                color: "#ffffff",
              }}
              className="
                text-5xl
                md:text-7xl
                font-bold
                drop-shadow-2xl
                max-w-5xl
              "
            >
              {technology.name}
            </h1>
          </div>
      
        </div>
      )}

      {/* TECHNOLOGY OVERVIEW */}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mb-12 overflow-hidden">

        <div className="border-b border-gray-200 px-10 py-6">

          <h2 className="text-3xl font-bold text-red-700">
            Technology Overview
          </h2>

        </div>

        <div className="p-10">

          <p className="text-xl leading-9 text-gray-700">
            {technology.description}
          </p>

        {/* QUICK FACTS */}
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-1 bg-red-700"/>
              

              <div className="p-6">

                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  Weighted Score
                </p>

                <p className="text-4xl font-bold text-red-700">
                  {weightedAverage}
                </p>

              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  Average community score
                </p>
                <p className="text-4xl font-bold text-red-700">
                  {communityAverage}
                </p>
              </div>
              
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  Community participants
                </p>

                <p className="text-4xl font-bold text-red-700">
                  {comparison?.total_votes ?? "—"}
                </p>

              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                  Applications
                </p>

                <p className="text-4xl font-bold text-red-700">
                  {applications.length}
                </p>

              </div>


            </div>
          </div>
        </div>
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

        {/* ASSESSMENTS */}
        

        {/* AI ASSESSMENT */}
        <div className="border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm bg-white">
          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-4 md:mb-6">
            AI Assessment
          </h2>

          <div className="mt-6">

            <p className="text-4xl font-bold text-black">

              {aiAverage}/10

            </p>

          </div>

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

            </>

          ) : (

            <p className="text-gray-500">

              AI assessment not available yet.

            </p>

          )}

        </div>

        {/* COMMUNITY ASSESSMENT */}

        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">

          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-4 md:mb-6">

            Community Assessment

          </h2>

          <div className="mt-6">

            <p className="text-4xl font-bold text-black">
              {communityAverage}/10
            </p>

          </div>

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

                <p className="mt-4 text-gray-700 font-medium">
                  Total Community Participants:{" "}
                  {comparison?.vote_count ?? 0}
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

          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-4 md:mb-6">

            Weighted Assessment

          </h2>
          <div className="mt-6">

            <p className="text-4xl font-bold text-black">
              {weightedAverage}/10
            </p>

          </div>


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

              
            </>

          ) : (

            <p className="text-gray-500">
              Weighted assessment not available yet.
            </p>

          )}

        </div>

      </div>

      {/* WHY CALGARY CARES */}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mb-12 overflow-hidden">

        <div className="border-b border-gray-200 px-10 py-6">

          <h2 className="text-3xl font-bold text-red-700">
            Why Calgary Cares
          </h2>

          <p className="text-gray-500 mt-2">
            The strongest areas where this technology can support Calgary's long-term priorities.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-10">

          <div className="bg-gray-50 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-2">
              Reliable Infrastructure
            </h3>

            <p className="text-gray-600">
              Score: {weightedScores?.reliable_infrastructure ?? "—"}/10
            </p>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-2">
              Safe City
            </h3>

            <p className="text-gray-600">
              Score: {weightedScores?.safe_city ?? "—"}/10
            </p>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-2">
              Transportation Network
            </h3>

            <p className="text-gray-600">
              Score: {weightedScores?.transportation_network ?? "—"}/10
            </p>

          </div>

          <div className="bg-gray-50 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-2">
              Community Wellbeing
            </h3>

            <p className="text-gray-600">
              Score: {weightedScores?.community_wellbeing ?? "—"}/10
            </p>

          </div>

        </div>

      </div>

      {/* COMMUNITY CHALLENGE IMPACT */}

      {impactData && (
      
      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">
      
          <div className="flex justify-between items-center mb-8">
      
              <div>
      
                  <h2 className="text-3xl font-bold text-red-700">
      
                      Community Challenge Impact
      
                  </h2>
      
                  <p className="text-gray-600 mt-2">
      
                      Estimated impact across Calgary's community challenges based on community priorities and mapped technology applications.
      
                  </p>
      
              </div>
      
              <div className="text-right">
      
                  <div className="text-5xl font-bold text-red-700">
      
                      {Object.keys(impactData).length}
      
                  </div>
      
                  <div className="text-gray-500">
      
                      Challenges Supported
      
                  </div>
      
              </div>
      
          </div>
      
          <div className="grid lg:grid-cols-2 gap-6">
      
              {Object.entries(impactData)
      
              .sort(
      
                  (a:any,b:any)=>
      
                  b[1].score-a[1].score
      
              )
      
              .map(([challenge,data]:any)=>{
      
                  const width=Math.min(data.score*10,100);
      
                  const colour =
                    data.score >= 8
                        ? "bg-red-700"
                        : data.score >= 5
                        ? "bg-red-500"
                        : "bg-red-200";
            
                  const label =
                    data.score >= 8
                        ? "High Impact"
                        : data.score >= 5
                        ? "Moderate Impact"
                        : "Emerging";


      
                  return(
      
                  <div
      
                  key={challenge}
      
                  className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition"
      
                  >
      
                      <div className="flex justify-between items-start mb-4">
      
                          <h3 className="font-bold text-xl">
      
                              {challenge}
      
                          </h3>
      
                          <div className="text-right">

                            <span
                                className={`
                                    inline-block
                                    px-3
                                    py-1
                                    rounded-full
                                    text-white
                                    text-sm
                                    font-semibold
                                    ${colour}
                                `}
                            >
                                {label}
                            </span>
                        
                            <p className="mt-2 text-lg font-bold text-gray-800">
                                {data.score}/10
                            </p>
                        
                        </div>
      
                      </div>
      
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-5">
      
                          <div
      
                          className={`${colour} h-full transition-all duration-700`}
      
                          style={{
      
                              width:`${width}%`
      
                          }}
      
                          />
      
                      </div>
      
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
      
                          Supporting Applications
      
                      </div>
      
                      <div className="flex flex-wrap gap-2">
      
                      {data.applications.map(
      
                          (application:string)=>(
      
                          <span
      
                          key={application}
      
                          className="bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-full text-sm"
      
                          >
      
                          {application}
      
                          </span>
      
                          )
      
                      )}
      
                      </div>
      
                  </div>
      
                  );
      
              })}
      
          </div>
      
      </div>
      
      )}

  {/* TECHNOLOGY APPLICATIONS */}
  {applications.length > 0 && (
      <div className="border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm mb-8 md:mb-10 bg-white">

      <h2 className="text-3xl font-semibold text-red-700 mb-6">
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


      {/* GLOBAL EXAMPLES */}
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

       {/* ASSESSMENT OVERVIEW */}
      <div className="border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 bg-white">
        <h2 className="text-3xl font-semibold text-red-700 mb-4">
          Assessment Overview
        </h2>
      
        <p className="text-gray-700 leading-relaxed">
          Calgary Compass weighs AI-supported evaluation with community input to
          provide a balanced perspective on each technology. The current weight metric is 50-50.
        </p>
      
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">
              AI Assessment
            </h3>
      
            <p className="text-gray-600 text-sm">
              Evaluates the technology against Calgary's strategic priorities using
              OpenAlex to gather data from scholarly reviewed papers on emerging technologies.
            </p>
          </div>
      
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold text-red-700 mb-2">
              Community Assessment
            </h3>
      
            <p className="text-gray-600 text-sm">
              Reflects how community participants score the technology across the
              same evaluation criteria as AI is evaluating. 
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

        {/* HOW TECHNOLOGIES ARE MANAGED */}

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

      

    </main>
  );
}
