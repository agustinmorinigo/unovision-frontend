import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import supabase from '@/client';

export default async function signInWithPassword(credentials: SignInWithPasswordCredentials): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    throw error;
  }
}
