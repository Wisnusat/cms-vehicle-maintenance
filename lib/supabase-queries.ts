import { supabase } from "./supabase"

export interface DataItem {
  id: string
  label: string
  value: string
  type: string
  created_at: string
  updated_at: string
}

export class DataService {
  private dataType: string

  constructor(dataType: string) {
    this.dataType = dataType
  }

  async getAll(): Promise<DataItem[]> {
    const { data, error } = await supabase
      .from("dropdownData")
      .select("*")
      .eq("type", this.dataType)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(`Error fetching ${this.dataType}:`, error)
      throw error
    }

    return data || []
  }

  async create(label: string): Promise<DataItem> {
    const { data, error } = await supabase
      .from("dropdownData")
      .insert([{ label, value: label, type: this.dataType }])
      .select()
      .single()

    if (error) {
      console.error(`Error creating ${this.dataType}:`, error)
      throw error
    }

    return data
  }

  async update(id: string, label: string): Promise<DataItem> {
    const { data, error } = await supabase
      .from("dropdownData")
      .update({ label, value: label, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating ${this.dataType}:`, error)
      throw error
    }

    return data
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("dropdownData").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting ${this.dataType}:`, error)
      throw error
    }
  }
}
