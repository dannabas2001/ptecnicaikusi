
export type AuthStatus = "checking" | "authenticated" | "no-authenticated";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: User;
}
export interface AuthContextProps {
  user: User | null;
  status: "checking" | "authenticated" | "no-authenticated";
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}