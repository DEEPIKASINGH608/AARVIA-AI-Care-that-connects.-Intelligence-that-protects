import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { ElderlyDashboard } from '@/features/elderly/ElderlyDashboard'
import { FamilyDashboard } from '@/features/family/FamilyDashboard'
import { CaregiverDashboard } from '@/features/caregiver/CaregiverDashboard'

export const OverviewPage: React.FC = () => {
  const { currentRole } = useAuth()

  switch (currentRole) {
    case 'elderly':
      return <ElderlyDashboard />
    case 'family':
      return <FamilyDashboard />
    case 'caregiver':
      return <CaregiverDashboard />
    default:
      return <ElderlyDashboard />
  }
}
