"use client";

import { useState } from "react";

export default function TestMatchingPage() {
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No match found");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Mentor Matching</h1>

      <div className="mb-4">
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID (e.g. 1009)"
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleMatch}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
      >
        Find Best Match
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold">Mentee: {result.mentee.name}</h2>
          <p className="mt-2">
            🎯 Best Match: <strong>{result.bestMentor.name}</strong>
          </p>
          <p>Email: {result.bestMentor.email}</p>
          <p>Company: {result.bestMentor.company}</p>
          <p>Job Role: {result.bestMentor.job_role}</p>
          <p className="mt-2">
            🔢 Compatibility Score: <strong>{result.compatibilityScore}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
