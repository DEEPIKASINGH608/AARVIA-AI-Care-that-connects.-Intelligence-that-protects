import React, { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Activity, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts'

export const VitalsPage: React.FC = () => {
  const { vitals, addVitalReading } = useCare()
  const [showAddModal, setShowAddModal] = useState(false)
  const [metricType, setMetricType] = useState<'blood_pressure' | 'blood_glucose' | 'heart_rate'>('blood_pressure')
  const [value, setValue] = useState('')
  const [notes, setNotes] = useState('')

  // Trend data for Recharts
  const chartData = [
    { date: 'Nov 10', bpSystolic: 128, bpDiastolic: 84, glucose: 122, heartRate: 74 },
    { date: 'Nov 11', bpSystolic: 126, bpDiastolic: 82, glucose: 119, heartRate: 71 },
    { date: 'Nov 12', bpSystolic: 122, bpDiastolic: 80, glucose: 115, heartRate: 73 },
    { date: 'Nov 13', bpSystolic: 125, bpDiastolic: 81, glucose: 117, heartRate: 70 },
    { date: 'Nov 14', bpSystolic: 123, bpDiastolic: 80, glucose: 114, heartRate: 72 },
    { date: 'Nov 15', bpSystolic: 124, bpDiastolic: 82, glucose: 118, heartRate: 72 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value) return

    const units = {
      blood_pressure: 'mmHg',
      blood_glucose: 'mg/dL',
      heart_rate: 'bpm',
    }

    await addVitalReading({
      elderId: 'elder-001',
      type: metricType,
      value,
      unit: units[metricType],
      status: 'normal',
      recordedByRole: 'caregiver',
      recordedByName: 'Maria Santos, CNA',
      notes,
    })

    setValue('')
    setNotes('')
    setShowAddModal(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            Health Vitals & Biometric Trends
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Continuous vital sign monitoring, trend analysis, and physiological history
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          variant="default"
          className="font-bold gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Log Vital Reading
        </Button>
      </div>

      {/* Chart: Blood Pressure & Glucose Trend */}
      <Card className="rounded-3xl border border-sage-200 bg-white shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sage-600" />
              <CardTitle className="text-xl">Biometric Trends (Past 7 Days)</CardTitle>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Solid stability across Systolic (green) and Diastolic (forest) readings
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-sage-500" />
              Systolic BP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-forest-700" />
              Diastolic BP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              Glucose (mg/dL)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2EBE3" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} domain={[60, 150]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #C9DBCB',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="bpSystolic" stroke="#5E8C61" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="bpDiastolic" stroke="#1E3A27" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="glucose" stroke="#D97706" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* History table / list */}
      <Card className="rounded-3xl border border-sage-200 bg-white shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Vital Readings History</CardTitle>
          <p className="text-xs text-slate-500">Chronological biometric logs recorded by patient & care team</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vitals.map((v) => (
              <div
                key={v.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-sage-100 bg-warm-50/50 gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-forest-800">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest-900 capitalize text-sm sm:text-base">
                      {v.type.replace('_', ' ')}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Logged by {v.recordedByName} ({v.recordedByRole}) • {v.notes || 'Normal reading'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-forest-900">
                    {v.value} <span className="text-xs font-semibold text-slate-500">{v.unit}</span>
                  </span>
                  <Badge variant="success" className="gap-1 text-xs">
                    <CheckCircle2 className="h-3 w-3" />
                    Normal
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" role="dialog" aria-modal="true" aria-labelledby="vital-modal-title">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-sage-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-sage-200">
              <h3 id="vital-modal-title" className="text-lg font-bold text-forest-900">Record New Vital</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Metric
                </label>
                <select
                  value={metricType}
                  onChange={(e) => setMetricType(e.target.value as any)}
                  className="w-full rounded-xl border border-sage-200 p-2.5 text-sm bg-white text-forest-900 font-medium"
                >
                  <option value="blood_pressure">Blood Pressure (mmHg)</option>
                  <option value="blood_glucose">Blood Glucose (mg/dL)</option>
                  <option value="heart_rate">Heart Rate (bpm)</option>
                </select>
              </div>

              <Input
                label="Value"
                placeholder={metricType === 'blood_pressure' ? '120/80' : '110'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />

              <Input
                label="Notes"
                placeholder="e.g. Before breakfast, felt energetic"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
