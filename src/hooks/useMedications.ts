import { useMemo } from 'react'
import { useCare } from '@/context/CareContext'
import { Medication, DoseStatus } from '@/types'

export interface UseMedicationsReturn {
  medications: Medication[]
  doseStatusMap: Record<string, DoseStatus>
  markDose: (medicationId: string, status: DoseStatus, notes?: string) => Promise<void>
  todayTakenCount: number
  todayTotalCount: number
  adherencePercentage: number
  lowStockMedications: Medication[]
  nextScheduledMedication: Medication | undefined
  isAllDosesCompleted: boolean
}

export function useMedications(): UseMedicationsReturn {
  const {
    medications,
    doseStatusMap,
    markDose,
    todayTakenCount,
    todayTotalCount,
  } = useCare()

  const adherencePercentage = useMemo(() => {
    if (todayTotalCount === 0) return 100
    return Math.round((todayTakenCount / todayTotalCount) * 100)
  }, [todayTakenCount, todayTotalCount])

  const lowStockMedications = useMemo(() => {
    return medications.filter(m => m.remainingPills <= m.refillThreshold)
  }, [medications])

  const nextScheduledMedication = useMemo(() => {
    return medications.find(m => (doseStatusMap[m.id] || 'scheduled') === 'scheduled') || medications[0]
  }, [medications, doseStatusMap])

  const isAllDosesCompleted = useMemo(() => {
    return todayTotalCount > 0 && todayTakenCount >= todayTotalCount
  }, [todayTakenCount, todayTotalCount])

  return {
    medications,
    doseStatusMap,
    markDose,
    todayTakenCount,
    todayTotalCount,
    adherencePercentage,
    lowStockMedications,
    nextScheduledMedication,
    isAllDosesCompleted,
  }
}
