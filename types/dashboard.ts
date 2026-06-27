import { Feedback } from "./feedback";

export interface DashboardResponse {
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