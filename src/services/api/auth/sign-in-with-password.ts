import supabase from '@/client';

interface SignInWithPasswordParams {
    email: string;
    password: string;
}

export default async function signInWithPassword(credentials: SignInWithPasswordParams) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
        throw error;
    }
    return data;
}
