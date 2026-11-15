import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-sage-100 text-forest-800 hover:bg-sage-200',
        forest:
          'border-transparent bg-forest-700 text-white',
        secondary:
          'border-transparent bg-warm-100 text-slate-800 hover:bg-warm-200',
        destructive:
          'border-transparent bg-red-100 text-red-800 border-red-200',
        warning:
          'border-transparent bg-amber-100 text-amber-800 border-amber-200',
        success:
          'border-transparent bg-emerald-100 text-emerald-800 border-emerald-200',
        outline: 'text-forest-800 border-sage-300',
        elder: 'text-sm font-bold px-3.5 py-1 bg-sage-100 text-forest-900 border-sage-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
