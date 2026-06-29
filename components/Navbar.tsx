"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BarChart3,
  Home,
  MessageSquare,
  Shield,
  LogOut,
  Package,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    logout,
    isAuthenticated,
    isAdmin,
    isOwner,
  } = useAuth();

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  const links = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      visible: true,
    },

    {
      href: "/products",
      label: "Products List",
      icon: MessageSquare,
      visible: true,
    },

    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      visible: isOwner,
    },

    {
      href: "/dashboard/products",
      label: "Your Products",
      icon: Package,
      visible: isOwner,
    },

    {
      href: "/admin",
      label: "Admin",
      icon: Shield,
      visible: isAdmin,
    },
  ];

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

        <div className="flex items-center gap-2">
          {links
            .filter((link) => link.visible)
            .map(
              ({
                href,
                label,
                icon: Icon,
              }) => (
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
              )
            )}

          {isAuthenticated ? (
            <>
              <div className="hidden border-l pl-3 text-sm sm:block">
                <p className="font-medium">
                  {user?.name}
                </p>

                <p className="text-xs capitalize text-muted-foreground">
                  {user?.role}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />

                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              size="sm"
            >
              <Link href="/auth">
                <LogIn className="mr-2 h-4 w-4" />

                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}