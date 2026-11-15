import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (min 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['elderly', 'family', 'caregiver'], {
    error: 'Please select your role',
  }),
  phoneNumber: z.string().min(10, 'Please provide a valid phone number').optional().or(z.literal('')),
  circleInviteCode: z.string().optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>

export const medicationSchema = z.object({
  name: z.string().min(2, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required (e.g., 500mg)'),
  form: z.enum(['tablet', 'capsule', 'liquid', 'injection', 'inhaler', 'drops']),
  frequency: z.enum(['daily', 'twice-daily', 'thrice-daily', 'weekly', 'as-needed']),
  instructions: z.string().min(3, 'Clear instructions are required'),
  withFood: z.boolean().default(false),
  prescribedBy: z.string().min(2, 'Prescribing doctor is required'),
  remainingPills: z.coerce.number().min(0, 'Remaining count must be 0 or more'),
  refillThreshold: z.coerce.number().min(1, 'Refill threshold must be at least 1').default(5),
  criticality: z.enum(['routine', 'vital', 'strict-time']).default('routine'),
})

export type MedicationFormData = z.infer<typeof medicationSchema>

export const vitalLogSchema = z.object({
  type: z.enum([
    'blood_pressure',
    'blood_glucose',
    'heart_rate',
    'oxygen_saturation',
    'body_temperature',
    'weight',
  ]),
  value: z.string().min(1, 'Measurement value is required'),
  unit: z.string().min(1, 'Unit is required'),
  notes: z.string().optional(),
})

export type VitalLogFormData = z.infer<typeof vitalLogSchema>

export const appointmentSchema = z.object({
  doctorName: z.string().min(2, 'Doctor name is required'),
  specialty: z.string().min(2, 'Medical specialty is required'),
  clinicName: z.string().min(2, 'Clinic or hospital name is required'),
  address: z.string().min(5, 'Address is required'),
  dateTime: z.string().min(5, 'Date and time are required'),
  reasonForVisit: z.string().min(3, 'Reason for visit is required'),
  companionRequired: z.boolean().default(true),
  transportArranged: z.boolean().default(false),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>
