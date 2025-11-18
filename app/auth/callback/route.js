import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server"; // <-- Use NextResponse for API routes

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(origin);
    }
  }

  return NextResponse.redirect(origin);
}
