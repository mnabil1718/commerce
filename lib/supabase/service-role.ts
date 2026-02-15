import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

export async function createServiceRoleClient() {
return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
}