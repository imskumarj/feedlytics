import type { DashboardResponse } from "@/types/dashboard";
import { API_URL } from "@/lib/api";

export class DashboardService {
  static async getDashboard(): Promise<DashboardResponse> {
    const response = await fetch(
      `${API_URL}/analytics`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard analytics.");
    }

    return response.json();
  }
}