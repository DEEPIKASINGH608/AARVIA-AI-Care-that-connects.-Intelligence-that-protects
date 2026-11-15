import React, { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  PlusCircle, 
  MapPin, 
  Phone, 
  UserCheck, 
  Car, 
  Clock 
} from 'lucide-react'
import { formatDate, formatTime } from '@/utils/date'

export const AppointmentPage: React.FC = () => {
  const { appointments, addAppointment } = useCare()
  const [showAddModal, setShowAddModal] = useState(false)

  // Form state
  const [doctorName, setDoctorName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [clinicName, setClinicName] = useState('')
  const [address, setAddress] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [reason, setReason] = useState('')
  const [companionName, setCompanionName] = useState('Michael Vance (Son)')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!doctorName || !dateTime) return

    await addAppointment({
      elderId: 'elder-001',
      doctorName,
      specialty,
      clinicName,
      address,
      dateTime,
      status: 'scheduled',
      reasonForVisit: reason,
      companionRequired: true,
      assignedCompanionName: companionName,
      assignedCompanionRole: 'family',
      transportArranged: true,
      transportDetails: 'Family transport',
      reminderSent: false,
    })

    setShowAddModal(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
            Doctor Appointments & Healthcare Visits
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Coordinate clinic visits, family companions, and medical transportation
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          variant="default"
          className="font-bold gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Schedule Visit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((apt) => (
          <Card key={apt.id} className="rounded-3xl border border-sage-200 bg-white shadow-card overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-forest-900 shrink-0">
                    <Calendar className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-forest-900">{apt.doctorName}</h3>
                    <p className="text-xs font-semibold text-sage-800">{apt.specialty}</p>
                  </div>
                </div>

                <Badge variant="default" className="text-xs font-bold capitalize">
                  {apt.status}
                </Badge>
              </div>

              <div className="rounded-2xl bg-sage-50/70 p-3.5 border border-sage-200/70 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-forest-900 text-sm">
                  <Clock className="h-4 w-4 text-sage-600" />
                  <span>{formatDate(apt.dateTime)} at {formatTime(apt.dateTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{apt.clinicName} — {apt.address}</span>
                </div>
                {apt.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{apt.phone}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-700">
                <strong>Reason for Visit:</strong> {apt.reasonForVisit}
              </p>

              {/* Care Circle Coordination Footer */}
              <div className="border-t border-sage-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <UserCheck className="h-3.5 w-3.5 text-sage-600" />
                  <span>Companion: <strong>{apt.assignedCompanionName}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-forest-800 font-semibold">
                  <Car className="h-3.5 w-3.5 text-sage-600" />
                  <span>Transport Confirmed</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-sage-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-sage-200">
              <h3 className="text-xl font-bold text-forest-900">Schedule Doctor Visit</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Doctor Name"
                  placeholder="e.g. Dr. Alan Miller"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
                <Input
                  label="Specialty"
                  placeholder="e.g. Cardiology"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Clinic / Hospital"
                  placeholder="e.g. City Health Clinic"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  required
                />
                <Input
                  label="Date & Time"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Clinic Address"
                placeholder="e.g. 100 Main St, Suite 400"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <Input
                label="Reason for Visit"
                placeholder="e.g. Routine eye exam"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />

              <Input
                label="Assigned Companion"
                placeholder="e.g. Michael Vance (Son)"
                value={companionName}
                onChange={(e) => setCompanionName(e.target.value)}
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
                  Schedule Appointment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
