"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/src/components/dashboard_navbar";
import Footer from "@/src/components/footer";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "User Growth",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "#E31C3D",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

const pieData = {
  labels: ["Mentors", "Mentees"],
  datasets: [
    {
      label: "User Distribution",
      data: [320, 925],
      backgroundColor: ["#E31C3D", "#000000"],
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [mentees, setMentees] = useState<any[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<string>("");
  const [matchResult, setMatchResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState<string>("");

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Form submitted successfully!");
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("Failed to submit the form.");
    }
  };

  const renderFullDetails = (details: any, isMentee: boolean) => {
    return (
      <>
        <p><strong>Name:</strong> {details.name}</p>
        {isMentee ? (
          <>
            <p><strong>Course:</strong> {details.course}</p>
            <p><strong>Course Domain:</strong> {details.course_domain}</p>
            <p><strong>Industry Interest:</strong> {details.industry_interest.join(", ")}</p>
            <p><strong>Short-term Goals:</strong> {details.short_term_goals.join(", ")}</p>
            <p><strong>Long-term Goals:</strong> {details.long_term_goals.join(", ")}</p>
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
  };

  return (
    <>
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-6 border-b pb-2 mb-6">
          {["Overview", "Matching", "Reports", "Settings"].map((tab) => (
            <button
              key={tab}
              className={`text-lg font-semibold pb-2 border-b-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-background shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold">Total Users</h2>
              <p className="text-gray-500">Since last month</p>
              <p className="text-4xl font-bold mt-4">1,245</p>
              <p className="text-green-500 mt-2">12.5% ↑</p>
            </div>
            <div className="bg-background shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold">Active Mentors</h2>
              <p className="text-gray-500">Since last month</p>
              <p className="text-4xl font-bold mt-4">320</p>
              <p className="text-green-500 mt-2">8.3% ↑</p>
            </div>
            <div className="bg-background shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold">Active Mentees</h2>
              <p className="text-gray-500">Since last month</p>
              <p className="text-4xl font-bold mt-4">925</p>
              <p className="text-green-500 mt-2">15.2% ↑</p>
            </div>

            {/* Graph Section */}
            <div className="col-span-2 bg-background shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">User Growth</h2>
              <Bar data={data} options={options} />
            </div>

            {/* Pie Chart Section */}
            <div className="bg-background shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">User Distribution</h2>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        )}

        {/* Matching Section */}
        {activeTab === "Matching" && (
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
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== "Overview" && activeTab !== "Matching" && (
          <div className="bg-background shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold">{activeTab} Content Coming Soon</h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}