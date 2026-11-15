export type TimelineEventType = 'medication' | 'vital' | 'appointment' | 'note' | 'alert' | 'routine'

export interface TimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  description: string
  timestamp: string
  authorName: string
  authorRole: 'elderly' | 'family' | 'caregiver' | 'ai'
  severity?: 'normal' | 'warning' | 'critical'
  metricValue?: string
  statusBadge?: string
}
