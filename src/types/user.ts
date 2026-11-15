export type UserRole = 'elderly' | 'family' | 'caregiver'

export type TextSizePreference = 'normal' | 'large' | 'extra-large'

export interface UserPreferences {
  textSize: TextSizePreference
  highContrast: boolean
  audioReminders: boolean
  notificationsEnabled: boolean
}

export interface UserProfile {
  id: string
  email: string
  fullName: string
  role: UserRole
  phoneNumber?: string
  avatarUrl?: string
  careCircleId?: string
  preferences: UserPreferences
  createdAt: string
  updatedAt?: string
}

export interface ElderlyProfile extends UserProfile {
  role: 'elderly'
  dateOfBirth?: string
  bloodGroup?: string
  primaryPhysician?: {
    name: string
    phone: string
    clinic: string
  }
  emergencyContacts: {
    name: string
    relationship: string
    phone: string
    isPrimary: boolean
  }[]
  allergies: string[]
  chronicConditions: string[]
}

export interface FamilyProfile extends UserProfile {
  role: 'family'
  relationshipToElder: string
  elderId: string
  isPrimaryCareContact: boolean
}

export interface CaregiverProfile extends UserProfile {
  role: 'caregiver'
  agencyOrAffiliation?: string
  assignedElderIds: string[]
  certificationNumber?: string
  shiftStatus?: 'on-duty' | 'off-duty'
}
