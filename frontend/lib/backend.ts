import { supabaseBrowser } from '../utils/supabase/client';

/**
 * This file provides helper functions to make authenticated requests to the backend API.
 */

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function backendFetch(path: string, init?: RequestInit) {
    // read the current Supabase session in the browser
    const { data: { session } } = await supabaseBrowser.auth.getSession();

    // check current headers
    const headers = new Headers(init?.headers || {});

    // If have token, attach it as a Bearer header
    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`);
    }

    // set default to JSON if not already set in header
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    //make request to backend 
    return fetch(`${BASE}${path}`, { ...init, headers });
}

/** 
 * Helper to make JSON requests to backend and parse the JSON response 
 * Throws if response is not 2xx (not ok)
 */ 
export async function backendJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await backendFetch(path, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as any)?.error || res.statusText);
  return body as T;
}