import { supabaseBrowser } from '../utils/supabase/client';

// Sign in (real)
export async function login(email: string, password: string, rememberMe: boolean = false) {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
  if (error) throw error;
  // data.session contains access_token & refresh token (persisted by Supabase)

    if (!rememberMe) {
    sessionStorage.setItem('temp-session', JSON.stringify(data.session));
    localStorage.removeItem(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL}-auth-token`);
  }

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
  localStorage.removeItem(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL}-auth-token`);
  sessionStorage.removeItem(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL}-auth-token`);
}

export type LoggedInUser = {
  id: string;
  email: string;
  token: string;
}

export async function checkLogin(): Promise<LoggedInUser | null> {
  const session = await getSession();
  if (!session) return null;
  return {
    id: session.user.id,
    email: session.user.email || "",
    token: session.access_token,
  };
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabaseBrowser.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}