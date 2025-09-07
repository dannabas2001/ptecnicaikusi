import { createContext } from "react";
import type { User } from "../types/loginTypes";


export type AuthContextType = {
  user: User | null;
  status: "checking" | "authenticated" | "no-authenticated";
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
