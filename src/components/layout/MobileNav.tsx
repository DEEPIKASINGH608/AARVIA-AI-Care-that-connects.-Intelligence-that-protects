import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Heart,
  X,
  LayoutDashboard,
  Bot,
  Pill,
  Calendar,
  History,
  Users,
  Sparkles,
  Package,
  FileText,
  Settings,
  PhoneCall
} from 'lucide-react'
import { RoleSwitcher } from './RoleSwitcher'
import { cn } from '@/utils/cn'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navItems = [
    { label: 'Overview Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Care Companion', path: '/companion', icon: Bot, badge: 'AI' },
    { label: 'Medications', path: '/medications', icon: Pill },
    { label: 'Appointments', path: '/appointments', icon: Calendar },
    { label: 'Health Timeline', path: '/timeline', icon: History },
    { label: 'Family Care Circle', path: '/circle', icon: Users },
    { label: 'Care Intelligence', path: '/intelligence', icon: Sparkles },
    { label: 'Medicine Inventory', path: '/inventory', icon: Package, badge: 'Low' },
    { label: 'Medical Records', path: '/records', icon: FileText },
    { label: 'Settings & Accessibility', path: '/settings', icon: Settings },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-card border-r border-border shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-border">
          <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#477B62] to-[#254E3B] text-white">
              <Heart className="h-5 w-5 fill-white/20" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-[#254E3B] dark:text-foreground">AARVIA</span>
              <span className="rounded-md bg-[#E1EDE6] dark:bg-primary/20 px-1.5 py-0.5 text-[10px] font-extrabold text-[#254E3B] dark:text-primary uppercase tracking-wider">
                AI
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Role Switcher in Mobile Drawer */}
        <div className="p-4 border-b border-border bg-muted/50">
          <span className="text-[10px] font-extrabold uppercase text-muted-foreground block mb-2">
            Switch Perspective
          </span>
          <RoleSwitcher className="w-full justify-around" />
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors',
                  isActive
                    ? 'bg-[#E1EDE6] text-[#254E3B] dark:bg-primary/20 dark:text-primary'
                    : 'text-foreground/85 hover:bg-[#F2F7F4] hover:text-[#254E3B] dark:hover:bg-accent dark:hover:text-foreground'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      isActive ? 'text-[#477B62] dark:text-primary' : 'text-muted-foreground'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#477B62]/15 dark:bg-primary/20 text-[#254E3B] dark:text-primary">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/50 text-xs text-muted-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-[#254E3B] dark:text-foreground">
            <PhoneCall className="h-4 w-4 text-[#477B62] dark:text-primary" />
            1-800-AARVIA-CARE
          </span>
          <Link to="/" onClick={onClose} className="hover:underline font-semibold text-foreground/80">
            Landing Page
          </Link>
        </div>
      </div>
    </div>
  )
}