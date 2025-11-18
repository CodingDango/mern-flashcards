import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server"; // <-- Use NextResponse for API routes

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const errorUrl = `${request.nextUrl.origin}/auth/error`;
  const successUrl = `${request.nextUrl.origin}/`;

  if (!code) {
    NextResponse.redirect(errorUrl);
  }

  const supabase = await createClient();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(errorUrl);
  }

  return NextResponse.redirect(successUrl);
}
