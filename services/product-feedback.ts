export interface ProductFeedback {
  feedbackId: string;

  name: string;

  rating: number;

  message: string;

  createdAt: string;
}

const MOCK_FEEDBACK: ProductFeedback[] = [
  {
    feedbackId: "1",
    name: "Rahul",
    rating: 5,
    message:
      "Amazing experience. Very easy to use.",
    createdAt: "2026-06-01",
  },

  {
    feedbackId: "2",
    name: "Priya",
    rating: 4,
    message:
      "Great platform with clean UI.",
    createdAt: "2026-06-08",
  },

  {
    feedbackId: "3",
    name: "Anonymous",
    rating: 5,
    message:
      "Would definitely recommend.",
    createdAt: "2026-06-10",
  },
];

export class ProductFeedbackService {
  static async getFeedbackForProduct(
    productId: string
  ) {
    return MOCK_FEEDBACK;
  }
}