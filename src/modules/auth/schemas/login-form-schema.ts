import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.email('Correo electrónico inválido'),
	password: z.string().trim().min(1, 'La contraseña debe tener al menos 1 caracter'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
