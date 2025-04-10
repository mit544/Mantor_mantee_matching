import Link from "next/link";
import { signOut } from "next-auth/react";
import "../styles/globals.css";
import Image from "next/image";

export default function DashboardNavbar() {
  return (
    <nav className="bg-background text-text w-full h-20 rounded-b-2xl px-6 md:px-12 shadow-md flex items-center justify-between">
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

    <ul className="hidden md:flex items-center space-x-6 align-right">
          <li>
            <Link
              href="/mentee/dashboard"
              className="font-bold border-b-2 border-primary text-primary transition-all hover:text-primary hover:opacity-100"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="font-bold transition-all hover:text-primary opacity-60 hover:opacity-100"
            >
              Logout
            </button>
          </li>
    </ul>

    <div className="hidden md:flex items-center space-x-4">
    </div>
  </nav>
  );
}