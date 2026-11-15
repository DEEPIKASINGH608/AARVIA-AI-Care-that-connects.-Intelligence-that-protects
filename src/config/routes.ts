import { UserRole } from '@/types'

export const ROUTES = {
  // Public Pages
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',

  // Application Pages
  DASHBOARD: '/dashboard',
  COMPANION: '/companion',
  MEDICATIONS: '/medications',
  APPOINTMENTS: '/appointments',
  TIMELINE: '/timeline',
  FAMILY_CIRCLE: '/circle',
  INTELLIGENCE: '/intelligence',
  INVENTORY: '/inventory',
  RECORDS: '/records',
  SETTINGS: '/settings',

  // Role Shortcut Aliases
  ELDERLY_HOME: '/elderly',
  FAMILY_HOME: '/family',
  CAREGIVER_HOME: '/caregiver',
} as const

export function getDefaultRouteForRole(_role: UserRole): string {
  return ROUTES.DASHBOARD
}
