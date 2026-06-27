export type UserRole =
  | "admin"
  | "owner";

export type OwnerStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "disabled";

export interface AuthUser {
  id: string;
  name: string;
  email: string;

  role: UserRole;

  status: OwnerStatus;

  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: AuthUser | null;

  loading: boolean;

  isAuthenticated: boolean;

  isAdmin: boolean;

  isOwner: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}

export interface OwnerRegistration {
  id: string;

  name: string;

  email: string;

  status: "pending";

  createdAt: string;
}