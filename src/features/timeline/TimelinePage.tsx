import { useState } from 'react'
import {
  History,
  Pill,
  Calendar,
  Activity,
  FlaskConical,
  AlertTriangle,
  Filter,
  FileText,
} from 'lucide-react'
import { MOCK_TIMELINE } from '@/services/mockData'
import type { TimelineEvent, TimelineEventType } from '@/types'

// ─── Filter Config ───────────────────────────────────────────────────────────

type FilterKey = 'all' | TimelineEventType

interface FilterOption {
  key: FilterKey
  label: string
}

const FILTERS: FilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'medication', label: 'Medications' },
  { key: 'appointment', label: 'Appointments' },
  { key: 'vital', label: 'Vitals' },
  { key: 'note', label: 'Notes' },
  { key: 'alert', label: 'Alerts' },
]

// ─── Type Styling Helpers ─────────────────────────────────────────────────────

function getTypeIcon(type: TimelineEventType, className = 'w-4 h-4') {
  switch (type) {
    case 'medication':
      return <Pill className={className} />
    case 'appointment':
      return <Calendar className={className} />
    case 'vital':
      return <Activity className={className} />
    case 'note':
      return <FileText className={className} />
    case 'alert':
      return <AlertTriangle className={className} />
    case 'routine':
      return <FlaskConical className={className} />
    default:
      return <History className={className} />
  }
}

function getDotColors(type: TimelineEventType, severity?: string): { dot: string; iconColor: string; badge: string } {
  if (type === 'alert' || severity === 'critical') {
    return { dot: 'bg-[#C65D59]', iconColor: 'text-[#C65D59]', badge: 'bg-[#FDECEA] text-[#C65D59]' }
  }
  if (severity === 'warning') {
    return { dot: 'bg-[#D99A38]', iconColor: 'text-[#D99A38]', badge: 'bg-[#FEF3DC] text-[#D99A38]' }
  }
  switch (type) {
    case 'medication':
      return { dot: 'bg-[#477B62]', iconColor: 'text-[#477B62]', badge: 'bg-[#E1EDE6] text-[#254E3B]' }
    case 'appointment':
      return { dot: 'bg-[#3B82F6]', iconColor: 'text-[#3B82F6]', badge: 'bg-[#EFF6FF] text-[#1D4ED8]' }
    case 'vital':
      return { dot: 'bg-[#8B5CF6]', iconColor: 'text-[#8B5CF6]', badge: 'bg-[#F5F3FF] text-[#6D28D9]' }
    case 'note':
      return { dot: 'bg-[#64748B]', iconColor: 'text-[#64748B]', badge: 'bg-[#F1F5F9] text-[#475569]' }
    case 'routine':
      return { dot: 'bg-[#0EA5E9]', iconColor: 'text-[#0EA5E9]', badge: 'bg-[#E0F2FE] text-[#0369A1]' }
    default:
      return { dot: 'bg-[#477B62]', iconColor: 'text-[#477B62]', badge: 'bg-[#E1EDE6] text-[#254E3B]' }
  }
}

function getTypeLabel(type: TimelineEventType): string {
  const labels: Record<TimelineEventType, string> = {
    medication: 'Medication',
    appointment: 'Appointment',
    vital: 'Vital Sign',
    note: 'Note',
    alert: 'Alert',
    routine: 'Routine',
  }
  return labels[type] ?? type
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

interface TimelineItemProps {
  event: TimelineEvent
  isLast: boolean
}

function TimelineItem({ event, isLast }: TimelineItemProps) {
  const colors = getDotColors(event.type, event.severity)

  return (
    <div className="flex gap-4">
      {/* Left column: dot + vertical line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full ${colors.dot} flex items-center justify-center shadow-sm`}
        >
          <span className="text-white">
            {getTypeIcon(event.type, 'w-4 h-4')}
          </span>
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-[#C4DDD0] mt-1 mb-1" />
        )}
      </div>

      {/* Right column: card */}
      <div className={`pb-6 flex-1 ${isLast ? '' : ''}`}>
        <div className="bg-[#FFFFFF] border border-[#C4DDD0] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          {/* Top row: title + timestamp */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-[#25352D] font-semibold text-sm leading-tight">
              {event.title}
            </h3>
            <span className="text-[#6B7280] text-xs whitespace-nowrap flex-shrink-0">
              {event.timestamp}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#4B5563] text-sm leading-relaxed mb-3">
            {event.description}
          </p>

          {/* Footer row: badges + metric + source */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}
            >
              {getTypeIcon(event.type, 'w-3 h-3')}
              {getTypeLabel(event.type)}
            </span>

            {/* Status badge */}
            {event.statusBadge && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#F7F8F3] text-[#477B62] border border-[#C4DDD0]">
                {event.statusBadge}
              </span>
            )}

            {/* Metric value */}
            {event.metricValue && (
              <span className="text-xs font-mono text-[#254E3B] bg-[#E1EDE6] px-2 py-0.5 rounded-full">
                {event.metricValue}
              </span>
            )}

            {/* Source / Author */}
            {event.authorName && (
              <span className="ml-auto text-xs text-[#9CA3AF] italic">
                by {event.authorName}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E1EDE6] flex items-center justify-center mb-4">
        <History className="w-8 h-8 text-[#477B62]" />
      </div>
      <h3 className="text-[#25352D] font-semibold text-lg mb-1">No events found</h3>
      <p className="text-[#6B7280] text-sm max-w-xs">
        There are no{' '}
        <span className="font-medium text-[#477B62]">{filter}</span> events in
        the timeline yet.
      </p>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TimelinePage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredEvents =
    activeFilter === 'all'
      ? MOCK_TIMELINE
      : MOCK_TIMELINE.filter((e) => e.type === activeFilter)

  const activeFilterLabel =
    FILTERS.find((f) => f.key === activeFilter)?.label ?? 'events'

  return (
    <div className="min-h-screen bg-[#F7F8F3]">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#477B62] flex items-center justify-center shadow-sm">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#25352D]">Health Timeline</h1>
              <p className="text-[#6B7280] text-sm">
                A chronological record of Eleanor's health journey
              </p>
            </div>
          </div>
        </div>

        {/* ── Filter Bar ──────────────────────────────────────────────── */}
        <div className="mb-6 bg-[#FFFFFF] border border-[#C4DDD0] rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-[#477B62]" />
            <span className="text-xs font-semibold text-[#254E3B] uppercase tracking-wide">
              Filter Events
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.key
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
                    isActive
                      ? 'bg-[#477B62] text-white border-[#477B62] shadow-sm'
                      : 'bg-[#F7F8F3] text-[#25352D] border-[#C4DDD0] hover:bg-[#E1EDE6] hover:border-[#477B62]'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Timeline List ────────────────────────────────────────────── */}
        {filteredEvents.length === 0 ? (
          <EmptyState filter={activeFilterLabel} />
        ) : (
          <div>
            {/* Event count */}
            <p className="text-xs text-[#6B7280] mb-4 font-medium">
              Showing{' '}
              <span className="text-[#477B62] font-semibold">
                {filteredEvents.length}
              </span>{' '}
              {filteredEvents.length === 1 ? 'event' : 'events'}
              {activeFilter !== 'all' && (
                <span> in &ldquo;{activeFilterLabel}&rdquo;</span>
              )}
            </p>

            {/* Timeline items */}
            <div>
              {filteredEvents.map((event, index) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  isLast={index === filteredEvents.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
