"use client";

import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function MenteeDashboard() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Mentee Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <p className="text-gray-600 mt-2">View and update your profile information.</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Edit Profile
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Mentorship Sessions</h2>
            <p className="text-gray-600 mt-2">Track your upcoming and past mentorship sessions.</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              View Sessions
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Goals</h2>
            <p className="text-gray-600 mt-2">Set and track your short-term and long-term goals.</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Manage Goals
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Feedback</h2>
            <p className="text-gray-600 mt-2">Provide feedback to your mentors and sessions.</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Give Feedback
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Resources</h2>
            <p className="text-gray-600 mt-2">Access helpful resources and guides.</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              View Resources
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}