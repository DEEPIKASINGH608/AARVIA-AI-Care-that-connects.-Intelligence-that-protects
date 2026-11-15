export type DoseStatus = 'scheduled' | 'taken' | 'skipped' | 'missed'

export type MedicationFrequency = 
  | 'daily'
  | 'twice-daily'
  | 'thrice-daily'
  | 'weekly'
  | 'as-needed'

export interface Medication {
  id: string
  elderId: string
  name: string
  genericName?: string
  dosage: string // e.g. "500mg"
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'inhaler' | 'drops'
  frequency: MedicationFrequency
  times: string[] // e.g. ["08:00", "20:00"]
  instructions: string // e.g. "Take after breakfast with water"
  withFood: boolean
  purpose?: string // e.g. "Blood pressure maintenance"
  pillColor?: string
  pillShape?: string
  startDate: string
  endDate?: string
  remainingPills: number
  totalPills: number
  refillThreshold: number
  prescribedBy: string
  criticality: 'routine' | 'vital' | 'strict-time'
  createdAt: string
}

export interface DoseLog {
  id: string
  medicationId: string
  medicationName: string
  elderId: string
  scheduledTime: string // ISO string or time "08:00"
  scheduledDate: string // YYYY-MM-DD
  recordedTime?: string
  status: DoseStatus
  markedByRole: 'elderly' | 'family' | 'caregiver'
  markedByName: string
  notes?: string
  photoProofUrl?: string
}

export interface MedicationScheduleItem {
  id: string
  medication: Medication
  scheduledTime: string
  status: DoseStatus
  doseLog?: DoseLog
}
