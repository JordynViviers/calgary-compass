"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://calgary-compass-api.onrender.com";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Identified");

  const [technologies, setTechnologies] = useState<any[]>([]);

  const loadTechnologies = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/technologies`
      );

      setTechnologies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTechnologies();
  }, []);

  const submitTechnology = async () => {
    try {
      await axios.post(
        `${API_URL}/technology`,
        {
          name,
          description,
          current_status: status,
        }
      );

      alert("Technology created!");

      setName("");
      setDescription("");
      setStatus("Identified");

      loadTechnologies();

    } catch (error) {
      console.error(error);
      alert("Failed to create technology.");
    }
  };

  const deleteTechnology = async (
    technologyId: number
  ) => {
    const confirmed = confirm(
      "Delete this technology?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API_URL}/technology/${technologyId}`
      );

      alert("Technology deleted!");

      loadTechnologies();

    } catch (error) {
      console.error(error);
      alert("Failed to delete technology.");
    }
  };

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-5xl font-bold mb-8">
        Technology Administration
      </h1>

      <div className="max-w-2xl border rounded-2xl p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-4">
          Create Technology
        </h2>

        <label className="block mb-2">
          Technology Name
        </label>

        <input
          className="w-full border rounded-xl p-3 mb-6 bg-black"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label className="block mb-2">
          Description
        </label>

        <textarea
          className="w-full border rounded-xl p-3 mb-6 bg-black"
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <label className="block mb-2">
          Status
        </label>

        <select
          className="w-full border rounded-xl p-3 mb-6 bg-black"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Identified</option>
          <option>Under Review</option>
          <option>Pilot Approved</option>
          <option>Active Pilot</option>
          <option>Completed</option>
        </select>

        <button
          onClick={submitTechnology}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          Create Technology
        </button>

      </div>

      <div>

        <h2 className="text-3xl font-bold mb-6">
          Existing Technologies
        </h2>

        {technologies.length === 0 ? (
          <p>No technologies found.</p>
        ) : (
          <div className="space-y-4">

            {technologies.map((technology) => (

              <div
                key={technology.id}
                className="border rounded-2xl p-6 flex justify-between items-center"
              >

                <div>
                  <h3 className="text-xl font-semibold">
                    {technology.name}
                  </h3>

                  <p className="text-gray-400">
                    {technology.current_status}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteTechnology(
                      technology.id
                    )
                  }
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}
