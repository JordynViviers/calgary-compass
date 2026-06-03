"use client";

import Link from "next/link";
import { useState } from "react";

const API_URL = "https://calgary-compass-api.onrender.com";

const TECHNOLOGIES = [
  "Artificial Intelligence",
  "Autonomous Vehicles",
  "Smart Grids",
  "Renewable Energy Storage",
  "Digital Twins",
  "Internet of Things (IoT)",
  "5G / Advanced Connectivity",
  "Drones / UAVs",
  "Carbon Capture",
  "Blockchain",
  "Augmented & Virtual Reality",
  "Robotics & Automation",
  "Precision Agriculture",
  "Advanced Water Treatment",
  "Quantum Computing",
  "Green Hydrogen",
  "Biometrics & Digital ID",
  "3D Printing / Additive Manufacturing",
  "Edge Computing",
  "Geothermal Energy",
];

const ROLES = [
  "Working professional",
  "Student",
  "Researcher / Academic",
  "Entrepreneur / Startup",
  "City / Government employee",
  "Retired",
  "Other",
];

const DIETARY = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Gluten free",
  "Halal",
  "Kosher",
  "Other",
];

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    fieldOfWork: "",
    role: "",
    roleOther: "",
    hearAbout: "",
    tech1: "",
    tech2: "",
    tech5: "",
    dietary: "",
    dietaryOther: "",
    accessibility: "",
    consent: "",
    anythingElse: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const optionsFor = (current) =>
    TECHNOLOGIES.filter((tech) => {
      const chosenElsewhere = [
        form.tech1,
        form.tech2,
        form.tech5,
      ].filter((t) => t !== form[current] && t !== "");

      return !chosenElsewhere.includes(tech);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.consent !== "Yes, I consent") {
      setError(
        "Consent to recording is required to participate in the event.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name,
          email: form.email,
          field_of_work: form.fieldOfWork,
          role: form.role,
          role_other: form.roleOther,
          hear_about: form.hearAbout,
          tech_1_year: form.tech1,
          tech_2_year: form.tech2,
          tech_5_year: form.tech5,
          dietary: form.dietary,
          dietary_other: form.dietaryOther,
          accessibility: form.accessibility,
          recording_consent: form.consent,
          anything_else: form.anythingElse,
        }),
