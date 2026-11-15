import { useMemo } from 'react'
import { useCare } from '@/context/CareContext'
import { Appointment } from '@/types'

export interface UseAppointmentsReturn {
  appointments: Appointment[]
  upcomingAppointments: Appointment[]
  nextAppointment: Appointment | undefined
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>
}

export function useAppointments(): UseAppointmentsReturn {
  const { appointments, addAppointment } = useCare()

  const upcomingAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
  }, [appointments])

  const nextAppointment = useMemo(() => {
    return upcomingAppointments[0]
  }, [upcomingAppointments])

  return {
    appointments,
    upcomingAppointments,
    nextAppointment,
    addAppointment,
  }
}
