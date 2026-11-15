import React, { useState } from 'react'
import { Bell, Check, Clock, AlertTriangle, Pill, Calendar, X } from 'lucide-react'
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
        return <Pill className="h-4 w-4 text-[#477B62]" />
      case 'appointment':
        return <Calendar className="h-4 w-4 text-[#254E3B]" />
      default:
        return <Clock className="h-4 w-4 text-[#5F7368]" />
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-[#25352D] hover:bg-[#E1EDE6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#477B62]"
        aria-label="Notification Center"
        aria-expanded={isOpen}
      >
        <Bell className="h-5 w-5 text-[#254E3B]" />
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
          <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white p-4 shadow-2xl border border-[#C4DDD0] z-50 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E1EDE6]">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-[#254E3B] text-sm">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C65D59]/10 text-[#C65D59] text-[11px] font-extrabold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#477B62] hover:text-[#254E3B] font-semibold"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#F0F2EB] max-h-80 overflow-y-auto mt-2">
              {notifications.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#5F7368]">
                  No notifications to display.
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markItemRead(item.id)}
                    className={cn(
                      'p-3 flex items-start gap-3 transition-colors cursor-pointer hover:bg-[#F7F8F3] rounded-xl my-1',
                      !item.read ? 'bg-[#F2F7F4]' : ''
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#C4DDD0] shrink-0 mt-0.5 shadow-xs">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#254E3B]">{item.title}</span>
                        <span className="text-[10px] text-[#5F7368]">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#25352D] leading-snug">{item.message}</p>
                    </div>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-[#477B62] shrink-0 mt-2" />
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#E1EDE6] text-center">
              <span className="text-[11px] font-medium text-[#5F7368]">
                CareCircle Telemetry Synchronized
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
