import React, { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Stethoscope,
  CheckCircle2,
  Pill,
  PlusCircle,
  Clock,
  HeartPulse
} from 'lucide-react'
import { formatTime } from '@/utils/date'

export const CaregiverDashboard: React.FC = () => {
  const { medications, doseStatusMap, markDose, vitals, addVitalReading } = useCare()
  const [showVitalModal, setShowVitalModal] = useState(false)
  const [vitalType, setVitalType] = useState<'blood_pressure' | 'blood_glucose' | 'heart_rate'>('blood_pressure')
  const [vitalValue, setVitalValue] = useState('')
  const [vitalNotes, setVitalNotes] = useState('')

  const handleSaveVital = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vitalValue.trim()) return

    const unitMap = {
      blood_pressure: 'mmHg',
      blood_glucose: 'mg/dL',
      heart_rate: 'bpm',
    }

    await addVitalReading({
      elderId: 'elder-001',
      type: vitalType,
      value: vitalValue,
      unit: unitMap[vitalType],
      status: 'normal',
      recordedByRole: 'caregiver',
      recordedByName: 'Maria Santos, CNA',
      notes: vitalNotes,
    })

    setVitalValue('')
    setVitalNotes('')
    setShowVitalModal(false)
  }

  return (
    <div className="space-y-8">
      {/* Caregiver Duty Header */}
      <div className="rounded-3xl bg-forest-900 p-6 sm:p-8 text-white shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 text-sage-300 text-xs font-semibold">
              <Stethoscope className="h-4 w-4" />
              <span>CareCircle Clinical Care • Shift: 08:00 - 16:00 (Maria Santos, CNA)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Clinical Shift Portal & Patient Roster
            </h1>
            <p className="text-sage-200 text-sm max-w-xl">
              Assigned Patient: <strong>Eleanor Vance</strong> (Room 2A / Residence).
              Strict allergy precautions: <span className="text-red-300 font-bold">Penicillin, Sulfa drugs</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowVitalModal(true)}
              variant="default"
              className="bg-sage-600 hover:bg-sage-500 text-white font-bold gap-2 rounded-xl"
            >
              <PlusCircle className="h-4 w-4" />
              Log Vital Signs
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Shift Checklist & Medication Admin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Medication Administration & Verification */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-3xl border border-sage-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl">Medication Administration Schedule</CardTitle>
                <p className="text-xs text-slate-500">Verify and log doses given during this shift</p>
              </div>
              <Badge variant="default" className="text-xs">
                Today's Roster
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              {medications.map((med) => {
                const status = doseStatusMap[med.id] || 'scheduled'
                const isTaken = status === 'taken'

                return (
                  <div
                    key={med.id}
                    className="p-4 rounded-2xl border border-sage-100 bg-warm-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${isTaken ? 'bg-emerald-100 text-emerald-700' : 'bg-sage-100 text-forest-800'}`}>
                        <Pill className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-forest-900 text-base">{med.name}</h4>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sage-200/60 text-forest-900">
                            {med.dosage}
                          </span>
                          {med.criticality === 'vital' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                              Vital
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Instructions: {med.instructions}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-sage-600" />
                            {formatTime(med.times[0])}
                          </span>
                          <span>•</span>
                          <span>Remaining: <strong>{med.remainingPills} pills</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isTaken ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>Administered</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => markDose(med.id, 'taken')}
                          variant="default"
                          size="sm"
                          className="text-xs font-bold gap-1.5 rounded-xl"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Mark Given
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border border-sage-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Shift Routine Checklist</CardTitle>
              <p className="text-xs text-slate-500">Clinical protocol checklist</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { task: 'Morning blood pressure & heart rate', done: true },
                { task: 'Post-breakfast Metformin administration', done: true },
                { task: 'Hydration assessment (min 3 glasses by noon)', done: false },
                { task: 'Gentle mobility walk (15 mins)', done: false },
                { task: 'Log shift notes for family handover', done: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${item.done ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold' : 'bg-white border-sage-200 text-slate-700'}`}
                >
                  <span className="text-xs">{item.task}</span>
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Vitals Logged */}
          <Card className="rounded-3xl border border-sage-200 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Vitals</CardTitle>
                <HeartPulse className="h-4 w-4 text-sage-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {vitals.slice(0, 3).map((v) => (
                <div key={v.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-warm-50/70 border border-warm-200/50">
                  <span className="font-semibold capitalize text-forest-900">
                    {v.type.replace('_', ' ')}
                  </span>
                  <span className="font-extrabold text-forest-800">
                    {v.value} {v.unit}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal for Logging Vitals */}
      {showVitalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" role="dialog" aria-modal="true" aria-labelledby="vital-modal-title">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-sage-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-sage-200">
              <h3 id="vital-modal-title" className="text-lg font-bold text-forest-900">Record Vital Signs</h3>
              <button
                onClick={() => setShowVitalModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVital} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Metric Type
                </label>
                <select
                  value={vitalType}
                  onChange={(e) => setVitalType(e.target.value as any)}
                  className="w-full rounded-xl border border-sage-200 p-2.5 text-sm bg-white text-forest-900 font-medium"
                >
                  <option value="blood_pressure">Blood Pressure (mmHg)</option>
                  <option value="blood_glucose">Blood Glucose (mg/dL)</option>
                  <option value="heart_rate">Heart Rate (bpm)</option>
                </select>
              </div>

              <Input
                label="Reading Value"
                placeholder={vitalType === 'blood_pressure' ? 'e.g. 120/80' : 'e.g. 110'}
                value={vitalValue}
                onChange={(e) => setVitalValue(e.target.value)}
                required
              />

              <Input
                label="Clinical Notes / Context"
                placeholder="e.g. Taken 30 mins after breakfast, patient calm"
                value={vitalNotes}
                onChange={(e) => setVitalNotes(e.target.value)}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowVitalModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="font-bold">
                  Save Vital Reading
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
