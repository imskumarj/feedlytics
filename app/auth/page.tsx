"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2, ShieldCheck } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    login,
    register,
    isAuthenticated,
    user,
  } = useAuth();

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === "admin") {
      router.replace("/admin");
    } else if (
      user.role === "owner"
    ) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!loginData.email.trim()) {
        toast({
          title: "Email Required",
          variant: "destructive",
        });

        return;
      }

      if (!loginData.password.trim()) {
        toast({
          title: "Password Required",
          variant: "destructive",
        });

        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          loginData.email
        )
      ) {
        toast({
          title: "Invalid Email",
          variant: "destructive",
        });

        return;
      }

      await login(
        loginData.email,
        loginData.password
      );

      toast({
        title: "Login Successful",
        description:
          "Welcome back to Feedlytics.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!registerData.name.trim()) {
      toast({
        title: "Name Required",
        variant: "destructive",
      });

      return;
    }

    if (!registerData.email.trim()) {
      toast({
        title: "Email Required",
        variant: "destructive",
      });

      return;
    }

    if (!registerData.password.trim()) {
      toast({
        title: "Password Required",
        variant: "destructive",
      });

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        registerData.email
      )
    ) {
      toast({
        title: "Invalid Email",
        variant: "destructive",
      });

      return;
    }

    if (
      registerData.password.length < 8
    ) {
      toast({
        title: "Weak Password",
        description:
          "Password must contain at least 8 characters.",
        variant: "destructive",
      });

      return;
    }

    if (
      registerData.password !==
      registerData.confirmPassword
    ) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });

      return;
    }

    try {
      setLoading(true);

      await register(
        registerData.name,
        registerData.email,
        registerData.password
      );

      toast({
        title: "Registration Submitted",
        description:
          "Your request has been sent for admin approval.",
      });

      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>

          <CardTitle className="text-2xl">
            Feedlytics Owner Portal
          </CardTitle>

          <CardDescription>
            Login or register to manage
            your products and feedback.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="login"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                Login
              </TabsTrigger>

              <TabsTrigger value="register">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="login"
              className="mt-6"
            >
              <form
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="owner@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>

                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent
              value="register"
              className="mt-6"
            >
              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Full Name</Label>

                  <Input
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>

                  <Input
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Confirm Password
                  </Label>

                  <Input
                    type="password"
                    value={
                      registerData.confirmPassword
                    }
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Access"
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Owner accounts require
                  approval from an admin
                  before access is granted.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}