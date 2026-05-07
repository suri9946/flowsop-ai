import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    '\n\n❌  SUPABASE credentials missing!\n' +
    '   Make sure you have a .env file (NOT .env.example) in flowsop-backend/\n' +
    '   with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY filled in.\n'
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
