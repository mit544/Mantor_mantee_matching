"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MentorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "mentor") {
      router.push("/unauthorized");
    }
  }, [session, status]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, Mentor!</h1>
      <p className="text-text mt-2">Here is your personalized dashboard.</p>
    </div>
  );
}