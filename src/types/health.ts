export type VitalType = 
  | 'blood_pressure' 
  | 'blood_glucose' 
  | 'heart_rate' 
  | 'oxygen_saturation' 
  | 'body_temperature' 
  | 'weight'

export type VitalStatus = 'normal' | 'caution' | 'critical'

export interface VitalRecord {
  id: string
  elderId: string
  type: VitalType
  value: string | number // e.g., "120/80" or 98
  secondaryValue?: number // for diastolic or post-meal
  unit: string // e.g. "mmHg", "mg/dL", "bpm", "%", "°F"
  status: VitalStatus
  recordedAt: string
  recordedByRole: 'elderly' | 'family' | 'caregiver'
  recordedByName: string
  notes?: string
}

export interface DailyCheckIn {
  id: string
  elderId: string
  date: string // YYYY-MM-DD
  mood: 'great' | 'good' | 'neutral' | 'tired' | 'unwell'
  sleepHours: number
  painLevel: number // 0-10
  hydrationGlasses: number
  mealsLogged: ('breakfast' | 'lunch' | 'dinner')[]
  notes?: string
  recordedAt: string
}

export interface EmergencyAlert {
  id: string
  elderId: string
  elderName: string
  type: 'sos_manual' | 'vital_alert' | 'missed_critical_medication' | 'inactivity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  status: 'active' | 'acknowledged' | 'resolved'
  triggeredAt: string
  acknowledgedAt?: string
  acknowledgedBy?: string
  resolvedAt?: string
  notes?: string
}
