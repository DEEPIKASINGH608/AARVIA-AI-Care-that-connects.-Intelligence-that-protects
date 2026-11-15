export interface MedicationInteractionResult {
  hasInteractions: boolean
  severity: 'none' | 'mild' | 'moderate' | 'severe'
  summary: string
  details: {
    medicationA: string
    medicationB: string
    effect: string
    recommendation: string
  }[]
  elderlyFriendlyNotice: string
}

export interface CareInsightsSummary {
  date: string
  adherenceRate: number // 0 - 100
  overallStatus: 'excellent' | 'stable' | 'attention_needed' | 'critical'
  keyHighlights: string[]
  concernsOrAlerts: string[]
  suggestedActionItems: string[]
  aiGeneratedAt: string
}

export interface PrescriptionScanResult {
  medicationName: string
  dosage: string
  frequency: string
  instructions: string
  durationDays?: number
  warnings: string[]
  confidenceScore: number
}
