"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL = "https://calgary-compass-api.onrender.com";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [heroImage, setHeroImage] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [technologies, setTechnologies] =
    useState<any[]>([]);

  const loadTechnologies = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/technologies`
      );

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
    setEditingId(null);
    setHeroImage("");
  };

  const submitTechnology = async () => {
    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/technology/${editingId}`,
          {
            name,
            description,
            hero_image: heroImage, 
            is_active: true
          }
        );

        alert("Technology updated!");
      } else {
        await axios.post(
          `${API_URL}/technology`,
          {
            name,
            description, 
            hero_image: heroImage, 
          }
        );

        alert("Technology created!");
      }

      clearForm();
      loadTechnologies();
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
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
      alert(
        "Failed to delete technology."
      );
    }
  };

  const hideTechnology = async (
    technologyId: number
  ) => {
    try {
      await axios.put(
        `${API_URL}/technology/${technologyId}/hide`
      );

      alert("Technology hidden!");

      loadTechnologies();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to hide technology."
      );
    }
  };

  const showTechnology = async (
    technologyId: number
  ) => {
    try {
      await axios.put(
        `${API_URL}/technology/${technologyId}/show`
      );

      alert("Technology restored!");

      loadTechnologies();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to restore technology."
      );
    }
  };

  const evaluateTechnology = async (
    technologyId: number
  ) => {
    try {
      await axios.post(
        `${API_URL}/technology/${technologyId}/ai-evaluate`
      );

      alert(
        "AI evaluation completed!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "AI evaluation failed."
      );
    }
  };

  const editTechnology = (
    technology: any
  ) => {
    setEditingId(
      technology.id
    );

    setName(
      technology.name
    );

    setDescription(
      technology.description
    );

    setHeroImage(
      technology.hero_image || ""
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen p-10 bg-white text-black">

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-red-700 mb-8">
        Technology Administration
      </h1>

      {/* Form Card */}
      <div className="max-w-2xl border border-gray-200 rounded-2xl p-6 mb-10 bg-white shadow-sm">

        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          {editingId
            ? "Edit Technology"
            : "Create Technology"}
        </h2>

        <label className="block mb-2 font-medium">
          Technology Name
        </label>

        <input
          className="w-full border border-gray-300 rounded-xl p-3 mb-6 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-3 mb-6 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <label className="block mb-2 font-medium">
          Hero Image
        </label>
        
        <input
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            mb-6
          "
          value={heroImage}
          onChange={(e) =>
            setHeroImage(e.target.value)
          }
        />

        {heroImage && (
          <img
            src={heroImage}
            alt="Preview"
            className="
              w-full
              h-48
              object-cover
              rounded-xl
              border
              border-gray-200
              mb-6
            "
          />
        )}


        <div className="flex gap-3">

          <button
            onClick={submitTechnology}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            {editingId
              ? "Update Technology"
              : "Create Technology"}
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

          <p className="text-gray-500">
            No technologies found.
          </p>

        ) : (

          <div className="space-y-4">

            {technologies.map(
              (technology) => (

                <div
                  key={technology.id}
                  className="border border-gray-200 rounded-2xl p-6 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition"
                >

                  <div>

                    <h3 className="text-xl font-semibold text-red-700">
                      {technology.name}
                    </h3>

                    <p
                      className={
                        technology.is_active
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {technology.is_active
                        ? "Visible on Website"
                        : "Hidden from Website"}
                    </p>

                  </div>

                  <div className="flex gap-3 flex-wrap">

                    <button
                      onClick={() =>
                        editTechnology(
                          technology
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        evaluateTechnology(
                          technology.id
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition"
                    >
                      AI Evaluate
                    </button>

                    {technology.is_active ? (

                      <button
                        onClick={() =>
                          hideTechnology(
                            technology.id
                          )
                        }
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-medium transition"
                      >
                        Hide
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          showTechnology(
                            technology.id
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition"
                      >
                        Show
                      </button>

                    )}

                    <button
                      onClick={() =>
                        deleteTechnology(
                          technology.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>
  );
}
