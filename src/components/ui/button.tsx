import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-sage-600 text-white hover:bg-sage-700 shadow-sm shadow-sage-900/10 active:bg-sage-800',
        forest:
          'bg-forest-700 text-white hover:bg-forest-800 shadow-sm shadow-forest-950/20 active:bg-forest-900',
        destructive:
          'bg-terracotta-500 text-white hover:bg-terracotta-600 shadow-sm active:bg-terracotta-700',
        outline:
          'border border-sage-200 bg-white/80 hover:bg-sage-50 hover:text-forest-800 hover:border-sage-300',
        secondary:
          'bg-warm-100 text-forest-900 hover:bg-warm-200 border border-warm-200/60',
        ghost:
          'hover:bg-sage-100/60 hover:text-forest-900',
        link:
          'text-sage-700 underline-offset-4 hover:underline p-0 h-auto',
        elder:
          'bg-sage-600 text-white hover:bg-sage-700 text-lg font-bold py-4 px-6 rounded-2xl shadow-elder min-h-[56px] border-2 border-sage-500/20 active:bg-sage-800',
        elderDanger:
          'bg-terracotta-500 text-white hover:bg-terracotta-600 text-xl font-extrabold py-5 px-8 rounded-3xl shadow-xl min-h-[64px] border-4 border-white/40 active:scale-95 animate-pulse',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base font-semibold',
        xl: 'h-14 rounded-2xl px-8 text-lg font-bold',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
