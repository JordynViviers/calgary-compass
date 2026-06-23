"use client";

import Link from "next/link";
import {
  Users,
  Compass,
  Database,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  MapPinned,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="h-2 bg-red-700 w-full"></div>
      {/* HERO */}
      <section className="px-6 py-24 border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
      
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            About Calgary Compass
          </h1>
      
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calgary Compass bridges the gap between community priorities and emerging
            technologies. The platform provides a space for residents, researchers,
            and decision-makers to explore technologies, identify community
            challenges, and contribute insights that support innovation and informed
            discussion in Calgary.
          </p>
      
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-red-700 text-center mb-4">
            How Calgary Compass Works
          </h2>

          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Calgary Compass combines community perspectives, technology
            exploration, and research evidence to support informed discussions
            about innovation and local priorities.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <Users className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Community Challenges
              </h3>
              <p className="text-gray-600">
                Community members identify challenges, opportunities, and
                priorities affecting Calgary.
              </p>
            </div>

            <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <Compass className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Technology Exploration
              </h3>
              <p className="text-gray-600">
                Calgary Compass gathers information on emerging technologies and
                their potential applications.
              </p>
            </div>

            <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <Database className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Evidence & Research
              </h3>
              <p className="text-gray-600">
                Technology information is supported through academic research,
                publications, and other evidence sources.
              </p>
            </div>

            <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <Lightbulb className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Community Insights
              </h3>
              <p className="text-gray-600">
                Public feedback helps identify which technologies and
                applications may be most relevant to local needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-red-700 mb-8">
            Our Data Sources
          </h2>

          <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">
              Research Sources
            </h3>

            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mb-6">
              <li>OpenAlex</li>
              <li>Semantic Scholar</li>
              <li>Community Submissions</li>
              <li>Technology Evaluations</li>
            </ul>

            <p className="text-gray-600 leading-relaxed">
              Calgary Compass uses research metadata from OpenAlex and Semantic
              Scholar to support technology exploration and evidence gathering.
              Community submissions and technology evaluations provide
              additional context to help understand local priorities and areas
              of interest.
            </p>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-red-700 text-center mb-12">
            Why It Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <MessageSquare className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Community Voice
              </h3>
              <p className="text-gray-600">
                Creates opportunities for residents to contribute perspectives
                on technology and innovation.
              </p>
            </div>

            <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <ShieldCheck className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Evidence-Informed Discussions
              </h3>
              <p className="text-gray-600">
                Supports conversations using research findings and community
                input.
              </p>
            </div>

            <div className="bg-white border border-gray-200 border-t-4 border-t-red-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <MapPinned className="w-10 h-10 mb-4 text-red-700" />
              <h3 className="text-xl font-semibold mb-3">
                Local Relevance
              </h3>
              <p className="text-gray-600">
                Connects technologies to challenges and opportunities that
                matter to Calgary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-700 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-red-700 mb-6">
            Get Involved
          </h2>

          <p className="text-lg text-gray-300 mb-10">
            Explore technologies, learn about community priorities, and help
            shape conversations about innovation in Calgary.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/technologies"
              className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Explore Technologies
            </Link>

            <Link
              href="/community-input"
              className="px-6 py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Share Community Input
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
