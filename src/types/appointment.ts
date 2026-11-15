export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'

export interface Appointment {
  id: string
  elderId: string
  doctorName: string
  specialty: string
  clinicName: string
  address: string
  phone?: string
  dateTime: string // ISO string
  status: AppointmentStatus
  reasonForVisit: string
  notes?: string
  companionRequired: boolean
  assignedCompanionName?: string
  assignedCompanionRole?: 'family' | 'caregiver'
  transportArranged: boolean
  transportDetails?: string
  reminderSent: boolean
  createdAt: string
}
