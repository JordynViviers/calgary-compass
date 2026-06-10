"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL = "https://calgary-compass-api.onrender.com";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Identified");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [technologies, setTechnologies] = useState<any[]>([]);

  const loadTechnologies = async () => {
    try {
      const response = await axios.get(`${API_URL}/technologies`);
      setTechnologies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTechnologies();
  }, []);

  const clearForm = () => {
    setName("");
    setDescription("");
    setStatus("Identified");
    setEditingId(null);
  };

  const submitTechnology = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/technology/${editingId}`, {
          name,
          description,
          current_status: status,
        });
        alert("Technology updated!");
      } else {
        await axios.post(`${API_URL}/technology`, {
          name,
          description,
          current_status: status,
        });
        alert("Technology created!");
      }

      clearForm();
      loadTechnologies();
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    }
  };

  const deleteTechnology = async (technologyId: number) => {
    const confirmed = confirm("Delete this technology?");

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/technology/${technologyId}`);
      alert("Technology deleted!");
      loadTechnologies();
    } catch (error) {
      console.error(error);
      alert("Failed to delete technology.");
    }
  };

  const evaluateTechnology = async (technologyId: number) => {
    try {
      await axios.post(`${API_URL}/technology/${technologyId}/ai-evaluate`);
      alert("AI evaluation completed!");
    } catch (error) {
      console.error(error);
      alert("AI evaluation failed.");
    }
  };

  const editTechnology = (technology: any) => {
    setEditingId(technology.id);
    setName(technology.name);
    setDescription(technology.description);
    setStatus(technology.current_status);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen p-10 bg-white text-black">
      {/* Admin Nav */}
      <nav className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <Link href="/admin" className="text-2xl font-bold text-red-700">
          Calgary Compass <span className="text-black">Admin</span>
        </Link>

        <div className="flex gap-8 text-lg font-medium">
          <Link
            href="/admin/technologies"
            className="text-red-700 font-semibold"
          >
            Technologies
          </Link>

          <Link
            href="/admin/events"
            className="hover:text-red-700 transition"
          >
            In-Person Events
          </Link>

          <Link
            href="/admin/community-input"
            className="hover:text-red-700 transition"
          >
            Community Input
          </Link>
        </div>
      </nav>

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-red-700 mb-8">
        Technology Administration
      </h1>

      {/* Form Card */}
      <div className="max-w-2xl border border-gray-200 rounded-2xl p-6 mb-10 bg-white shadow-sm">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          {editingId ? "Edit Technology" : "Create Technology"}
        </h2>

        <label className="block mb-2 font-medium">Technology Name</label>

        <input
          className="w-full border border-gray-300 rounded-xl p-3 mb-6 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 font-medium">Description</label>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-3 mb-6 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2 font-medium">Status</label>

        <select
          className="w-full border border-gray-300 rounded-xl p-3 mb-6 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Identified</option>
          <option>Under Review</option>
          <option>Pilot Approved</option>
          <option>Active Pilot</option>
          <option>Completed</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={submitTechnology}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            {editingId ? "Update Technology" : "Create Technology"}
          </button>

          {editingId && (
            <button
              onClick={clearForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Existing Technologies */}
      <div>
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          Existing Technologies
        </h2>

        {technologies.length === 0 ? (
          <p className="text-gray-500">No technologies found.</p>
        ) : (
          <div className="space-y-4">
            {technologies.map((technology) => (
              <div
                key={technology.id}
                className="border border-gray-200 rounded-2xl p-6 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-red-700">
                    {technology.name}
                  </h3>

                  <p className="text-gray-500">{technology.current_status}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => editTechnology(technology)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-medium transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => evaluateTechnology(technology.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition"
                  >
                    AI Evaluate
                  </button>

                  <button
                    onClick={() => deleteTechnology(technology.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
