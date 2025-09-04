"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  type: "company" | "employee"
  companyId?: string
  companyName?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "company" | "employee") => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string, type: "company" | "employee") => {
    setIsLoading(true)
    try {
      // Mock authentication for demo purposes
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: type === "company" ? "Company Admin" : "Employee User",
        type,
        companyId: type === "employee" ? "comp_123" : undefined,
        companyName: type === "employee" ? "Tech Solutions Lanka" : undefined,
      }

      setUser(mockUser)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
