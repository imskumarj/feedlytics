import Link from "next/link";

import {
  Plus,
  Package,
  Star,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductService } from "@/services/product";

export default async function ProductsPage() {
  const products =
    await ProductService.getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage all products and feedback channels.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />

            New Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.productId}>
            <CardHeader>
              <CardTitle>
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {product.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4" />

                  {product.totalFeedback}
                  {" "}feedback
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4" />

                  {product.averageRating}/5
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4" />

                  {product.category}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link
                    href={`/dashboard/products/${product.productId}`}
                  >
                    Manage Product
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}