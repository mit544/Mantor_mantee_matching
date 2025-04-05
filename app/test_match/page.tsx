"use client";

import { useEffect, useState } from "react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { toast, ToastContainer } from "react-toastify";

export default function AdminMatchPage() {
  const [mentees, setMentees] = useState<any[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<string>("");
  const [matchResult, setMatchResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    toast.success("Welcome, You are looged in as an Admin!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
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

  const getOverlap = (arr1: string[], arr2: string[]) => {
    return arr1.filter((item) => arr2.includes(item));
  };

  const renderFullDetails = (data: any, isMentee: boolean) => (
    <div className="text-sm leading-relaxed space-y-1">
      {isMentee ? (
        <>
          <p>
            <strong>Student ID:</strong> {data.student_id}
          </p>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Course:</strong> {data.course}
          </p>
          <p>
            <strong>Course Domain:</strong> {data.course_domain}
          </p>
          <p>
            <strong>Industry Interest:</strong>{" "}
            {(data.industry_interest || []).join(", ")}
          </p>
          <p>
            <strong>Short-term Goals:</strong>{" "}
            {(data.short_term_goals || []).join(", ")}
          </p>
          <p>
            <strong>Long-term Goals:</strong>{" "}
            {(data.long_term_goals || []).join(", ")}
          </p>
          <p>
            <strong>Skills to Develop:</strong>{" "}
            {(data.skills_to_develop || []).join(", ")}
          </p>
          <p>
            <strong>Expected Challenges:</strong>{" "}
            {(data.expected_challenges || []).join(", ")}
          </p>
          <p>
            <strong>Mentorship Style:</strong>{" "}
            {(data.mentorship_style || []).join(", ")}
          </p>
          <p>
            <strong>Feedback Openness:</strong> {data.feedback_openness}
          </p>
          <p>
            <strong>Interests:</strong> {(data.interests || []).join(", ")}
          </p>
          <p>
            <strong>Mentorship Goals:</strong>{" "}
            {(data.mentorship_goals || []).join(", ")}
          </p>
          <p>
            <strong>International Student:</strong>{" "}
            {data.is_international_student ? "Yes" : "No"}
          </p>
          <p>
            <strong>Adjustments Required:</strong>{" "}
            {data.adjustments_required || "None"}
          </p>
        </>
      ) : (
        <>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Company:</strong> {data.company}
          </p>
          <p>
            <strong>Job Role:</strong> {data.job_role}
          </p>
          <p>
            <strong>Industry Experience:</strong>{" "}
            {(data.industry_experience || []).join(", ")}
          </p>
          <p>
            <strong>Expertise Courses:</strong>{" "}
            {(data.expertise_courses || []).join(", ")}
          </p>
          <p>
            <strong>Skills Offered:</strong>{" "}
            {(data.skills_offered || []).join(", ")}
          </p>
          <p>
            <strong>Challenges Faced:</strong>{" "}
            {(data.challenges_faced || []).join(", ")}
          </p>
          <p>
            <strong>Mentorship Style:</strong>{" "}
            {(data.mentorship_style || []).join(", ")}
          </p>
          <p>
            <strong>Feedback Openness:</strong> {data.feedback_openness}
          </p>
          <p>
            <strong>Interests:</strong> {(data.interests || []).join(", ")}
          </p>
          <p>
            <strong>Mentorship Motivation:</strong>{" "}
            {(data.mentorship_motivation || []).join(", ")}
          </p>
          <p>
            <strong>Adjustments Required:</strong>{" "}
            {data.adjustments_required || "None"}
          </p>
        </>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-10">
          Admin - Mentee Matching
        </h1>

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
        </div>

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
                    Compatibility Score:{" "}
                    <span className="text-primary">
                      {matchResult.compatibilityScore}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
