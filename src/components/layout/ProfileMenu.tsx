import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { User, Settings, LogOut, Heart, Users, Stethoscope, ChevronDown } from 'lucide-react'
import { RoleBadge } from '@/components/common/RoleBadge'

export const ProfileMenu: React.FC = () => {
  const { currentUser, currentRole, setRole, signOut } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    setIsOpen(false)
    await signOut()
    navigate('/login')
  }

  const roleOptions: { role: 'elderly' | 'family' | 'caregiver'; label: string; icon: any }[] = [
    { role: 'elderly', label: 'Senior Perspective (Eleanor)', icon: Heart },
    { role: 'family', label: 'Family Perspective (Michael)', icon: Users },
    { role: 'caregiver', label: 'Caregiver Perspective (Maria)', icon: Stethoscope },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pl-2.5 rounded-2xl bg-white border border-[#C4DDD0] hover:border-[#477B62] transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#477B62]"
        aria-label="User Profile Menu"
        aria-expanded={isOpen}
      >
        <img
          src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
          alt={currentUser?.fullName || 'User'}
          className="h-8 w-8 rounded-xl object-cover border border-[#477B62]/30"
        />
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-[#254E3B] leading-none truncate max-w-[120px]">
            {currentUser?.fullName}
          </p>
          <span className="text-[10px] text-[#5F7368] font-medium capitalize">
            {currentRole}
          </span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-[#5F7368]" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white p-4 shadow-2xl border border-[#C4DDD0] z-50 animate-in fade-in zoom-in-95 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E1EDE6]">
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'}
                alt={currentUser?.fullName}
                className="h-10 w-10 rounded-xl object-cover border border-[#477B62]"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-[#254E3B] truncate">
                  {currentUser?.fullName}
                </p>
                <div className="mt-0.5">
                  <RoleBadge role={currentRole} />
                </div>
              </div>
            </div>

            {/* Quick Perspective Switcher */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5F7368] block px-1">
                Active Perspective
              </span>
              {roleOptions.map((opt) => {
                const Icon = opt.icon
                const isActive = currentRole === opt.role
                return (
                  <button
                    key={opt.role}
                    onClick={() => {
                      setRole(opt.role)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors text-left ${
                      isActive
                        ? 'bg-[#E1EDE6] text-[#254E3B]'
                        : 'text-[#25352D] hover:bg-[#F2F7F4]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#477B62]" />
                    <span className="truncate">{opt.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="border-t border-[#E1EDE6] pt-2 space-y-1">
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#25352D] hover:bg-[#F2F7F4] transition-colors"
              >
                <Settings className="h-4 w-4 text-[#477B62]" />
                <span>Settings & Accessibility</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#C65D59] hover:bg-[#FCF5F5] transition-colors text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
