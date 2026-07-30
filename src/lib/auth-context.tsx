"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { authService } from "@/lib/services/auth-service"
import type { User, SignupDTO, LoginDTO } from "@/lib/types"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginDTO) => Promise<void>
  signup: (data: SignupDTO) => Promise<void>
  logout: () => Promise<void>
  setPlan: (plan: "Mensal" | "Anual") => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
  checkSession: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkSession = useCallback(() => {
    const session = authService.getSession()
    setUser(session?.user ?? null)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const login = useCallback(async (data: LoginDTO) => {
    const session = await authService.login(data)
    setUser(session.user)
  }, [])

  const signup = useCallback(async (data: SignupDTO) => {
    const session = await authService.signup(data)
    setUser(session.user)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const setPlan = useCallback(async (plan: "Mensal" | "Anual") => {
    const updatedUser = await authService.setPlan(plan)
    setUser(updatedUser)
  }, [])

  const updateUser = useCallback(async (updates: Partial<User>) => {
    const updatedUser = await authService.updateUser(updates)
    setUser(updatedUser)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        setPlan,
        updateUser,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
