"use client";

import { useEffect, useMemo, useState } from "react";
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

  const [selectedApplication, setSelectedApplication] =
    useState<any | null>(null);

  const [search,
    setSearch] =
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

  const filteredApplications =
    useMemo(() => {

      return applications.filter(
        (app) =>
          app.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [applications, search]);

  const addMapping = async (
    challenge: string
  ) => {

    if (!selectedApplication) {

      alert(
        "Select an application first."
      );

      return;

    }

    const duplicate =
      links.find(
        (link) =>
          link.challenge === challenge &&
          link.application_id ===
            selectedApplication.id
      );

    if (duplicate) {

      alert(
        "This mapping already exists."
      );

      return;

    }

    try {

      await axios.post(
        `${API_URL}/challenge-application-link`,
        {
          challenge,
          application_id:
            selectedApplication.id,
          strength: 5,
        }
      );

      loadLinks();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create mapping."
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

  <main className="min-h-screen bg-gray-50 text-black p-10">

    {/* Header */}

    <h1 className="text-5xl font-bold text-red-700 mb-4">
      Challenge Mapping
    </h1>

    <p className="text-gray-600 mb-10 max-w-4xl">
      Select a technology application from the library below,
      then click <strong>Add Selected</strong> on any community
      challenge. Applications can belong to multiple challenges,
      but duplicate mappings are automatically prevented.
    </p>

    {/* Applications Library */}

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <h2 className="text-2xl font-semibold text-red-700">
          Applications Library
        </h2>

        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            lg:w-80
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-red-400
          "
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {filteredApplications.map((app) => {

          const selected =
            selectedApplication?.id === app.id;

          return (

            <button
              key={app.id}
              onClick={() =>
                setSelectedApplication(app)
              }
              className={`
                text-left
                rounded-2xl
                border
                p-5
                transition
                ${
                  selected
                    ? "border-red-700 bg-red-50 shadow-md"
                    : "border-gray-200 bg-white hover:shadow-md hover:border-red-300"
                }
              `}
            >

              <div className="font-semibold text-lg">

                {app.name}

              </div>

            </button>

          );

        })}

      </div>

    </div>

    {/* Selected Application */}

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">

      <h2 className="text-2xl font-semibold text-red-700 mb-4">
        Selected Application
      </h2>

      {selectedApplication ? (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <div className="text-xl font-semibold">

              {selectedApplication.name}

            </div>

            <p className="text-gray-500 mt-2">
              Click <strong>Add Selected</strong> on any challenge
              below to create a mapping.
            </p>

          </div>

          <button
            onClick={() =>
              setSelectedApplication(null)
            }
            className="
              bg-gray-200
              hover:bg-gray-300
              px-6
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Clear Selection
          </button>

        </div>

      ) : (

        <p className="text-gray-500">
          No application selected.
        </p>

      )}

    </div>

    {/* Challenge Cards */}

    <div>

      <h2 className="text-3xl font-bold text-red-700 mb-6">
        Community Challenges
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {CHALLENGES.map((challenge) => {

          const challengeLinks =
            links.filter(
              (link) =>
                link.challenge === challenge
            );

          const alreadyAdded =
            selectedApplication &&
            challengeLinks.some(
              (link) =>
                link.application_id ===
                selectedApplication.id
            );

          return (

            <div
              key={challenge}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
                shadow-sm
              "
            >

              <div className="flex justify-between items-center mb-5">

                <h3 className="text-xl font-semibold text-red-700">
                  {challenge}
                </h3>

                {selectedApplication ? (

                  alreadyAdded ? (

                    <span
                      className="
                        text-green-600
                        font-semibold
                        text-sm
                      "
                    >
                      ✓ Already Added
                    </span>

                  ) : (

                    <button
                      onClick={() =>
                        addMapping(challenge)
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        font-medium
                        transition
                      "
                    >
                      + Add Selected
                    </button>

                  )

                ) : (

                  <span className="text-gray-400 text-sm">
                    Select an application
                  </span>

                )}

              </div>

              {challengeLinks.length === 0 ? (

                <div
                  className="
                    border-2
                    border-dashed
                    border-gray-300
                    rounded-xl
                    p-6
                    text-center
                    text-gray-400
                  "
                >
                  No applications mapped yet.
                </div>

              ) : (

                <div className="space-y-3">

                  {challengeLinks.map((link) => {

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
                          flex
                          justify-between
                          items-center
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50
                          px-4
                          py-3
                        "
                      >

                        <span className="font-medium">
                          {application?.name}
                        </span>

                        <button
                          onClick={() =>
                            deleteLink(
                              link.id
                            )
                          }
                          className="
                            text-red-600
                            hover:text-red-700
                            font-medium
                          "
                        >
                          Remove
                        </button>

                      </div>

                    );

                  })}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </div>

  </main>

);

}
