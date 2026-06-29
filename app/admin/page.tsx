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
  AdminService,
} from "@/services/admin";

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

  const [loading, setLoading] =
    useState(true);

  const [processingId, setProcessingId] =
    useState<string | null>(
      null
    );

  const loadOwners = async () => {
    try {
      setLoading(true);

      const owners =
        await AdminService.getPendingOwners();

      setPendingOwners(
        owners
      );
    } catch {
      toast({
        title:
          "Failed To Load Owners",

        variant:
          "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOwners();
  }, []);

  const approveOwner =
    async (
      id: string
    ) => {
      try {
        setProcessingId(id);

        await AdminService.approveOwner(
          id
        );

        setPendingOwners(
          (prev) =>
            prev.filter(
              (
                owner
              ) =>
                owner.id !==
                id
            )
        );

        toast({
          title:
            "Owner Approved",
        });
      } catch {
        toast({
          title:
            "Approval Failed",

          variant:
            "destructive",
        });
      } finally {
        setProcessingId(
          null
        );
      }
    };

  const rejectOwner =
  async (
    id: string
  ) => {
    try {
      setProcessingId(id);

      await AdminService.rejectOwner(
        id
      );

      setPendingOwners(
        (prev) =>
          prev.filter(
            (
              owner
            ) =>
              owner.id !==
              id
          )
      );

      toast({
        title:
          "Owner Rejected",
      });
    } catch {
      toast({
        title:
          "Rejection Failed",

        variant:
          "destructive",
      });
    } finally {
      setProcessingId(
        null
      );
    }
  };

  if (loading) {
    return (
      <ProtectedRoute role="admin">
        <div className="flex min-h-[60vh] items-center justify-center">
          Loading...
        </div>
      </ProtectedRoute>
    );
  }

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
                          disabled={
                            processingId ===
                            owner.id
                          }
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
                          disabled={
                            processingId ===
                            owner.id
                          }
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