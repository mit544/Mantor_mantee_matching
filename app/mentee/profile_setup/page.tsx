"use client";

import { useState } from "react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

const courseOptions = [
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
];

const courseDomainOptions = ["Business", "Digital", "Media", "Sport"];

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

const feedbackOptions = ["Not open", "Neutral", "Open", "Very open"];

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

const goalOptions = [
  "Career development",
  "Building professional network",
  "CV and Interview preparation",
  "Developing technical skills",
  "Developing soft skills",
  "Real-world project experience",
  "Exploring further education",
  "Personal growth and confidence",
  "Other",
];

export default function MenteeFormPage() {
  const [formData, setFormData] = useState({
    student_id: "",
    name: "",
    course: "",
    course_domain: "",
    industry_interest: [],
    short_term_goals: "",
    long_term_goals: "",
    skills_to_develop: [],
    expected_challenges: "",
    mentorship_style: [],
    feedback_openness: "",
    interests: [],
    mentorship_goals: [],
    is_international_student: false,
    adjustments_required: "",
  });

  const [message, setMessage] = useState("");
  const [tagInputs, setTagInputs] = useState({
    industry_interest: "",
    skills_to_develop: "",
    mentorship_style: "",
    interests: "",
    mentorship_goals: "",
  });

  const [step, setStep] = useState(1);
  const steps = ["General Info", "Preferences", "Goals"];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        placeholder={`Type and press Enter`}
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
      <div className="flex flex-wrap gap-2 mt-1">
        {formData[field].map((item) => (
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
      const res = await fetch("/api/mentee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(
        res.ok ? "✅ Mentee added successfully!" : "❌ " + data.message
      );
    } catch {
      setMessage("❌ Failed to add mentee.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Mentee Profile Setup</h2>
        {step === 1 && (
          <div className="space-y-4">
            <input
              name="student_id"
              placeholder="Student ID"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <select
              name="course"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Course</option>
              {/* map course options */}
            </select>
            <select
              name="course_domain"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Domain</option>
              {/* map domain options */}
            </select>
            <button
              onClick={nextStep}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {renderMultiSelect(
              "industry_interest",
              industryOptions,
              "Industry Interests"
            )}
            {renderMultiSelect(
              "skills_to_develop",
              skillsOptions,
              "Skills to Develop"
            )}
            {renderMultiSelect(
              "mentorship_style",
              mentorshipStyleOptions,
              "Mentorship Style"
            )}
            {renderMultiSelect("interests", interestOptions, "Interests")}
            {renderMultiSelect(
              "mentorship_goals",
              goalOptions,
              "Mentorship Goals"
            )}
            <button onClick={prevStep} className="px-4 py-2 rounded border">
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="short_term_goals"
              placeholder="Short Term Goals"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="long_term_goals"
              placeholder="Long Term Goals"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="expected_challenges"
              placeholder="Expected Challenges"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={prevStep}
              type="button"
              className="px-4 py-2 rounded border"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-center text-lg">{message}</p>}
      </div>
      <Footer />
    </>
  );
}
