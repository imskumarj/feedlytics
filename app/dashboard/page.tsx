import Link from "next/link";

import {
  MessageSquare,
  Package,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { RatingChart } from "@/components/RatingChart";
import { FeedbackTable } from "@/components/FeedbackTable";

import { DashboardService } from "@/services/dashboard";
import type { DashboardResponse } from "@/types/dashboard";

export default async function DashboardPage() {
  let dashboard: DashboardResponse;

  try {
    dashboard = await DashboardService.getDashboard();
  } catch {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Unable to Load Analytics
          </h2>

          <p className="mt-2 text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const hasFeedback = dashboard.feedback.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Overview of your products and feedback
        </p>
      </div>

      <Button asChild>
        <Link href="/dashboard/products">
          Manage Products
        </Link>
      </Button>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Feedback"
          value={dashboard.totalFeedback}
          icon={MessageSquare}
          trend={{
            value: dashboard.feedbackTrend,
            label: "vs last month",
          }}
        />

        <StatsCard
          title="Average Rating"
          value={`${dashboard.averageRating} / 5`}
          icon={Star}
          trend={{
            value: dashboard.ratingTrend,
            label: "vs last month",
          }}
        />

        <StatsCard
          title="Unique Users"
          value={dashboard.uniqueUsers}
          icon={Users}
          subtitle="Across all submissions"
        />

        <StatsCard
          title="5-Star Rate"
          value={`${dashboard.fiveStarPercentage}%`}
          icon={TrendingUp}
          trend={{
            value: dashboard.fiveStarTrend,
            label: "vs last month",
          }}
        />

        <StatsCard
          title="Products"
          value={4}
          icon={Package}
          subtitle="Active products"
        />
      </div>

      <div className="mb-8">
        <RatingChart
          distribution={dashboard.ratingDistribution}
        />
      </div>

      {hasFeedback ? (
        <FeedbackTable feedback={dashboard.feedback} />
      ) : (
        <div className="rounded-lg border bg-card p-8 text-center">
          <h3 className="text-lg font-semibold">
            No Feedback Yet
          </h3>

          <p className="mt-2 text-muted-foreground">
            Feedback submissions will appear here once users
            start sharing their thoughts.
          </p>
        </div>
      )}
    </div>
  );
}