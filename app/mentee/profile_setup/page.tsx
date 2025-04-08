"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { data: session } = useSession();

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

  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState("");
  const [tagInputs, setTagInputs] = useState({
    industry_interest: "",
    skills_to_develop: "",
    mentorship_style: "",
    interests: "",
    mentorship_goals: "",
  });

  const progressPercentage = (currentStep / 3) * 100;

  useEffect(() => {
    toast.success("Welcome Mentee!, setup your profile...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }, []);

  useEffect(() => {
    if (message) {
      if (message.toLowerCase().includes("success")) {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
  }, [message]);

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

  const renderMultiSelectInput = (
    field: keyof typeof formData,
    options: string[],
    label: string
  ) => (
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <input
        type="text"
        className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type and press Enter"
        list={`${field}-list`}
        value={tagInputs[field] || ""}
        onChange={(e) =>
          setTagInputs((prev) => ({ ...prev, [field]: e.target.value }))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && tagInputs[field].trim() !== "") {
            e.preventDefault();
            const value = tagInputs[field].trim();
            if (!formData[field].includes(value)) {
              setFormData((prev) => ({
                ...prev,
                [field]: [...prev[field], value],
              }));
            }
            setTagInputs((prev) => ({ ...prev, [field]: "" }));
          }
        }}
      />
      <datalist id={`${field}-list`}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>

      <div className="flex flex-wrap gap-2">
        {formData[field].map((item: string) => (
          <span
            key={item}
            className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
          >
            {item}
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  [field]: prev[field].filter((x: string) => x !== item),
                }))
              }
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  const isStepComplete = () => {
    if (currentStep === 1) {
      return (
        formData.student_id &&
        formData.name &&
        formData.course &&
        formData.course_domain
      );
    }
    if (currentStep === 2) {
      return (
        formData.industry_interest.length > 0 &&
        formData.skills_to_develop.length > 0 &&
        formData.mentorship_style.length > 0 &&
        formData.interests.length > 0
      );
    }
    if (currentStep === 3) {
      return (
        formData.short_term_goals &&
        formData.long_term_goals &&
        formData.expected_challenges &&
        formData.adjustments_required
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepComplete()) {
      toast.error("Please fill out all required fields before proceeding.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/mentee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: session?.user_id }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Mentee added successfully!");
        setTimeout(() => {
          window.location.href = "/mentee/dashboard";
        }, 3000);
      } else {
        setMessage(" " + data.message);
      }
    } catch {
      setMessage("Failed to add mentee.");
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-primary">
          Mentee Profile Setup
        </h2>

        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-4">
          <span
            className={`cursor-pointer ${
              currentStep === 1 ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => {
              if (currentStep > 1 || isStepComplete()) setCurrentStep(1);
              else
                toast.error("Please complete the current section first.", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "colored",
                });
            }}
          >
            Basic Info
          </span>
          <span
            className={`cursor-pointer ${
              currentStep === 2 ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => {
              if (currentStep > 2 || isStepComplete()) setCurrentStep(2);
              else
                toast.error("Please complete the current section first.", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "colored",
                });
            }}
          >
            Experience & Skills
          </span>
          <span
            className={`cursor-pointer ${
              currentStep === 3 ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => {
              if (currentStep > 3 || isStepComplete()) setCurrentStep(3);
              else
                toast.error("Please complete the current section first.", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "colored",
                });
            }}
          >
            Preferences
          </span>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <input
                  name="student_id"
                  placeholder="Student ID"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  name="course"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <select
                  name="course_domain"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Course Domain</option>
                  {courseDomainOptions.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {renderMultiSelectInput(
                  "industry_interest",
                  industryOptions,
                  "Industry Interests"
                )}
                {renderMultiSelectInput(
                  "skills_to_develop",
                  skillsOptions,
                  "Skills to Develop"
                )}
                {renderMultiSelectInput(
                  "mentorship_style",
                  mentorshipStyleOptions,
                  "Mentorship Style"
                )}
                {renderMultiSelectInput(
                  "interests",
                  interestOptions,
                  "Interests"
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <input
                  name="short_term_goals"
                  placeholder="Short Term Goals (comma separated)"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="long_term_goals"
                  placeholder="Long Term Goals (comma separated)"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="expected_challenges"
                  placeholder="Expected Challenges"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="adjustments_required"
                  placeholder="Adjustments Required (if any)"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  name="feedback_openness"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Feedback Openness</option>
                  {feedbackOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="is_international_student"
                    onChange={handleChange}
                    className="h-5 w-5 text-primary focus:ring-primary focus:ring-opacity-50"
                  />
                  <span className="text-gray-700">International Student?</span>
                </label>
              </div>
            )}
          </motion.div>

          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
