import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { UserRole } from '@/types'
import { Heart, Users, Stethoscope } from 'lucide-react'
import { cn } from '@/utils/cn'

export const RoleSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { currentRole, setRole } = useAuth()

  const roles: { id: UserRole; label: string; icon: React.ElementType; sub: string }[] = [
    { id: 'elderly', label: 'Senior', icon: Heart, sub: 'Simple high-contrast senior mode' },
    { id: 'family', label: 'Family', icon: Users, sub: 'Peace-of-mind telemetry view' },
    { id: 'caregiver', label: 'Caregiver', icon: Stethoscope, sub: 'Clinical caregiver roster' },
  ]

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-2xl bg-[#F0F2EB] p-1 border border-[#C4DDD0] shadow-xs',
        className
      )}
      role="group"
      aria-label="Switch User Perspective"
    >
      {roles.map((r) => {
        const Icon = r.icon
        const isActive = currentRole === r.id

        return (
          <button
            key={r.id}
            onClick={() => setRole(r.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-xs font-bold transition-all duration-200 select-none',
              isActive
                ? 'bg-white text-[#254E3B] shadow-xs border border-[#C4DDD0]/60'
                : 'text-[#5F7368] hover:text-[#254E3B] hover:bg-white/40'
            )}
            title={r.sub}
            aria-pressed={isActive}
          >
            <Icon
              className={cn(
                'h-3.5 w-3.5 sm:h-3.5 sm:w-3.5',
                isActive ? 'text-[#477B62]' : 'text-[#5F7368]'
              )}
            />
            <span>{r.label}</span>
          </button>
        )
      })}
    </div>
  )
}
