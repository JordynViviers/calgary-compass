"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const API_URL =
  "https://calgary-compass-api.onrender.com";

const criteria = [
  "Financial Sustainability",
  "Operational Excellence",
  "Innovation and Agility",
  "Trusted and Transparent Governance",
  "People and Culture First",
];

export default function CommunityInputPage() {

  const [technologies, setTechnologies] =
    useState<any[]>([]);

  const [sector, setSector] =
    useState("");

  const [signals, setSignals] =
    useState("");

  const [ratings, setRatings] =
    useState<
      Record<
        string,
        Record<string, string>
      >
    >({});

  useEffect(() => {

    axios
      .get(
        `${API_URL}/technologies`
      )
      .then((response) => {

        setTechnologies(
          response.data
        );

      })
      .catch((error) => {

        console.error(
          "Failed to load technologies",
          error
        );

      });

  }, []);

  function updateRating(
    technology: string,
    criterion: string,
    value: string
  ) {

    setRatings(
      (previousRatings) => ({

        ...previousRatings,

        [technology]: {

          ...previousRatings[
            technology
          ],

          [criterion]: value,

        },

      })
    );

  }

  function handleSubmit() {

    console.log({

      sector,
      ratings,
      signals,

    });

    alert(
      "Community input submitted!"
    );

  }
