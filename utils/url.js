export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}