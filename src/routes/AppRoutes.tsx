import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { OverviewPage } from '@/features/overview/OverviewPage'
import { MedicationPage } from '@/features/medications/MedicationPage'
import { AppointmentPage } from '@/features/appointments/AppointmentPage'
import { VitalsPage } from '@/features/vitals/VitalsPage'
import { CareCirclePage } from '@/features/circle/CareCirclePage'
import { AiInsightsPage } from '@/features/ai/AiInsightsPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { ElderlyDashboard } from '@/features/elderly/ElderlyDashboard'
import { FamilyDashboard } from '@/features/family/FamilyDashboard'
import { CaregiverDashboard } from '@/features/caregiver/CaregiverDashboard'
import { EmptyState } from '@/components/common/EmptyState'
import { AlertCircle } from 'lucide-react'
import { ROUTES } from '@/config/routes'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="py-16">
      <EmptyState
        icon={AlertCircle}
        title="Page Not Found"
        description="The healthcare section you are looking for does not exist or has been moved."
        actionLabel="Return to Overview"
        onAction={() => navigate(ROUTES.HOME)}
      />
    </div>
  )
}

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<LoginPage />} />

      {/* Main Connected App Routes inside AppLayout */}
      <Route
        path={ROUTES.HOME}
        element={
          <AppLayout>
            <OverviewPage />
          </AppLayout>
        }
      />
      
      {/* Explicit Role-Specific Home Direct Routes */}
      <Route
        path={ROUTES.ELDERLY_HOME}
        element={
          <AppLayout>
            <ElderlyDashboard />
          </AppLayout>
        }
      />
      <Route
        path={ROUTES.FAMILY_HOME}
        element={
          <AppLayout>
            <FamilyDashboard />
          </AppLayout>
        }
      />
      <Route
        path={ROUTES.CAREGIVER_HOME}
        element={
          <AppLayout>
            <CaregiverDashboard />
          </AppLayout>
        }
      />

      {/* Functional Feature Modules */}
      <Route
        path={ROUTES.MEDICATIONS}
        element={
          <AppLayout>
            <MedicationPage />
          </AppLayout>
        }
      />
      <Route
        path={ROUTES.APPOINTMENTS}
        element={
          <AppLayout>
            <AppointmentPage />
          </AppLayout>
        }
      />
      <Route
        path={ROUTES.HEALTH_VITALS}
        element={
          <AppLayout>
            <VitalsPage />
          </AppLayout>
        }
      />
      <Route
        path={ROUTES.CARE_CIRCLE}
        element={
          <AppLayout>
            <CareCirclePage />
          </AppLayout>
        }
      />
      <Route
        path={ROUTES.AI_INSIGHTS}
        element={
          <AppLayout>
            <AiInsightsPage />
          </AppLayout>
        }
      />

      {/* Fallback & Redirects */}
      <Route path={ROUTES.DASHBOARD} element={<Navigate to={ROUTES.HOME} replace />} />
      <Route
        path="*"
        element={
          <AppLayout>
            <NotFoundPage />
          </AppLayout>
        }
      />
    </Routes>
  )
}
