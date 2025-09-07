import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/loginSchema";
import { login as loginService } from "../helpers/userHelpers";
import { useAuthContext } from "../hooks/useAuthContext";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginData) => {
    const result = loginService(data.email, data.password);
    if (!result) {
      alert("Usuario o contraseña incorrectos");
      return;
    }
    login(result.user, result.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gris-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blanco p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-display text-gris-800 text-center mb-4">
          Login
        </h2>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gris-700 mb-1">
            Correo
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Tu email"
            className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gris-300"
            } transition-colors`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gris-700 mb-1">
            Contraseña
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.password ? "border-red-500" : "border-gris-300"
            } transition-colors`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-gris-700 text-blanco rounded-md py-2 mt-4 hover:bg-gris-800 transition-colors"
        >
          Ingresar
        </button>

        <p className="text-gris-700 text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
