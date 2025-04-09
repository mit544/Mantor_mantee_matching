// "use client";

import type { Metadata } from "next";
import "./src/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "MentorMatch",
  description: "Find the best mentor for your career journey.",
  icons: {
    icon: "/main_logo_ua92_style.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
