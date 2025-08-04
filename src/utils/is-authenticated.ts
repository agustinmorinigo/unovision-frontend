import supabase from '@/client';

export const isAuthenticated = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return !!session;
};
