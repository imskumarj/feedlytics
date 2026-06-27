// services/product.ts

import { Product } from "@/types/product";

const MOCK_PRODUCTS: Product[] = [
  {
    productId: "1",
    ownerId: "2",

    name: "Feedlytics Website",
    slug: "feedlytics-website",

    description:
      "Official customer feedback portal.",

    category: "SaaS",

    isActive: true,

    totalFeedback: 48,

    averageRating: 4.7,

    createdAt: "2026-01-10",
  },

  {
    productId: "2",
    ownerId: "2",

    name: "Mobile App",

    slug: "mobile-app",

    description:
      "Customer mobile application.",

    category: "Mobile",

    isActive: true,

    totalFeedback: 21,

    averageRating: 4.3,

    createdAt: "2026-03-20",
  },
];

export class ProductService {
  static async getProducts() {
    return MOCK_PRODUCTS;
  }

  static async getProductBySlug(
  slug: string
) {
  const products =
    await this.getProducts();

  return (
    products.find(
      (product) =>
        product.slug === slug
    ) ?? null
  );
}


}
