'use client'
import Link from "next/link";
import "../styles/globals.css";
import Image from "next/image";
// import navlogo from "../../";
import { Button, ButtonGroup } from "@heroui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-background text-text w-full h-20 rounded-b-2xl px-12 shadow-md">
        <ul className="flex items-center h-full justify-between">
          <li>
            <a href="#" className="pr-8">
              <Image width='56' height={0} src={'/main_logo_ua92_style.png'} alt="Logo" className="w-14 inline-block" />
            </a>
            <Link
              href="/"
              className={`mx-4 font-bold transition-all ${
                pathname === "/"
                  ? "font-bold border-b-2 border-primary text-primary opacity-100"
                  : "hover:text-red-500 opacity-60 hover:opacity-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about_us"
              className={`mx-4 font-bold transition-all ${
                pathname === "/about_us"
                  ? "font-bold border-b-2 border-primary text-primary opacity-100"
                  : "hover:text-red-500 opacity-60 hover:opacity-100"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact_us"
              className={`mx-4 font-bold transition-all ${
                pathname === "/contact_us"
                  ? "font-bold border-b-2 border-primary text-primary opacity-100"
                  : "hover:text-red-500 opacity-60 hover:opacity-100"
              }`}
            >
              Contact Us
            </Link>
          </li>

          <li>
            <Button
              className="bg-primary text-background text-md shadow-lg shadow-neutral-400 hover:transition-shadow hover:shadow-neutral-600 delay-20 mr-2"
              size="md"
            >
              Login
            </Button>
            <Button
              className="bg-primary text-background text-md shadow-lg shadow-neutral-400 hover:transition-shadow hover:shadow-neutral-600 delay-20"
              size="md"
            >
              Signup
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
