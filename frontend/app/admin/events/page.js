"use client";

import Link from "next/link";
import { useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

const API_URL = "https://calgary-compass-api.onrender.com";

const TECHNOLOGIES = [
  "Artificial Intelligence",
  "Autonomous Vehicles",
  "Smart Grids",
  "Renewable Energy Storage",
  "Digital Twins",
  "Internet of Things (IoT)",
  "5G / Advanced Connectivity",
  "Drones / UAVs",
  "Carbon Capture",
  "Blockchain",
  "Augmented & Virtual Reality",
  "Robotics & Automation",
  "Precision Agriculture",
  "Advanced Water Treatment",
  "Quantum Computing",
  "Green Hydrogen",
  "Biometrics & Digital ID",
  "3D Printing / Additive Manufacturing",
  "Edge Computing",
  "Geothermal Energy",
];

const ROLES = [
  "Working professional",
  "Student",
  "Researcher / Academic",
  "Entrepreneur / Startup",
  "City / Government employee",
  "Retired",
  "Other",
];

const DIETARY = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Gluten free",
  "Halal",
  "Kosher",
  "Other",
];

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    fieldOfWork: "",
    role: "",
    roleOther: "",
    hearAbout: "",
    tech1: "",
    tech2: "",
    tech5: "",
    dietary: "",
    dietaryOther: "",
    accessibility: "",
    consent: "",
    anythingElse: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const optionsFor = (current) =>
    TECHNOLOGIES.filter((tech) => {
      const chosenElsewhere = [
        form.tech1,
        form.tech2,
        form.tech5,
      ].filter((t) => t !== form[current] && t !== "");

      return !chosenElsewhere.includes(tech);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.consent !== "Yes, I consent") {
      setError(
        "Consent to recording is required to participate in the event.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/application`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name,
          email: form.email,
          field_of_work: form.fieldOfWork,
          role: form.role,
          role_other: form.roleOther,
          hear_about: form.hearAbout,
          tech_1_year: form.tech1,
          tech_2_year: form.tech2,
          tech_5_year: form.tech5,
          dietary: form.dietary,
          dietary_other: form.dietaryOther,
          accessibility: form.accessibility,
          recording_consent: form.consent,
          anything_else: form.anythingElse,
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (err) {
      console.error(err);

      setError(
        "Sorry — something went wrong saving your application. Please try again.",
      );

    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition";

  const labelClass = "block text-lg font-semibold mb-1";

  const helpClass = "text-sm text-gray-500 mb-2";

  return (
    <main className="min-h-screen bg-gray-50 text-black">

      {/* Top Red Bar */}
      <div className="h-2 bg-red-700 w-full"></div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-8 pt-6 pb-12">

        {/* Navigation */}
        <AdminNavbar />

        {submitted ? (

          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">

            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Thank you for applying!
            </h1>

            <p className="text-gray-700 text-lg mb-3">
              We&apos;ve received your application successfully.
            </p>

            <p className="text-gray-600">
              Applications are reviewed on a rolling basis.
            </p>

            <Link
              href="/events"
              className="inline-block mt-8 bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition"
            >
              Back to Events
            </Link>

          </div>

        ) : (

          <>
            {/* Page Heading */}
            <div className="text-center mb-8">

              <h1 className="text-5xl font-bold text-red-700 mb-3">
                Wave Tech World Café
              </h1>

              <p className="text-xl text-gray-700 mb-2">
                Event Application
              </p>

              <p className="text-gray-600 max-w-xl mx-auto">
                We&apos;re excited you&apos;re interested in joining us.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* About You */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                <h2 className="text-2xl font-bold mb-6">
                  About You
                </h2>

                <div className="space-y-6">

                  <div>
                    <label className={labelClass}>
                      Name
                    </label>

                    <p className={helpClass}>
                      First and last name
                    </p>

                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Field of Work or Study
                    </label>

                    <input
                      type="text"
                      value={form.fieldOfWork}
                      onChange={(e) =>
                        update("fieldOfWork", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                </div>

              </section>

              {/* Technology Questions */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                <h2 className="text-2xl font-bold mb-6">
                  Technology Priorities
                </h2>

                <div className="space-y-6">

                  <div>
                    <label className={labelClass}>
                      Greatest impact in 1 year?
                    </label>

                    <select
                      value={form.tech1}
                      onChange={(e) => update("tech1", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">
                        Select a technology…
                      </option>

                      {optionsFor("tech1").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Greatest impact in 2 years?
                    </label>

                    <select
                      value={form.tech2}
                      onChange={(e) => update("tech2", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">
                        Select a technology…
                      </option>

                      {optionsFor("tech2").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Greatest impact in 5 years?
                    </label>

                    <select
                      value={form.tech5}
                      onChange={(e) => update("tech5", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">
                        Select a technology…
                      </option>

                      {optionsFor("tech5").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

              </section>

              {/* Submit */}
              <div className="text-center">

                {error && (
                  <p className="text-red-700 font-medium mb-4">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-800 transition disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>

              </div>

            </form>
          </>
        )}
      </div>
    </main>
  );
}
