import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * This file initializes and exports a Supabase client for browser usage.
 * It uses environment variables for the Supabase URL and anon key.
 * The client is created only once and reused on subsequent imports.
 */

let _client: SupabaseClient | null = null;

export const supabaseBrowser = (() => {
    if (_client) return _client;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()!;
    _client = createBrowserClient(url, anon);
    return _client;
}) ();