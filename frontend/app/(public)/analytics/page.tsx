"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://calgary-compass-api.onrender.com";

export default function AnalyticsPage() {

  const [challengeSummary, setChallengeSummary] =
    useState<any[]>([]);

  const [explorerData, setExplorerData] =
    useState<any>(null);

  const [selectedChallenge, setSelectedChallenge] =
    useState("");

  useEffect(() => {

    axios
      .get(
        `${API_URL}/challenge-summary`
      )
      .then((res) => {

        setChallengeSummary(
          res.data
        );

        if (
          res.data.length > 0
        ) {

          setSelectedChallenge(
            res.data[0].challenge
          );

        }

      });

    axios
      .get(
        `${API_URL}/challenge-explorer`
      )
      .then((res) => {
        setExplorerData(
          res.data
        );
      });

  }, []);
