import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fblgnpvcqlalmgwykplr.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibGducHZjcWxhbG1nd3lrcGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NTIyOTYsImV4cCI6MjA3MTEyODI5Nn0.fLPrh0BmnK2JnKfHJ47bbZC0xxg6K9dnjk2dJlNWUhw"

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
