import type { SignInWithOAuthCredentials } from '@supabase/supabase-js';
import supabase from '@/client';

export default async function signInWithOAuth(credentials: SignInWithOAuthCredentials): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth(credentials);
  if (error) {
    throw error;
  }
}
