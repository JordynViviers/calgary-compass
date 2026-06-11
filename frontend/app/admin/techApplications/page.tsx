"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function TechApplicationsPage() {

  const [technologies, setTechnologies] =
    useState<any[]>([]);

  const [applications, setApplications] =
    useState<any[]>([]);

  const [technologyId, setTechnologyId] =
    useState("");

  const [applicationName, setApplicationName] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
  
    // Load technologies
  
    try {
  
      const techResponse =
        await axios.get(
          `${API_URL}/technologies`
        );
  
      console.log(
        "Loaded technologies:",
        techResponse.data
      );
  
      setTechnologies(
        techResponse.data
      );
  
    } catch (error) {
  
      console.error(
        "Failed to load technologies",
        error
      );
  
    }
  
    // Load applications
  
    try {
  
      const appResponse =
        await axios.get(
          `${API_URL}/technology-applications`
        );
  
      console.log(
        "Loaded applications:",
        appResponse.data
      );
  
      setApplications(
        appResponse.data
      );
  
    } catch (error) {
  
      console.error(
        "Failed to load applications",
        error
      );
  
    }
  }
  async function createApplication() {

    if (
      !technologyId ||
      !applicationName
    ) {
      alert(
        "Please select a technology and enter an application name."
      );
      return;
    }

    try {

      await axios.post(
        `${API_URL}/technology-applications`,
        {
          technology_id:
            Number(technologyId),
          name:
            applicationName,
          description: "",
        }
      );

      setApplicationName("");

      loadData();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create application."
      );
    }
  }

  async function deleteApplication(
    applicationId: number
  ) {

    try {

      await axios.delete(
        `${API_URL}/technology-applications/${applicationId}`
      );

      loadData();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete application."
      );
    }
  }

  function getTechnologyName(
    technologyId: number
  ) {

    const technology =
      technologies.find(
        (technology) =>
          technology.id === technologyId
      );

    return technology
      ? technology.name
      : "Unknown Technology";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold text-red-700">
              Technology Applications
            </h1>

            <p className="text-gray-600 mt-2">
              Manage applications and use cases for technologies.
            </p>

          </div>

          <Link
            href="/admin"
            className="
              bg-gray-100
              hover:bg-gray-200
              px-5
              py-3
              rounded-xl
            "
          >
            ← Back to Dashboard
          </Link>

        </div>

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
            mb-8
          "
        >

          <h2 className="text-2xl font-bold mb-4">
            Add Application
          </h2>

          <select
            value={technologyId}
            onChange={(e) =>
              setTechnologyId(
                e.target.value
              )
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
              mb-4
            "
          >
            <option value="">
              Select Technology
            </option>

            {technologies.map(
              (technology) => (
                <option
                  key={technology.id}
                  value={technology.id}
                >
                  {technology.name}
                </option>
              )
            )}

          </select>

          <input
            value={applicationName}
            onChange={(e) =>
              setApplicationName(
                e.target.value
              )
            }
            placeholder="Application Name"
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
              mb-4
            "
          />

          <button
            onClick={createApplication}
            className="
              bg-red-700
              hover:bg-red-800
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Add Application
          </button>

        </div>

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
          "
        >

          <h2 className="text-2xl font-bold mb-6">
            Existing Applications
          </h2>
          
          <div className="space-y-8">
          
            {technologies.map((technology) => {
          
              const techApplications =
                applications.filter(
                  (application) =>
                    application.technology_id ===
                    technology.id
                );
          
              if (techApplications.length === 0) {
                return null;
              }
          
              return (
          
                <div
                  key={technology.id}
                  className="
                    border
                    border-gray-200
                    rounded-2xl
                    p-5
                  "
                >
          
                  <h3 className="text-xl font-bold text-red-700 mb-4">
                    {technology.name}
                  </h3>
          
                  <div className="space-y-2">
          
                    {techApplications.map(
                      (application) => (
          
                        <div
                          key={application.id}
                          className="
                            flex
                            justify-between
                            items-center
                            border
                            border-gray-100
                            rounded-lg
                            p-3
                          "
                        >
          
                          <span>
                            {application.name}
                          </span>
          
                          <button
                            onClick={() =>
                              deleteApplication(
                                application.id
                              )
                            }
                            className="
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              px-3
                              py-1
                              rounded-lg
                            "
                          >
                            Delete
                          </button>
          
                        </div>
          
                      )
                    )}
          
                  </div>
          
                </div>
          
              );
          
            })}
          
          </div>

        </div>

      </div>

    </main>
  );
}
