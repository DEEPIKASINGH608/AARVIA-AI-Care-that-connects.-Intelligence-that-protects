import React, { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  ShieldCheck
} from 'lucide-react'
import { RoleBadge } from '@/components/common/RoleBadge'

export const CareCirclePage: React.FC = () => {
  const { careCircle } = useCare()
  const [copied, setCopied] = useState(false)

  const handleCopyInvite = () => {
    if (careCircle) {
      navigator.clipboard.writeText(careCircle.inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  if (!careCircle) return null

  return (
    <div className="space-y-8">
      {/* Circle Header */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-800 to-forest-900 p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-700 text-sage-200 text-xs font-semibold">
            <Users className="h-4 w-4" />
            <span>CareCircle AI Care Ecosystem • Care that connects.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {careCircle.circleName}
          </h1>
          <p className="text-sage-100 text-sm max-w-xl">
            A secure collaborative space where family members, professional caregivers, and the senior synchronize schedules, care tasks, and emergencies.
          </p>
        </div>

        {/* Invite Code Box */}
        <div className="bg-forest-950/60 p-4 rounded-2xl border border-forest-700/60 backdrop-blur-xs flex flex-col sm:flex-row items-center gap-3">
          <div>
            <span className="text-[11px] font-bold text-sage-400 uppercase tracking-wider block">
              Circle Invite Code
            </span>
            <span className="text-xl font-mono font-bold tracking-widest text-white">
              {careCircle.inviteCode}
            </span>
          </div>
          <Button
            onClick={handleCopyInvite}
            variant="default"
            size="sm"
            className="bg-sage-600 hover:bg-sage-500 font-bold gap-1.5"
            aria-label="Copy circle invite code"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
      </div>

      {/* Circle Members List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careCircle.members.map((member) => (
          <Card key={member.userId} className="rounded-3xl border border-sage-200 bg-white shadow-card overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-14 w-14 rounded-2xl object-cover border-2 border-sage-300 shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-forest-900 text-base sm:text-lg">{member.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{member.relationship}</p>
                  <div className="mt-1">
                    <RoleBadge role={member.role} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-warm-50/70 p-3 border border-warm-200/50 space-y-2 text-xs text-slate-600">
                {member.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-sage-600" />
                    <span>{member.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-sage-600" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-sage-100 flex items-center justify-between text-xs">
                {member.isEmergencyContact ? (
                  <span className="flex items-center gap-1 font-bold text-terracotta-700">
                    <ShieldCheck className="h-4 w-4" />
                    Primary Emergency Contact
                  </span>
                ) : (
                  <span className="text-slate-500">Authorized Member</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Permissions & Emergency Coordination Protocol */}
      <Card className="rounded-3xl border border-sage-200 bg-white shadow-card p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl">Emergency Notification Chain</CardTitle>
          <p className="text-xs text-slate-500">
            How alerts flow when senior Eleanor Vance activates the SOS button or a vital anomaly occurs
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 space-y-1">
              <span className="font-bold text-forest-900 block text-sm">Step 1: Immediate Ring</span>
              <p className="text-slate-600">
                Primary family guardian (Michael Vance) receives immediate push notification and emergency phone alert.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 space-y-1">
              <span className="font-bold text-forest-900 block text-sm">Step 2: On-Duty Caregiver</span>
              <p className="text-slate-600">
                Maria Santos receives clinical alert with real-time location and current medicine adherence status.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 space-y-1">
              <span className="font-bold text-forest-900 block text-sm">Step 3: St. Jude Dispatch</span>
              <p className="text-slate-600">
                If unacknowledged within 3 minutes, automated priority escalation to physician on-call.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
