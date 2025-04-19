"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/src/components/dashboard_navbar";
import Footer from "@/src/components/footer";
import LoadingPageRedirection from "@/src/components/spinner_for_page";
import OverviewTab from "@/src/components/admin/OverviewTab";
import MatchingTab from "@/src/components/admin/MatchingTab";
import PlaceholderTab from "@/src/components/admin/PlaceholderTab";
import SettingsTab from "@/src/components/admin/setting";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      if (status === "unauthenticated") {
        router.push("/");
      }
    };
    checkSession();
  }, [status, router]);

  useEffect(() => {
    setIsFetching(false);
  }, []);

  if (isFetching || status === "loading") {
    return <LoadingPageRedirection />;
  }

  return (
    <>
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex space-x-6 border-b pb-2 mb-6">
          {["Overview", "Matching", "Reports", "Settings"].map((tab) => (
            <button
              key={tab}
              className={`text-lg font-semibold pb-2 border-b-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Matching" && <MatchingTab />}
        {activeTab === "Reports" && <PlaceholderTab title="Reports" />} 
        {activeTab === "Settings" && <SettingsTab title="Settings" />} 
      </div>
      <Footer />
    </>
  );
}
