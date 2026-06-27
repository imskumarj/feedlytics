"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AuthContextType,
  AuthUser,
} from "@/types/auth";

import { AuthService } from "@/services/auth";

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const currentUser =
      AuthService.getCurrentUser();

    setUser(currentUser);

    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    const user =
      await AuthService.login({
        email,
        password,
      });

    setUser(user);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    await AuthService.register({
      name,
      email,
      password,
    });
  };

  const logout = () => {
    AuthService.logout();

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,

      loading,

      isAuthenticated:
        !!user &&
        user.status === "approved",

      isAdmin:
        user?.role === "admin",

      isOwner:
        user?.role === "owner",

      login,

      register,

      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}