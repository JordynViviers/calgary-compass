"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminPage() {

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("Identified");

  const submitTechnology = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/technology",
        {
          name,
          description,
          current_status: status
        }
      );

      alert("Technology created!");

      setName("");
      setDescription("");
      setStatus("Identified");

    } catch (error) {

      console.error(error);

      alert("Failed to create technology.");

    }
  };

  return (

    <main className="min-h-screen p-10">

      <h1 className="text-5xl font-bold mb-8">

        Technology Administration

      </h1>

      <div className="max-w-2xl">

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

          <option>
            Identified
          </option>

          <option>
            Under Review
          </option>

          <option>
            Pilot Approved
          </option>

          <option>
            Active Pilot
          </option>

          <option>
            Completed
          </option>

        </select>

        <button
          onClick={submitTechnology}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >

          Create Technology

        </button>

      </div>

    </main>
  );
}