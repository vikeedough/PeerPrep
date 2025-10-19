import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
/**
 * This function creates a Supabase client for server-side actions, 
 * mutable cookies are used to manage the session.
 * 
 * In order for the server to know that the user is logged in, the cookies are sent to the server.
 */

export async function createSupabaseServerClientAction() {
    const cookieStore = await cookies(); // Mutable cookies

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Return all cookies as { name, value }[]
                getAll() {
                return cookieStore.getAll().map(c => ({ name: c.name, value: c.value }));
                },
                //  Mutate cookies 
                setAll(cookiesToSet) {
                    for (const { name, value, options } of cookiesToSet) {
                        cookieStore.set(name, value, options);
                    }
                },
            },
        }
    );
}