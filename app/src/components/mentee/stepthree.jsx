export default function StepThree({ formData, setFormData, handleChange }) {
    return (
      <div className="space-y-6">
        <input
          name="short_term_goals"
          placeholder="Short Term Goals (comma separated)"
          value={formData.short_term_goals}
          onChange={handleChange}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="long_term_goals"
          placeholder="Long Term Goals (comma separated)"
          value={formData.long_term_goals}
          onChange={handleChange}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="expected_challenges"
          placeholder="Expected Challenges"
          value={formData.expected_challenges}
          onChange={handleChange}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="adjustments_required"
          placeholder="Adjustments Required (if any)"
          value={formData.adjustments_required}
          onChange={handleChange}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          name="feedback_openness"
          value={formData.feedback_openness}
          onChange={handleChange}
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Feedback Openness</option>
          {[
            "Not open",
            "Neutral",
            "Open",
            "Very open",
          ].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_international_student"
            checked={formData.is_international_student}
            onChange={handleChange}
            className="h-5 w-5 text-primary focus:ring-primary focus:ring-opacity-50"
          />
          <span className="text-gray-700">International Student?</span>
        </label>
      </div>
    );
  }