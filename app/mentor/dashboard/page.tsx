"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "@/src/components/dashboard_navbar";
import Footer from "@/src/components/footer";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPageRedirection from "@/src/components/spinner_for_page";

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mentorData, setMentorData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = session?.user;

  useEffect(() => {
    async function fetchMentorData() {
      try {
        const response = await axios.get("/api/mentor_dashboard");
        setMentorData(response.data.mentor);
        setSessions(response.data.sessions || []);
        setMessages(response.data.messages || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchMentorData();
    } else {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("loggedOut") === "true") {
      toast.success("You have successfully logged out.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  if (loading) {
    return <LoadingPageRedirection />; 
  }

  return (
    <>
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/4">
            <div className="text-center">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">
                {mentorData?.name || "Mentor User"}
              </h2>
              <p className="text-gray-600">
                {mentorData?.email || "user@mentor.com"}
              </p>
              <p className="text-gray-500 mt-2">Mentor at MentorSync</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-600 text-sm">Company: {mentorData?.company || "N/A"}</p>
              <p className="text-gray-600 text-sm">Role: {mentorData?.job_role || "N/A"}</p>
              <p className="text-gray-600 text-sm">Experience: {mentorData?.experience || "N/A"}</p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                onClick={() => setIsProfileOpen(true)}
              >
                View Profile
              </button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                Edit Preferences
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white shadow-md rounded-lg">
              <div className="flex border-b">
                {["Overview", "Sessions", "Messages"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 py-3 text-center font-semibold ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "Overview" && (
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-bold">Welcome to MentorSync!</h3>
                      <p className="text-gray-700">
                        This dashboard provides insights into your mentorship
                        journey. Begin by exploring your sessions or updating
                        your preferences to connect with mentees.
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "Sessions" && (
                  <div className="space-y-4">
                    {sessions.length > 0 ? (
                      sessions.map((session, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-4 rounded-lg"
                        >
                          <h3 className="font-bold">{session.title}</h3>
                          <p className="text-gray-700">{session.description}</p>
                          <p className="text-gray-500 text-sm">
                            Date: {session.date}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-bold">You have no sessions yet</h3>
                        <p className="text-gray-700">
                          Once mentees are assigned, your sessions will appear
                          here.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "Messages" && (
                  <div className="space-y-4">
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-4 rounded-lg"
                        >
                          <h3 className="font-bold">{message.sender}</h3>
                          <p className="text-gray-700">{message.content}</p>
                          <p className="text-gray-500 text-sm">
                            Sent: {message.timestamp}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-bold">No messages yet</h3>
                        <p className="text-gray-700">
                          Stay tuned to communicate with your mentees directly
                          from the dashboard.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/4">
            <h2 className="text-lg font-bold mb-4">MentorSync Updates</h2>
            <p className="text-gray-600">
              Stay updated with the latest news and features from MentorSync.
            </p>
          </div>
        </div>
      </div>
      <Dialog
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-xl font-bold mb-4">
              Your Profile
            </Dialog.Title>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <p>
                <strong>Company:</strong> {mentorData?.company || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {mentorData?.job_role || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {mentorData?.experience || "N/A"}
              </p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Footer />
    </>
  );
}