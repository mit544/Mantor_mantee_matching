"use client";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background text-text pt-12 pb-3 md:px-12 lg:px-24 h-44 shadow_footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
        {/* Left Section - Branding & Socials */}
        <div className="w-full md:w-1/4">
          <Image
            width="56"
            height={56}
            src="/main_logo_ua92_style.png"
            alt="Logo"
            className="w-16 h-16"
          />
          <h2 className="text-2xl font-bold text-primary mt-2">MentorSync</h2>
          <p className="text-sm text-gray-500 mt-2">
            Seamlessly Connecting Ambitions with Expertise.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-text hover:text-primary">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-text hover:text-primary">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-text hover:text-primary">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Center Sections - Navigation */}
        <div className="w-full md:w-2/4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Navigation</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  How It Works?
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Find a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Become a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="hover:text-primary">
                  Blogs & Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Events & Webinars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Mentorship Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Company</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Trending */}
          <div>
            <h3 className="text-lg font-semibold text-primary">Trending</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="hover:text-primary">
                  Industry Insight
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Latest Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Research & Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright & Language Selection */}
      <div className="border-t border-gray-200 mt-10 pt-6 mb-3 flex flex-col md:flex-row justify-center text-sm text-gray-500">
        <p>© MentorSync 2025. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
