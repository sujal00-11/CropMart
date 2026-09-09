// ============================================================
// CropMart — Supabase Client
// Paste your project URL and public (anon) key below
// ============================================================

import { createClient } from "@supabase/supabase-js";

// ─── REPLACE THESE WITH YOUR SUPABASE PROJECT VALUES ───
// Project URL: Dashboard → Project Settings → API → Project URL
// (use https://xxxx.supabase.co  — do NOT include /rest/v1/)
const SUPABASE_URL = "https://goexowfwijvzdhvkfmlx.supabase.co";

// Public anon key: Dashboard → Project Settings → API → anon public
const SUPABASE_PUBLIC_KEY = "sb_publishable_xhGxmPk-Or54oZrTr98eyQ_keo0s7QS";
// ───────────────────────────────────────────────────────

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
