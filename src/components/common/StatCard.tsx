import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconBgColor?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-sage-100 text-forest-800',
  trend,
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden relative', className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl shadow-xs', iconBgColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                'text-xs font-bold px-2 py-0.5 rounded-full',
                trend.isPositive
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1.5 text-xs text-slate-500 font-medium">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}
