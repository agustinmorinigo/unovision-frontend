import { Outlet } from 'react-router';
import { Button } from '@/components/ui/button';
import useSignOutMutation from '@/modules/auth/queries/use-sign-out-mutation';

export const PrivateLayout = () => {
    const { mutate: signOut, isPending } = useSignOutMutation();

    return (
        <div className="private-layout">
            <header className="w-full p-4 flex items-center justify-between bg-red-700">
                <h1>Unovision</h1>
                <Button onClick={() => signOut()} disabled={isPending}>
                    Cerrar sesión
                </Button>
            </header>
            <Outlet />
        </div>
    );
};
