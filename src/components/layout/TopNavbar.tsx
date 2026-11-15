import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Heart,
  Menu,
  PhoneCall,
  AlertTriangle,
  Search,
  ExternalLink
} from 'lucide-react'
import { useCare } from '@/context/CareContext'
import { RoleSwitcher } from './RoleSwitcher'
import { NotificationCenter } from './NotificationCenter'
import { ProfileMenu } from './ProfileMenu'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface TopNavbarProps {
  onToggleMobileNav: () => void
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileNav }) => {
  const location = useLocation()
  const { activeAlerts, triggerSOS } = useCare()
  const [sosConfirming, setSosConfirming] = useState(false)

  const handleSosClick = async () => {
    if (!sosConfirming) {
      setSosConfirming(true)
      setTimeout(() => setSosConfirming(false), 5000)
    } else {
      await triggerSOS('Emergency SOS triggered from application top bar')
      setSosConfirming(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 w-full h-20 border-b border-[#C4DDD0] bg-[#F7F8F3]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Brand / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden p-2 rounded-xl text-[#25352D] hover:bg-[#E1EDE6] transition-colors focus:outline-none"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="h-6 w-6 text-[#254E3B]" />
        </button>

        {/* Mobile brand shown only on mobile */}
        <Link to="/dashboard" className="flex lg:hidden items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#477B62] text-white">
            <Heart className="h-5 w-5 fill-white/20" />
          </div>
          <span className="font-extrabold text-lg text-[#254E3B]">AARVIA</span>
        </Link>

        {/* Desktop Quick Search / Context indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-[#C4DDD0] text-xs text-[#5F7368]">
          <Search className="h-3.5 w-3.5 text-[#477B62]" />
          <span>Patient: <strong>Eleanor Vance</strong> (CareCircle #101)</span>
        </div>
      </div>

      {/* Right: Role Switcher, SOS, Notifications & Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Alert Pulse if any */}
        {activeAlerts.length > 0 && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D99A38]/10 border border-[#D99A38]/30 text-[#9F681C] text-xs font-bold animate-pulse">
            <AlertTriangle className="h-4 w-4 text-[#D99A38]" />
            <span>{activeAlerts.length} Active Notice</span>
          </div>
        )}

        {/* Role Switcher */}
        <div className="hidden sm:block">
          <RoleSwitcher />
        </div>

        {/* Emergency SOS Button */}
        <Button
          onClick={handleSosClick}
          variant="destructive"
          size="sm"
          className={cn(
            'font-bold transition-all shadow-sm rounded-xl',
            sosConfirming ? 'bg-red-700 animate-bounce' : 'bg-[#C65D59] hover:bg-[#AC4844]'
          )}
          title="Press to instantly alert family members & caregivers"
          aria-label={sosConfirming ? 'Confirm Emergency SOS' : 'Emergency SOS'}
        >
          <PhoneCall className="h-4 w-4 mr-1.5" />
          {sosConfirming ? 'Confirm SOS?' : 'SOS'}
        </Button>

        {/* Notification Center */}
        <NotificationCenter />

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </header>
  )
}
