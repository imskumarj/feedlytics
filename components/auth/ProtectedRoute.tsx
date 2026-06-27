"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  ReactNode,
} from "react";

import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;

  role?: "admin" | "owner";
}

export function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    loading,
    isAuthenticated,
    user,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/auth");
      return;
    }

    if (
      role &&
      user?.role !== role
    ) {
      router.replace("/");
    }
  }, [
    loading,
    isAuthenticated,
    role,
    user,
    router,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (
    role &&
    user?.role !== role
  ) {
    return null;
  }

  return <>{children}</>;
}