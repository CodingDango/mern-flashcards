import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server"; // <-- Use NextResponse for API routes

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/"; // Optional redirect path

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the intended path or fallback to homepage
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to an error page if code is missing or exchange fails
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
