"use client";

import { useState } from "react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

const industryOptions = [
  "Technology",
  "Finance",
  "Media",
  "Sports",
  "Health and Fitness",
  "Education",
  "Marketing",
  "Cybersecurity",
  "Software Development",
  "Journalism",
  "Coaching",
  "Business Management",
  "Entertainment",
  "Other",
];

const expertiseOptions = [
  "Accounting and Finance",
  "Business Management",
  "Business of Football",
  "Sports Management",
  "Computer Science",
  "Cyber Security",
  "Digital Marketing",
  "Software Development",
  "Digital Content Production",
  "Sports Journalism",
  "Sports Media and Communications",
  "Exercise Studies",
  "Health, Exercise and Sport",
  "Physical Education",
  "Sports and Exercise Science",
  "Sports Coaching",
  "Other",
];

const skillsOptions = [
  "Programming",
  "Web Development",
  "Data Analysis",
  "Machine Learning",
  "Cybersecurity",
  "Digital Marketing",
  "Accounting",
  "Finance Management",
  "Journalism",
  "Video Production",
  "Sports Coaching",
  "Exercise Science",
  "Performance Analysis",
  "Public Speaking",
  "Leadership",
  "Project Management",
  "Docker",
  "Kubernetes",
  "Cloud Infrastructure",
  "Other",
];

const mentorshipStyleOptions = [
  "Hands-on guidance",
  "Structured meetings",
  "Occasional check-ins",
  "Pair programming",
  "Informal chats",
  "Other",
];

const interestOptions = [
  "Artificial Intelligence",
  "Blockchain",
  "Cloud Computing",
  "Infrastructure as Code",
  "Virtual Reality",
  "Sports Nutrition",
  "Sports Psychology",
  "Digital Content Creation",
  "E-commerce",
  "Social Media",
  "Fitness Training",
  "Youth Sports Development",
  "Music",
  "Film Production",
  "Entrepreneurship",
  "Other",
];

const motivationOptions = [
  "Share industry experience",
  "Support career growth",
  "Build talent pipeline",
  "Networking",
  "Develop leadership skills",
  "Personal fulfilment",
  "Contribute to community",
  "Other",
];

const feedbackOptions = ["Not open", "Neutral", "Open", "Very open"];

export default function MentorFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    job_role: "",
    industry_experience: [],
    expertise_courses: [],
    skills_offered: [],
    challenges_faced: "",
    mentorship_style: [],
    feedback_openness: "",
    interests: [],
    mentorship_motivation: [],
    adjustments_required: "",
  });

  const [message, setMessage] = useState("");
  const [tagInputs, setTagInputs] = useState({
    industry_experience: "",
    expertise_courses: "",
    skills_offered: "",
    mentorship_style: "",
    interests: "",
    mentorship_motivation: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (field: string, value: string) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field]
        : [...prev[field], value],
    }));
  };

  const handleTagRemove = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item: string) => item !== value),
    }));
  };

  const renderMultiSelect = (
    field: keyof typeof formData,
    options: string[],
    label: string
  ) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Type and press Enter"
        list={`${field}-options`}
        value={tagInputs[field] || ""}
        onChange={(e) =>
          setTagInputs((prev) => ({ ...prev, [field]: e.target.value }))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && tagInputs[field]) {
            e.preventDefault();
            handleTagAdd(field, tagInputs[field]);
            setTagInputs((prev) => ({ ...prev, [field]: "" }));
          }
        }}
      />
      <datalist id={`${field}-options`}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
      <div className="flex flex-wrap gap-2">
        {formData[field].map((item: string) => (
          <span
            key={item}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 shadow"
          >
            {item}
            <button
              type="button"
              onClick={() => handleTagRemove(field, item)}
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(
        res.ok ? "✅ Mentor added successfully!" : "❌ " + data.message
      );
    } catch {
      setMessage("❌ Failed to add mentor.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Mentor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="company"
            placeholder="Company"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="job_role"
            placeholder="Job Role"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {renderMultiSelect(
            "industry_experience",
            industryOptions,
            "Industry Experience"
          )}
          {renderMultiSelect(
            "expertise_courses",
            expertiseOptions,
            "Expertise Courses"
          )}
          {renderMultiSelect("skills_offered", skillsOptions, "Skills Offered")}
          {renderMultiSelect(
            "mentorship_style",
            mentorshipStyleOptions,
            "Mentorship Style"
          )}
          {renderMultiSelect("interests", interestOptions, "Interests")}
          {renderMultiSelect(
            "mentorship_motivation",
            motivationOptions,
            "Mentorship Motivation"
          )}

          <label className="block">Feedback Openness</label>
          <select
            name="feedback_openness"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Feedback Openness</option>
            {feedbackOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            name="challenges_faced"
            placeholder="Challenges Faced"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="adjustments_required"
            placeholder="Adjustments Required (if any)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Submit Mentor
          </button>
        </form>
        {message && <p className="mt-4 text-center text-lg">{message}</p>}
      </div>
      <Footer />
    </>
  );
}
