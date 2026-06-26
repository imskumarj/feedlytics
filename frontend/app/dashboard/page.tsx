import { MessageSquare, Star, TrendingUp, Users } from "lucide-react";

import { StatsCard } from "@/components/StatsCard";
import { RatingChart } from "@/components/RatingChart";
import { FeedbackTable } from "@/components/FeedbackTable";

import { DashboardService } from "@/services/dashboard";

export default async function DashboardPage() {
  const dashboard = await DashboardService.getDashboard();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Overview of your feedback analytics
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Feedback"
          value={dashboard.totalFeedback}
          icon={MessageSquare}
          trend={{
            value: 12,
            label: "vs last month",
          }}
        />

        <StatsCard
          title="Average Rating"
          value={`${dashboard.averageRating} / 5`}
          icon={Star}
          trend={{
            value: 3,
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
            value: 5,
            label: "vs last month",
          }}
        />
      </div>

      <div className="mb-8">
        <RatingChart
          distribution={dashboard.ratingDistribution}
        />
      </div>

      <FeedbackTable feedback={dashboard.feedback} />
    </div>
  );
}