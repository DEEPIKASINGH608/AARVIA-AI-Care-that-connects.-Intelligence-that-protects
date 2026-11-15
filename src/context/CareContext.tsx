import React, { createContext, useContext, useState, useEffect } from 'react'
import { Medication, Appointment, VitalRecord, CareCircle, EmergencyAlert, DoseStatus } from '@/types'
import { firestoreService } from '@/services/firebase/firestoreService'
import { 
  MOCK_MEDICATIONS, 
  MOCK_APPOINTMENTS, 
  MOCK_VITALS, 
  MOCK_CARE_CIRCLE, 
  MOCK_ACTIVE_ALERTS 
} from '@/services/mockData'
import { useAuth } from './AuthContext'

interface CareContextType {
  medications: Medication[]
  appointments: Appointment[]
  vitals: VitalRecord[]
  careCircle: CareCircle | null
  activeAlerts: EmergencyAlert[]
  isLoading: boolean
  doseStatusMap: Record<string, DoseStatus> // medId -> status for today
  markDose: (medicationId: string, status: DoseStatus, notes?: string) => Promise<void>
  addVitalReading: (vital: Omit<VitalRecord, 'id' | 'recordedAt'>) => Promise<void>
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>
  triggerSOS: (reason?: string) => Promise<void>
  resolveAlert: (alertId: string) => Promise<void>
  todayTakenCount: number
  todayTotalCount: number
}

const CareContext = createContext<CareContextType | undefined>(undefined)

export const CareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, currentRole } = useAuth()
  const elderId = 'elder-001'

  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS)
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [vitals, setVitals] = useState<VitalRecord[]>(MOCK_VITALS)
  const [careCircle, setCareCircle] = useState<CareCircle | null>(MOCK_CARE_CIRCLE)
  const [activeAlerts, setActiveAlerts] = useState<EmergencyAlert[]>(MOCK_ACTIVE_ALERTS)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Track today's dose statuses
  const [doseStatusMap, setDoseStatusMap] = useState<Record<string, DoseStatus>>({
    'med-1': 'taken',
    'med-2': 'scheduled',
    'med-3': 'scheduled',
    'med-4': 'scheduled',
  })

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [meds, apts, vits, circle, alerts] = await Promise.all([
          firestoreService.getMedications(elderId),
          firestoreService.getAppointments(elderId),
          firestoreService.getVitals(elderId),
          firestoreService.getCareCircle('circle-101'),
          firestoreService.getActiveAlerts(elderId),
        ])
        if (meds.length) setMedications(meds)
        if (apts.length) setAppointments(apts)
        if (vits.length) setVitals(vits)
        if (circle) setCareCircle(circle)
        if (alerts.length) setActiveAlerts(alerts)
      } catch (err) {
        console.warn('CareContext data load warning:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [elderId])

  const markDose = async (medicationId: string, status: DoseStatus, notes?: string) => {
    setDoseStatusMap(prev => ({ ...prev, [medicationId]: status }))
    const med = medications.find(m => m.id === medicationId)
    if (!med) return

    await firestoreService.logDose({
      medicationId,
      medicationName: med.name,
      elderId,
      scheduledTime: med.times[0] || '08:00',
      scheduledDate: new Date().toISOString().split('T')[0],
      recordedTime: new Date().toISOString(),
      status,
      markedByRole: currentRole,
      markedByName: currentUser?.fullName || 'CareCircle User',
      notes,
    })
  }

  const addVitalReading = async (vital: Omit<VitalRecord, 'id' | 'recordedAt'>) => {
    const created = await firestoreService.recordVital(vital)
    setVitals(prev => [created, ...prev])
  }

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const created = await firestoreService.createAppointment(appointment)
    setAppointments(prev => [...prev, created])
  }

  const triggerSOS = async (reason = 'Immediate assistance requested by senior') => {
    const alert = await firestoreService.triggerEmergencyAlert({
      elderId,
      elderName: 'Eleanor Vance',
      type: 'sos_manual',
      severity: 'critical',
      message: `EMERGENCY SOS: ${reason}. All care circle members notified!`,
    })
    setActiveAlerts(prev => [alert, ...prev])
  }

  const resolveAlert = async (alertId: string) => {
    await firestoreService.resolveAlert(alertId, currentUser?.fullName || 'CareCircle User')
    setActiveAlerts(prev => prev.filter(a => a.id !== alertId))
  }

  const todayTakenCount = Object.values(doseStatusMap).filter(s => s === 'taken').length
  const todayTotalCount = medications.length

  return (
    <CareContext.Provider
      value={{
        medications,
        appointments,
        vitals,
        careCircle,
        activeAlerts,
        isLoading,
        doseStatusMap,
        markDose,
        addVitalReading,
        addAppointment,
        triggerSOS,
        resolveAlert,
        todayTakenCount,
        todayTotalCount,
      }}
    >
      {children}
    </CareContext.Provider>
  )
}

export function useCare() {
  const context = useContext(CareContext)
  if (!context) {
    throw new Error('useCare must be used within a CareProvider')
  }
  return context
}
