"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Package,
  MessageSquare,
  Star,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Product } from "@/types/product";

import { ProductService } from "@/services/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const data =
        await ProductService.getProducts();

      setProducts(
        data.filter(
          (product) =>
            product.isActive
        )
      );
    };

    loadProducts();
  }, []);

  const filteredProducts =
    useMemo(() => {
      const query =
        search.toLowerCase();

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query) ||
          product.description
            .toLowerCase()
            .includes(query)
      );
    }, [products, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <p className="mt-2 text-muted-foreground">
          Browse products and share your
          feedback with product owners.
        </p>
      </div>

      <div className="relative mx-auto mb-8 max-w-xl">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="pl-10"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Products Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            Try a different search term.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map(
            (product) => (
              <Link
                key={
                  product.productId
                }
                href={`/products/${product.slug}`}
              >
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {
                        product.description
                      }
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="h-4 w-4" />

                        {
                          product.category
                        }
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="h-4 w-4" />

                        {
                          product.totalFeedback
                        }{" "}
                        feedback
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4" />

                        {
                          product.averageRating
                        }
                        /5
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}