"use client";

import { useEffect, useState } from "react";

const API_URL = "https://calgary-compass-api.onrender.com";

const EMPTY_FORM = {
  title: "",
  date: "",
  location: "",
  description: "",
  link: "",
  has_application: false,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/events`);
      if (!res.ok) throw new Error("Request failed");
      setEvents(await res.json());
    } catch (err) {
      console.error(err);
      setError("Could not load events. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    setSaving(true);

    try {
      const url = editingId
        ? `${API_URL}/event/${editingId}`
        : `${API_URL}/event`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          date: form.date,
          location: form.location,
          description: form.description,
          link: form.link,
          has_application: form.has_application,
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      setForm(EMPTY_FORM);
      setEditingId(null);
      await loadEvents();
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving the event. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (ev) => {
    setEditingId(ev.id);
    setForm({
      title: ev.title || "",
      date: ev.date || "",
      location: ev.location || "",
      description: ev.description || "",
      link: ev.link || "",
      has_application: !!ev.has_application,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;

    try {
      const res = await fetch(`${API_URL}/event/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      if (editingId === id) cancelEdit();
      await loadEvents();
    } catch (err) {
      console.error(err);
      setError("Could not delete that event. Please try again.");
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

      <div className="max-w-3xl mx-auto px-8 pt-6 pb-12">

        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-red-700 mb-3">
            In-Person Events
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Add, edit, or remove the events shown on the public Events page.
          </p>
        </div>

        {/* Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6"
        >
          <h2 className="text-2xl font-bold">
            {editingId ? "Edit Event" : "Add an Event"}
          </h2>

          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Date</label>
            <p className={helpClass}>
              Type it how it should appear, e.g. July 21, 2026
            </p>
            <input
              type="text"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Learn More link</label>
            <p className={helpClass}>
              Optional. Where the &quot;Learn More&quot; button goes, e.g. /apply.
              Leave blank for no button.
            </p>
            <input
              type="text"
              value={form.link}
              onChange={(e) => update("link", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Attach Application */}
          <div className="border-t border-gray-100 pt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.has_application}
                onChange={(e) => update("has_application", e.target.checked)}
                className="mt-1 h-5 w-5 accent-red-700"
              />
              <span>
                <span className="block text-lg font-semibold">
                  Attach the event application form
                </span>
                <span className="block text-sm text-gray-500">
                  When checked, an &quot;Apply Now&quot; button appears on this
                  event on the public Events page. It opens our built-in
                  application form, and submissions show up under Applications
                  in the admin, tagged with this event.
                </span>
              </span>
            </label>
          </div>

          {error && <p className="text-red-700 font-medium">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition disabled:opacity-60"
            >
              {saving
                ? "Saving…"
                : editingId
                  ? "Save Changes"
                  : "Add Event"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Current Events */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Current Events</h2>

          {loading ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-600 shadow-sm">
              Loading events…
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-600 shadow-sm">
              No events yet. Add one with the form above.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl font-bold text-red-700">
                      {ev.title}
                    </h3>
                    {ev.date && ev.date.trim() && (
                      <p className="text-gray-600">{ev.date}</p>
                    )}
                    {ev.location && ev.location.trim() && (
                      <p className="text-gray-600">{ev.location}</p>
                    )}
                    {ev.description && ev.description.trim() && (
                      <p className="text-gray-700 mt-2">{ev.description}</p>
                    )}
                    {ev.has_application && (
                      <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wide bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1">
                        Application attached
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(ev)}
                      className="border-2 border-red-700 text-red-700 px-4 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="border-2 border-gray-300 text-gray-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
