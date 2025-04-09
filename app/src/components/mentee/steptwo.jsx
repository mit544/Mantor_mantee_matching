export default function StepTwo({ formData, setFormData }) {
    const handleTagAdd = (field, value) => {
      if (!value.trim()) return;
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].includes(value) ? prev[field] : [...prev[field], value],
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.target.value.trim();
              if (value) {
                handleTagAdd(field, value);
                e.target.value = "";
              }
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
  
    return (
      <div className="space-y-6">
        {renderMultiSelectInput("industry_interest", [
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
        ], "Industry Interests")}
  
        {renderMultiSelectInput("skills_to_develop", [
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
        ], "Skills to Develop")}
  
        {renderMultiSelectInput("mentorship_style", [
          "Hands-on guidance",
          "Structured meetings",
          "Occasional check-ins",
          "Pair programming",
          "Informal chats",
          "Other",
        ], "Mentorship Style")}
  
        {renderMultiSelectInput("interests", [
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
        ], "Interests")}
      </div>
    );
  }
  