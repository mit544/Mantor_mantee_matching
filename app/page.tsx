"use client";

import Image from "next/image";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function HomePage() {
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

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-12 py-20 max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 relative"
        >
          <div className="relative z-10 h-96">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary leading-tight">
              Empower Your Journey with MentorSync
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mt-4">
              Connect ambition with guidance through our AI-powered mentorship
              platform built for students and professionals.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-primary text-white px-8 py-3 rounded-full text-lg shadow-md hover:opacity-90">
                Get Started
              </Button>
              <Button
                variant="bordered"
                className="px-8 py-3 rounded-full text-lg border-primary text-primary hover:bg-primary hover:text-white transition"
              >
                View Demo
              </Button>
            </div>
          </div>

          <div className="absolute left-0 bottom-0 transform -translate-y-1/2 hidden md:block z-10">
            <div className="bg-white shadow-xl rounded-2xl p-5 w-64 text-left border border-gray-100">
              <p className="font-semibold text-primary">Become a Mentor</p>
              <p className="text-sm text-gray-500">
                Share your expertise with future leaders.
              </p>
              <Button variant="bordered" className="text-sm text-primary mt-2">
                Join Now
              </Button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 transform -translate-y-1/2 hidden md:block z-10">
            <div className="bg-white shadow-xl rounded-2xl p-5 w-64 text-left border border-gray-100">
              <p className="font-semibold text-primary">Need Guidance?</p>
              <p className="text-sm text-gray-500">
                Find a mentor that aligns with your journey.
              </p>
              <Button variant="bordered" className="text-sm text-primary mt-2">
                Get Started
              </Button>
            </div>
          </div>
        </motion.section>
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-12 text-center border-t border-gray-200">
          <div>
            <p className="text-3xl font-bold text-primary">+24%</p>
            <p className="text-gray-600 text-sm">Mentorship Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">99%</p>
            <p className="text-gray-600 text-sm">Profile Completion</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">4K+</p>
            <p className="text-gray-600 text-sm">Student-Mentor Sessions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">35+</p>
            <p className="text-gray-600 text-sm">Industries Engaged</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 text-center">
          <h2 className="text-sm uppercase text-primary tracking-wider mb-2">
            Smart + Fast
          </h2>
          <h3 className="text-3xl font-bold mb-4">
            Simplifying Mentorship for Everyone
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            MentorSync enables seamless, efficient mentoring powered by
            technology — for students, mentors, and admins alike.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h4 className="text-lg font-semibold text-primary mb-2">
                Personalised Matches
              </h4>
              <p className="text-sm text-gray-600">
                Smart algorithms ensure tailored mentor-mentee pairings based on
                goals, interests, and experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h4 className="text-lg font-semibold text-primary mb-2">
                Centralised Dashboard
              </h4>
              <p className="text-sm text-gray-600">
                Admins can manage users, monitor matches, and gather data
                insights from one platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h4 className="text-lg font-semibold text-primary mb-2">
                Accessible Setup
              </h4>
              <p className="text-sm text-gray-600">
                Guided onboarding and intuitive profile-building for fast and
                easy adoption.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white text-center">
          <h2 className="text-sm uppercase tracking-wider mb-2">
            Modern and Flexible
          </h2>
          <h3 className="text-3xl font-bold mb-6">
            Connect With Tools You Already Use
          </h3>
          <p className="max-w-xl mx-auto text-white/80 mb-10">
            Seamlessly integrates with learning systems, scheduling tools, and
            communication platforms to boost engagement.
          </p>

          <div className="bg-background p-6 rounded-xl shadow-lg inline-block">
            <div className="grid grid-cols-5 gap-4 items-center">
              <Image
                src="/teams.png"
                height={40}
                width={40}
                alt="Teams"
                className="w-10 h-10 mx-auto"
              />
              <Image
                src="/zoom.png"
                height={40}
                width={40}
                alt="zoom"
                className="w-10 h-10 mx-auto"
              />
              <Image
                src="/slack.png"
                height={40}
                width={40}
                alt="Slack"
                className="w-10 h-10 mx-auto"
              />
              <Image
                src="/notion.png"
                height={40}
                width={40}
                alt="Notion"
                className="w-10 h-10 mx-auto"
              />
              <Image
                src="/outlook.png"
                height={40}
                width={40}
                alt="Outlook"
                className="w-10 h-10 mx-auto"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100 text-center">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div>
              <h4 className="text-xl font-bold text-primary mb-2">
                Faster Onboarding
              </h4>
              <p className="text-sm text-gray-600">
                Users can sign up and complete profile setup in under 5 minutes.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-primary mb-2">
                Reduced Manual Admin
              </h4>
              <p className="text-sm text-gray-600">
                Matchmaking is automatic and customisable — no spreadsheets
                needed.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-primary mb-2">
                Cost-Effective Solution
              </h4>
              <p className="text-sm text-gray-600">
                Completely free for UA92 students and mentors, with zero
                infrastructure cost.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-24 px-4 md:px-12 max-w-7xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
              Resources
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              All resources you need
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore mentoring insights, student success guides, industry
              knowledge, and more.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
              <Image
                src="/mentorship_principle.png"
                alt="Mentoring overview"
                width={600}
                height={320}
                className="w-full object-cover h-80"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary">
                  5 Steps to Effective Mentorship
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  Practical techniques to help mentors and mentees build strong
                  relationships.
                </p>
                <a
                  href="https://www.mentorcliq.com/blog/mentoring-process-stages"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex gap-4 items-center">
                <Image
                  src="/chatbot.png"
                  alt="AI chat"
                  width={150}
                  height={60}
                />
                <div>
                  <h4 className="text-md font-semibold text-primary">
                    Using AI to Support Mentoring
                  </h4>
                  <a href="https://guider-ai.com/blog/ai-for-mentoring-and-coaching/" className="text-sm text-primary hover:underline">
                    Read more →
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex gap-4 items-center">
                <Image
                  src="/growth_mindset.png"
                  alt="Growth mindset"
                  width={150}
                  height={60}
                />
                <div>
                  <h4 className="text-md font-semibold text-primary">
                    Why Growth Mindset Matters
                  </h4>
                  <a href="https://www.mentorink.com/blog/5-top-tips-to-mentors-for-effective-mentoring/" className="text-sm text-primary hover:underline">
                    Read more →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white rounded-2xl p-10 text-center space-y-6">
            <p className="text-xs uppercase tracking-widest text-background font-semibold">
              Join the Best
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              The Best Free Mentoring Platform for Your Growth
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Button className="bg-background text-primary px-6 py-2 rounded-full font-semibold">
                Get Started
              </Button>
              <Button
                variant="bordered" 
                className="border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-primary"
              >
                View Demo
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
