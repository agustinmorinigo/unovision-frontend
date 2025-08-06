import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Form from '@/modules/auth/components/login/form';
import ProviderButtons from '@/modules/auth/components/login/provider-buttons';

export default function LoginLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-7">
          <Form />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">O continuar con</span>
            </div>
          </div>
          <ProviderButtons />
        </CardContent>
        {/* <CardFooter className="flex justify-center">
          <Link
            href="/forgot-password"
            className="text-sm underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </CardFooter> */}
      </Card>
    </div>
  );
}
