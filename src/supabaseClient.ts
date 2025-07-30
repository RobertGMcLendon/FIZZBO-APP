import { createClient } from '@supabase/supabase-js';

// Add type definitions for Vite environment variables
// Extend the global ImportMetaEnv interface if you want type safety
// Place this in a .d.ts file if you want it globally, but for local usage:
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    // add other env variables here if needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase environment variables are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
