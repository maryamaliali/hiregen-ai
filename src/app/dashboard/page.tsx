"use client";

import { useState } from "react";

export default function Dashboard() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        HireGen AI Dashboard
      </h1>

      <textarea
        placeholder="Paste Resume Text Here..."
        className="w-full p-4 border rounded-xl mb-4"
        rows={6}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <textarea
        placeholder="Paste Job Description Here..."
        className="w-full p-4 border rounded-xl mb-4"
        rows={6}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button className="bg-black text-white px-6 py-3 rounded-xl">
        Analyze
      </button>
    </div>
  );
}