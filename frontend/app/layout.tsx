"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API_URL = "https://calgary-compass-api.onrender.com";

type Application = {
  id?: number;
  name?: string;
  email?: string;
  field_of_work?: string;
  role?: string;
  role_other?: string;
  hear_about?: string;
  tech_1_year?: string;
  tech_2_year?: string;
  tech_5_year?: string;
  dietary?: string;
  dietary_other?: string;
  accessibility?: string;
  recording_consent?: string;
  anything_else?: string;
};

type DetailProps = {
  label: string;
  value: string | number | null | undefined;
};

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>

      <p className="text-gray-900">
        {value && String(value).trim()
          ? value
          : "—"}
      </p>
    </div>
  );
}

export default function AdminPage() {
  const [applications, setApplications] =
  useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadApplications = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/applications`);

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data: Application[] =
        await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong loading applications. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const exportCsv = () => {
    const columns = [
      "id",
      "name",
      "email",
      "field_of_work",
      "role",
      "role_other",
      "hear_about",
      "tech_1_year",
      "tech_2_year",
      "tech_5_year",
      "dietary",
      "dietary_other",
      "accessibility",
      "recording_consent",
      "anything_else",
    ];

const escape = (
  val: string | number | null | undefined
) => {

  const s =
    val === null ||
    val === undefined
      ? ""
      : String(val);

  return `"${s.replace(/"/g, '""')}"`;

};

    const rows = applications.map(
      (a: Application) =>
        columns
          .map((c) =>
            escape(
              a[
                c as keyof Application
              ]
            )
          )
          .join(",")
    );

    const csv = [columns.join(","), ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "applications.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const visible = applications
    .filter((a: Application) => {
      const q = search.trim().toLowerCase();

      if (!q) return true;

      return (
        (a.name || "").toLowerCase().includes(q) ||
        (a.email || "").toLowerCase().includes(q) ||
        (a.field_of_work || "").toLowerCase().includes(q)
      );
    })
    .sort(
      (
        a: Application,
        b: Application
      ) => (b.id || 0) - (a.id || 0));

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      {/* TOP RED BAR */}
      <div className="h-2 bg-red-700 w-full"></div>

      {/* PAGE CONTAINER */}
      <div className="max-w-5xl mx-auto px-8 pt-4 pb-12">

        {/* NAVIGATION */}
        <nav className="flex items-center justify-between h-16 mb-8">
          <Link href="/" className="text-2xl font-bold text-red-700">
            Calgary Compass
          </Link>

          <div className="flex items-center gap-6 text-base font-medium">
            <Link
              href="/admin"
              className="hover:text-red-700 transition"
            >
              Technologies Admin
            </Link>

            <Link
              href="/admin/results"
              className="hover:text-red-700 transition"
            >
              Survey Results
            </Link>

            <Link
              href="/admin/community-input-responses"
              className="hover:text-red-700 transition"
            >
              Community Input
            </Link>
          </div>
        </nav>

        {/* PAGE HEADER */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-700">
              Applications
            </h1>

            <p className="text-gray-600 mt-1">
              {applications.length} total
              {search.trim() && ` · ${visible.length} matching`}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadApplications}
              disabled={loading}
              className="border-2 border-red-700 text-red-700 px-4 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition disabled:opacity-60"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>

            <button
              onClick={exportCsv}
              disabled={applications.length === 0}
              className="bg-red-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-800 transition disabled:opacity-60"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or field…"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-700 font-medium mb-6">
            {error}
          </p>
        )}

        {/* LOADING */}
        {loading && applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
            Loading applications…
          </div>
        ) : visible.length === 0 ? (

          /* EMPTY */
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
            {applications.length === 0
              ? "No applications yet."
              : "No applications match your search."}
          </div>

        ) : (

          /* APPLICATIONS */
          <div className="space-y-6">
            {visible.map(
              (a: Application) => (
                <div
                  key={a.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                >
                {/* CARD HEADER */}
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-5">
                  <h2 className="text-2xl font-bold text-red-700">
                    {a.name || "Unnamed applicant"}
                  </h2>

                  <span className="text-sm text-gray-500">
                    #{a.id}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <Detail label="Email" value={a.email} />

                  <Detail
                    label="Role"
                    value={
                      a.role === "Other" && a.role_other
                        ? `Other — ${a.role_other}`
                        : a.role
                    }
                  />

                  <Detail
                    label="Field"
                    value={a.field_of_work}
                  />

                  <Detail
                    label="Heard via"
                    value={a.hear_about}
                  />

                  <Detail
                    label="Tech — 1 year"
                    value={a.tech_1_year}
                  />

                  <Detail
                    label="Tech — 2 years"
                    value={a.tech_2_year}
                  />

                  <Detail
                    label="Tech — 5 years"
                    value={a.tech_5_year}
                  />

                  <Detail
                    label="Dietary"
                    value={
                      a.dietary === "Other" && a.dietary_other
                        ? `Other — ${a.dietary_other}`
                        : a.dietary
                    }
                  />

                  <Detail
                    label="Recording consent"
                    value={a.recording_consent}
                  />
                </div>

                {/* OPTIONAL SECTION */}
                {(a.accessibility || a.anything_else) && (
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                    {a.accessibility && (
                      <Detail
                        label="Accessibility needs"
                        value={a.accessibility}
                      />
                    )}

                    {a.anything_else && (
                      <Detail
                        label="Anything else"
                        value={a.anything_else}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
