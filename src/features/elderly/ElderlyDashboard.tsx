import React from 'react'
import { useCare } from '@/context/CareContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle2, 
  Clock, 
  Pill, 
  PhoneCall, 
  Calendar, 
  Smile, 
  Sparkles,
  Heart
} from 'lucide-react'
import { formatTime, getGreeting } from '@/utils/date'

export const ElderlyDashboard: React.FC = () => {
  const { 
    medications, 
    doseStatusMap, 
    markDose, 
    appointments, 
    triggerSOS, 
    todayTakenCount, 
    todayTotalCount 
  } = useCare()

  const nextMedication = medications.find(m => doseStatusMap[m.id] === 'scheduled') || medications[0]
  const nextIsTaken = nextMedication ? doseStatusMap[nextMedication.id] === 'taken' : false
  const nextAppointment = appointments[0]

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Warm Elderly Greeting Header */}
      <div className="rounded-3xl bg-gradient-to-r from-sage-100 via-warm-100 to-sage-50 p-6 sm:p-8 border border-sage-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-200/70 text-forest-800 text-sm font-bold mb-2">
              <Heart className="h-4 w-4 fill-sage-600 text-sage-600" />
              <span>CareCircle AI Senior Companion • Care that connects.</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight">
              {getGreeting()}, Eleanor!
            </h1>
            <p className="text-lg text-slate-600 mt-1">
              You are doing wonderfully today. All your loved ones are connected.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-200 text-center sm:text-right shrink-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Today's Medicine</span>
            <span className="text-3xl font-extrabold text-sage-700">
              {todayTakenCount} of {todayTotalCount}
            </span>
            <span className="text-xs font-semibold text-slate-500 block">Doses Taken</span>
          </div>
        </div>
      </div>

      {/* Main Focal Card: NEXT UP MEDICINE */}
      <Card className="border-2 border-sage-300 bg-white shadow-card overflow-hidden rounded-3xl">
        <div className="bg-sage-600 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
            <Clock className="h-5 w-5" />
            <span>Next Medicine Scheduled</span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0 font-bold text-sm">
            {nextMedication ? formatTime(nextMedication.times[0]) : 'All Done'}
          </Badge>
        </div>

        <CardContent className="p-6 sm:p-8">
          {nextMedication ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-100 text-forest-800 shrink-0">
                    <Pill className="h-9 w-9 stroke-[2]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-forest-900">
                      {nextMedication.name}
                    </h2>
                    <p className="text-lg font-bold text-sage-700 mt-0.5">
                      {nextMedication.dosage} • {nextMedication.pillColor} {nextMedication.form}
                    </p>
                    <p className="text-base text-slate-600 mt-1">
                      {nextMedication.instructions}
                    </p>
                  </div>
                </div>

                {nextMedication.withFood && (
                  <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-900 text-sm font-bold py-1.5 px-3 self-start sm:self-auto">
                    Take with food or water
                  </Badge>
                )}
              </div>

              {/* Big, accessible Elderly Action Button */}
              <div className="pt-2">
                {nextIsTaken ? (
                  <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xl">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                    <span>You have taken this medicine! Good job!</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => markDose(nextMedication.id, 'taken')}
                    variant="elder"
                    className="w-full text-xl sm:text-2xl py-6 gap-3 shadow-lg"
                  >
                    <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
                    <span>YES, I TOOK MY {nextMedication.name.toUpperCase()}</span>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xl font-bold text-forest-900">All medications taken for now!</p>
              <p className="text-slate-500 mt-1">Take some rest and have a glass of water.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Two Column Section: Doctor Visit & Quick Feeling Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Doctor Visit */}
        <Card className="rounded-3xl border border-sage-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-forest-800">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900">Next Doctor Visit</h3>
                <p className="text-xs text-slate-500">We will remind you and family</p>
              </div>
            </div>

            {nextAppointment ? (
              <div className="rounded-2xl bg-warm-50 p-4 border border-warm-200/80 space-y-2">
                <p className="text-lg font-bold text-forest-900">{nextAppointment.doctorName}</p>
                <p className="text-sm font-semibold text-sage-800">{nextAppointment.specialty}</p>
                <p className="text-sm text-slate-600">{nextAppointment.clinicName}</p>
                <div className="pt-2 text-xs font-bold text-forest-800 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-sage-600" />
                  <span>Thursday, Nov 20 at 10:30 AM</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No appointments scheduled this week.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Feeling / Daily Mood */}
        <Card className="rounded-3xl border border-sage-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-forest-800">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900">How Are You Feeling?</h3>
                <p className="text-xs text-slate-500">Tap to let your family know</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: '😊', label: 'Feeling Great', color: 'hover:bg-emerald-50 hover:border-emerald-300' },
                { emoji: '🙂', label: 'Doing Good', color: 'hover:bg-sage-50 hover:border-sage-300' },
                { emoji: '😴', label: 'A Bit Tired', color: 'hover:bg-amber-50 hover:border-amber-300' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border border-sage-200 bg-white transition-all text-center ${item.color} focus:ring-2 focus:ring-sage-500`}
                >
                  <span className="text-3xl mb-1">{item.emoji}</span>
                  <span className="text-xs font-bold text-forest-900">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-sage-50 p-3 flex items-center gap-2 text-xs text-forest-800 font-medium">
              <Sparkles className="h-4 w-4 text-sage-600 shrink-0" />
              <span>Michael & Maria receive your daily health check-in automatically.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Assistance Direct Call Box */}
      <div className="rounded-3xl border-2 border-dashed border-terracotta-300 bg-terracotta-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-terracotta-900">Need Immediate Help?</h3>
          <p className="text-sm text-terracotta-800 mt-0.5">
            Press the red button or call your son Michael directly.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={() => triggerSOS('Elderly emergency call requested')}
            variant="destructive"
            className="flex-1 sm:flex-initial py-5 px-6 font-extrabold text-base rounded-2xl shadow-md gap-2"
          >
            <PhoneCall className="h-5 w-5" />
            Call Emergency Circle
          </Button>
        </div>
      </div>
    </div>
  )
}
