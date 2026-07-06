"use client";

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function AdminHome() {

  const [authenticated, setAuthenticated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [password, setPassword] =
    useState("");

  useEffect(() => {

    const savedPassword =
      localStorage.getItem(
        "adminPassword"
      );

    if (!savedPassword) {

      setLoading(false);

      return;

    }

    axios.post(

      `${API_URL}/admin/login`,

      {},

      {
        headers: {
          "x-admin-password":
            savedPassword,
        },
      }

    )

    .then(() => {

      setAuthenticated(true);

      setLoading(false);

    })

    .catch(() => {

      localStorage.removeItem(
        "adminPassword"
      );

      setLoading(false);

    });

  }, []);

  const login = async () => {

    try {

      await axios.post(

        `${API_URL}/admin/login`,

        {},

        {
          headers: {
            "x-admin-password":
              password,
          },
        }

      );

      localStorage.setItem(
        "adminPassword",
        password
      );

      setAuthenticated(true);

    }

    catch {

      alert(
        "Incorrect password"
      );

    }

  };

  const logout = () => {

    localStorage.removeItem(
      "adminPassword"
    );

    setAuthenticated(false);

    setPassword("");

  };

  if (loading) {

    return null;

  }

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-6">

        <div className="w-full max-w-md border border-gray-200 rounded-2xl p-8 shadow-sm bg-white">

          <h1 className="text-3xl font-bold text-red-700 mb-2">
            Admin Access
          </h1>

          <p className="text-gray-600 mb-6">
            Enter password to access Calgary Compass administration.
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-red-400
            "
          />

          <button
            onClick={login}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              rounded-xl
              p-3
              font-semibold
              transition
            "
          >
            Login
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* Hero */}
      <section className="relative flex flex-col justify-center items-center min-h-[80vh] px-10 overflow-hidden">

        {/* Background Compass */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[18px]">
          <div className="relative w-[90vw] max-w-[620px] aspect-square opacity-15">
            <div className="absolute inset-0 rounded-full border-[6px] border-red-700" />
            <div className="absolute inset-10 rounded-full border-2 border-red-700" />
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-red-700 -translate-x-1/2" />
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-700 -translate-y-1/2" />
            <div className="absolute inset-0 rotate-45">
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-700 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-700 -translate-y-1/2" />
            </div>
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">
              N
            </span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">
              S
            </span>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">
              W
            </span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">
              E
            </span>
          </div>

          {/* Animated Needle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-[90vw] max-w-[620px] aspect-square"
              style={{
                animation: "spin 12s ease-in-out infinite",
              }}
            >
              <div
                className="
                  absolute left-1/2 top-1/2 w-0 h-0
                  border-l-[14px] border-r-[14px] border-b-[180px]
                  border-l-transparent border-r-transparent border-b-red-700
                  -translate-x-1/2 -translate-y-full
                "
              />
              <div
                className="
                  absolute left-1/2 top-1/2 w-0 h-0
                  border-l-[14px] border-r-[14px] border-t-[180px]
                  border-l-transparent border-r-transparent border-t-gray-500
                  -translate-x-1/2
                "
              />
              <div
                className="
                  absolute left-1/2 top-1/2 w-6 h-6
                  bg-red-700 rounded-full
                  -translate-x-1/2 -translate-y-1/2
                "
              />
            </div>
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-5xl w-full">
        
          {/* Logout */}
          <div className="flex justify-end mt-8 mb-6">
        
            <button
              onClick={logout}
              className="
                bg-gray-700
                hover:bg-gray-800
                text-white
                px-5
                py-2
                rounded-xl
                font-medium
                transition
              "
            >
              Logout
            </button>
        
          </div>
        
          <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">
            Calgary Compass
          </h1>
          <p className="text-2xl mb-12">
            Admin Dashboard
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

            <Link
              href="/admin/technologies"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Edit Technologies
              </h2>
              <p className="text-gray-600">
                Create, update, and remove technologies and their statuses.
              </p>
            </Link>

            <Link
              href="/admin/events"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                In-Person Events
              </h2>
              <p className="text-gray-600">
                Manage events and review World Caf&eacute; applications.
              </p>
            </Link>

            <Link
              href="/admin/community-input"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                View Community Input
              </h2>
              <p className="text-gray-600">
                See survey ratings by technology and community signals.
              </p>
            </Link>

            <Link
              href="/admin/applications"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                View Applications
              </h2>
              <p className="text-gray-600">
                See application responses.
              </p>
            </Link>

            <Link
              href="/admin/watchlist"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                AI Technology Watchlist
              </h2>
              <p className="text-gray-600">
                View AI-identified upcoming technologies that have yet to be considered. 
              </p>
            </Link>

            <Link
              href="/admin/challenge-mapping"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Challenge Mapping
              </h2>
              <p className="text-gray-600">
                Connect technology applications to community challenges that they have the potential to solve.  
              </p>
            </Link>

            <Link
              href="/admin/techApplications"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-300 transition"
            >
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Technology Applications
              </h2>
              <p className="text-gray-600">
                View and edit the applications of each technology. 
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(45deg); }
          40% { transform: rotate(-20deg); }
          60% { transform: rotate(120deg); }
          80% { transform: rotate(75deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
