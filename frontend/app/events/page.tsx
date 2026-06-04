"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const API_URL = "https://calgary-compass-api.onrender.com";

type EventItem = {
  id: number;
  title: string;
  date?: string;
  location?: string;
  description?: string;
  link?: string;
};

function LearnMoreButton({ link }: { link?: string }) {
  if (!link || !link.trim()) return null;

  const isExternal = /^https?:\/\//i.test(link);

  if (isExternal) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border-2 border-red-700 text-red-700 px-5 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition"
      >
        Learn More
      </a>
    );
  }

  return (
    <Link
      href={link}
      className="inline-block border-2 border-red-700 text-red-700 px-5 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition"
    >
      Learn More
    </Link>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`);
        if (!res.ok) throw new Error("Request failed");
        setEvents(await res.json());
      } catch (err) {
        console.error(err);
        setError("Could not load events right now. Please check back soon.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        <Navbar />

        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-red-700 mb-4">
            In-Person Events
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Join foresight conversations shaping Calgary&apos;s smart city
            future.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Upcoming Events
          </h2>

          {loading ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
              Loading events…
            </div>
          ) : error ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-red-700 shadow-sm">
              {error}
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600 shadow-sm">
              No upcoming events right now. Please check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-bold text-red-700 mb-3">
                    {ev.title}
                  </h3>

                  {ev.date && ev.date.trim() && (
                    <p className="text-gray-600 mb-2">{ev.date}</p>
                  )}

                  {ev.location && ev.location.trim() && (
                    <p className="text-gray-600 mb-4">{ev.location}</p>
                  )}

                  {ev.description && ev.description.trim() && (
                    <p className="text-gray-700 mb-6">{ev.description}</p>
                  )}

                  <LearnMoreButton link={ev.link} />
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
