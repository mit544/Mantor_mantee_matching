"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";

export default function MenteeDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = session?.user;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Section */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/4">
            <div className="text-center">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">
                {user?.name || "Mentee User"}
              </h2>
              <p className="text-gray-600">
                {user?.email || "user@mentor.com"}
              </p>
              <p className="text-gray-500 mt-2">Mentee at MentorSync</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-600 text-sm">Course: Computer Science</p>
              <p className="text-gray-600 text-sm">Domain: Digital</p>
              <p className="text-gray-600 text-sm">Graduation Year: 2025</p>
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

          {/* Main Content Section */}
          <div className="flex-1">
            <div className="bg-white shadow-md rounded-lg">
              <div className="flex border-b">
                {["Overview", "Matches", "Messages"].map((tab) => (
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
                        journey. Begin by exploring your current matches or
                        updating your preferences to get the best possible
                        mentor match.
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "Matches" && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-bold">You have no matches yet</h3>
                    <p className="text-gray-700">
                      Once your profile is reviewed, suitable mentor matches
                      will appear here.
                    </p>
                  </div>
                )}
                {activeTab === "Messages" && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-bold">Messages feature coming soon</h3>
                    <p className="text-gray-700">
                      Stay tuned to communicate with your mentor directly from
                      the dashboard.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/4">
            <h2 className="text-lg font-bold mb-4">MentorSync Updates</h2>
            <p className="text-gray-600">
              We’re constantly working to improve your mentorship experience.
              Soon you’ll see features like AI-powered matching, performance
              tracking, and integrated messaging.
            </p>
          </div>
        </div>
      </div>

      {/* View Profile Modal */}
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
                <strong>Course:</strong> Computer Science
              </p>
              <p>
                <strong>Domain:</strong> Digital
              </p>
              <p>
                <strong>Graduation Year:</strong> 2025
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
