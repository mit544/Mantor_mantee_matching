"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";
import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./spinner"; // Import Spinner component

export default function LoginPopup({
  showPopup,
  setShowPopup,
  ForgetPassLink,
  NewToMentorSync,
}: {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
  ForgetPassLink: () => void;
  NewToMentorSync: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password"); // Show error toast
      setLoading(false); // Stop loading on error
    } else {
      setError("");
      toast.success("Login successful!"); // Show success toast

      // Fetch user role and profile completion status after successful login
      const userRes = await fetch("/api/auth/session");
      const userData = await userRes.json();
      console.log("User data:", userData); 
      if (userData?.user?.role === "mentor") {
        if (userData?.user?.profileCompleted === true) {
          setLoading(false); // Stop loading before redirect
          router.push("/mentor/dashboard");
        } else {
          setLoading(false);
          router.push("/mentor/profile_setup");
        }
      } else if (userData?.user?.role === "mentee") {
        if (userData?.user?.profileCompleted === true) {
          setLoading(false);
          router.push("/mentee/dashboard");
        } else {
          setLoading(false);
          router.push("/mentee/profile_setup");
        }
      } else if (userData?.user?.role === "admin") {
        setLoading(false);
        router.push("/admin");
      } else {
        setLoading(false);
        console.error("Invalid role:", userData?.user?.role);
      }

      setLoading(false);
      setShowPopup(false); // 
    }

    setLoading(false); // Stop loading after processing
  };

  if (!showPopup) return null;

  return (
    <>
      {/* <ToastContainer /> */}
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
            Welcome Back to MentorSync
          </h4>
          <button
            className="absolute top-2 right-4 text-xl font-bold text-text hover:text-red-600"
            onClick={() => setShowPopup(false)}
          >
            ×
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="text-right">
              <button
                type="button"
                onClick={ForgetPassLink}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-primary text-background py-2 rounded-lg font-semibold hover:opacity-90 transition"
              disabled={loading} // Disable button while loading
            >
              {loading ? <Spinner /> : "Sign In"} {/* Show Spinner instead of text */}
            </Button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Button
              type="button"
              className="w-full bg-background text-primary py-2 rounded-lg font-semibold hover:opacity-90 transition shadow-md"
              onPress={NewToMentorSync}
            >
              <FaUserPlus /> New to MentorSync?
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
