import { createClient } from '@supabase/supabase-js';

// Read Supabase credentials from Vite environment variables (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are properly provided by the user
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('your-supabase-url')
);

// Initialize client only if valid configuration exists to avoid runtime crashes
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info(
    'Miracle Studio Info: Supabase credentials not detected in .env. Running in Demo Mode with built-in placeholder data.'
  );
}
