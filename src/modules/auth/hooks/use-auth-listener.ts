import { useEffect } from 'react';
import supabase from '@/client';
import { resetAllStores } from '@/config/store';
import useUserStore from '@/modules/auth/stores/use-user-store';
import toCamelCase from '@/utils/to-camel-case';

export default function useAuthListener() {
  useEffect(() => {
    const { setUser } = useUserStore.getState();

    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        resetAllStores();
        return;
      }

      if (session.user.id !== useUserStore.getState().user?.id) {
        setUser(toCamelCase({ ...session.user }));
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);
}
