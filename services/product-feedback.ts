// services/product-feedback.ts

import { apiFetch } from "@/lib/api";

export interface ProductFeedback {
  feedbackId: string;

  productId: string;

  name: string;

  rating: number;

  message: string;

  createdAt: string;
}

export class ProductFeedbackService {
  static async getFeedbackForProduct(
    productId: string
  ): Promise<ProductFeedback[]> {
    const response =
      await apiFetch(
        `/products/${productId}/feedback`,
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch product feedback."
      );
    }

    return response.json();
  }
}