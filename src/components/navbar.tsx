'use client'
import Link from "next/link";
import "../styles/globals.css";
import Image from "next/image";
import navlogo from "../../public/rounded_logo_without_background.png";
import { Button, ButtonGroup } from "@heroui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-background text-text absolute top-0 w-full h-20 rounded-b-2xl px-12 shadow-md">
        <ul className="flex items-center h-full justify-between">
          <li>
            <a href="#" className="pr-8">
              <Image src={navlogo} alt="Logo" className="w-14 inline-block" />
            </a>
            <Link
              href="/"
              className={`mx-4 font-bold transition-all ${
                pathname === "/"
                  ? "font-extrabold border-b-2 border-primary text-primary"
                  : "hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`mx-4 font-normal transition-all ${
                pathname === "/about"
                  ? "font-extrabold border-b-2 border-primary text-primary"
                  : "hover:text-blue-500"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`mx-4 font-normal transition-all ${
                pathname === "/contact"
                  ? "font-extrabold border-b-2 border-primary text-primary"
                  : "hover:text-blue-500"
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
