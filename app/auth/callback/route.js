import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server"; // <-- Use NextResponse for API routes

export async function GET(request) {
  // --- DIAGNOSTIC LOGS ---
  console.log("--- AUTH CALLBACK DIAGNOSTICS ---");
  console.log("VERCEL_ENV:", process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log("SITE_URL (from Vercel env):", process.env.NEXT_PUBLIC_SITE_URL);
  console.log("VERCEL_URL (dynamic):", process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log("VERCEL_PROJECT_PRODUCTION_URL:", process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL);
  console.log("Result of getSiteUrl():", getSiteUrl());
  console.log("--- END DIAGNOSTICS ---");
  // --- END DIAGNOSTIC LOGS ---

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Supabase exchangeCodeForSession error:', error.message)
    }

    if (!error) {
      return NextResponse.redirect(getSiteUrl()) // Use getSiteUrl for consistency
    }
  }

  // If there's an error or no code, redirect to an error page
  return NextResponse.redirect(`${getSiteUrl()}/auth/auth-code-error`);
}