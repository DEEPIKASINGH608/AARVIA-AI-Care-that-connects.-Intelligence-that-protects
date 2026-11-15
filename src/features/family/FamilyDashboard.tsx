import React from 'react'
import { useCare } from '@/context/CareContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/common/StatCard'
import { 
  Heart, 
  Pill, 
  Activity, 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  UserCheck
} from 'lucide-react'
import { formatTime } from '@/utils/date'

export const FamilyDashboard: React.FC = () => {
  const { 
    medications, 
    doseStatusMap, 
    vitals, 
    appointments, 
    todayTakenCount, 
    todayTotalCount 
  } = useCare()

  const adherenceRate = Math.round((todayTakenCount / Math.max(todayTotalCount, 1)) * 100)
  const latestBp = vitals.find(v => v.type === 'blood_pressure')
  const latestSugar = vitals.find(v => v.type === 'blood_glucose')

  return (
    <div className="space-y-8">
      {/* Top Banner: Family Peace of Mind Status */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-800 to-forest-900 p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-700/80 text-sage-200 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4 text-sage-400" />
              <span>Family Care Coordinator • Eleanor Vance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Peace of Mind Overview
            </h1>
            <p className="text-sage-100 text-sm sm:text-base max-w-xl">
              Eleanor is resting comfortably at home. Morning blood pressure and diabetes medication were recorded by Caregiver Maria.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-forest-950/40 p-4 rounded-2xl border border-forest-700/50 backdrop-blur-xs">
            <div className="text-right">
              <span className="text-xs text-sage-300 font-semibold uppercase tracking-wider block">
                Daily Adherence
              </span>
              <span className="text-3xl font-black text-sage-200">{adherenceRate}%</span>
              <span className="text-xs text-sage-300 block">{todayTakenCount} of {todayTotalCount} taken</span>
            </div>
            <div className="h-12 w-1.5 bg-forest-700 rounded-full overflow-hidden">
              <div 
                className="bg-sage-400 w-full transition-all duration-500" 
                style={{ height: `${adherenceRate}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Medication Adherence"
          value={`${adherenceRate}%`}
          subtitle={`${todayTakenCount} taken, ${todayTotalCount - todayTakenCount} pending today`}
          icon={Pill}
          iconBgColor="bg-sage-100 text-sage-700"
          trend={{ value: 'On Track', isPositive: true }}
        />
        <StatCard
          title="Blood Pressure"
          value={latestBp ? `${latestBp.value}` : '124/82'}
          subtitle={latestBp ? `Normal (${latestBp.unit})` : 'mmHg'}
          icon={Activity}
          iconBgColor="bg-emerald-100 text-emerald-700"
          trend={{ value: 'Optimal', isPositive: true }}
        />
        <StatCard
          title="Fasting Glucose"
          value={latestSugar ? `${latestSugar.value}` : '118'}
          subtitle="mg/dL (Fasting)"
          icon={Heart}
          iconBgColor="bg-blue-100 text-blue-700"
          trend={{ value: 'In Target', isPositive: true }}
        />
        <StatCard
          title="Upcoming Visit"
          value="Nov 20"
          subtitle="Dr. Sarah Jenkins (Geriatric)"
          icon={Calendar}
          iconBgColor="bg-warm-100 text-forest-800"
        />
      </div>

      {/* Two Column Layout: AI Daily Summary & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: AI Clinical Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-3xl border border-sage-200 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sage-600" />
                <CardTitle className="text-lg">CareCircle AI Care Intelligence</CardTitle>
              </div>
              <p className="text-xs text-slate-500">Gemini-generated briefing • Intelligence that protects.</p>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200/80 text-forest-900 leading-relaxed font-medium">
                "Eleanor has maintained 100% adherence on her morning routine. Her fasting blood sugar is within the physician-prescribed range. Lisinopril refill threshold is approaching (6 pills left)."
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recommended Action
                </h4>
                <div className="p-3 rounded-xl bg-warm-50 border border-warm-200/60 text-xs text-forest-900 font-semibold flex items-start gap-2">
                  <Clock className="h-4 w-4 text-warm-600 shrink-0 mt-0.5" />
                  <span>Michael Vance is assigned as companion for next Thursday's 10:30 AM appointment.</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-2">
                <UserCheck className="h-4 w-4 text-sage-600" />
                Contact Caregiver Maria
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Today's Live Care Timeline */}
        <div className="lg:col-span-2">
          <Card className="rounded-3xl border border-sage-200 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Today's Care Timeline</CardTitle>
                  <p className="text-xs text-slate-500">Real-time medication and health events</p>
                </div>
                <Badge variant="default" className="text-xs font-bold">
                  Live Updates
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {medications.map((med) => {
                const isTaken = doseStatusMap[med.id] === 'taken'
                return (
                  <div
                    key={med.id}
                    className="flex items-center justify-between p-4 rounded-2xl border border-sage-100 bg-warm-50/40 hover:bg-white hover:border-sage-200 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${isTaken ? 'bg-emerald-100 text-emerald-700' : 'bg-sage-100 text-forest-700'}`}>
                        {isTaken ? <CheckCircle2 className="h-5 w-5" /> : <Pill className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-forest-900 text-sm sm:text-base">
                          {med.name} <span className="text-xs font-normal text-slate-500">({med.dosage})</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          Scheduled for {formatTime(med.times[0])} • {med.purpose || 'Routine care'}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isTaken ? (
                        <Badge variant="success" className="gap-1 text-xs">
                          <CheckCircle2 className="h-3 w-3" />
                          Confirmed Taken
                        </Badge>
                      ) : (
                        <Badge variant="default" className="text-xs">
                          Scheduled ({formatTime(med.times[0])})
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Doctor appointment notice */}
              {appointments[0] && (
                <div className="flex items-center justify-between p-4 rounded-2xl border border-blue-100 bg-blue-50/50">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm">
                        Upcoming Appointment: {appointments[0].doctorName}
                      </h4>
                      <p className="text-xs text-blue-800">
                        {appointments[0].specialty} • Accompanied by: {appointments[0].assignedCompanionName}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-blue-800 text-xs font-semibold">
                    Transport Confirmed
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
