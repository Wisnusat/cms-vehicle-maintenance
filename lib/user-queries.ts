import { supabase } from "./supabase"

export interface User {
  id: number
  fullName: string
  nik: string
  created_at: string
  updated_at: string
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("user").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
    throw error
  }

  return data || []
}

export async function createUser(fullName: string, nik: string): Promise<User> {
  const { data, error } = await supabase.from("user").insert([{ fullName, nik }]).select().single()

  if (error) {
    console.error("Error creating user:", error)
    throw error
  }

  return data
}

export async function updateUser(id: number, fullName: string, nik: string): Promise<User> {
  const { data, error } = await supabase
    .from("user")
    .update({ fullName, nik, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating user:", error)
    throw error
  }

  return data
}

export async function deleteUser(id: number): Promise<void> {
  const { error } = await supabase.from("user").delete().eq("id", id)

  if (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}
