import type { Feedback } from "@/types/feedback";
import { API_URL } from "@/lib/api";

export interface CreateFeedbackRequest {
  name?: string;
  email?: string;
  message: string;
  rating: number;
}

export class FeedbackService {
  static async submitFeedback(
    data: CreateFeedbackRequest
  ): Promise<void> {
    const response = await fetch(
      `${API_URL}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.text();

      throw new Error(error || "Failed to submit feedback.");
    }
  }

  static async getAllFeedback(): Promise<Feedback[]> {
    const response = await fetch(
      `${API_URL}/feedback`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch feedback.");
    }

    return response.json();
  }
}