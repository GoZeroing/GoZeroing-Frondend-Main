import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PersistentSidebar from "@/components/PersistentSidebar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoZeroing - AI-Powered Search",
  description: "Enterprise-grade AI search platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#1a1a1a]`}>
        <PersistentSidebar />
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
