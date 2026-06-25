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

 const [selectedApplications, setSelectedApplications] =
  useState<any[]>([]);

  const [search, setSearch] =
    useState("");
  
  const toggleApplication = (
    application: any
  ) => {
  
    const exists =
      selectedApplications.some(
        (app) =>
          app.id === application.id
      );
  
    if (exists) {
  
      setSelectedApplications(
        selectedApplications.filter(
          (app) =>
            app.id !== application.id
        )
      );
  
    } else {
  
      setSelectedApplications([
        ...selectedApplications,
        application,
      ]);
  
    }
  
  };
  
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
  
    if (
      selectedApplications.length === 0
    ) {
  
      alert(
        "Select one or more applications first."
      );
  
      return;
  
    }
  
    try {
  
      for (const application of selectedApplications) {
  
        const duplicate =
          links.find(
            (link) =>
              link.challenge === challenge &&
              link.application_id ===
                application.id
          );
  
        if (duplicate) {
  
          continue;
  
        }
  
        await axios.post(
          `${API_URL}/challenge-application-link`,
          {
            challenge,
            application_id:
              application.id,
            strength: 5,
          }
        );
  
      }
  
      await loadLinks();
  
      setSelectedApplications([]);
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Failed to create mappings."
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
            selectedApplications.some(
              (item) =>
                item.id === app.id
            );
      
          return (
      
            <button
              key={app.id}
              onClick={() =>
                toggleApplication(app)
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
      
              <div className="flex items-center gap-3">
      
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  className="
                    h-5
                    w-5
                    accent-red-700
                  "
                />
      
                <div className="font-semibold text-lg">
      
                  {app.name}
      
                </div>
      
              </div>
      
            </button>
      
          );
      
        })}
      
      </div>

    </div>

    {/* Selected Applications */}

    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">
    
      <div className="flex justify-between items-center mb-5">
    
        <h2 className="text-2xl font-semibold text-red-700">
    
          Selected Applications
          {selectedApplications.length > 0 &&
            ` (${selectedApplications.length})`}
    
        </h2>
    
        {selectedApplications.length > 0 && (
    
          <button
            onClick={() =>
              setSelectedApplications([])
            }
            className="
              bg-gray-200
              hover:bg-gray-300
              px-5
              py-2
              rounded-xl
              font-medium
              transition
            "
          >
            Clear All
          </button>
    
        )}
    
      </div>
    
      {selectedApplications.length === 0 ? (
    
        <p className="text-gray-500">
          Select one or more applications above.
        </p>
    
      ) : (
    
        <div className="flex flex-wrap gap-3">
    
          {selectedApplications.map((application) => (
    
            <div
              key={application.id}
              className="
                flex
                items-center
                gap-3
                bg-red-50
                border
                border-red-200
                rounded-full
                px-4
                py-2
              "
            >
    
              <span className="font-medium">
    
                {application.name}
    
              </span>
    
              <button
                onClick={() =>
                  toggleApplication(application)
                }
                className="
                  text-red-700
                  hover:text-red-900
                  font-bold
                "
              >
                ✕
              </button>
    
            </div>
    
          ))}
    
        </div>
    
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

          const newApplications =
            selectedApplications.filter(
              (application) =>
                !challengeLinks.some(
                  (link) =>
                    link.application_id ===
                    application.id
                )
            );

          const duplicateCount =
            selectedApplications.length -
            newApplications.length;

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

                {selectedApplications.length > 0 ? (

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
                  
                    {newApplications.length === 0
                      ? "Already Added"
                      : `+ Add ${newApplications.length} Selected`}
                  
                  </button>

                ) : (

                  <span className="text-gray-400 text-sm">
                    Select one or more applications
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
