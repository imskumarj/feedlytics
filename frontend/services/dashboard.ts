import type { DashboardResponse } from "@/types/dashboard";

export class DashboardService {
  static async getDashboard(): Promise<DashboardResponse> {
    return {
      totalFeedback: 0,
      averageRating: 0,
      uniqueUsers: 0,
      fiveStarPercentage: 0,
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      feedback: [],
    };
  }
}