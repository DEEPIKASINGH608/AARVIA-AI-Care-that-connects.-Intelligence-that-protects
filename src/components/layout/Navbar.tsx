import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Heart, 
  Pill, 
  Calendar, 
  Activity, 
  Users, 
  Sparkles, 
  AlertTriangle, 
  Menu, 
  X,
  PhoneCall
} from 'lucide-react'
import { useCare } from '@/context/CareContext'
import { useAuth } from '@/context/AuthContext'
import { RoleSwitcher } from './RoleSwitcher'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export const Navbar: React.FC = () => {
  const location = useLocation()
  const { activeAlerts, triggerSOS } = useCare()
  const { currentRole, currentUser } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sosConfirming, setSosConfirming] = useState(false)

  const navItems = [
    { label: 'Overview', path: '/', icon: Heart },
    { label: 'Medications', path: '/medications', icon: Pill },
    { label: 'Appointments', path: '/appointments', icon: Calendar },
    { label: 'Health Vitals', path: '/vitals', icon: Activity },
    { label: 'Care Circle', path: '/circle', icon: Users },
    { label: 'AI Health Insights', path: '/ai-insights', icon: Sparkles },
  ]

  const handleSosClick = async () => {
    if (!sosConfirming) {
      setSosConfirming(true)
      setTimeout(() => setSosConfirming(false), 5000)
    } else {
      await triggerSOS('Senior emergency alert initiated from navbar')
      setSosConfirming(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sage-200/70 bg-[#FAF9F5]/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="CareCircle AI Home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-500 to-forest-700 text-white shadow-card transition-transform group-hover:scale-105">
            <Heart className="h-6 w-6 fill-white/20 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-forest-900">
                CareCircle
              </span>
              <span className="rounded-md bg-sage-100 px-1.5 py-0.5 text-[10px] font-bold text-sage-800 tracking-wider uppercase">
                AI
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Intelligent elderly care & collaborative health ecosystem
            </p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150',
                  isActive
                    ? 'bg-sage-100 text-forest-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-forest-900 hover:bg-sage-50/80'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4',
                    isActive ? 'text-sage-600' : 'text-slate-400'
                  )}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right side controls: Role Switcher & SOS */}
        <div className="flex items-center gap-3">
          {/* Active Alerts Pill if any */}
          {activeAlerts.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold animate-pulse" role="status">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>{activeAlerts.length} Active Alert</span>
            </div>
          )}

          {/* Role Switcher */}
          <div className="hidden md:block">
            <RoleSwitcher />
          </div>

          {/* Emergency SOS Button */}
          <Button
            onClick={handleSosClick}
            variant="destructive"
            size="sm"
            className={cn(
              'font-bold transition-all shadow-sm',
              sosConfirming ? 'bg-red-700 animate-bounce' : 'bg-terracotta-500'
            )}
            title="Press to notify all emergency contacts and caregivers immediately"
            aria-label={sosConfirming ? 'Confirm Emergency SOS' : 'Emergency SOS'}
          >
            <PhoneCall className="h-4 w-4 mr-1.5" />
            {sosConfirming ? 'Confirm SOS?' : 'SOS'}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-sage-100 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sage-200/60 bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-4">
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Switch Perspective:</p>
            <RoleSwitcher className="w-full justify-around" />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    isActive
                      ? 'bg-sage-100 text-forest-900 font-bold'
                      : 'text-slate-700 hover:bg-sage-50'
                  )}
                >
                  <Icon className="h-5 w-5 text-sage-600" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="border-t border-sage-200 pt-3">
            <div className="flex items-center gap-3 px-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Logged in as:</span>
              <span>{currentUser?.fullName} ({currentRole})</span>
            </div>
            <p className="text-[11px] text-slate-400 px-2 mt-1">
              Care that connects. Intelligence that protects.
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
