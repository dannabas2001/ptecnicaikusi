import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterData } from "../schema/registrationSchema";
import { useForm } from "react-hook-form";
import { createUser } from "../helpers/userHelpers";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
const navigate = useNavigate();
  const onSubmit = (data: RegisterData) => {
    createUser(data)
    reset()
    navigate("/")
  };

  return (
    <div className="min-h-screen bg-gris-50 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-blanco p-8 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-display text-gris-800 text-center mb-4">Registro</h2>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gris-700 mb-1">Nombre completo</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="border border-gris-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gris-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gris-700 mb-1">Correo</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="border border-gris-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gris-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gris-700 mb-1">Contraseña</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="border border-gris-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gris-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

    
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-gris-700 mb-1">Confirmar contraseña</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="border border-gris-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gris-400"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-gris-700 text-blanco rounded-md py-2 mt-4 hover:bg-gris-800 transition-colors"
        >
          Registrarse
        </button>
        <p className="text-gris-700 text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/" className="text-blue-500 hover:underline font-medium">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
