import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session) {
      const role = session.user.user_metadata.role;
      
      // Determine destination server-side
      const destination = role === "admin" ? "/admin/dashboard" : "/dashboard";
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  // Fallback for errors
  return NextResponse.redirect(`${origin}/login`);
}