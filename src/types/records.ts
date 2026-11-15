export type RecordCategory = 
  | 'lab_report' 
  | 'prescription' 
  | 'discharge_summary' 
  | 'imaging' 
  | 'vaccination' 
  | 'insurance'

export interface MedicalRecordItem {
  id: string
  title: string
  category: RecordCategory
  date: string
  doctorName: string
  clinicName: string
  fileSize: string
  summary: string
  tags: string[]
  aiSimplifiedText?: string
}

export interface InventoryItem {
  id: string
  medicationId: string
  name: string
  dosage: string
  form: string
  currentStock: number
  totalCapacity: number
  refillThreshold: number
  pharmacyName: string
  rxNumber: string
  lastRefillDate: string
  nextRefillDueDate: string
  autoRefillEnabled: boolean
  status: 'adequate' | 'low' | 'critical'
}
