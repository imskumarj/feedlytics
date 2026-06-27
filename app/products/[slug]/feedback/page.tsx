"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import { useToast } from "@/hooks/use-toast";

export default function ProductFeedbackPage() {
  const { slug } = useParams();

  const { toast } = useToast();

  const [loading, setLoading] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [rating, setRating] =
    useState(0);

  const [anonymous, setAnonymous] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitFeedback = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description:
          "Please select a rating.",
        variant: "destructive",
      });

      return;
    }

    if (!form.message.trim()) {
      toast({
        title: "Feedback Required",
        description:
          "Please enter your feedback.",
        variant: "destructive",
      });

      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      console.log({
        slug,
        rating,
        anonymous,
        ...form,
      });

      setSubmitted(true);
    } catch {
      toast({
        title: "Submission Failed",
        description:
          "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center px-4">
        <Card className="w-full text-center">
          <CardContent className="pt-10">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />

            <h1 className="mb-2 text-3xl font-bold">
              Thank You!
            </h1>

            <p className="mb-8 text-muted-foreground">
              Your feedback has been submitted
              successfully and will help improve
              this product.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="flex-1"
              >
                <Link href={`/products/${slug}`}>
                  Back To Product
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="flex-1"
              >
                <Link href="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href={`/products/${slug}`}
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />

        Back To Product
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Share Your Feedback
          </CardTitle>

          <CardDescription>
            Tell us about your experience.
            Your insights help improve the
            product for everyone.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={submitFeedback}
            className="space-y-6"
          >
            <div>
              <Label className="mb-3 block">
                Rating
              </Label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">
                  Submit Anonymously
                </p>

                <p className="text-sm text-muted-foreground">
                  Hide your identity from
                  displayed feedback.
                </p>
              </div>

              <Switch
                checked={anonymous}
                onCheckedChange={
                  setAnonymous
                }
              />
            </div>

            {!anonymous && (
              <>
                <div>
                  <Label>Name</Label>

                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email:
                          e.target.value,
                      })
                    }
                  />
                </div>
              </>
            )}

            <div>
              <Label>
                Your Feedback
              </Label>

              <Textarea
                rows={6}
                placeholder="Tell us what you liked, disliked, or would improve..."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message:
                      e.target.value,
                  })
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}