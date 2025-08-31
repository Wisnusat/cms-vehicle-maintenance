"use client"

import { useState, useEffect } from "react"
import { getUsers, createUser, updateUser, deleteUser, type User } from "@/lib/user-queries"

export function useUserService() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const users = await getUsers()
      setData(users)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addItem = async (fullName: string, nik: string) => {
    try {
      setError(null)
      await createUser(fullName, nik)
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user")
      throw err
    }
  }

  const updateItem = async (id: string, fullName: string, nik: string) => {
    try {
      setError(null)
      await updateUser(Number.parseInt(id), fullName, nik)
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user")
      throw err
    }
  }

  const deleteItem = async (id: string) => {
    try {
      setError(null)
      await deleteUser(Number.parseInt(id))
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user")
      throw err
    }
  }

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchData,
  }
}
