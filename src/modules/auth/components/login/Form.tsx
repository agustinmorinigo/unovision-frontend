import { zodResolver } from '@hookform/resolvers/zod';
// import { Eye, EyeOff } from 'lucide-react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type LoginFormSchema, loginFormSchema } from '@/modules/auth/schemas/login-form-schema';

export default function Form() {
	// const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginFormSchema),
	});

	const onSubmit = (data: LoginFormSchema) => console.log(data);

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="space-y-2">
				<Label htmlFor="email">Correo Electrónico</Label>
				<div>
					<Input
						{...register('email')}
						placeholder="tu@ejemplo.com"
						id="email"
						className={cn(errors.email && 'border-destructive')}
					/>
					<p className="text-destructive text-sm">{errors.email?.message}</p>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Contraseña</Label>
				<div className="relative">
					<Input
						{...register('password')}
						// type={showPassword ? 'text' : 'password'}
						type={'password'}
						id="password"
						className={cn(errors.password && 'border-destructive')}
					/>
					{/* <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button> */}
					<p className="text-destructive text-sm mt-1">{errors.password?.message}</p>
				</div>
			</div>

			<Button type="submit" className="w-full mt-3">
				Iniciar Sesión
			</Button>
		</form>
	);
}
