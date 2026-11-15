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
      <div className="rounded-3xl bg-gradient-to-r from-sage-100 via-warm-100 to-sage-50 dark:from-forest-800/90 dark:via-card dark:to-forest-900/90 p-6 sm:p-8 border border-sage-200/80 dark:border-border shadow-soft transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-200/70 dark:bg-primary/20 text-forest-800 dark:text-primary text-sm font-bold mb-2">
              <Heart className="h-4 w-4 fill-sage-600 text-sage-600 dark:fill-primary dark:text-primary" />
              <span>AARVIA AI Senior Companion • Care that connects. Intelligence that protects.</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 dark:text-foreground tracking-tight">
              {getGreeting()}, Eleanor!
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              You are doing wonderfully today. All your loved ones are connected.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-sage-200 dark:border-border text-center sm:text-right shrink-0">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Today's Medicine</span>
            <span className="text-3xl font-extrabold text-sage-700 dark:text-primary">
              {todayTakenCount} of {todayTotalCount}
            </span>
            <span className="text-xs font-semibold text-muted-foreground block">Doses Taken</span>
          </div>
        </div>
      </div>

      {/* Main Focal Card: NEXT UP MEDICINE */}
      <Card className="border-2 border-sage-300 dark:border-primary/40 bg-card shadow-card overflow-hidden rounded-3xl">
        <div className="bg-sage-600 dark:bg-forest-700 px-6 py-3 text-white flex items-center justify-between">
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
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-100 dark:bg-primary/20 text-forest-800 dark:text-primary shrink-0">
                    <Pill className="h-9 w-9 stroke-[2]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-foreground">
                      {nextMedication.name}
                    </h2>
                    <p className="text-lg font-bold text-sage-700 dark:text-primary mt-0.5">
                      {nextMedication.dosage} • {nextMedication.pillColor} {nextMedication.form}
                    </p>
                    <p className="text-base text-muted-foreground mt-1">
                      {nextMedication.instructions}
                    </p>
                  </div>
                </div>

                {nextMedication.withFood && (
                  <Badge
                    variant="outline"
                    className="border-amber-300 dark:border-[#D99A38]/40 bg-amber-50 dark:bg-[#D99A38]/15 text-amber-900 dark:text-[#F2C374] text-sm font-bold py-1.5 px-3 self-start sm:self-auto"
                  >
                    Take with food or water
                  </Badge>
                )}
              </div>

              <div className="pt-2">
                {nextIsTaken ? (
                  <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-primary/15 border border-emerald-200 dark:border-primary/30 text-emerald-800 dark:text-primary font-bold text-xl">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-primary" />
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
              <p className="text-xl font-bold text-forest-900 dark:text-foreground">All medications taken for now!</p>
              <p className="text-muted-foreground mt-1">Take some rest and have a glass of water.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Doctor Visit */}
        <Card className="rounded-3xl border border-sage-200 dark:border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 dark:bg-muted text-forest-800 dark:text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900 dark:text-foreground">Next Doctor Visit</h3>
                <p className="text-xs text-muted-foreground">We will remind you and family</p>
              </div>
            </div>

            {nextAppointment ? (
              <div className="rounded-2xl bg-warm-50 dark:bg-muted/60 p-4 border border-warm-200/80 dark:border-border space-y-2">
                <p className="text-lg font-bold text-forest-900 dark:text-foreground">{nextAppointment.doctorName}</p>
                <p className="text-sm font-semibold text-sage-800 dark:text-primary">{nextAppointment.specialty}</p>
                <p className="text-sm text-muted-foreground">{nextAppointment.clinicName}</p>
                <div className="pt-2 text-xs font-bold text-forest-800 dark:text-foreground/90 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-sage-600 dark:text-primary" />
                  <span>Thursday, Nov 20 at 10:30 AM</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No appointments scheduled this week.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Feeling / Daily Mood */}
        <Card className="rounded-3xl border border-sage-200 dark:border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 dark:bg-primary/20 text-forest-800 dark:text-primary">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900 dark:text-foreground">How Are You Feeling?</h3>
                <p className="text-xs text-muted-foreground">Tap to let your family know</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  emoji: '😊',
                  label: 'Feeling Great',
                  color: 'hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-primary/15 dark:hover:border-primary/40',
                },
                {
                  emoji: '🙂',
                  label: 'Doing Good',
                  color: 'hover:bg-sage-50 hover:border-sage-300 dark:hover:bg-accent dark:hover:border-primary/30',
                },
                {
                  emoji: '😴',
                  label: 'A Bit Tired',
                  color: 'hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-[#D99A38]/15 dark:hover:border-[#D99A38]/40',
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border border-sage-200 dark:border-border bg-background/60 transition-all text-center ${item.color} focus:ring-2 focus:ring-ring`}
                >
                  <span className="text-3xl mb-1">{item.emoji}</span>
                  <span className="text-xs font-bold text-forest-900 dark:text-foreground">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-sage-50 dark:bg-muted/70 p-3 flex items-center gap-2 text-xs text-forest-800 dark:text-foreground/90 font-medium border border-transparent dark:border-border/60">
              <Sparkles className="h-4 w-4 text-sage-600 dark:text-primary shrink-0" />
              <span>Michael & Maria receive your daily health check-in automatically.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Assistance Direct Call Box */}
      <div className="rounded-3xl border-2 border-dashed border-terracotta-300 dark:border-[#C65D59]/40 bg-terracotta-50/60 dark:bg-[#C65D59]/15 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-terracotta-900 dark:text-[#F29B98]">Need Immediate Help?</h3>
          <p className="text-sm text-terracotta-800 dark:text-foreground/85 mt-0.5">
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