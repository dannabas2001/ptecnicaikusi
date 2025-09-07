import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterData } from "../schema/registrationSchema";
import { useForm } from "react-hook-form";
import { createUser } from "../helpers/userHelpers";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  
  const navigate = useNavigate();
  
  const onSubmit = (data: RegisterData) => {
    createUser(data);
    reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Logo/Brand en la parte superior */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2 text-gray-800">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="font-semibold text-xl">Dashboard</span>
        </div>
      </div>

      {/* Contenedor principal del formulario */}
      <div className="w-full max-w-md">
        
        {/* Header del formulario */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Únete a nuestro dashboard empresarial
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-sm space-y-6"
        >
          
          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Tu nombre completo"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                errors.name 
                  ? "border-red-300 bg-red-50/50" 
                  : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="tu@correo.com"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                errors.email 
                  ? "border-red-300 bg-red-50/50" 
                  : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Mínimo 6 caracteres"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                errors.password 
                  ? "border-red-300 bg-red-50/50" 
                  : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              placeholder="Repite tu contraseña"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 ${
                errors.confirmPassword 
                  ? "border-red-300 bg-red-50/50" 
                  : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Crear Mi Cuenta
          </button>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-500">¿Ya tienes cuenta?</span>
            </div>
          </div>

          {/* Link de login */}
          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 hover:underline underline-offset-4"
            >
              Iniciar sesión aquí
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          © 2024 Dashboard Pro. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;