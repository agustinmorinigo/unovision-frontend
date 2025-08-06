import { getSession } from '@/modules/auth/utils/get-auth-session';

export const isAuthenticated = async () => {
  return !!(await getSession());
};
