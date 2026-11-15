import React, { createContext, useContext, useState } from 'react'
import { UserProfile, UserRole } from '@/types'
import { authService } from '@/services/firebase/authService'
import { MOCK_ELDER } from '@/services/mockData'

interface AuthContextType {
  currentUser: UserProfile | null
  currentRole: UserRole
  isLoading: boolean
  setRole: (role: UserRole) => void
  signIn: (email: string, pass: string) => Promise<void>
  signUp: (email: string, pass: string, name: string, role: UserRole) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const existing = authService.getCurrentUser()
    return existing || MOCK_ELDER
  })
  const [currentRole, setCurrentRole] = useState<UserRole>(() => currentUser?.role || 'elderly')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const setRole = (role: UserRole) => {
    setCurrentRole(role)
    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        role,
        fullName: role === 'family'
          ? 'Michael Vance'
          : role === 'caregiver'
            ? 'Maria Santos'
            : 'Eleanor Vance',
      }
      setCurrentUser(updatedUser)
      localStorage.setItem('carecircle_user_session', JSON.stringify(updatedUser))
    }
  }

  const signIn = async (email: string, pass: string) => {
    setIsLoading(true)
    try {
      const user = await authService.signIn(email, pass)
      setCurrentUser(user)
      setCurrentRole(user.role)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, pass: string, name: string, role: UserRole) => {
    setIsLoading(true)
    try {
      const user = await authService.signUp(email, pass, name, role)
      setCurrentUser(user)
      setCurrentRole(user.role)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await authService.signOut()
      setCurrentUser(null)
      setCurrentRole('elderly')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isLoading,
        setRole,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
