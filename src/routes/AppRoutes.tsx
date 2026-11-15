import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ROUTES } from '@/config/routes'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'
import { AlertCircle } from 'lucide-react'


// ─── Eager (always needed) ───────────────────────────────────────────────────
import { LandingPage } from '@/features/public/LandingPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { OverviewPage } from '@/features/overview/OverviewPage'
import { ElderlyDashboard } from '@/features/elderly/ElderlyDashboard'
import { FamilyDashboard } from '@/features/family/FamilyDashboard'
import { CaregiverDashboard } from '@/features/caregiver/CaregiverDashboard'
import { MedicationPage } from '@/features/medications/MedicationPage'
import { AppointmentPage } from '@/features/appointments/AppointmentPage'
import { CareCirclePage } from '@/features/circle/CareCirclePage'
import { VitalsPage } from '@/features/vitals/VitalsPage'
import { AiInsightsPage } from '@/features/ai/AiInsightsPage'

// ─── Lazy (new pages built in this session) ───────────────────────────────────
const SignupPage = lazy(() =>
  import('@/features/auth/SignupPage')
);

const RecordsPage = lazy(() =>
  import('@/features/records/RecordsPage')
);

const CompanionPage = lazy(() =>
  import('@/features/companion/CompanionPage')
);

const TimelinePage = lazy(() =>
  import('@/features/timeline/TimelinePage')
);

const IntelligencePage = lazy(() =>
  import('@/features/intelligence/IntelligencePage')
);

const InventoryPage = lazy(() =>
  import('@/features/inventory/InventoryPage')
);

const SettingsPage = lazy(() =>
  import('@/features/settings/SettingsPage')
);
// ─── Loading fallback ─────────────────────────────────────────────────────────
const PageLoader: React.FC = () => (
  <div className="flex h-64 w-full items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
)

// ─── 404 Page ─────────────────────────────────────────────────────────────────
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="py-16">
      <EmptyState
        icon={AlertCircle}
        title="Page Not Found"
        description="The section you are looking for does not exist or has been moved."
        actionLabel="Return to Dashboard"
        onAction={() => navigate(ROUTES.DASHBOARD)}
      />
    </div>
  )
}

// ─── App Routes ───────────────────────────────────────────────────────────────
export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public (no AppLayout) ── */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        {/* ── App pages (inside AppLayout) ── */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <AppLayout>
              <OverviewPage />
            </AppLayout>
          }
        />
        <Route
          path={ROUTES.COMPANION}
          element={
            <AppLayout>
              <CompanionPage />
            </AppLayout>
          }
        />
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
          path={ROUTES.TIMELINE}
          element={
            <AppLayout>
              <TimelinePage />
            </AppLayout>
          }
        />
        <Route
          path={ROUTES.FAMILY_CIRCLE}
          element={
            <AppLayout>
              <CareCirclePage />
            </AppLayout>
          }
        />
        <Route
          path={ROUTES.INTELLIGENCE}
          element={
            <AppLayout>
              <IntelligencePage />
            </AppLayout>
          }
        />
        <Route
          path={ROUTES.INVENTORY}
          element={
            <AppLayout>
              <InventoryPage />
            </AppLayout>
          }
        />
        <Route
          path={ROUTES.RECORDS}
          element={
            <AppLayout>
              <RecordsPage />
            </AppLayout>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          }
        />

        {/* ── Role-specific dashboards ── */}
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

        {/* ── Legacy path aliases (keep old deep-links working) ── */}
        <Route path="/vitals" element={<Navigate to={ROUTES.TIMELINE} replace />} />
        <Route path="/ai-insights" element={<Navigate to={ROUTES.INTELLIGENCE} replace />} />
        <Route path="/circle" element={<Navigate to={ROUTES.FAMILY_CIRCLE} replace />} />

        {/* ── 404 ── */}
        <Route
          path="*"
          element={
            <AppLayout>
              <NotFoundPage />
            </AppLayout>
          }
        />
      </Routes>
    </Suspense>
  )
}
