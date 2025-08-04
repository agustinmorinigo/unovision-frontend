import { useEffect, useState } from 'react';
import supabase from '@/client';
import { getSession } from '@/modules/auth/utils/get-auth-session';

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return isAuthenticated;
};
