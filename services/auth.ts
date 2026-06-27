import {
  AuthUser,
  LoginRequest,
  RegisterRequest,
  OwnerRegistration
} from "@/types/auth";

const STORAGE_KEY = "feedlytics_user";

const PENDING_OWNERS_KEY =
  "feedlytics_pending_owners";

const MOCK_USERS: AuthUser[] = [
  {
    id: "1",
    name: "Sudhansu Kumar",
    email: "admin@feedlytics.com",
    role: "admin",
    status: "approved",
    createdAt: new Date().toISOString(),
  },

  {
    id: "2",
    name: "Demo Owner",
    email: "owner@feedlytics.com",
    role: "owner",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
];

export class AuthService {
  static async login({
    email,
  }: LoginRequest): Promise<AuthUser> {
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    const user = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (!user) {
      throw new Error(
        "Invalid email or password."
      );
    }

    if (user.status !== "approved") {
      throw new Error(
        "Your account is awaiting approval."
      );
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    );

    return user;
  }

  static async register({
    name,
    email,
  }: RegisterRequest): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    const exists = MOCK_USERS.some(
      (u) =>
        u.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (exists) {
      throw new Error(
        "An account already exists with this email."
      );
    }

    const pending =
        this.getPendingOwners();

        pending.push({
        id: crypto.randomUUID(),

        name,

        email,

        status: "pending",

        createdAt:
            new Date().toISOString(),
        });

        localStorage.setItem(
        PENDING_OWNERS_KEY,
        JSON.stringify(pending)
        );
  }

  static logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  static getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") {
      return null;
    }

    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  static getPendingOwners(): OwnerRegistration[] {
    const stored =
        localStorage.getItem(
        PENDING_OWNERS_KEY
        );

    if (!stored) return [];

    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
    }

    static approveOwner(id: string) {
        const pending =
            this.getPendingOwners();

        const owner =
            pending.find((o) => o.id === id);

        if (!owner) {
            throw new Error(
            "Owner not found."
            );
        }

        MOCK_USERS.push({
            id: owner.id,
            name: owner.name,
            email: owner.email,

            role: "owner",

            status: "approved",

            createdAt:
            owner.createdAt,
        });

        const updated =
            pending.filter(
            (o) => o.id !== id
            );

        localStorage.setItem(
            PENDING_OWNERS_KEY,
            JSON.stringify(updated)
        );
        }
    
    static rejectOwner(id: string) {
        const pending =
            this.getPendingOwners();

        const updated =
            pending.filter(
            (o) => o.id !== id
            );

        localStorage.setItem(
            PENDING_OWNERS_KEY,
            JSON.stringify(updated)
        );
        }
}
