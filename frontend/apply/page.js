"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: Replace these with the 20 technologies generated for this event.
// Each option appears in all three dropdowns, but a technology already
// chosen in one dropdown is automatically hidden from the others.
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

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Hide technologies already chosen in the other two dropdowns.
  const optionsFor = (current) =>
    TECHNOLOGIES.filter((tech) => {
      const chosenElsewhere = [form.tech1, form.tech2, form.tech5].filter(
        (t, i) => t !== form[current] && t !== "",
      );
      return !chosenElsewhere.includes(tech);
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.consent !== "Yes, I consent") {
      alert(
        "Consent to recording is required to participate in the event.",
      );
      return;
    }

    // TODO: Connect this to a real destination so applications are saved.
    // Options: a Next.js API route, a form service (Formspree, Tally,
    // Google Forms), or an email service. Right now the data only lives
    // in component state and is logged to the browser console.
    console.log("Application submitted:", form);

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition";

  const labelClass = "block text-lg font-semibold mb-1";
  const helpClass = "text-sm text-gray-500 mb-2";

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-3xl mx-auto px-8 py-12">

        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="text-2xl font-bold text-red-700">
            Calgary Compass
          </Link>
          <Link
            href="/events"
            className="text-lg font-medium hover:text-red-700 transition"
          >
            &larr; Back to Events
          </Link>
        </nav>

        {submitted ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Thank you for applying!
            </h1>
            <p className="text-gray-700 text-lg mb-2">
              We&apos;ve received your application for the World Caf&eacute;:
              Foresight and Lunch event.
            </p>
            <p className="text-gray-600">
              Applications are reviewed on a rolling basis. You&apos;ll hear
              from us within one week.
            </p>
            <Link
              href="/events"
              className="inline-block mt-8 bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-800 transition"
            >
              Back to Events
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold text-red-700 mb-4">
                Wave Tech World Caf&eacute;
              </h1>
              <p className="text-xl text-gray-700 mb-2">Event Application</p>
              <p className="text-gray-600 max-w-xl mx-auto">
                We&apos;re excited you&apos;re interested in joining us! This
                application should take less than 5 minutes to complete.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* About You */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">About You</h2>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      Name <span className="text-red-700">*</span>
                    </label>
                    <p className={helpClass}>First and last name</p>
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
                      Email Address <span className="text-red-700">*</span>
                    </label>
                    <p className={helpClass}>
                      We&apos;ll use this to confirm your spot and send you
                      event materials
                    </p>
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
                      What field do you work or study in?
                    </label>
                    <p className={helpClass}>
                      e.g. technology, healthcare, energy, education, urban
                      planning, finance, etc.
                    </p>
                    <input
                      type="text"
                      value={form.fieldOfWork}
                      onChange={(e) => update("fieldOfWork", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Which best describes your current role?
                    </label>
                    <div className="space-y-2 mt-2">
                      {ROLES.map((role) => (
                        <label
                          key={role}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={form.role === role}
                            onChange={(e) => update("role", e.target.value)}
                            className="accent-red-700 w-4 h-4"
                          />
                          <span className="text-gray-800">{role}</span>
                        </label>
                      ))}
                    </div>
                    {form.role === "Other" && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        value={form.roleOther}
                        onChange={(e) => update("roleOther", e.target.value)}
                        className={`${inputClass} mt-3`}
                      />
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      How did you hear about this event?
                    </label>
                    <input
                      type="text"
                      value={form.hearAbout}
                      onChange={(e) => update("hearAbout", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* The Conversations */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-3">The Conversations</h2>
                <p className="text-gray-600 mb-6">
                  Before each World Caf&eacute;, we identify 20 emerging
                  technologies with the greatest potential to impact Calgary.
                  Tell us which technologies you think will be most relevant
                  over different time horizons. Each technology can only be
                  selected once across your answers.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      Greatest impact in the next 1 year?
                    </label>
                    <select
                      value={form.tech1}
                      onChange={(e) => update("tech1", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select a technology…</option>
                      {optionsFor("tech1").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Greatest impact in the next 2 years?
                    </label>
                    <select
                      value={form.tech2}
                      onChange={(e) => update("tech2", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select a technology…</option>
                      {optionsFor("tech2").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Greatest impact in the next 5 years?
                    </label>
                    <select
                      value={form.tech5}
                      onChange={(e) => update("tech5", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select a technology…</option>
                      {optionsFor("tech5").map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Event Logistics */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Event Logistics</h2>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      Dietary preferences or restrictions?
                    </label>
                    <div className="space-y-2 mt-2">
                      {DIETARY.map((diet) => (
                        <label
                          key={diet}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="dietary"
                            value={diet}
                            checked={form.dietary === diet}
                            onChange={(e) => update("dietary", e.target.value)}
                            className="accent-red-700 w-4 h-4"
                          />
                          <span className="text-gray-800">{diet}</span>
                        </label>
                      ))}
                    </div>
                    {form.dietary === "Other" && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        value={form.dietaryOther}
                        onChange={(e) =>
                          update("dietaryOther", e.target.value)
                        }
                        className={`${inputClass} mt-3`}
                      />
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      Do you have any accessibility needs we should be aware
                      of?
                    </label>
                    <p className={helpClass}>Optional</p>
                    <input
                      type="text"
                      value={form.accessibility}
                      onChange={(e) =>
                        update("accessibility", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* One Last Thing */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-3">One Last Thing</h2>
                <p className="text-gray-600 mb-6">
                  This event will include audio recordings of table
                  conversations for research purposes. All recordings are
                  confidential and will only be used to generate anonymized
                  summary reports.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      Do you consent to being recorded?{" "}
                      <span className="text-red-700">*</span>
                    </label>
                    <div className="space-y-2 mt-2">
                      {["Yes, I consent", "No, I do not consent"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="consent"
                              value={option}
                              checked={form.consent === option}
                              onChange={(e) =>
                                update("consent", e.target.value)
                              }
                              className="accent-red-700 w-4 h-4"
                            />
                            <span className="text-gray-800">{option}</span>
                          </label>
                        ),
                      )}
                    </div>
                    {form.consent === "No, I do not consent" && (
                      <p className="text-sm text-red-700 mt-3">
                        Consent to recording is required to participate in the
                        event.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      Is there anything else you&apos;d like us to know?
                    </label>
                    <p className={helpClass}>Optional</p>
                    <textarea
                      rows={4}
                      value={form.anythingElse}
                      onChange={(e) =>
                        update("anythingElse", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-800 transition"
                >
                  Submit Application
                </button>
                <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
                  Applications are reviewed on a rolling basis. You&apos;ll
                  hear from us within one week of applying. Preference is given
                  to applicants working in tech and innovation, but all are
                  welcome to apply.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
