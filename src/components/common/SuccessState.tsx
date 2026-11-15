import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface SuccessStateProps {
  title?: string
  message: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Action Completed',
  message,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-3xl border border-emerald-200 bg-emerald-50/60 text-slate-800 shadow-soft',
        className
      )}
      role="status"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-4 shadow-xs">
        <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
      </div>
      <h3 className="text-xl font-bold text-forest-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default" size="default" className="font-bold">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
