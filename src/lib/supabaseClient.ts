/**
 * Feature flag for local Supabase development.
 * Set VITE_USE_LOCAL_SUPABASE=true in your local .env to use a local Supabase instance.
 *
 * Local defaults:
 *   URL: http://localhost:54321
 *   ANON KEY: set via VITE_LOCAL_SUPABASE_ANON_KEY
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { supabase as cloudClient } from '@/integrations/supabase/client';

const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_SUPABASE === 'true';

let supabaseClient: SupabaseClient<Database>;

if (USE_LOCAL) {
  const LOCAL_URL = import.meta.env.VITE_LOCAL_SUPABASE_URL || 'http://localhost:54321';
  const LOCAL_KEY = import.meta.env.VITE_LOCAL_SUPABASE_ANON_KEY || '';

  if (!LOCAL_KEY) {
    console.warn('[FeatureFlag] VITE_LOCAL_SUPABASE_ANON_KEY não configurada. Usando client Cloud.');
    supabaseClient = cloudClient;
  } else {
    console.info(`[FeatureFlag] Usando Supabase LOCAL em ${LOCAL_URL}`);
    supabaseClient = createClient<Database>(LOCAL_URL, LOCAL_KEY, {
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
