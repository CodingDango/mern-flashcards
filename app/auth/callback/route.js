import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server"; // <-- Use NextResponse for API routes

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirectUrl = `${request.nextUrl.origin}/error-auth`;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {  
      const redirectUrl = `${request.nextUrl.origin}/error-auth`;
      return NextResponse.redirect(redirectUrl);
    } else {
      const successUrl = `${request.nextUrl.origin}/`;
      return NextResponse.redirect(successUrl);
    }
  }
}