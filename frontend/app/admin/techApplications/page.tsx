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

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingStatus, setEditingStatus] =
  useState("Assess");

  const [editingTechnologyId, setEditingTechnologyId] =
    useState<number>(0);

  const [applicationName, setApplicationName] =
    useState("");

  const [applicationDescription,setApplicationDescription] = 
    useState("");

  const [status, setStatus] =
    useState("Assess");

  const [editingDescription, setEditingDescription] =
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
      
          description:
            applicationDescription,
      
          status:
            status,
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

  async function toggleApplication(
    applicationId: number
  ) {
    try {
      await axios.post(
        `${API_URL}/technology-applications/${applicationId}/toggle`
      );
      loadData();
    } catch (error) {
      console.error(error);
      alert(
        "Failed to update application."
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

  async function saveApplication() {
    try {
      await axios.put(
        `${API_URL}/technology-applications/${editingId}`,
        {
          technology_id:
            editingTechnologyId,
      
          name: editingName,
      
          description:
            editingDescription,
      
          status: editingStatus,
        }
      );
  
      setEditingId(null);
  
      setEditingName("");
  
      loadData();
  
    } catch (error) {
  
      console.error(error);
  
      alert(
        "Failed to update application."
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
          <div className="mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Create Application
            </h2>
          
            <div className="space-y-4">
          
              <select
                value={technologyId}
                onChange={(e) =>
                  setTechnologyId(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                "
              >
                <option value="">
                  Select Technology
                </option>
          
                {technologies.map((technology) => (
                  <option
                    key={technology.id}
                    value={technology.id}
                  >
                    {technology.name}
                  </option>
                ))}
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
                "
              />
          
              <textarea
                value={applicationDescription}
                onChange={(e) =>
                  setApplicationDescription(
                    e.target.value
                  )
                }
                rows={4}
                placeholder="
                  Describe this technology application
                "
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                "
              />
          
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-3
                "
              >
                <option>Adopt</option>
                <option>Assess</option>
                <option>Aware</option>
                <option>In Progress</option>
              </select>
          
              <button
                onClick={createApplication}
                className="
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Create Application
              </button>
          
            </div>
          
          </div>
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
          
                        <div key={application.id}>
          
                          <div
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
          
                            <div>
          
                              <div className="font-medium">
                                {application.name}
                              </div>
          
                              <div className="text-sm text-gray-500">
                                {application.status}
                              </div>
          
                            </div>
          
                            <div className="flex items-center gap-2 ml-auto">
          
                              <button
                                onClick={() => {
                                  setEditingId(
                                    application.id
                                  );
          
                                  setEditingName(
                                    application.name
                                  );

                                  setEditingDescription(
                                    application.description || ""
                                  );
          
                                  setEditingStatus(
                                    application.status || "Assess"
                                  );
          
                                  setEditingTechnologyId(
                                    application.technology_id
                                  );
                                }}
                                className="
                                  bg-yellow-500
                                  hover:bg-yellow-600
                                  text-white
                                  px-3
                                  py-1
                                  rounded-lg
                                  text-sm
                                "
                              >
                                Edit
                              </button>
          
                              <button
                                onClick={() =>
                                  toggleApplication(
                                    application.id
                                  )
                                }
                                className="
                                  bg-gray-600
                                  hover:bg-gray-700
                                  text-white
                                  px-3
                                  py-1
                                  rounded-lg
                                  text-sm
                                "
                              >
                                {application.is_active
                                  ? "Hide"
                                  : "Show"}
                              </button>
          
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
                                  text-sm
                                "
                              >
                                Delete
                              </button>
          
                            </div>
          
                          </div>
          
                          {editingId === application.id && (
                            <div
                              className="
                                mt-2
                                ml-6
                                p-4
                                bg-yellow-50
                                border
                                border-yellow-200
                                rounded-xl
                              "
                            >
          
                              <h4 className="font-semibold mb-3">
                                Edit Technology Application
                              </h4>
          
                              <input
                                value={editingName}
                                onChange={(e) =>
                                  setEditingName(
                                    e.target.value
                                  )
                                }
                                className="
                                  w-full
                                  border
                                  border-gray-300
                                  rounded-xl
                                  p-3
                                  mb-3
                                "
                              />

                              <textarea
                                value={editingDescription}
                                onChange={(e) =>
                                  setEditingDescription(
                                    e.target.value
                                  )
                                }
                                rows={4}
                                className="
                                  w-full
                                  border
                                  border-gray-300
                                  rounded-xl
                                  p-3
                                  mb-3
                                "
                                placeholder="
                                  Describe how this technology
                                  application could be used
                                "
                              />
          
                              <select
                                value={editingStatus}
                                onChange={(e) =>
                                  setEditingStatus(
                                    e.target.value
                                  )
                                }
                                className="
                                  w-full
                                  border
                                  border-gray-300
                                  rounded-xl
                                  p-3
                                  mb-3
                                "
                              >
                                <option>Adopt</option>
                                <option>Assess</option>
                                <option>Aware</option>
                                <option>In Progress</option>
                              </select>
          
                              <div className="flex gap-2">
          
                                <button
                                  onClick={saveApplication}
                                  className="
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                  "
                                >
                                  Save Changes
                                </button>
          
                                <button
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditingName("");
                                  }}
                                  className="
                                    bg-gray-500
                                    hover:bg-gray-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                  "
                                >
                                  Cancel
                                </button>
          
                              </div>
          
                            </div>
                          )}
          
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
