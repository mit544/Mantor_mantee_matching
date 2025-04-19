"use client";

import React from "react";

export default function PlaceholderTab({Reports }: { Reports: boolean }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">Reports & Insights</h2>
      <p className="text-gray-700 mb-6">
        Here you will find detailed reports and performance metrics about the MentorSync platform, including:
      </p>
{/* 
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Number of mentors and mentees registered by course/domain.</li>
        <li>Active vs inactive users.</li>
        <li>Match success rate and frequency.</li>
        <li>Monthly growth in users and matches.</li>
        <li>Feedback from mentees on mentorship quality (optional future feature).</li>
      </ul>

      <div className="mt-8 p-4 bg-gray-100 border-l-4 border-primary text-gray-800">
        📌 Tip: This section can be enhanced with charts (bar/pie) using Chart.js or Recharts, and can support exporting reports as PDF or CSV in future versions.
      </div> */}
    </div>
  );
}
