import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import supabase from '@/client';

export default async function signInWithPassword(credentials: SignInWithPasswordCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    throw error;
  }
  return data;
}
