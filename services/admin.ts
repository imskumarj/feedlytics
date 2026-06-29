// services/admin.ts

import { apiFetch } from "@/lib/api";

import type {
  OwnerRegistration,
} from "@/types/auth";

export class AdminService {
  static async getPendingOwners(): Promise<
    OwnerRegistration[]
  > {
    const response =
      await apiFetch(
        "/admin/owners",
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch owners."
      );
    }

    return response.json();
  }

  static async approveOwner(
    id: string
  ): Promise<void> {
    const response =
      await apiFetch(
        `/admin/owners/${id}/approve`,
        {
          method: "POST",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to approve owner."
      );
    }
  }

  static async rejectOwner(
    id: string
  ): Promise<void> {
    const response =
      await apiFetch(
        `/admin/owners/${id}/reject`,
        {
          method: "POST",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to reject owner."
      );
    }
  }
}