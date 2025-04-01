"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Select Role");


  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Validate role selection
    if (role === "Select Role") {
      toast.error("Please select a role!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setShowPopup(false);


        // console.log("User role:", data.user.role);

        
        if (data.user.role === "mentor") {
          router.push("/mentor/profile_setup");
        } else if (data.user.role === "mentee") {
          router.push("/mentee/profile_setup");
        } else {
          console.error("Invalid role:", data.user.role);
        }
      } else {

        const data = await res.json();
        toast.error(data.message || "Failed to sign up. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
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
          <div className="relative">
            <label className="block text-sm text-text mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            <Dropdown backdrop="blur" className="required">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full">
                  {role}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select Role"
                variant="faded"
                className="bg-white shadow-lg rounded-lg max-h-40 overflow-y-auto px-2 py-2 shadow-slate-300"
              >
                <DropdownItem
                  key="mentee"
                  className="py-2 px-8 hover:bg-primary hover:text-white rounded-md cursor-pointer transition-all"
                  onPress={() => setRole("Mentee")}
                >
                  Mentee
                </DropdownItem>
                <DropdownItem
                  key="mentor"
                  className="py-2 px-8 hover:bg-primary hover:text-white rounded-md cursor-pointer transition-all"
                  onPress={() => setRole("Mentor")}
                >
                  Mentor
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

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
            <FaUser /> Already have an account?
          </Button>
        </form>
      </div>
    </div>
  );
}
