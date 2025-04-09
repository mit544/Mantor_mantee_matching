"use client";

export default function MentorStepThree({ formData, setFormData, handleChange, renderMultiSelectInput }) {
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

  return (
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

      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Feedback Openness
        </label>
        <select
          name="feedback_openness"
          onChange={handleChange}
          value={formData.feedback_openness}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Feedback Openness</option>
          {feedbackOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <input
        name="challenges_faced"
        placeholder="Challenges Faced"
        onChange={handleChange}
        value={formData.challenges_faced}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="adjustments_required"
        placeholder="Adjustments Required (if any)"
        onChange={handleChange}
        value={formData.adjustments_required}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}