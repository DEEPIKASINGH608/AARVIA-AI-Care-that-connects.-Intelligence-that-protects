import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Heart, 
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
  PhoneCall,
  ShieldCheck
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useCare } from '@/context/CareContext'

interface NavItem {
  label: string
  path: string
  icon: React.ElementType
  badge?: string
  badgeVariant?: 'primary' | 'warning' | 'ai'
}

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { activeAlerts, todayTakenCount, todayTotalCount } = useCare()

  const navItems: NavItem[] = [
    { label: 'Overview Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Care Companion', path: '/companion', icon: Bot, badge: 'AI', badgeVariant: 'ai' },
    { 
      label: 'Medications', 
      path: '/medications', 
      icon: Pill, 
      badge: `${todayTakenCount}/${todayTotalCount}` 
    },
    { label: 'Appointments', path: '/appointments', icon: Calendar },
    { label: 'Health Timeline', path: '/timeline', icon: History },
    { label: 'Family Care Circle', path: '/circle', icon: Users },
    { label: 'Care Intelligence', path: '/intelligence', icon: Sparkles, badge: 'Insights', badgeVariant: 'primary' },
    { label: 'Medicine Inventory', path: '/inventory', icon: Package, badge: '1 Low', badgeVariant: 'warning' },
    { label: 'Medical Records', path: '/records', icon: FileText },
    { label: 'Settings & Accessibility', path: '/settings', icon: Settings },
  ]

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-[#C4DDD0] bg-white h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#E1EDE6] gap-3">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#477B62] to-[#254E3B] text-white shadow-soft transition-transform group-hover:scale-105">
            <Heart className="h-5 w-5 fill-white/20 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-[#254E3B]">
                AARVIA
              </span>
              <span className="rounded-md bg-[#E1EDE6] px-1.5 py-0.5 text-[10px] font-extrabold text-[#254E3B] uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[10px] font-semibold text-[#5F7368]">
              Elder Care Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5F7368] px-3 mb-2 block">
          Platform Hub
        </span>

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-150 group',
                isActive
                  ? 'bg-[#E1EDE6] text-[#254E3B] shadow-xs'
                  : 'text-[#25352D] hover:bg-[#F2F7F4] hover:text-[#254E3B]'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-4 w-4 transition-transform group-hover:scale-110',
                    isActive ? 'text-[#477B62]' : 'text-[#5F7368]'
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    'text-[10px] font-black px-2 py-0.5 rounded-full',
                    item.badgeVariant === 'warning'
                      ? 'bg-[#D99A38]/15 text-[#9F681C] border border-[#D99A38]/30'
                      : item.badgeVariant === 'ai'
                        ? 'bg-gradient-to-r from-[#477B62] to-[#254E3B] text-white shadow-xs'
                        : 'bg-[#C4DDD0]/50 text-[#254E3B]'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Senior Status & 24/7 Helpline Card */}
      <div className="p-4 border-t border-[#E1EDE6] bg-[#F7F8F3]/70 space-y-3">
        <div className="p-3 rounded-2xl bg-white border border-[#C4DDD0] shadow-soft space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-[#5F7368] flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-[#477B62]" />
              Monitored Senior
            </span>
            <span className="h-2 w-2 rounded-full bg-[#477B62] animate-pulse" />
          </div>
          <p className="text-xs font-bold text-[#254E3B]">Eleanor Vance (78y)</p>
          <p className="text-[10px] text-[#5F7368]">Care Circle Active • 4 Contacts</p>
        </div>

        <div className="flex items-center justify-between text-[11px] font-semibold text-[#5F7368] px-1">
          <span className="flex items-center gap-1 text-[#254E3B]">
            <PhoneCall className="h-3.5 w-3.5 text-[#477B62]" />
            Helpline: <strong>1-800-AARVIA</strong>
          </span>
        </div>
      </div>
    </aside>
  )
}
