import Link from "next/link";

import {
  ArrowLeft,
  MessageSquare,
  Star,
  Calendar,
} from "lucide-react";

import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductService } from "@/services/product";

import {
  ProductFeedbackService,
} from "@/services/product-feedback";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } =
    await params;

  const product =
    await ProductService.getProductBySlug(
      slug
    );

  if (!product) {
    notFound();
  }

  const feedback =
    await ProductFeedbackService.getFeedbackForProduct(
      product.productId
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/products"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />

          Back to Products
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-2 text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Button asChild size="lg">
            <Link
              href={`/products/${product.slug}/feedback`}
            >
              Leave Feedback
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Feedback
                </p>

                <p className="text-2xl font-bold">
                  {
                    product.totalFeedback
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Average Rating
                </p>

                <p className="text-2xl font-bold">
                  {
                    product.averageRating
                  }
                  /5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Category
              </p>

              <p className="text-2xl font-bold">
                {product.category}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            Product Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Recent Feedback
          </CardTitle>
        </CardHeader>

        <CardContent>
          {feedback.length === 0 ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">
                No feedback available yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedback.map(
                (item) => (
                  <div
                    key={
                      item.feedbackId
                    }
                    className="rounded-lg border p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {
                            item.name
                          }
                        </p>

                        <div className="mt-1 flex items-center gap-1">
                          {Array.from({
                            length: item.rating,
                          }).map(
                            (
                              _,
                              index
                            ) => (
                              <Star
                                key={
                                  index
                                }
                                className="h-4 w-4 fill-current text-yellow-500"
                              />
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />

                        {
                          item.createdAt
                        }
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {
                        item.message
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}