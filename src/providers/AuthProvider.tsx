import { useState, useEffect, type ReactNode, useCallback } from "react";
import type { User } from "../types/loginTypes";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";
import { useDashboardContext } from "../hooks/useDashboardContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthContextType["status"]>("checking");
const {selectCountry}=useDashboardContext()
  const login = useCallback((user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setUser(null);
    setStatus("no-authenticated");
    selectCountry(null)
  }, [selectCountry]);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("currentUser");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus("authenticated");
    } else {
      setUser(null);
      setStatus("no-authenticated");
    }
  }, []);

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, status, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
