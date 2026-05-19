import { createClient } from "@supabase/supabase-js";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createClient(url, anonKey);
}

export function resolveStorageUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return pathOrUrl;

  return `${url}/storage/v1/object/public/hotel/${pathOrUrl}`;
}
