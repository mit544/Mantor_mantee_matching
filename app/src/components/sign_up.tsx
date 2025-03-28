"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Button } from "@heroui/button";
import Image from "next/image";
import { FaUser } from "react-icons/fa";


export default function SignUpPopup({
  showPopup,
  setShowPopup,
  AlreadyAccountLink,
}: {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
  AlreadyAccountLink: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setError("");
        setShowPopup(false);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to sign up. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-background p-11 rounded-2xl shadow-2xl w-96 relative transform transition-all duration-300 ease-in-out opacity-100 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/main_logo_ua92_style.png"
          width={48}
          height={48}
          alt="MentorSync Logo"
          className="mx-auto mb-2"
        />
        <h4 className="text-lg text-center text-text pb-9">
          Create Your MentorSync Account
        </h4>
        <button
          className="absolute top-2 right-4 text-xl font-bold text-text hover:text-red-600"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm text-text mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
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
          <div className="relative">
            <label className="block text-sm text-text mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-primary text-background py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </Button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button
            type="button"
            className="w-full bg-background text-primary py-2 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
            onPress={AlreadyAccountLink}
          >
          <FaUser />  Already have an account?
          </Button>
        </form>
      </div>
    </div>
  );
}