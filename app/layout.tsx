import type { Metadata } from "next";
import "./src/styles/globals.css";
import { Fira_Sans, Kanit } from "next/font/google";

export const metadata: Metadata = {
  title: "MentorMatch",
  description: "Find the best mentor for your career journey.",
  icons: {
    icon: "/main_logo_ua92_style.png",
  },
};

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fira",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${firaSans.variable} ${kanit.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
