"use client";

import { useEffect, useState } from "react";

export default function MatchingTab() {
  const [mentees, setMentees] = useState<any[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<string>("");
  const [matchResult, setMatchResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMentees = async () => {
      const res = await fetch("/api/mentee");
      const data = await res.json();
      setMentees(data.mentees || []);
    };
    fetchMentees();
  }, []);

  const handleMatch = async () => {
    if (!selectedMentee) return;
    setLoading(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: selectedMentee }),
      });
      const data = await res.json();
      if (res.ok) {
        setMatchResult(data);
      } else {
        setMatchResult({ error: data.error || "No match found." });
      }
    } catch (err) {
      setMatchResult({ error: "Error matching mentee." });
    } finally {
      setLoading(false);
    }
  };

  const renderFullDetails = (details: any, isMentee: boolean) => (
    <>
      <p><strong>Name:</strong> {details.name}</p>
  
      {isMentee ? (
        <>
          <p><strong>Student ID:</strong> {details.student_id}</p>
          <p><strong>Course:</strong> {details.course}</p>
          <p><strong>Course Domain:</strong> {details.course_domain}</p>
          <p><strong>Industry Interest:</strong> {details.industry_interest.join(", ")}</p>
          <p><strong>Short-Term Goals:</strong> {details.short_term_goals.join(", ")}</p>
          <p><strong>Long-Term Goals:</strong> {details.long_term_goals.join(", ")}</p>
          <p><strong>Skills to Develop:</strong> {details.skills_to_develop.join(", ")}</p>
          <p><strong>Expected Challenges:</strong> {details.expected_challenges}</p>
          <p><strong>Mentorship Style:</strong> {details.mentorship_style.join(", ")}</p>
          <p><strong>Feedback Openness:</strong> {details.feedback_openness}</p>
          <p><strong>Interests:</strong> {details.interests.join(", ")}</p>
          <p><strong>Mentorship Goals:</strong> {details.mentorship_goals.join(", ")}</p>
          <p><strong>International Student:</strong> {details.is_international_student ? "Yes" : "No"}</p>
          <p><strong>Adjustments Required:</strong> {details.adjustments_required || "None"}</p>
        </>
      ) : (
        <>
          <p><strong>Email:</strong> {details.email}</p>
          <p><strong>Company:</strong> {details.company}</p>
          <p><strong>Job Role:</strong> {details.job_role}</p>
          <p><strong>Industry Experience:</strong> {details.industry_experience.join(", ")}</p>
          <p><strong>Expertise Courses:</strong> {details.expertise_courses.join(", ")}</p>
          <p><strong>Skills Offered:</strong> {details.skills_offered.join(", ")}</p>
          <p><strong>Challenges Faced:</strong> {details.challenges_faced}</p>
          <p><strong>Mentorship Style:</strong> {details.mentorship_style.join(", ")}</p>
          <p><strong>Feedback Openness:</strong> {details.feedback_openness}</p>
          <p><strong>Interests:</strong> {details.interests.join(", ")}</p>
          <p><strong>Mentorship Motivation:</strong> {details.mentorship_motivation.join(", ")}</p>
          <p><strong>Adjustments Required:</strong> {details.adjustments_required || "None"}</p>
        </>
      )}
    </>
  );
  

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <label className="block mb-2 font-semibold text-gray-700">
        Select a Mentee
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={selectedMentee}
        onChange={(e) => setSelectedMentee(e.target.value)}
      >
        <option value="">-- Choose a mentee --</option>
        {mentees.map((mentee) => (
          <option key={mentee._id} value={mentee.student_id}>
            {mentee.name} ({mentee.student_id})
          </option>
        ))}
      </select>

      <button
        onClick={handleMatch}
        className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
        disabled={loading || !selectedMentee}
      >
        {loading ? "Matching..." : "Find Best Match"}
      </button>

      {matchResult && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
          {matchResult.error ? (
            <p className="text-red-600 font-semibold">{matchResult.error}</p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-center text-primary mb-4">
                Best Match Found
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Mentee Details
                  </h3>
                  {renderFullDetails(matchResult.mentee, true)}
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Mentor Details
                  </h3>
                  {renderFullDetails(matchResult.bestMentor, false)}
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold">
                  Compatibility Score: <span className="text-primary">{matchResult.compatibilityScore}</span>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
