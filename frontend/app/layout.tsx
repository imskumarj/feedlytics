import "./globals.css";

import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Feedlytics",
  description: "Serverless Feedback Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}