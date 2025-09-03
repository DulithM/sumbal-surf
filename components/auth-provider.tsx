"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a valid session/token
        const savedUser = localStorage.getItem("sumbal-user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, type: "company" | "employee") => {
    setIsLoading(true)
    try {
      // Mock authentication - in a real app, this would call your API
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: type === "company" ? "Company Admin" : "Employee User",
        type,
        companyId: type === "employee" ? "comp_123" : undefined,
        companyName: type === "employee" ? "Acme Corporation" : undefined,
      }

      localStorage.setItem("sumbal-user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("sumbal-user")
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
