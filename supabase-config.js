const SUPABASE_URL = "https://hipjermrntnmjzpmfrcu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_UUVEeIVWqYVFqbl9ToYZ_A_CVuYcIg6";

if (SUPABASE_URL.includes("COLE_AQUI") || SUPABASE_PUBLISHABLE_KEY.includes("COLE_AQUI")) {
  console.warn("Configure o Supabase em supabase-config.js antes de usar o painel.");
}

window.lobiSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
