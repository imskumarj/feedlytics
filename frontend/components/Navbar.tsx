"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BarChart3, Home, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <div className="gradient-primary rounded-lg p-1.5">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>

          <span className="text-gradient">
            Feedlytics
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />

              <span className="hidden sm:inline">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}