"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

let client: SupabaseClient | null = null;

// תקרת זמן לבקשות — כך שנפילה למצב דמו מתרחשת מהר גם כשהרשת תקועה
const REQUEST_TIMEOUT_MS = 6000;

function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit) {
  const signal =
    init?.signal ??
    (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
      ? AbortSignal.timeout(REQUEST_TIMEOUT_MS)
      : undefined);
  return fetch(input, { ...init, signal });
}

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
      global: { fetch: fetchWithTimeout },
    });
  }
  return client;
}
