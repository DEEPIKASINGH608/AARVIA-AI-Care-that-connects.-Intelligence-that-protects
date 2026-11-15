import { UserRole, DoseStatus, VitalStatus } from '@/types'

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'elderly':
      return 'Senior / Individual'
    case 'family':
      return 'Family Member'
    case 'caregiver':
      return 'Professional Caregiver'
    default:
      return 'Member'
  }
}

export function getDoseStatusColor(status: DoseStatus): {
  bg: string
  text: string
  border: string
  label: string
} {
  switch (status) {
    case 'taken':
      return {
        bg: 'bg-emerald-50 text-emerald-800',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        label: 'Taken',
      }
    case 'missed':
      return {
        bg: 'bg-red-50 text-red-800',
        text: 'text-red-700',
        border: 'border-red-200',
        label: 'Missed',
      }
    case 'skipped':
      return {
        bg: 'bg-amber-50 text-amber-800',
        text: 'text-amber-700',
        border: 'border-amber-200',
        label: 'Skipped',
      }
    case 'scheduled':
    default:
      return {
        bg: 'bg-sage-100 text-forest-800',
        text: 'text-forest-700',
        border: 'border-sage-200',
        label: 'Due Soon',
      }
  }
}

export function getVitalStatusColor(status: VitalStatus): {
  badge: string
  ring: string
  label: string
} {
  switch (status) {
    case 'normal':
      return {
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        ring: 'border-emerald-500',
        label: 'Normal',
      }
    case 'caution':
      return {
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        ring: 'border-amber-500',
        label: 'Attention Needed',
      }
    case 'critical':
      return {
        badge: 'bg-red-100 text-red-800 border-red-200',
        ring: 'border-red-500',
        label: 'Critical Alert',
      }
  }
}
