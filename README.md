# CareCircle AI
> **Care that connects. Intelligence that protects.**

CareCircle AI is an AI-powered elderly care and medication management ecosystem that connects elderly individuals, family members, and caregivers.

It helps seniors manage medications, doctor appointments, healthcare routines, and medical records while allowing authorized family members and caregivers to collaboratively coordinate care with complete peace of mind.

---

## Key Pillars & Architecture

1. **Elderly Person Experience**:
   - High-contrast, large-format typography (`text-elder-display`)
   - Calming warm off-white canvas with sage-green accents
   - Single-tap confirmation ("Yes, I took my medicine")
   - High-visibility Emergency SOS button with confirmation safeguard
   - Minimum 48px touch targets adhering to WCAG AAA accessibility

2. **Family Peace of Mind Dashboard**:
   - Real-time medication adherence telemetry (percentage progress bar)
   - Chronological live care timeline
   - Doctor visit schedule with assigned companion status
   - Gemini-generated plain language daily wellness briefing

3. **Caregiver Clinical Hub**:
   - Medication administration checklist with shift rosters
   - Rapid vital signs logging modal (Blood Pressure, Blood Glucose, Heart Rate)
   - Clinical notes & shift handover checklist

4. **Google Gemini AI Healthcare Intelligence**:
   - Automated polypharmacy & drug-drug interaction contraindication checker
   - Plain-language doctor note & lab report translator for seniors

5. **Multi-Role Ecosystem**:
   - Instant perspective switcher between Senior (`elderly`), Family (`family`), and Caregiver (`caregiver`)
   - Centralized routing with role-specific direct links (`/elderly`, `/family`, `/caregiver`)

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui design tokens
- **Animations & Icons**: Framer Motion, Lucide React
- **Data Visualization**: Recharts
- **Backend & Cloud**: Firebase Authentication, Cloud Firestore, Firebase Storage
- **AI Engine**: Google Gemini API (`@google/genai`, `@google/generative-ai`)
- **Form Validation**: Zod, React Hook Form

---

## Project Structure

```
src/
├── assets/          # Static logos and graphic assets
├── components/      # Reusable UI component library
│   ├── common/      # EmptyState, ErrorState, LoadingSpinner, SuccessState, StatCard, RoleBadge
│   ├── layout/      # AppLayout, Navbar, RoleSwitcher
│   └── ui/          # Core primitives: button, badge, card, input
├── config/          # Central configuration
│   ├── firebase.ts  # Firebase credentials & initialization with demo fallback
│   ├── gemini.ts    # Gemini model & API key configuration
│   ├── routes.ts    # Centralized route constants & role mappings
│   └── theme.ts     # Design tokens, palette constants, accessibility metrics
├── context/         # React Context providers
│   ├── AuthContext.tsx # User session, authentication & active role state
│   └── CareContext.tsx # Medications, vitals, appointments, alerts state
├── features/        # Feature modules & pages
│   ├── ai/          # Gemini AI insights & medical note simplifier
│   ├── appointments/# Doctor appointments & transport coordination
│   ├── auth/        # Login & demo evaluator portal
│   ├── caregiver/   # Clinical caregiver dashboard & vital logging
│   ├── circle/      # Care circle member list, permissions & emergency chain
│   ├── elderly/     # Accessible senior companion dashboard
│   ├── family/      # Family peace of mind telemetry dashboard
│   ├── medications/ # Prescriptions, pill inventory & refill alerts
│   ├── overview/    # Role-adaptive central overview router
│   └── vitals/      # Biometric charts (Recharts) & reading logs
├── hooks/           # Custom React hooks (useMedications, useAppointments, useVitals, etc.)
├── routes/          # Central router setup (AppRoutes.tsx)
├── services/        # Service layer
│   ├── ai/          # Gemini client service (interactions, report simplification)
│   ├── firebase/    # Auth, Firestore, Storage service layers
│   └── mockData.ts  # Realistic clinical demo datasets
├── styles/          # Tailwind globals, color tokens & typography utilities
├── types/           # Strongly-typed data models (medication, appointment, user, etc.)
└── utils/           # Utilities (cn, date, formatters, validation schemas)
```

---

## Quick Start & Verification

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify TypeScript Compilation & Production Build
```bash
npm run build
```

### 3. Run Static Code Linting
```bash
npm run lint
```

### 4. Start Local Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) or the port displayed in your terminal.
