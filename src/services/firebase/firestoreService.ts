import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '@/config/firebase'
import { Medication, Appointment, VitalRecord, CareCircle, EmergencyAlert, DoseLog } from '@/types'
import { 
  MOCK_MEDICATIONS, 
  MOCK_APPOINTMENTS, 
  MOCK_VITALS, 
  MOCK_CARE_CIRCLE, 
  MOCK_ACTIVE_ALERTS 
} from '../mockData'

export const firestoreService = {
  // Medications
  async getMedications(elderId: string): Promise<Medication[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'medications'), where('elderId', '==', elderId))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medication))
      } catch (err) {
        console.warn('Firestore fetch error, falling back to mock data:', err)
      }
    }
    return MOCK_MEDICATIONS.filter(m => m.elderId === elderId)
  },

  async logDose(doseLog: Omit<DoseLog, 'id'>): Promise<DoseLog> {
    const fullLog: DoseLog = {
      ...doseLog,
      id: `dose-${Date.now()}`,
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'doseLogs'), fullLog)
        return { ...fullLog, id: docRef.id }
      } catch (err) {
        console.warn('Firestore logDose error:', err)
      }
    }
    return fullLog
  },

  // Appointments
  async getAppointments(elderId: string): Promise<Appointment[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'appointments'), where('elderId', '==', elderId))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
      } catch (err) {
        console.warn('Firestore getAppointments error:', err)
      }
    }
    return MOCK_APPOINTMENTS.filter(a => a.elderId === elderId)
  },

  async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> {
    const newApt: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'appointments'), newApt)
        return { ...newApt, id: docRef.id }
      } catch (err) {
        console.warn('Firestore createAppointment error:', err)
      }
    }
    return newApt
  },

  // Health Vitals
  async getVitals(elderId: string): Promise<VitalRecord[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'vitals'), where('elderId', '==', elderId))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VitalRecord))
      } catch (err) {
        console.warn('Firestore getVitals error:', err)
      }
    }
    return MOCK_VITALS.filter(v => v.elderId === elderId)
  },

  async recordVital(vital: Omit<VitalRecord, 'id' | 'recordedAt'>): Promise<VitalRecord> {
    const newVital: VitalRecord = {
      ...vital,
      id: `vit-${Date.now()}`,
      recordedAt: new Date().toISOString(),
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'vitals'), newVital)
        return { ...newVital, id: docRef.id }
      } catch (err) {
        console.warn('Firestore recordVital error:', err)
      }
    }
    return newVital
  },

  // Care Circle
  async getCareCircle(circleId: string): Promise<CareCircle | null> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'careCircles'), where('id', '==', circleId))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as CareCircle
        }
      } catch (err) {
        console.warn('Firestore getCareCircle error:', err)
      }
    }
    return MOCK_CARE_CIRCLE
  },

  // Emergency & Alerts
  async getActiveAlerts(elderId: string): Promise<EmergencyAlert[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(
          collection(db, 'alerts'), 
          where('elderId', '==', elderId),
          where('status', '==', 'active')
        )
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EmergencyAlert))
      } catch (err) {
        console.warn('Firestore getActiveAlerts error:', err)
      }
    }
    return MOCK_ACTIVE_ALERTS.filter(a => a.elderId === elderId)
  },

  async triggerEmergencyAlert(alert: Omit<EmergencyAlert, 'id' | 'triggeredAt' | 'status'>): Promise<EmergencyAlert> {
    const newAlert: EmergencyAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      status: 'active',
      triggeredAt: new Date().toISOString(),
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'alerts'), newAlert)
        return { ...newAlert, id: docRef.id }
      } catch (err) {
        console.warn('Firestore triggerEmergencyAlert error:', err)
      }
    }
    return newAlert
  },

  async resolveAlert(alertId: string, resolvedBy: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        const alertRef = doc(db, 'alerts', alertId)
        await updateDoc(alertRef, {
          status: 'resolved',
          resolvedAt: new Date().toISOString(),
          notes: `Resolved by ${resolvedBy}`,
        })
      } catch (err) {
        console.warn('Firestore resolveAlert error:', err)
      }
    }
  },
}
