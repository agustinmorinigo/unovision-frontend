import type { SignInWithOAuthCredentials } from '@supabase/supabase-js';
import supabase from '@/client';

export default async function signInWithOAuth(credentials: SignInWithOAuthCredentials) {
  const { data, error } = await supabase.auth.signInWithOAuth(credentials);
  if (error) {
    throw error;
  }
  return data;
}
