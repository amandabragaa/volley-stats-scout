/**
 * Feature flag for local Supabase development.
 * Set VITE_USE_LOCAL_SUPABASE=true in your local .env to use a local Supabase instance.
 *
 * Local defaults:
 *   URL: http://localhost:54321
 *   ANON KEY: set via VITE_LOCAL_SUPABASE_ANON_KEY
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_SUPABASE === 'true';

const CLOUD_URL = import.meta.env.VITE_SUPABASE_URL;
const CLOUD_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!CLOUD_URL || !CLOUD_KEY) {
  throw new Error(
    'VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY precisam estar configuradas no .env',
  );
}

const cloudClient = createClient(CLOUD_URL, CLOUD_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

let supabaseClient: SupabaseClient;

if (USE_LOCAL) {
  const LOCAL_URL = import.meta.env.VITE_LOCAL_SUPABASE_URL || 'http://localhost:54321';
  const LOCAL_KEY = import.meta.env.VITE_LOCAL_SUPABASE_ANON_KEY || '';

  if (!LOCAL_KEY) {
    console.warn('[FeatureFlag] VITE_LOCAL_SUPABASE_ANON_KEY não configurada. Usando client Cloud.');
    supabaseClient = cloudClient;
  } else {
    console.info(`[FeatureFlag] Usando Supabase LOCAL em ${LOCAL_URL}`);
    supabaseClient = createClient(LOCAL_URL, LOCAL_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
} else {
  supabaseClient = cloudClient;
}

export const supabase = supabaseClient;
export const isLocalSupabase = USE_LOCAL;
