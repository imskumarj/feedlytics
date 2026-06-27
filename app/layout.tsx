import "./globals.css";

import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";

import {
  AuthProvider,
} from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Feedlytics",
  description:
    "Serverless Feedback Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />

          <main className="min-h-screen bg-background">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}