import React, { useState } from 'react'
import { useTheme, type Theme } from '@/context/ThemeContext'
import {
  Settings,
  User,
  Moon,
  Sun,
  Monitor,
  Bell,
  Phone,
  Shield,
  Accessibility,
  ChevronRight,
  LogOut,
  Edit2,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type TextSize = 'small' | 'medium' | 'large' | 'xlarge'

const BRAND = {
  primary: '#477B62',
  dark: '#254E3B',
  bg: '#F7F8F3',
  text: '#25352D',
  card: '#FFFFFF',
  border: '#C4DDD0',
  warning: '#D99A38',
  danger: '#C65D59',
}

export default function SettingsPage() {
  const { signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  // Accessibility state
  const [textSize, setTextSize] = useState<TextSize>('medium')
  const [highContrast, setHighContrast] = useState(false)
  const [audioReminders, setAudioReminders] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)


  // Notifications state
  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    appointmentReminders: true,
    familyActivity: false,
    aiInsights: true,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const textSizeOptions: { label: string; value: TextSize }[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'XL', value: 'xlarge' },
  ]

  const themeOptions: { label: string; value: Theme; icon: React.ReactNode }[] = [
    { label: 'Light', value: 'light', icon: <Sun size={16} /> },
    { label: 'Dark', value: 'dark', icon: <Moon size={16} /> },
    { label: 'System', value: 'system', icon: <Monitor size={16} /> },
  ]

  const emergencyContacts = [
    { name: 'Michael Vance', relation: 'Son', phone: '+1 (555) 234-5678' },
    { name: 'Maria Santos', relation: 'Caregiver', phone: '+1 (555) 876-5432' },
  ]

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean
    onChange: () => void
  }) => (
    <button
      onClick={onChange}
      className="relative inline-flex items-center w-11 h-6 rounded-full transition-colors focus:outline-none"
      style={{
        backgroundColor: checked ? BRAND.primary : BRAND.border,
      }}
      aria-pressed={checked}
    >
      <span
        className="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform"
        style={{ transform: checked ? 'translateX(24px)' : 'translateX(2px)' }}
      />
    </button>
  )

  const SectionCard = ({
    children,
    className = '',
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div
      className={`rounded-2xl shadow-sm p-6 ${className}`}
      style={{ backgroundColor: BRAND.card, border: `1px solid ${BRAND.border}` }}
    >
      {children}
    </div>
  )

  const SectionTitle = ({
    icon,
    title,
  }: {
    icon: React.ReactNode
    title: string
  }) => (
    <div className="flex items-center gap-2 mb-5">
      <span style={{ color: BRAND.primary }}>{icon}</span>
      <h2 className="text-lg font-semibold" style={{ color: BRAND.dark }}>
        {title}
      </h2>
    </div>
  )

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: BRAND.bg }}>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: BRAND.primary }}
          >
            <Settings size={24} color="#fff" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: BRAND.dark }}>
              Settings &amp; Accessibility
            </h1>
            <p className="text-sm" style={{ color: BRAND.text, opacity: 0.7 }}>
              Manage your preferences and account
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <SectionCard>
          <SectionTitle icon={<User size={20} />} title="Profile" />
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow"
              style={{ backgroundColor: BRAND.primary }}
            >
              EV
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold" style={{ color: BRAND.dark }}>
                Eleanor Vance
              </p>
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full mt-1"
                style={{ backgroundColor: '#E1EDE6', color: BRAND.dark }}
              >
                Elderly Person
              </span>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: BRAND.primary, color: '#fff' }}
            >
              <Edit2 size={14} />
              Edit Profile
            </button>
          </div>
        </SectionCard>

        {/* Accessibility Settings */}
        <SectionCard>
          <SectionTitle icon={<Accessibility size={20} />} title="Accessibility Settings" />
          <div className="space-y-5">
            {/* Text Size */}
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: BRAND.text }}>
                Text Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {textSizeOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setTextSize(opt.value)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
                    style={
                      textSize === opt.value
                        ? {
                            backgroundColor: BRAND.primary,
                            color: '#fff',
                            borderColor: BRAND.primary,
                          }
                        : {
                            backgroundColor: '#fff',
                            color: BRAND.text,
                            borderColor: BRAND.border,
                          }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="border-t"
              style={{ borderColor: BRAND.border }}
            />

            {/* Toggles */}
            {[
              {
                label: 'High Contrast',
                desc: 'Increase color contrast for better readability',
                value: highContrast,
                onChange: () => setHighContrast(v => !v),
              },
              {
                label: 'Audio Reminders',
                desc: 'Enable spoken reminders for medications and appointments',
                value: audioReminders,
                onChange: () => setAudioReminders(v => !v),
              },
              {
                label: 'Reduce Motion',
                desc: 'Minimize animations and transitions',
                value: reduceMotion,
                onChange: () => setReduceMotion(v => !v),
              },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: BRAND.dark }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: BRAND.text, opacity: 0.65 }}>
                    {item.desc}
                  </p>
                </div>
                <Toggle checked={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Theme */}
        <SectionCard>
          <SectionTitle icon={<Sun size={20} />} title="Appearance" />
          <p className="text-sm mb-3" style={{ color: BRAND.text, opacity: 0.75 }}>
            Choose your preferred theme
          </p>
          <div className="flex gap-2">
            {themeOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium border transition-colors"
                style={
                  theme === opt.value
                    ? {
                        backgroundColor: BRAND.primary,
                        color: '#fff',
                        borderColor: BRAND.primary,
                      }
                    : {
                        backgroundColor: '#fff',
                        color: BRAND.text,
                        borderColor: BRAND.border,
                      }
                }
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Notification Preferences */}
        <SectionCard>
          <SectionTitle icon={<Bell size={20} />} title="Notification Preferences" />
          <div className="space-y-4">
            {[
              {
                label: 'Medication Reminders',
                desc: 'Get reminded when it\'s time to take your medications',
                key: 'medicationReminders' as const,
              },
              {
                label: 'Appointment Reminders',
                desc: 'Alerts for upcoming doctor and therapy appointments',
                key: 'appointmentReminders' as const,
              },
              {
                label: 'Family Activity',
                desc: 'Notify when family members check in or leave messages',
                key: 'familyActivity' as const,
              },
              {
                label: 'AI Insights',
                desc: 'Weekly AI-generated health summaries and care tips',
                key: 'aiInsights' as const,
              },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: BRAND.dark }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: BRAND.text, opacity: 0.65 }}>
                    {item.desc}
                  </p>
                </div>
                <Toggle
                  checked={notifications[item.key]}
                  onChange={() => toggleNotification(item.key)}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Emergency Contacts */}
        <SectionCard>
          <SectionTitle icon={<Phone size={20} />} title="Emergency Contacts" />
          <div className="space-y-3">
            {emergencyContacts.map(contact => (
              <div
                key={contact.name}
                className="flex items-center gap-4 p-3 rounded-xl"
                style={{ backgroundColor: BRAND.bg, border: `1px solid ${BRAND.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  {contact.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: BRAND.dark }}>
                    {contact.name}
                  </p>
                  <p className="text-xs" style={{ color: BRAND.text, opacity: 0.65 }}>
                    {contact.relation}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: BRAND.primary }}>
                    {contact.phone}
                  </span>
                  <ChevronRight size={16} style={{ color: BRAND.border }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Account / Sign Out */}
        <SectionCard>
          <SectionTitle icon={<Shield size={20} />} title="Account" />
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: BRAND.danger, color: '#fff' }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </SectionCard>

      </div>
    </div>
  )
}
