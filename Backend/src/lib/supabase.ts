import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://diojlmibhcctgnpriezo.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

export async function getClient() {
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    return supabase;
}

export async function signUp(email: string, password: string) {
    const supabase = await getClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

export async function signIn(email: string, password: string) {
    const supabase = await getClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}
