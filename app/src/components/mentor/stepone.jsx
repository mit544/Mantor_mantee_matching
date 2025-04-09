// components/mentor/stepone.tsx
"use client";
import React from "react";

export default function MentorStepOne({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="job_role"
        placeholder="Job Role"
        value={formData.job_role}
        onChange={handleChange}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
