import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/services/api';

export default function useSignOutMutation() {
    const mutation = useMutation({
        // VER LA MUTATION KEY. CREO Q SUPABASE YA MANEJA ESTO...
        mutationFn: api.auth.signOut,
        onError: (error) => {
            toast.error(`Error al cerrar sesión: ${error.message}`);
        },
    });

    return mutation;
}
