import { supabaseBrowser } from '../utils/supabase/client';

// Sign in (real)
export async function login(email: string, password: string) {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
  if (error) throw error;
  // data.session contains access_token & refresh token (persisted by Supabase)
  return data.session;
}

// Current session (replaces mockCheckLogin)
export async function getSession() {
  const { data: { session } } = await supabaseBrowser.auth.getSession();
  return session; // null if not logged in
}

// Sign out (replaces mockLogout)
export async function logout() {
  await supabaseBrowser.auth.signOut();
}