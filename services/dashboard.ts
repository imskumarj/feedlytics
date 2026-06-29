// services/dashboard.ts

import { apiFetch } from "@/lib/api";

import type {
  DashboardResponse,
} from "@/types/dashboard";

export class DashboardService {
  static async getDashboard(): Promise<DashboardResponse> {
    const response =
      await apiFetch(
        "/analytics",
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch dashboard analytics."
      );
    }

    return response.json();
  }
}