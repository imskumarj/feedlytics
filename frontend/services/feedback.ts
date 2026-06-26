import type { Feedback } from "@/types/feedback";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const response = await fetch(`${API_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback.");
    }
  }

  static async exportFeedbackCsv() {
    const response = await fetch(`${API_URL}/feedback/export`);

    if (!response.ok) {
      throw new Error("Failed to export feedback.");
    }

    return response.blob();
  }

  static async getAllFeedback(): Promise<Feedback[]> {
    const response = await fetch(`${API_URL}/feedback`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch feedback.");
    }

    return response.json();
  }
}