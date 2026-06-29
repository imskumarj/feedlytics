// services/product.ts

import { apiFetch } from "@/lib/api";

import { Product } from "@/types/product";

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    const response =
      await apiFetch(
        "/products",
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch products."
      );
    }

    return response.json();
  }

  static async getProductBySlug(
    slug: string
  ): Promise<Product | null> {
    const response =
      await apiFetch(
        `/products/${slug}`,
        {
          cache: "no-store",
        }
      );

    if (
      response.status === 404
    ) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        "Failed to fetch product."
      );
    }

    return response.json();
  }

  static async createProduct(
    data: Partial<Product>
  ): Promise<Product> {
    const response =
      await apiFetch(
        "/products",
        {
          method: "POST",

          body: JSON.stringify(
            data
          ),
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to create product."
      );
    }

    return response.json();
  }

  static async updateProduct(
    id: string,
    data: Partial<Product>
  ): Promise<Product> {
    const response =
      await apiFetch(
        `/products/${id}`,
        {
          method: "PUT",

          body: JSON.stringify(
            data
          ),
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to update product."
      );
    }

    return response.json();
  }

  static async deleteProduct(
    id: string
  ): Promise<void> {
    const response =
      await apiFetch(
        `/products/${id}`,
        {
          method: "DELETE",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to delete product."
      );
    }
  }
}