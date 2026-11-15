import React, { useState } from 'react'
import { Bell, Clock, AlertTriangle, Pill, Calendar, X } from 'lucide-react'
import { MOCK_NOTIFICATIONS } from '@/services/mockData'
import { cn } from '@/utils/cn'

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markItemRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-[#C65D59]" />
      case 'medication':
        return <Pill className="h-4 w-4 text-[#477B62] dark:text-primary" />
      case 'appointment':
        return <Calendar className="h-4 w-4 text-[#254E3B] dark:text-primary" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-foreground hover:bg-[#E1EDE6] dark:hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Notification Center"
        aria-expanded={isOpen}
      >
        <Bell className="h-5 w-5 text-[#254E3B] dark:text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C65D59] text-[10px] font-bold text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-card p-4 shadow-2xl border border-border z-50 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-[#254E3B] dark:text-foreground text-sm">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C65D59]/15 text-[#C65D59] dark:text-[#F29B98] text-[11px] font-extrabold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#477B62] dark:text-primary hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-border/60 max-h-80 overflow-y-auto mt-2">
              {notifications.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground">
                  No notifications to display.
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markItemRead(item.id)}
                    className={cn(
                      'p-3 flex items-start gap-3 transition-colors cursor-pointer hover:bg-accent/60 rounded-xl my-1',
                      !item.read ? 'bg-[#F2F7F4] dark:bg-primary/10' : ''
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border shrink-0 mt-0.5 shadow-xs">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#254E3B] dark:text-foreground">{item.title}</span>
                        <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-foreground/85 leading-snug">{item.message}</p>
                    </div>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-[#477B62] dark:bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-border text-center">
              <span className="text-[11px] font-medium text-muted-foreground">
                AARVIA AI Care Telemetry Synchronized
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}