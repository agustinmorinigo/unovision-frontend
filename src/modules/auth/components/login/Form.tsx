import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Form() {
	return (
		<div className="flex flex-col gap-4">
			<div className="space-y-2">
				<Label htmlFor="email">Correo Electrónico</Label>
				<Input id="email" type="email" placeholder="tu@ejemplo.com" required />
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Contraseña</Label>
				<Input id="password" type="password" required />
			</div>
			<Button type="submit" className="w-full mt-3">
				Iniciar Sesión
			</Button>
		</div>
	);
}
