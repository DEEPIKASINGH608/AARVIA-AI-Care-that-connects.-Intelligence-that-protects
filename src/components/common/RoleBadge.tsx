import React from 'react'
import { UserRole } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Heart, Users, Stethoscope } from 'lucide-react'

interface RoleBadgeProps {
  role: UserRole
  className?: string
  showIcon?: boolean
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className, showIcon = true }) => {
  switch (role) {
    case 'elderly':
      return (
        <Badge variant="default" className={className}>
          {showIcon && <Heart className="h-3 w-3 mr-1 text-sage-600 fill-sage-600/20" />}
          Senior View
        </Badge>
      )
    case 'family':
      return (
        <Badge variant="forest" className={className}>
          {showIcon && <Users className="h-3 w-3 mr-1" />}
          Family Circle
        </Badge>
      )
    case 'caregiver':
      return (
        <Badge variant="secondary" className={className}>
          {showIcon && <Stethoscope className="h-3 w-3 mr-1 text-forest-700" />}
          Caregiver Hub
        </Badge>
      )
  }
}
