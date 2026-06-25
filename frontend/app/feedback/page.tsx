import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/StarRating";
import { CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

interface FormErrors {
  message?: string;
  rating?: string;
  email?: string;
}

export default function FeedbackPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "", rating: 0 });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.length > 1000) errs.message = "Message must be under 1000 characters.";
    if (form.rating === 0) errs.rating = "Please select a rating.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast({ title: "Feedback submitted!", description: "Thank you for your feedback." });
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="mx-auto w-full max-w-md text-center">
          <CardContent className="pt-12 pb-10">
            <div className="mx-auto mb-6 inline-flex rounded-full bg-success/10 p-4">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">Your feedback has been recorded and will help us improve.</p>
            <Button className="mt-8" variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "", rating: 0 }); }}>
              Submit Another
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Share Your Feedback</CardTitle>
          <CardDescription>We'd love to hear from you. Your feedback helps us improve.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input id="name" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rating <span className="text-destructive">*</span></Label>
              <StarRating value={form.rating} onChange={(v) => { setForm({ ...form, rating: v }); setErrors({ ...errors, rating: undefined }); }} size="lg" />
              {errors.rating && <p className="text-xs text-destructive">{errors.rating}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
              <Textarea id="message" placeholder="Tell us what you think..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
              <div className="flex justify-between">
                {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : <span />}
                <p className="text-xs text-muted-foreground">{form.message.length}/1000</p>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90" disabled={loading}>
              {loading ? "Submitting…" : <><Send className="mr-2 h-4 w-4" /> Submit Feedback</>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
