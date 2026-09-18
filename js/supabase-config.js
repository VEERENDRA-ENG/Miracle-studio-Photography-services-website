/**
 * Miracle Studio Photography - Supabase Configuration
 * 
 * If you have a Supabase project:
 * 1. Put your Project URL in SUPABASE_URL
 * 2. Put your Anon Public Key in SUPABASE_ANON_KEY
 * 
 * If left empty, the website runs smoothly in DEMO MODE with built-in placeholder data!
 */

const SUPABASE_CONFIG = {
  SUPABASE_URL: '',      // e.g. "https://xyzcompany.supabase.co"
  SUPABASE_ANON_KEY: ''  // e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
};

// Initialize Supabase Client if library is loaded and keys are present
let supabaseClient = null;

function initSupabase() {
  if (
    typeof window.supabase !== 'undefined' &&
    SUPABASE_CONFIG.SUPABASE_URL &&
    SUPABASE_CONFIG.SUPABASE_ANON_KEY
  ) {
    try {
      supabaseClient = window.supabase.createClient(
        SUPABASE_CONFIG.SUPABASE_URL,
        SUPABASE_CONFIG.SUPABASE_ANON_KEY
      );
      console.log('✅ Supabase connected successfully to Miracle Studio!');
    } catch (e) {
      console.warn('⚠️ Could not initialize Supabase, using Demo Mode:', e.message);
    }
  } else {
    console.info('ℹ️ Miracle Studio running in Demo Mode (Supabase keys not yet configured).');
  }
}

// Auto-run initialization
if (typeof window !== 'undefined') {
  initSupabase();
}
