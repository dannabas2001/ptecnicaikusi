import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre es obligatorio"), 
    email: z.string().email("Correo no válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], 
  });

export type RegisterData = z.infer<typeof registerSchema>;
