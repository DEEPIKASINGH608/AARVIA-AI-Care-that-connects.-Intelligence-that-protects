import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  badgeText?: string
  breadcrumbs?: BreadcrumbItem[]
  action?: React.ReactNode
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badgeText,
  breadcrumbs = [{ label: 'AARVIA', path: '/dashboard' }],
  action,
  className,
}) => {
  return (
    <div className={cn('mb-8 space-y-3 transition-colors duration-200', className)}>
      {/* Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-[#254E3B] dark:hover:text-primary transition-colors hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
              )}
            </React.Fragment>
          ))}
          <span className="text-foreground font-bold flex items-center">
            <ChevronRight className="h-3.5 w-3.5 inline text-muted-foreground/60 mr-1" />
            {title}
          </span>
        </nav>
      )}

      {/* Main Header Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#254E3B] dark:text-foreground tracking-tight">
              {title}
            </h1>
            {badgeText && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E1EDE6] dark:bg-primary/20 text-[#254E3B] dark:text-primary text-xs font-bold border border-[#C4DDD0] dark:border-border">
                <ShieldCheck className="h-3.5 w-3.5 text-[#477B62] dark:text-primary" />
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-3 shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}