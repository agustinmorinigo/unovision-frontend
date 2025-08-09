import { LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import useSidebarVisibility from '@/hooks/use-sidebar-visibility';
import useTheme from '@/hooks/use-theme';
import useSignOutMutation from '@/modules/auth/queries/use-sign-out-mutation';

export default function AppHeader() {
  const { mutate: signOut } = useSignOutMutation();
  const { toggleTheme, isLight } = useTheme();
  const { toggleSidebar } = useSidebarVisibility();

  return (
    <header className="w-full p-4 flex items-center justify-between border-b shrink-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger onClick={toggleSidebar} />
        <h1 className="text-lg font-semibold">Unovision</h1>
        {/* Acá falta el selector de locales. */}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={toggleTheme}
          variant="ghost"
          title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {isLight ? <Moon /> : <Sun />}
        </Button>

        <Button onClick={() => signOut()} variant="ghost" title="Cerrar sesión">
          <LogOut />
        </Button>
      </div>
    </header>
  );
}
