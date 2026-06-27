"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";

import {
  ProtectedRoute,
} from "@/components/auth/ProtectedRoute";

import {
  AuthService,
} from "@/services/auth";

import {
  OwnerRegistration,
} from "@/types/auth";

import {
  useToast,
} from "@/hooks/use-toast";

export default function AdminPage() {
  const { toast } =
    useToast();

  const [
    pendingOwners,
    setPendingOwners,
  ] = useState<
    OwnerRegistration[]
  >([]);

  const loadOwners = () => {
    setPendingOwners(
      AuthService.getPendingOwners()
    );
  };

  useEffect(() => {
    loadOwners();
  }, []);

  const approveOwner = (
    id: string
  ) => {
    AuthService.approveOwner(id);

    loadOwners();

    toast({
      title:
        "Owner Approved",
    });
  };

  const rejectOwner = (
    id: string
  ) => {
    AuthService.rejectOwner(id);

    loadOwners();

    toast({
      title:
        "Owner Rejected",
    });
  };

  return (
    <ProtectedRoute role="admin">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-muted-foreground">
            Manage owner
            registrations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />

              Pending Owners
            </CardTitle>
          </CardHeader>

          <CardContent>
            {pendingOwners.length ===
            0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No pending
                registrations.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingOwners.map(
                  (owner) => (
                    <div
                      key={owner.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {
                            owner.name
                          }
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {
                            owner.email
                          }
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            approveOwner(
                              owner.id
                            )
                          }
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />

                          Approve
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() =>
                            rejectOwner(
                              owner.id
                            )
                          }
                        >
                          <XCircle className="mr-2 h-4 w-4" />

                          Reject
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}