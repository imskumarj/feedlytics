import {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL!;

const TOKEN_KEY =
  "feedlytics_token";

export class AuthService {
  static async login(
    data: LoginRequest
  ): Promise<AuthUser> {
    const response =
      await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

    if (!response.ok) {
      throw new Error(
        "Invalid email or password."
      );
    }

    const result =
      await response.json();

    localStorage.setItem(
      TOKEN_KEY,
      result.token
    );

    return result.user;
  }

  static async register(
    data: RegisterRequest
  ): Promise<void> {
    const response =
      await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

    if (!response.ok) {
      const error =
        await response.text();

      throw new Error(
        error ||
          "Registration failed."
      );
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    const token =
      localStorage.getItem(
        TOKEN_KEY
      );

    if (!token) {
      return null;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {
        this.logout();

        return null;
      }

      return response.json();
    } catch {
      return null;
    }
  }

  static getToken() {
    return localStorage.getItem(
      TOKEN_KEY
    );
  }

  static logout() {
    localStorage.removeItem(
      TOKEN_KEY
    );
  }
}