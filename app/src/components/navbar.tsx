"use client";

import Link from "next/link";
import "../styles/globals.css";
import Image from "next/image";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LoginPopup from "./login_popup";
import ForgetPasswordPopup from "./forget_password_popup";
import SignUpPopup from "./sign_up";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for LoginPopup
  const [showForgetPasswordPopup, setShowForgetPasswordPopup] = useState(false); // State for ForgetPasswordPopup
  const [showSignUpPopup, setShowSignUpPopup] = useState(false); // State for SignUpPopup

  const handleResetPassword = () => {
    setShowLoginPopup(false);
    setShowForgetPasswordPopup(true); 
  };

  const handleAlreadyAccount = () => {
    setShowLoginPopup(true);
    setShowSignUpPopup(false); 
  }

  const handleNewToMentorSync = () => {
    setShowLoginPopup(false);
    setShowSignUpPopup(true); 
  }

  const afterSignUp = () => {
    setShowSignUpPopup(false);  
    setShowLoginPopup(true);
  }

  return (
    <>
      <nav className="bg-background text-text w-full h-20 rounded-b-2xl px-6 md:px-12 shadow-md flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="pr-4 md:pr-8">
            <Image
              width="56"
              height="0"
              src="/main_logo_ua92_style.png"
              alt="Logo"
              className="w-14 inline-block"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {["/", "/about_us", "/contact_us"].map((route, index) => {
            const labels = ["Home", "About Us", "Contact Us"];
            return (
              <li key={index}>
                <Link
                  href={route}
                  className={`font-bold transition-all ${
                    pathname === route
                      ? "font-bold border-b-2 border-primary text-primary opacity-100"
                      : "hover:text-primary opacity-60 hover:opacity-100"
                  }`}
                >
                  {labels[index]}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-background shadow-md py-4 flex flex-col items-center space-y-4 md:hidden transition-all">
            {["/", "/about_us", "/contact_us"].map((route, index) => {
              const labels = ["Home", "About Us", "Contact Us"];
              return (
                <Link
                  key={index}
                  href={route}
                  className={`text-lg font-bold ${
                    pathname === route
                      ? "text-primary border-b-2 border-primary"
                      : "hover:text-primary"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {labels[index]}
                </Link>
              );
            })}
          </div>
        )}

        {/* Login & Signup Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            onPress={() => setShowLoginPopup(true)}
            className="bg-primary text-background text-md shadow-lg shadow-neutral-400 hover:shadow-neutral-600 delay-20"
          >
            Login
          </Button>
          <Button
            onPress={() => setShowSignUpPopup(true)}
            className="bg-primary text-background text-md shadow-lg shadow-neutral-400 hover:shadow-neutral-600 delay-20"
          >
            Signup
          </Button>
        </div>
      </nav>

      {/* Login Popup */}
      <LoginPopup
        showPopup={showLoginPopup}
        setShowPopup={setShowLoginPopup}
        ForgetPassLink={handleResetPassword}
        NewToMentorSync={handleNewToMentorSync}
      />

      {/* Forget Password Popup */}
      <ForgetPasswordPopup
        showForgetPassPopup={showForgetPasswordPopup}
        setForgetPassShowPopup={setShowForgetPasswordPopup}
      />

      {/* Sign Up Popup */}
      <SignUpPopup
        showPopup={showSignUpPopup}
        setShowPopup={setShowSignUpPopup}
        AlreadyAccountLink={handleAlreadyAccount}
        openLoginPopup={afterSignUp}
      />
    </>
  );
}