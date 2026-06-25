import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, MessageSquare, Zap, Shield, ArrowRight } from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Collect Feedback", description: "Beautiful public forms that capture ratings, messages, and user details effortlessly." },
  { icon: BarChart3, title: "Real-Time Analytics", description: "Interactive charts and metrics that update instantly as feedback flows in." },
  { icon: Zap, title: "Serverless Scale", description: "Built on AWS Lambda and DynamoDB — scales from zero to millions without managing servers." },
  { icon: Shield, title: "Spam Protection", description: "IP-based rate limiting and validation keep your data clean and reliable." },
];

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-32">
        <div className="absolute inset-0 -z-10 gradient-primary opacity-[0.03]" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-3.5 w-3.5" /> Serverless Feedback Intelligence
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Turn feedback into{" "}
            <span className="text-gradient">actionable insights</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Feedlytics is a serverless feedback platform that collects, manages, and analyzes user feedback in real-time using AWS-native architecture.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 px-8">
              <Link to="/feedback">Give Feedback <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to understand your users</h2>
            <p className="mt-3 text-muted-foreground">From collection to analysis, Feedlytics handles the entire feedback lifecycle.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl gradient-primary p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-3 opacity-80">Start collecting feedback in under 5 minutes. No credit card required.</p>
          <Button asChild size="lg" className="mt-8 bg-card text-foreground hover:bg-card/90 px-8">
            <Link to="/feedback">Start Collecting Feedback</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="gradient-primary rounded-md p-1">
              <BarChart3 className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            Feedlytics © {new Date().getFullYear()}
          </div>
          <p className="text-xs text-muted-foreground">Built with AWS Lambda + DynamoDB</p>
        </div>
      </footer>
    </div>
  );
}
