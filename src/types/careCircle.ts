import { UserRole } from './user'

export interface CareCircleMember {
  userId: string
  name: string
  email: string
  role: UserRole
  relationship: string
  phoneNumber?: string
  avatarUrl?: string
  joinedAt: string
  canEditMedications: boolean
  canLogVitals: boolean
  canViewReports: boolean
  isEmergencyContact: boolean
}

export interface CareCircle {
  id: string
  elderId: string
  elderName: string
  elderPhotoUrl?: string
  circleName: string
  inviteCode: string
  members: CareCircleMember[]
  notes?: string
  createdAt: string
  updatedAt: string
}
