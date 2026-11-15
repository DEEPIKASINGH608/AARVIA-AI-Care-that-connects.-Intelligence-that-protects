import React, { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Pill, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  ShieldAlert
} from 'lucide-react'
import { formatTime } from '@/utils/date'
import { geminiService } from '@/services/ai/geminiService'
import { MedicationInteractionResult } from '@/types'

export const MedicationPage: React.FC = () => {
  const { medications, doseStatusMap, markDose } = useCare()
  const [showAddModal, setShowAddModal] = useState(false)
  const [analyzingInteractions, setAnalyzingInteractions] = useState(false)
  const [interactionResult, setInteractionResult] = useState<MedicationInteractionResult | null>(null)

  // New medication form state
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [time, setTime] = useState('08:00')
  const [instructions, setInstructions] = useState('')
  const [remainingPills, setRemainingPills] = useState(30)

  const handleCheckInteractions = async () => {
    setAnalyzingInteractions(true)
    try {
      const names = medications.map(m => `${m.name} ${m.dosage}`)
      const res = await geminiService.checkMedicationInteractions(names)
      setInteractionResult(res)
    } finally {
      setAnalyzingInteractions(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            Medication Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Active prescriptions, scheduled daily dosages, and pill refill safeguards
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleCheckInteractions}
            variant="outline"
            isLoading={analyzingInteractions}
            className="border-sage-300 text-forest-900 font-bold gap-2 bg-white"
          >
            <Sparkles className="h-4 w-4 text-sage-600" />
            AI Interaction Scan
          </Button>

          <Button
            onClick={() => setShowAddModal(true)}
            variant="default"
            className="font-bold gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Prescription
          </Button>
        </div>
      </div>

      {/* AI Drug Interaction Banner if triggered */}
      {interactionResult && (
        <Card className="rounded-3xl border-2 border-sage-300 bg-sage-50/70 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-forest-900 text-lg">
                  CareCircle AI Clinical Medication Analysis
                </h3>
                <p className="text-xs text-forest-800">
                  Interaction severity: <strong className="capitalize">{interactionResult.severity}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => setInteractionResult(null)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              Close
            </button>
          </div>

          <p className="text-sm text-forest-950 font-medium leading-relaxed">
            {interactionResult.summary}
          </p>

          <div className="rounded-2xl bg-white p-4 border border-sage-200">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-800 block mb-1">
              For Senior Eleanor Vance:
            </span>
            <p className="text-sm text-slate-700 italic">
              "{interactionResult.elderlyFriendlyNotice}"
            </p>
          </div>
        </Card>
      )}

      {/* Low Refill Alert Banner */}
      {medications.some(m => m.remainingPills <= m.refillThreshold) && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="flex-1">
            <strong>Refill Notice: </strong>
            Lisinopril 10mg has only 6 tablets left. Refill threshold is 7. Order placed with St. Jude Pharmacy.
          </div>
        </div>
      )}

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {medications.map((med) => {
          const status = doseStatusMap[med.id] || 'scheduled'
          const isTaken = status === 'taken'
          const isLow = med.remainingPills <= med.refillThreshold

          return (
            <Card key={med.id} className="rounded-3xl border border-sage-200 bg-white shadow-card overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-forest-800 shrink-0">
                      <Pill className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-forest-900">{med.name}</h3>
                      <p className="text-xs font-semibold text-sage-700">
                        {med.dosage} • {med.form}
                      </p>
                    </div>
                  </div>

                  {isLow ? (
                    <Badge variant="destructive" className="gap-1 text-xs">
                      <ShieldAlert className="h-3 w-3" />
                      Refill Soon ({med.remainingPills} left)
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-xs">
                      {med.remainingPills} pills left
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Instructions:</strong> {med.instructions}
                </p>

                <div className="rounded-2xl bg-warm-50/70 p-3 border border-warm-200/50 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-semibold text-forest-900">
                    <Clock className="h-4 w-4 text-sage-600" />
                    Scheduled: {med.times.map(t => formatTime(t)).join(', ')}
                  </span>
                  <span>Prescribed by: {med.prescribedBy}</span>
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Today's status: <strong className="capitalize text-forest-900">{status}</strong>
                  </span>

                  {isTaken ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Confirmed Taken
                    </div>
                  ) : (
                    <Button
                      onClick={() => markDose(med.id, 'taken')}
                      variant="default"
                      size="sm"
                      className="font-bold gap-1.5"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Dose Taken
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-sage-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-sage-200">
              <h3 className="text-xl font-bold text-forest-900">Add New Prescription</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert(`Medication "${name}" added to Eleanor's active prescriptions.`)
                setShowAddModal(false)
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Medication Name"
                  placeholder="e.g. Amlodipine"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Dosage"
                  placeholder="e.g. 5 mg"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full rounded-xl border border-sage-200 p-2.5 text-sm bg-white text-forest-900 font-medium"
                  >
                    <option value="daily">Daily</option>
                    <option value="twice-daily">Twice Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="as-needed">As Needed</option>
                  </select>
                </div>
                <Input
                  label="Time of Day"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Instructions"
                placeholder="e.g. Take with morning tea"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />

              <Input
                label="Total Pills in Container"
                type="number"
                value={remainingPills}
                onChange={(e) => setRemainingPills(Number(e.target.value))}
                required
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="font-bold">
                  Save Medication
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
