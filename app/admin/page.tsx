"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
      <p className="text-text mt-2">Manage users, view statistics, and configure mentor matching.</p>
    </div>
  );
}