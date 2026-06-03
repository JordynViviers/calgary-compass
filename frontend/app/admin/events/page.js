"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API_URL = "https://calgary-compass-api.onrender.com";

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition";
const labelClass = "block text-lg font-semibold mb-1";
const helpClass = "text-sm text-gray-500 mb-2";

function AdminNav() {
  return (
    <nav className="flex flex-wrap justify-between items-center gap-4 mb-10">
      <Link href="/admin" className="text-2xl font-bold text-red-700">
        Calgary Compass <span className="text-black">Admin</span>
      </Link>
      <div className="flex gap-8 text-lg font-medium">
        <Link
          href="/admin/technologies"
          className="hover:text-red-700 transition"
        >
          Technologies
        </Link>
        <Link href="/admin/events" className="text-red-700 font-semibold">
          In-Person Events
        </Link>
        <Link
          href="/admin/community-input"
          className="hover:text-red-700 transition"
        >
          Community Input
        </Link>
      </div>
    </nav>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-gray-900">
        {value && String(value).trim() ? value : "—"}
      </p>
    </div>
  );
}

export default function AdminEventsPage() {
  // ----- Events -----
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventSaving, setEventSaving] = useState(false);
  const [eventError, setEventError] = useState("");

  // ----- Applications -----
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      if (!res.ok) throw new Error("Request failed");
      setEvents(await res.json());
    } catch (err) {
      console.error(err);
      setEventError("Could not load events.");
    }
  };

  const loadApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/applications`);
      if (!res.ok) throw new Error("Request failed");
      setApplications(await res.json());
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
    loadEvents();
    loadApplications();
  }, []);

  const clearEventForm = () => {
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
    setLink("");
    setEditingEventId(null);
    setEventError("");
  };

  const submitEvent = async () => {
    if (!title.trim()) {
      setEventError("Please enter a title.");
      return;
    }
    setEventSaving(true);
    setEventError("");
    try {
      const payload = { title, date, location, description, link };
      const url = editingEventId
        ? `${API_URL}/event/${editingEventId}`
        : `${API_URL}/event`;
      const method = editingEventId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");

      clearEventForm();
      loadEvents();
    } catch (err) {
      console.error(err);
      setEventError("Something went wrong saving the event. Please try again.");
    } finally {
      setEventSaving(false);
    }
  };

  const editEvent = (ev) => {
    setEditingEventId(ev.id);
    setTitle(ev.title || "");
    setDate(ev.date || "");
    setLocation(ev.location || "");
    setDescription(ev.description || "");
    setLink(ev.link || "");
    setEventError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await fetch(`${API_URL}/event/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      loadEvents();
    } catch (err) {
      console.error(err);
      setEventError("Could not delete the event.");
    }
  };

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

    const escape = (val) => {
      const s = val === null || val === undefined ? "" : String(val);
      return `"${s.replace(/"/g, '""')}"`;
    };

    const rows = applications.map((a) =>
      columns.map((c) => escape(a[c])).join(","),
    );
    const csv = [columns.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const visible = applications
    .filter((a) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (a.name || "").toLowerCase().includes(q) ||
        (a.email || "").toLowerCase().includes(q) ||
        (a.field_of_work || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (b.id || 0) - (a.id || 0));

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-5xl mx-auto px-8 py-12">

        <AdminNav />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-700">
            In-Person Events
          </h1>
          <p className="text-gray-600 mt-1">
            Add or edit events, and review World Café applications.
          </p>
        </div>

        {/* ===== Event editor ===== */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-red-700 mb-6">
            {editingEventId ? "Edit Event" : "Add an Event"}
          </h2>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Title</label>
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Date</label>
              <p className={helpClass}>
                Type it how it should appear, e.g. July 21, 2026
              </p>
              <input
                className={inputClass}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                className={inputClass}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={3}
                className={inputClass}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Learn More link</label>
              <p className={helpClass}>
                Optional. Where the &quot;Learn More&quot; button goes, e.g.
                /apply. Leave blank for no button.
              </p>
              <input
                className={inputClass}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {eventError && (
              <p className="text-red-700 font-medium">{eventError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={submitEvent}
                disabled={eventSaving}
                className="bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition disabled:opacity-60"
              >
                {eventSaving
                  ? "Saving…"
                  : editingEventId
                    ? "Update Event"
                    : "Add Event"}
              </button>
              {editingEventId && (
                <button
                  onClick={clearEventForm}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ===== Current events ===== */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-5">Current Events</h2>

          {events.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
              No events yet. Add one with the form above.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-start gap-4"
                >
                  <div>
                    <h3 className="text-xl font-bold text-red-700">
                      {ev.title}
                    </h3>
                    <p className="text-gray-600">
                      {ev.date}
                      {ev.date && ev.location ? " · " : ""}
                      {ev.location}
                    </p>
                    {ev.description && (
                      <p className="text-gray-700 mt-2">{ev.description}</p>
                    )}
                    {ev.link && (
                      <p className="text-sm text-gray-500 mt-2">
                        Link: {ev.link}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => editEvent(ev)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(ev.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===== Applications ===== */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">World Café Applications</h2>
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

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or field…"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
        />

        {error && <p className="text-red-700 font-medium mb-6">{error}</p>}

        {loading && applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
            Loading applications…
          </div>
        ) : visible.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
            {applications.length === 0
              ? "No applications yet."
              : "No applications match your search."}
          </div>
        ) : (
          <div className="space-y-6">
            {visible.map((a) => (
              <div
                key={a.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-5">
                  <h3 className="text-2xl font-bold text-red-700">
                    {a.name || "Unnamed applicant"}
                  </h3>
                  <span className="text-sm text-gray-500">#{a.id}</span>
                </div>

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
                  <Detail label="Field" value={a.field_of_work} />
                  <Detail label="Heard via" value={a.hear_about} />
                  <Detail label="Tech — 1 year" value={a.tech_1_year} />
                  <Detail label="Tech — 2 years" value={a.tech_2_year} />
                  <Detail label="Tech — 5 years" value={a.tech_5_year} />
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
