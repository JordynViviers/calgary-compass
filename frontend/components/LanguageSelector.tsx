"use client";

import { useEffect, useState } from "react";

export default function LanguageSelector() {

  const [language, setLanguage] =
    useState("English");

  useEffect(() => {

    const savedLanguage =
      localStorage.getItem("language");

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const newLanguage =
      e.target.value;

    setLanguage(newLanguage);

    localStorage.setItem(
      "language",
      newLanguage
    );
  };

  return (
    <div className="flex items-center gap-2">

      <span className="text-sm text-gray-600">
        🌐 
      </span>

      <select
        value={language}
        onChange={handleChange}
        className="
          border
          border-gray-300
          rounded-lg
          px-3
          py-2
          text-sm
          bg-white
          shadow-sm
          hover:border-gray-400
        "
      >
        <option>English</option>
        <option>Français canadien</option>
        <option>Español latinoamericano</option>
        <option>العربية</option>
        <option>हिन्दी</option>
        <option>한국어</option>
        <option>简体中文</option>
      </select>

    </div>
  );
}
