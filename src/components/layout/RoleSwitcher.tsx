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
        'inline-flex items-center rounded-2xl bg-muted p-1 border border-border shadow-xs transition-colors',
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
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 select-none',
              isActive
                ? 'bg-card text-[#254E3B] dark:text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
            )}
            title={r.sub}
            aria-pressed={isActive}
          >
            <Icon
              className={cn(
                'h-3.5 w-3.5',
                isActive ? 'text-[#477B62] dark:text-primary' : 'text-muted-foreground'
              )}
            />
            <span>{r.label}</span>
          </button>
        )
      })}
    </div>
  )
}