import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "../views/LoginForm";
import RegisterForm from "../views/RegisterForm";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuthContext } from "../hooks/useAuthContext";


export const AppRouter = () => {
  const { status, checkAuth } = useAuthContext(); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (status === "checking") {
    return <div className="loading">Checking credentials...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {status === "authenticated" ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </>
        )}
        <Route
          path="*"
          element={
            status === "authenticated" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
