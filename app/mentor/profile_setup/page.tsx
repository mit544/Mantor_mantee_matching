"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@heroui/button";

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
  const { data: session } = useSession();
  const [message, setMessage] = useState("");

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

  const [currentStep, setCurrentStep] = useState(1);
  const [tagInputs, setTagInputs] = useState({
    industry_experience: "",
    expertise_courses: "",
    skills_offered: "",
    mentorship_style: "",
    interests: "",
    mentorship_motivation: "",
  });

  const progressPercentage = (currentStep / 3) * 100;

  useEffect(() => {
    toast.success("Welcome Mentor!, setup your profile...", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (field, value) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field]
        : [...prev[field], value],
    }));
  };

  const handleTagRemove = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  const renderMultiSelectInput = (field, options, label) => (
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
        {formData[field].map((item) => (
          <span
            key={item}
            className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
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

  const isStepComplete = () => {
    if (currentStep === 1) {
      return (
        formData.name && formData.email && formData.company && formData.job_role
      );
    }
    if (currentStep === 2) {
      return (
        formData.industry_experience.length > 0 &&
        formData.expertise_courses.length > 0 &&
        formData.skills_offered.length > 0 &&
        formData.mentorship_style.length > 0
      );
    }
    if (currentStep === 3) {
      return (
        formData.interests.length > 0 &&
        formData.mentorship_motivation.length > 0 &&
        formData.feedback_openness &&
        formData.challenges_faced &&
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
        theme: "colored",
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: session?.user_id }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Mentor added successfully!");
        setTimeout(() => {
          window.location.href = "/mentor/dashboard";
        }, 3000);
      } else {
        setMessage(" " + data.message);
      }
    } catch {
      toast.error("Failed to add metor.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
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
          Mentor Profile Setup
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
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="company"
                  placeholder="Company"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="job_role"
                  placeholder="Job Role"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {renderMultiSelectInput(
                  "industry_experience",
                  industryOptions,
                  "Industry Experience"
                )}
                {renderMultiSelectInput(
                  "expertise_courses",
                  expertiseOptions,
                  "Expertise Courses"
                )}
                {renderMultiSelectInput(
                  "skills_offered",
                  skillsOptions,
                  "Skills Offered"
                )}
                {renderMultiSelectInput(
                  "mentorship_style",
                  mentorshipStyleOptions,
                  "Mentorship Style"
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {renderMultiSelectInput(
                  "interests",
                  interestOptions,
                  "Interests"
                )}
                {renderMultiSelectInput(
                  "mentorship_motivation",
                  motivationOptions,
                  "Mentorship Motivation"
                )}
                <label className="block">Feedback Openness</label>
                <select
                  name="feedback_openness"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  name="adjustments_required"
                  placeholder="Adjustments Required (if any)"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </motion.div>

          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button
                type="button"
                onPress={handlePrevious}
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400"
              >
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                onPress={handleNext}
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
