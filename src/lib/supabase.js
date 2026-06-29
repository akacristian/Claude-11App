import { createClient } from '@supabase/supabase-js'

// Cloud sync is optional. If these env vars aren't set (e.g. local dev or the
// standalone build), the app runs exactly as before with localStorage only.
const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  url && anon
    ? createClient(url, anon, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      })
    : null

export const cloudEnabled = !!supabase

// One row per signed-in user holds their whole profile store as JSON.
const TABLE = 'progress'

export async function pullProgress(userId) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('data')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) {
    console.warn('[cloud] pull failed:', error.message)
    return null
  }
  return data?.data ?? null
}

export async function pushProgress(userId, store) {
  if (!supabase) return false
  const { error } = await supabase
    .from(TABLE)
    .upsert({ user_id: userId, data: store, updated_at: new Date().toISOString() })
  if (error) {
    console.warn('[cloud] push failed:', error.message)
    return false
  }
  return true
}
