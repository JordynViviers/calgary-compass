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
