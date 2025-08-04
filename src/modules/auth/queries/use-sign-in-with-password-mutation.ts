import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/services/api';

export default function useSignInWithPasswordMutation() {
    const mutation = useMutation({
        mutationFn: api.auth.signInWithPassword,
        onError: (error) => {
            toast.error(`Error al iniciar sesión: ${error.message}`);
        },
    });

    return mutation;
}
