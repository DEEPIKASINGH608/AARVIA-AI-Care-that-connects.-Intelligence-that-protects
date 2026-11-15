import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/config/firebase'
import { UserProfile, UserRole } from '@/types'
import { MOCK_ELDER } from '../mockData'

const LOCAL_STORAGE_USER_KEY = 'carecircle_user_session'
const LEGACY_STORAGE_USER_KEY = 'aarvia_user_session'

export const authService = {
  async signIn(email: string, password: string): Promise<UserProfile> {
    if (isFirebaseConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return {
        id: cred.user.uid,
        email: cred.user.email || email,
        fullName: cred.user.displayName || 'CareCircle User',
        role: 'elderly',
        preferences: {
          textSize: 'large',
          highContrast: false,
          audioReminders: true,
          notificationsEnabled: true,
        },
        createdAt: new Date().toISOString(),
      }
    }

    // Demo / Offline fallback
    const role: UserRole = email.includes('family') 
      ? 'family' 
      : email.includes('care') 
        ? 'caregiver' 
        : 'elderly'

    const user: UserProfile = {
      ...MOCK_ELDER,
      email,
      role,
      fullName: role === 'family' ? 'Michael Vance' : role === 'caregiver' ? 'Maria Santos' : 'Eleanor Vance',
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
    return user
  },

  async signUp(email: string, password: string, fullName: string, role: UserRole): Promise<UserProfile> {
    if (isFirebaseConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      return {
        id: cred.user.uid,
        email,
        fullName,
        role,
        preferences: {
          textSize: 'large',
          highContrast: false,
          audioReminders: true,
          notificationsEnabled: true,
        },
        createdAt: new Date().toISOString(),
      }
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      role,
      careCircleId: 'circle-101',
      preferences: {
        textSize: 'large',
        highContrast: false,
        audioReminders: true,
        notificationsEnabled: true,
      },
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser))
    return newUser
  },

  async signOut(): Promise<void> {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth)
    }
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    localStorage.removeItem(LEGACY_STORAGE_USER_KEY)
  },

  getCurrentUser(): UserProfile | null {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_KEY) || localStorage.getItem(LEGACY_STORAGE_USER_KEY)
    if (raw) {
      try {
        return JSON.parse(raw) as UserProfile
      } catch {
        return null
      }
    }
    // Default initial session for quick evaluation
    return MOCK_ELDER
  },

  onAuthListener(callback: (user: FirebaseUser | null) => void) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, callback)
    }
    return () => {}
  },
}
