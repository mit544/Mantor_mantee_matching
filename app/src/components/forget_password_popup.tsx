"use client";
import { useState } from "react";

export default function ForgetPasswordPopup({
  showForgetPassPopup,
  setForgetPassShowPopup,
}: {
  showForgetPassPopup: boolean;
  setForgetPassShowPopup: (value: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/request-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("A reset code has been sent to your email.");
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send reset code.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  if (!showForgetPassPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={() => setForgetPassShowPopup(false)} // Close popup when clicking on the backdrop
    >
      <div
        className="bg-background p-8 rounded-2xl shadow-2xl w-96 relative transform transition-all duration-300 ease-in-out opacity-100 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <button
          className="absolute top-2 right-4 text-xl font-bold text-text hover:text-red-600"
          onClick={() => setForgetPassShowPopup(false)}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-text">Forgot Password</h2>
        <form onSubmit={handleRequestCode} className="space-y-4">
          <div>
            <label className="block text-sm text-text mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-background py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Get Code
          </button>
        </form>
      </div>
    </div>
  );
}