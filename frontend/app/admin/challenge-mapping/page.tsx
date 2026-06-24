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

  const [draggedApplication, setDraggedApplication] =
    useState<any>(null);

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

  const createDragMapping = async (
    challenge: string,
    applicationId: number
  ) => {

    const duplicate =
      links.find(
        (link) =>
          link.challenge === challenge &&
          link.application_id ===
            applicationId
      );

    if (duplicate) {

      return;

    }

    try {

      await axios.post(
        `${API_URL}/challenge-application-link`,
        {
          challenge,
          application_id:
            applicationId,
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

    <main className="min-h-screen bg-white text-black p-10">

      <h1 className="text-5xl font-bold text-red-700 mb-8">
        Challenge Mapping
      </h1>

      <p className="text-gray-600 mb-10 max-w-3xl">
        Connect Calgary challenges to
        technology applications.
        Drag applications into challenge
        areas to create relationships
        that power the Analytics Explorer.
      </p>

      {/* APPLICATION LIBRARY */}

      <div className="sticky top-28 z-10 bg-white pb-6 mb-12">

        <h2 className="text-3xl font-bold text-red-700 mb-6">
          Applications Library
        </h2>

        <div className="flex flex-wrap gap-3">

          {applications.map((app) => (

            <div
              key={app.id}
              draggable
              onDragStart={() =>
                setDraggedApplication(app)
              }
              className="
                bg-white
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                shadow-sm
                cursor-grab
                hover:shadow-md
                transition
              "
            >
              {app.name}
            </div>

          ))}

        </div>

      </div>

      {/* CHALLENGE MAPPING */}

      <div>

        <h2 className="text-3xl font-bold text-red-700 mb-6">
          Challenge Mapping
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {CHALLENGES.map(
            (challenge) => {

              const challengeLinks =
                links.filter(
                  (link) =>
                    link.challenge ===
                    challenge
                );

              return (

                <div
                  key={challenge}
                  onDragOver={(e) =>
                    e.preventDefault()
                  }
                  onDrop={() => {

                    if (
                      !draggedApplication
                    ) {
                      return;
                    }

                    createDragMapping(
                      challenge,
                      draggedApplication.id
                    );

                  }}
                  className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    p-6
                    shadow-sm
                    min-h-[250px]
                  "
                >

                  <h3 className="text-xl font-semibold text-red-700 mb-4">
                    {challenge}
                  </h3>

                  <div className="space-y-3">

                    {challengeLinks.length ===
                      0 && (

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
                        Drag applications
                        here
                      </div>

                    )}

                    {challengeLinks.map(
                      (link) => {

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
                              bg-gray-50
                              border
                              border-gray-200
                              rounded-xl
                              px-4
                              py-3
                              flex
                              justify-between
                              items-center
                            "
                          >

                            <span>
                              {application?.name ||
                                "Unknown Application"}
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

                      }
                    )}

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>

    </main>

  );

}
