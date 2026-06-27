// types/product.ts

export interface Product {
  productId: string;

  ownerId: string;

  name: string;

  slug: string;

  description: string;

  category: string;

  isActive: boolean;

  totalFeedback: number;

  averageRating: number;

  createdAt: string;
}