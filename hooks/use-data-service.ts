"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { DataItem } from "@/components/data-table"

export function useDataService(dataType: string) {
  const [data, setData] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: items, error } = await supabase
        .from("dropdownData")
        .select("*")
        .eq("type", dataType)
        .order("created_at", { ascending: false })

      if (error) throw error
      setData(items || [])
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (label: string) => {
    const { error } = await supabase.from("dropdownData").insert([{ label, value: label, type: dataType }])

    if (error) throw error
  }

  const updateItem = async (id: string, label: string) => {
    const { error } = await supabase
      .from("dropdownData")
      .update({ label, value: label, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error
  }

  const deleteItem = async (id: string) => {
    const { error } = await supabase.from("dropdownData").delete().eq("id", id)
    if (error) throw error
  }

  useEffect(() => {
    fetchData()
  }, [dataType])

  return {
    data,
    loading,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  }
}
