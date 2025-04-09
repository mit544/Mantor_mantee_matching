"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@heroui/button";

import StepOne from "@/src/components/mentee/stepone";
import StepTwo from "@/src/components/mentee/steptwo";
import StepThree from "@/src/components/mentee/stepthree";

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
        formData.feedback_openness !== ""
      );
    }
    return true;
  };

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

  const handleMultiSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
  };

  const handleMultiSelectRemove = (field, value) => {
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
              handleMultiSelectChange(field, value);
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
              onClick={() => handleMultiSelectRemove(field, item)}
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/mentee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: session?.user?.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Mentee added successfully!");
        setTimeout(() => {
          window.location.href = "/mentee/dashboard";
        }, 3000);
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("Failed to add mentee.");
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const handleStepClick = (step) => {
    if (step < currentStep || isStepComplete()) {
      setCurrentStep(step);
    } else {
      toast.error("Please complete the current section first.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleNext = () => {
    if (!isStepComplete()) {
      toast.error("Please complete all fields before continuing.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 my-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-primary">
          Mentee Profile Setup
        </h2>

        {/* Step Labels */}
        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
          <span
            className={`cursor-pointer ${
              currentStep === 1 ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => handleStepClick(1)}
          >
            Basic Info
          </span>
          <span
            className={`cursor-pointer ${
              currentStep === 2 ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => handleStepClick(2)}
          >
            Interest & Skills
          </span>
          <span
            className={`cursor-pointer ${
              currentStep === 3 ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => handleStepClick(3)}
          >
            Preferences
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form className="space-y-8">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && <StepOne formData={formData} setFormData={setFormData} />}
            {currentStep === 2 && (
              <StepTwo
                formData={formData}
                setFormData={setFormData}
                renderMultiSelectInput={renderMultiSelectInput}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                formData={formData}
                setFormData={setFormData}
                handleChange={(e) => {
                  const { name, value, type, checked } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    [name]: type === "checkbox" ? checked : value,
                  }));
                }}
              />
            )}
          </motion.div>

          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button
                type="button"
                onPress={() => setCurrentStep((prev) => prev - 1)}
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
                onPress={handleSubmit}
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
