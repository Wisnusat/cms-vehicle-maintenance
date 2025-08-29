"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: { username: string } | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<{ error: string | null }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("admin_user")
      if (savedUser && savedUser !== "null" && savedUser !== "undefined") {
        try {
          const userData = JSON.parse(savedUser)
          if (userData && userData.username) {
            setUser(userData)
          }
        } catch (error) {
          localStorage.removeItem("admin_user")
        }
      }
    }

    setLoading(false)
  }, [])

  const signIn = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from("admin")
        .select("username, password")
        .eq("username", username)
        .eq("password", password)
        .single()

      if (error || !data) {
        return { error: "Invalid username or password" }
      }

      const userData = { username: data.username }

      setUser(userData)

      if (typeof window !== "undefined") {
        localStorage.setItem("admin_user", JSON.stringify(userData))
      }

      return { error: null }
    } catch (err) {
      return { error: "Login failed. Please try again." }
    }
  }

  const signOut = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_user")
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
