import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Pill, 
  ShieldCheck, 
  Users, 
  Clock, 
  Activity, 
  PhoneCall, 
  CheckCircle2, 
  Eye, 
  Volume2, 
  FileText,
  Calendar,
  Lock,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F3] text-[#25352D] flex flex-col">
      {/* Top Public Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#C4DDD0]/80 bg-[#F7F8F3]/90 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#477B62] to-[#254E3B] text-white shadow-soft transition-transform group-hover:scale-105">
              <Heart className="h-6 w-6 fill-white/20 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-[#254E3B]">
                  AARVIA
                </span>
                <span className="rounded-md bg-[#E1EDE6] px-1.5 py-0.5 text-[10px] font-extrabold text-[#254E3B] uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#5F7368] hidden sm:block">
                Care that connects. Intelligence that protects.
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#5F7368]">
            <a href="#features" className="hover:text-[#254E3B] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#254E3B] transition-colors">How It Works</a>
            <a href="#collaboration" className="hover:text-[#254E3B] transition-colors">Family Circle</a>
            <a href="#ai-intelligence" className="hover:text-[#254E3B] transition-colors">AI Diagnostics</a>
            <a href="#accessibility" className="hover:text-[#254E3B] transition-colors">Accessibility</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm" className="font-bold border-[#C4DDD0] text-[#254E3B] bg-white">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="default" size="sm" className="font-bold gap-2 bg-[#477B62] hover:bg-[#3A6550] shadow-soft">
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-24 border-b border-[#C4DDD0]/60">
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1EDE6] border border-[#C4DDD0] text-[#254E3B] text-xs font-extrabold shadow-xs">
                <Sparkles className="h-4 w-4 text-[#477B62]" />
                <span>Next-Generation AI Elderly Care & Medication Ecosystem</span>
              </div>

              {/* Strong Headline */}
              <h1 className="text-4xl sm:text-6xl font-black text-[#254E3B] tracking-tight max-w-4xl leading-[1.15]">
                Intelligent Care That Connects Families & Protects Seniors
              </h1>

              {/* Short Product Explanation */}
              <p className="text-lg sm:text-xl text-[#5F7368] max-w-2xl leading-relaxed font-medium">
                A complete collaborative healthcare platform that helps seniors take the right pills on time, schedules physician visits, and provides families and caregivers real-time peace of mind.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link to="/signup">
                  <Button size="lg" className="font-extrabold text-base px-8 py-6 rounded-2xl bg-[#477B62] hover:bg-[#3A6550] shadow-hover gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="font-bold text-base px-8 py-6 rounded-2xl border-[#C4DDD0] text-[#254E3B] bg-white hover:bg-[#F2F7F4] shadow-soft gap-2">
                    <Heart className="h-5 w-5 text-[#477B62]" />
                    Explore Live Platform Demo
                  </Button>
                </Link>
              </div>

              {/* Proof Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-10 text-center max-w-3xl w-full">
                <div className="p-4 rounded-2xl bg-white border border-[#C4DDD0] shadow-xs">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#254E3B] block">99.2%</span>
                  <span className="text-xs font-semibold text-[#5F7368]">Medication Adherence</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#C4DDD0] shadow-xs">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#254E3B] block">&lt; 3 Sec</span>
                  <span className="text-xs font-semibold text-[#5F7368]">SOS Family Ring</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#C4DDD0] shadow-xs">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#254E3B] block">100%</span>
                  <span className="text-xs font-semibold text-[#5F7368]">Plain Language Reports</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#C4DDD0] shadow-xs">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#254E3B] block">WCAG AAA</span>
                  <span className="text-xs font-semibold text-[#5F7368]">Senior Accessibility</span>
                </div>
              </div>

              {/* Product Preview Mockup */}
              <div className="w-full mt-10 rounded-3xl bg-white border-2 border-[#C4DDD0] shadow-2xl p-4 sm:p-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-[#E1EDE6]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#C65D59]" />
                    <span className="h-3 w-3 rounded-full bg-[#D99A38]" />
                    <span className="h-3 w-3 rounded-full bg-[#477B62]" />
                    <span className="ml-2 text-xs font-bold text-[#5F7368]">
                      AARVIA AI Senior & Family Live Synchronized Portal
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#477B62] bg-[#E1EDE6] px-3 py-1 rounded-full">
                    Live Demo Mode Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  {/* Senior card preview */}
                  <div className="p-4 rounded-2xl bg-[#F7F8F3] border border-[#C4DDD0] space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#477B62]">
                      Senior Perspective
                    </span>
                    <h3 className="font-black text-lg text-[#254E3B]">Next Pill: Metformin 500mg</h3>
                    <p className="text-xs text-[#5F7368]">Scheduled 08:00 AM • Take with breakfast</p>
                    <div className="p-2.5 rounded-xl bg-[#E1EDE6] text-[#254E3B] font-extrabold text-xs flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#477B62]" />
                      Single-Tap Confirmation Ready
                    </div>
                  </div>

                  {/* Family telemetry preview */}
                  <div className="p-4 rounded-2xl bg-[#F7F8F3] border border-[#C4DDD0] space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#254E3B]">
                      Family Telemetry
                    </span>
                    <h3 className="font-black text-lg text-[#254E3B]">100% Morning Adherence</h3>
                    <p className="text-xs text-[#5F7368]">Blood pressure stable at 124/82 mmHg</p>
                    <div className="h-2 rounded-full bg-[#C4DDD0] overflow-hidden">
                      <div className="h-full bg-[#477B62] w-full" />
                    </div>
                  </div>

                  {/* AI briefing preview */}
                  <div className="p-4 rounded-2xl bg-[#254E3B] text-white space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#9EBFB0] flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#9EBFB0]" />
                      Care Intelligence
                    </span>
                    <h3 className="font-black text-lg text-white">Gemini Care Briefing</h3>
                    <p className="text-xs text-[#E1EDE6] leading-relaxed">
                      "Eleanor had optimal morning vitals. Refill reminder triggered for Lisinopril."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 bg-white border-b border-[#C4DDD0]/60">
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#477B62]">
                Comprehensive Protection
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#254E3B] tracking-tight">
                Everything an Aging Loved One Needs. Everything a Family Hopes For.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Pill,
                  title: 'Intelligent Medication Routines',
                  desc: 'Color-coded pill visualizations, dosage schedules, missed-dose safeguards, and pharmacy refill alerts.',
                },
                {
                  icon: Users,
                  title: 'Multi-Role Care Circle',
                  desc: 'Synchronize sons, daughters, and visiting caregivers into a unified live feed with assigned companions.',
                },
                {
                  icon: Sparkles,
                  title: 'Gemini Health Assistant',
                  desc: 'Polypharmacy drug-drug contraindication analysis and automated plain-language translation of medical notes.',
                },
                {
                  icon: PhoneCall,
                  title: 'One-Touch Emergency SOS',
                  desc: 'Immediate emergency alert chain with location, active medications, and continuous family escalation.',
                },
                {
                  icon: Calendar,
                  title: 'Doctor Visit Coordination',
                  desc: 'Track clinical appointments, assign transportation companions, and save questions for the physician.',
                },
                {
                  icon: Activity,
                  title: 'Biometric Trend Analysis',
                  desc: 'Blood pressure and glucose tracking with Recharts interactive graphs and automated physician reports.',
                },
              ].map((feat, idx) => {
                const Icon = feat.icon
                return (
                  <Card key={idx} className="rounded-3xl border border-[#C4DDD0] shadow-soft hover:shadow-hover transition-all">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E1EDE6] text-[#254E3B]">
                        <Icon className="h-6 w-6 stroke-[2]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#254E3B]">{feat.title}</h3>
                      <p className="text-sm text-[#5F7368] leading-relaxed">{feat.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-[#F7F8F3] border-b border-[#C4DDD0]/60">
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#477B62]">
                Seamless Onboarding
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#254E3B] tracking-tight">
                How AARVIA AI Coordinates Everyday Care in 3 Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create Your Care Circle',
                  desc: 'Invite family members and assigned caregivers using a private 6-character code (e.g. AARVIA-742).',
                },
                {
                  step: '02',
                  title: 'Load Prescriptions & Routines',
                  desc: 'Input active medications or scan doctor prescriptions. The AI organizes morning, midday, and evening schedules.',
                },
                {
                  step: '03',
                  title: 'Live Telemetry & AI Guardian',
                  desc: 'Seniors confirm doses with one large tap. Family members receive live telemetry, and AI checks for risks.',
                },
              ].map((step, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white border border-[#C4DDD0] shadow-soft space-y-4 relative">
                  <span className="text-4xl font-black text-[#477B62]/30 block">{step.step}</span>
                  <h3 className="text-xl font-extrabold text-[#254E3B]">{step.title}</h3>
                  <p className="text-sm text-[#5F7368] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Collaboration Section */}
        <section id="collaboration" className="py-20 bg-white border-b border-[#C4DDD0]/60">
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#477B62]">
                  Peace of Mind for Families
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#254E3B] tracking-tight leading-snug">
                  Never Worry If Mom Took Her Morning Blood Pressure Pill
                </h2>
                <p className="text-base text-[#5F7368] leading-relaxed">
                  Caregiving from afar is stressful. AARVIA AI provides family members with an active telemetry feed. If a critical pill is missed or a refill is running low, the platform proactively notifies the primary guardian before problems occur.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Instant push and SMS confirmation when medicine is taken',
                    'Shared calendar for rides to doctor appointments',
                    'Direct shift handover notes between family and clinical caregivers',
                    'Privacy-first encrypted data with configurable viewing permissions',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-[#25352D]">
                      <CheckCircle2 className="h-5 w-5 text-[#477B62] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Card */}
              <div className="rounded-3xl bg-[#F7F8F3] p-8 border border-[#C4DDD0] shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5F7368]">Family Feed • Today</span>
                  <span className="text-xs font-extrabold text-[#477B62] bg-[#E1EDE6] px-2.5 py-1 rounded-full">
                    All Safe
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#C4DDD0] flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#254E3B]">Metformin 500mg Confirmed</p>
                      <span className="text-[#5F7368]">Confirmed by Eleanor Vance at 8:30 AM</span>
                    </div>
                    <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-1 rounded-lg">
                      Taken
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-[#C4DDD0] flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#254E3B]">Blood Pressure Checked: 124/82</p>
                      <span className="text-[#5F7368]">Recorded by Maria Santos, CNA</span>
                    </div>
                    <span className="text-blue-700 font-extrabold bg-blue-50 px-2 py-1 rounded-lg">
                      Optimal
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-[#C4DDD0] flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#254E3B]">Dr. Jenkins Visit Scheduled</p>
                      <span className="text-[#5F7368]">Thursday Nov 20 • Michael Vance driving</span>
                    </div>
                    <span className="text-purple-700 font-extrabold bg-purple-50 px-2 py-1 rounded-lg">
                      Arranged
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section id="ai-intelligence" className="py-20 bg-[#254E3B] text-white">
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#9EBFB0]">
                Google Gemini Medical Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                AI That Explains, Protects, and Cross-Checks
              </h2>
              <p className="text-sm text-[#E1EDE6]">
                Powered by Google Gemini AI to catch drug interactions and translate clinical jargon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-[#1C3A2C] border border-[#5F8F77]/30 space-y-4">
                <div className="flex items-center gap-2 text-[#9EBFB0]">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="text-xl font-bold text-white">Polypharmacy Interaction Scanner</h3>
                </div>
                <p className="text-sm text-[#E1EDE6] leading-relaxed">
                  Elderly patients frequently take 4 to 8 medications simultaneously. Our AI cross-analyzes every active prescription against known contraindications and dietary conflicts.
                </p>
                <div className="p-4 rounded-2xl bg-[#14291F] border border-[#5F8F77]/20 text-xs space-y-2">
                  <span className="text-[#9EBFB0] font-bold block">Demonstration Result:</span>
                  <p className="text-slate-300">
                    "Atorvastatin + Grapefruit caution detected. Metformin + Lisinopril combination is safe with physician monitoring."
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#1C3A2C] border border-[#5F8F77]/30 space-y-4">
                <div className="flex items-center gap-2 text-[#9EBFB0]">
                  <FileText className="h-6 w-6" />
                  <h3 className="text-xl font-bold text-white">Doctor Note Plain English Translator</h3>
                </div>
                <p className="text-sm text-[#E1EDE6] leading-relaxed">
                  Medical reports are filled with abbreviations like "HbA1c", "eGFR", and "nocturnal edema". AARVIA AI translates dense notes into reassuring, conversational language seniors understand.
                </p>
                <div className="p-4 rounded-2xl bg-[#14291F] border border-[#5F8F77]/20 text-xs space-y-2">
                  <span className="text-[#9EBFB0] font-bold block">Elderly-Friendly Output:</span>
                  <p className="text-slate-300 italic">
                    "Your blood sugar average is steady and your kidneys are healthy! Keep drinking your water and taking your morning pill."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section id="accessibility" className="py-20 bg-white border-b border-[#C4DDD0]/60">
          <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#477B62]">
                  Designed for Seniors First
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#254E3B] tracking-tight">
                  High Contrast. Large Text. Zero Confusing Menus.
                </h2>
                <p className="text-base text-[#5F7368] leading-relaxed">
                  Too many health apps are designed for young tech enthusiasts. AARVIA AI adheres to WCAG AAA accessibility standards with high-contrast color choices, generous touch areas, and optional audio reminders.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F7F8F3] border border-[#C4DDD0]">
                    <Eye className="h-5 w-5 text-[#477B62] mb-1" />
                    <span className="font-bold text-sm text-[#254E3B] block">48px+ Touch Targets</span>
                    <span className="text-xs text-[#5F7368]">Easy for arthritic hands</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F7F8F3] border border-[#C4DDD0]">
                    <Volume2 className="h-5 w-5 text-[#477B62] mb-1" />
                    <span className="font-bold text-sm text-[#254E3B] block">Voice Companion</span>
                    <span className="text-xs text-[#5F7368]">Audio queries & reading</span>
                  </div>
                </div>
              </div>

              {/* Elderly Card Demo */}
              <div className="p-8 rounded-3xl bg-[#F7F8F3] border-2 border-[#477B62] shadow-elder space-y-4">
                <span className="text-xs font-extrabold uppercase text-[#477B62]">Senior Screen Mode</span>
                <div className="p-6 rounded-2xl bg-white border border-[#C4DDD0] shadow-soft space-y-4">
                  <h3 className="text-2xl font-black text-[#254E3B]">Good morning, Eleanor!</h3>
                  <p className="text-base text-[#5F7368]">Please take your pink Lisinopril tablet now.</p>
                  <Button size="lg" className="w-full py-6 text-lg font-black bg-[#477B62] hover:bg-[#3A6550] rounded-2xl shadow-card gap-2">
                    <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                    YES, I TOOK MY PILL
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-[#E1EDE6] text-center border-b border-[#C4DDD0]">
          <div className="container mx-auto px-4 sm:px-8 max-w-4xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-[#254E3B] tracking-tight">
              Ready to Bring Peace of Mind to Your Family?
            </h2>
            <p className="text-base text-[#5F7368] max-w-xl mx-auto font-medium">
              Join thousands of families protecting their loved ones with AARVIA AI. Setup takes less than 2 minutes.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="font-extrabold px-8 py-6 rounded-2xl bg-[#477B62] hover:bg-[#3A6550] shadow-soft">
                  Create Your Free Care Circle
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C4DDD0] py-12 text-sm text-[#5F7368]">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#477B62] text-white">
              <Heart className="h-5 w-5 fill-white/20" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-[#254E3B]">AARVIA AI</span>
              <p className="text-xs text-[#5F7368]">Care that connects. Intelligence that protects.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-[#5F7368]">
            <Link to="/login" className="hover:text-[#254E3B]">Login</Link>
            <Link to="/signup" className="hover:text-[#254E3B]">Signup</Link>
            <Link to="/dashboard" className="hover:text-[#254E3B]">Dashboard</Link>
            <Link to="/companion" className="hover:text-[#254E3B]">AI Companion</Link>
          </div>

          <div className="text-xs text-[#5F7368] text-center md:text-right">
            <p>© 2026 AARVIA AI. All rights reserved.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Illustrative demonstration data for hackathon evaluation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
