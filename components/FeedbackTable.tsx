"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarRating } from "@/components/StarRating";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import type { Feedback } from "@/types/feedback";
import { FeedbackService } from "@/services/feedback";

interface FeedbackTableProps {
  feedback: Feedback[];
}

const PAGE_SIZE = 8;

export function FeedbackTable({ feedback }: FeedbackTableProps) {
  const [page, setPage] = useState(0);
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (ratingFilter === "all") return feedback;
    return feedback.filter((f) => f.rating === Number(ratingFilter));
  }, [feedback, ratingFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const exportCsv = async () => {
    const blob = await FeedbackService.exportFeedbackCsv();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "feedlytics-export.csv";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Recent Feedback</CardTitle>
        <div className="flex items-center gap-3">
          <Select value={ratingFilter} onValueChange={(v) => { setRatingFilter(v); setPage(0); }}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              {[5, 4, 3, 2, 1].map((r) => (
                <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((f) => (
                <TableRow key={f.feedbackId}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.email}</p>
                    </div>
                  </TableCell>
                  <TableCell><StarRating value={f.rating} readonly size="sm" /></TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate text-sm text-muted-foreground">{f.message}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{new Date(f.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
