import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function createSupabaseServerClientRSC() {
    const cookieStore = await cookies(); // read-only in RSC

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Return all cookies as { name, value }[]
                getAll() {
                return cookieStore.getAll().map(c => ({ name: c.name, value: c.value }));
                },
                // No-ops in RSC (cannot mutate cookies here)
                setAll() {},
            },
        }
    );
}