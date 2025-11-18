export function getSiteUrl() {
  
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;

  if (vercelEnv === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL; // We will set this in Vercel's dashboard
  }

  if (vercelEnv === 'preview') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // 3. Fallback for Local Development
  return 'http://localhost:3000';
}