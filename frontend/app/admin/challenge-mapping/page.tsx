"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://calgary-compass-api.onrender.com";

const CHALLENGES = [
  "Infrastructure, Traffic and Roads",
  "Crime, Safety and Policing",
  "Growth and Planning",
  "Transit",
  "Homelessness, Poverty and Affordable Housing",
  "Economy",
  "Water Supply/Infrastructure",
  "Environment and Waste Management",
  "Recreation and Parks",
  "Education",
];

export default function ChallengeMappingPage() {

  const [applications, setApplications] =
    useState<any[]>([]);

  const [links, setLinks] =
    useState<any[]>([]);

  const [challenge, setChallenge] =
    useState("");

  const [applicationId, setApplicationId] =
    useState("");

  const loadApplications = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/technology-applications`
      );

      setApplications(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadLinks = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/challenge-application-links`
      );

      setLinks(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadApplications();
    loadLinks();

  }, []);

  const createLink = async () => {

    if (!challenge) {

      alert("Select a challenge");

      return;
    }

    if (!applicationId) {

      alert("Select an application");

      return;
    }

    try {

      await axios.post(
        `${API_URL}/challenge-application-link`,
        {
          challenge,
          application_id:
            Number(applicationId),
          strength: 5,
        }
      );

      alert("Link created!");

      setChallenge("");
      setApplicationId("");

      loadLinks();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create link."
      );

    }

  };

  const deleteLink = async (
    linkId: number
  ) => {

    const confirmed = confirm(
      "Delete this mapping?"
    );

    if (!confirmed) return;

    try {

      await axios.delete(
        `${API_URL}/challenge-application-link/${linkId}`
      );

      loadLinks();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete mapping."
      );

    }

  };

  return (
    <main className="min-h-screen bg-white text-black p-10">

      {/* Title */}

      <h1 className="text-5xl font-bold text-red-700 mb-8">
        Challenge Mapping
      </h1>

      <p className="text-gray-600 mb-10 max-w-3xl">
        Connect Calgary challenges to
        technology applications. These
        relationships will power the
        Analytics Explorer and help
        identify which technologies may
        support community priorities.
      </p>

      {/* Create Mapping */}

      <div className="max-w-3xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">

        <h2 className="text-2xl font-semibold text-red-700 mb-6">
          Create Mapping
        </h2>

        <label className="block mb-2 font-medium">
          Community Challenge
        </label>

        <select
          value={challenge}
          onChange={(e) =>
            setChallenge(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            mb-6
          "
        >

          <option value="">
            Select Challenge
          </option>

          {CHALLENGES.map(
            (item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            )
          )}

        </select>

        <label className="block mb-2 font-medium">
          Technology Application
        </label>

        <select
          value={applicationId}
          onChange={(e) =>
            setApplicationId(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            mb-6
          "
        >

          <option value="">
            Select Application
          </option>

          {applications.map(
            (app) => (

              <option
                key={app.id}
                value={app.id}
              >
                {app.name}
              </option>

            )
          )}

        </select>

        <button
          onClick={createLink}
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Create Mapping
        </button>

      </div>

      {/* Existing Mappings */}

      <div>

        <h2 className="text-3xl font-bold text-red-700 mb-6">
          Existing Mappings
        </h2>

        {links.length === 0 ? (

          <p className="text-gray-500">
            No mappings found.
          </p>

        ) : (

          <div className="space-y-4">

            {links.map((link) => {

              const application =
                applications.find(
                  (app) =>
                    app.id ===
                    link.application_id
                );

              return (

                <div
                  key={link.id}
                  className="
                    border
                    border-gray-200
                    rounded-2xl
                    p-5
                    flex
                    justify-between
                    items-center
                    bg-white
                    shadow-sm
                  "
                >

                  <div>

                    <div className="font-semibold text-lg">

                      {link.challenge}

                      <span className="mx-3 text-gray-400">
                        →
                      </span>

                      {application?.name ||
                        "Unknown Application"}

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteLink(
                        link.id
                      )
                    }
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      font-medium
                    "
                  >
                    Delete
                  </button>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </main>
  );
}
