// services/feedback.ts

import { apiFetch } from "@/lib/api";

import type {
  Feedback,
} from "@/types/feedback";

export interface CreateFeedbackRequest {
  productId: string;

  name?: string;

  email?: string;

  message: string;

  rating: number;

  anonymous?: boolean;
}

export class FeedbackService {
  static async submitFeedback(
    data: CreateFeedbackRequest
  ): Promise<void> {
    const response =
      await apiFetch(
        "/feedback",
        {
          method: "POST",

          body: JSON.stringify(
            data
          ),
        }
      );

    if (!response.ok) {
      const error =
        await response.text();

      throw new Error(
        error ||
          "Failed to submit feedback."
      );
    }
  }

  static async getAllFeedback(): Promise<Feedback[]> {
    const response =
      await apiFetch(
        "/feedback",
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch feedback."
      );
    }

    return response.json();
  }

  static async exportFeedbackCsv(): Promise<Blob> {
    const response =
      await apiFetch(
        "/feedback/export",
        {
          method: "GET",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to export feedback."
      );
    }

    return response.blob();
  }
}