import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Calgary Compass",
  description: "Calgary Compass Technology Foresight Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}
