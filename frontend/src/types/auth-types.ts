export interface AuthData {
  email: string;
  password: string;
  username: string;
  role: "ADMIN" | "USER";
}

export interface AuthResult {
  success: boolean;
  user?: AuthData;
  message?: string;
}

export interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

export type UserRole = "ADMIN" | "USER";
