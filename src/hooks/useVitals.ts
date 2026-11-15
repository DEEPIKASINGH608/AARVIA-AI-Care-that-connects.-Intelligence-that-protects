import { useMemo } from 'react'
import { useCare } from '@/context/CareContext'
import { VitalRecord, VitalType } from '@/types'

export interface UseVitalsReturn {
  vitals: VitalRecord[]
  latestBloodPressure: VitalRecord | undefined
  latestBloodGlucose: VitalRecord | undefined
  latestHeartRate: VitalRecord | undefined
  addVitalReading: (vital: Omit<VitalRecord, 'id' | 'recordedAt'>) => Promise<void>
  getVitalsByType: (type: VitalType) => VitalRecord[]
}

export function useVitals(): UseVitalsReturn {
  const { vitals, addVitalReading } = useCare()

  const latestBloodPressure = useMemo(() => {
    return vitals.find(v => v.type === 'blood_pressure')
  }, [vitals])

  const latestBloodGlucose = useMemo(() => {
    return vitals.find(v => v.type === 'blood_glucose')
  }, [vitals])

  const latestHeartRate = useMemo(() => {
    return vitals.find(v => v.type === 'heart_rate')
  }, [vitals])

  const getVitalsByType = (type: VitalType) => {
    return vitals.filter(v => v.type === type)
  }

  return {
    vitals,
    latestBloodPressure,
    latestBloodGlucose,
    latestHeartRate,
    addVitalReading,
    getVitalsByType,
  }
}
