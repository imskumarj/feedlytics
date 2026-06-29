import { Feedback } from "./feedback";

export interface DashboardResponse {
  totalProducts: number;
  totalFeedback: number;
  averageRating: number;
  uniqueUsers: number;
  fiveStarPercentage: number;

  feedbackTrend: number;
  ratingTrend: number;
  fiveStarTrend: number;

  ratingDistribution: Record<number, number>;

  feedback: Feedback[];
}