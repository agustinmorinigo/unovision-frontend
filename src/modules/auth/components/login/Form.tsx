import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSignInWithPasswordMutation from '@/modules/auth/queries/use-sign-in-with-password-mutation';
import { type LoginFormSchema, loginFormSchema } from '@/modules/auth/schemas/login-form-schema';

export default function Form() {
    const [showPassword, setShowPassword] = useState(false);
    const { isPending, mutate } = useSignInWithPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = async (formValues: LoginFormSchema): Promise<void> => {
        const { email, password } = formValues;
        mutate({ email, password });
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div>
                    <Input
                        {...register('email')}
                        placeholder="tu@ejemplo.com"
                        id="email"
                        // autoComplete="off"
                        isError={!!errors.email}
                        disabled={isPending}
                    />
                    <p className="text-destructive text-sm">{errors.email?.message}</p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                    <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="off"
                        isError={!!errors.password}
                        disabled={isPending}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <div className="min-h-[1.25rem]">
                    {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                Iniciar Sesión
            </Button>
        </form>
    );
}
