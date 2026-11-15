import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopNavbar } from './TopNavbar'
import { MobileNav } from './MobileNav'
import { useCare } from '@/context/CareContext'
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeAlerts, resolveAlert } = useCare()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F7F8F3] text-[#25352D]">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#254E3B] text-white rounded-xl font-bold shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Persistent Sidebar for Desktop */}
      <Sidebar />

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
      />

      {/* Main Body Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavbar onToggleMobileNav={() => setMobileNavOpen(true)} />

        {/* Emergency Alert Banner if any alert is active */}
        {activeAlerts.length > 0 && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-[#C65D59]/10 border-b border-[#C65D59]/30 px-4 sm:px-8 py-3 text-[#25352D]"
          >
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#C65D59] text-white animate-pulse shadow-xs">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <span className="font-extrabold text-[#8E3633]">Care Notice: </span>
                  <span className="font-medium text-[#25352D]">{activeAlerts[0].message}</span>
                </div>
              </div>
              <Button
                onClick={() => resolveAlert(activeAlerts[0].id)}
                variant="outline"
                size="sm"
                className="bg-white hover:bg-[#F8E7E6] text-[#8E3633] border-[#C65D59]/40 text-xs shrink-0 font-bold"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1 text-[#477B62]" />
                Mark Resolved
              </Button>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto focus:outline-none"
        >
          {children}
        </main>

        {/* Consistent Layout Footer */}
        <footer className="mt-auto border-t border-[#C4DDD0]/60 bg-white/60 py-5 text-xs text-[#5F7368] px-4 sm:px-8">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-bold text-[#254E3B]">
              <Shield className="h-4 w-4 text-[#477B62]" />
              <span>AARVIA AI — Care that connects. Intelligence that protects.</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Demonstration Telehealth Simulation</span>
              <span>•</span>
              <span>WCAG AAA Accessible Interface</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
