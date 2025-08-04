import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/services/api';

export default function useSignInWithMicrosoftMutation() {
  const mutation = useMutation({
    mutationFn: () => api.auth.signInWithOAuth({ provider: 'azure' }),
    onError: (error) => {
      toast.error(`Error al iniciar sesión: ${error.message}`);
    },
  });

  return mutation;
}
