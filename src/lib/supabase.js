
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://obqwvwnjtwqowygzpqib.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icXd2d25qdHdxb3d5Z3pwcWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjAxOTgsImV4cCI6MjA1ODQ5NjE5OH0.PH96RkTO0q_6UHrPUcln37_AkKTAB7UMaBrMbStEGeM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export const handleError = (error) => {
  console.error('Error:', error);
  throw error;
};
