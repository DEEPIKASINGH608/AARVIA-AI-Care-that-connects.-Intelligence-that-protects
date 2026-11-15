import React, { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Pill,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Bot
} from 'lucide-react'
import { geminiService } from '@/services/ai/geminiService'
import { GEMINI_CONFIG } from '@/config/gemini'

export const AiInsightsPage: React.FC = () => {
  const { medications } = useCare()
  const [reportText, setReportText] = useState(
    'Patient Eleanor Vance presents with HbA1c of 6.8%, well-compensated hypertension on Lisinopril 10mg daily, with slight nocturnal peripheral edema. Advised sodium restriction and continuing Metformin 500mg BID with food. Renal panel eGFR 68 mL/min/1.73m² (stable).'
  )
  const [simplifiedReport, setSimplifiedReport] = useState<string | null>(null)
  const [simplifying, setSimplifying] = useState(false)

  const [checkingInteractions, setCheckingInteractions] = useState(false)
  const [interactionResult, setInteractionResult] = useState<any | null>(null)

  const handleSimplify = async () => {
    setSimplifying(true)
    try {
      const res = await geminiService.simplifyMedicalReport(reportText)
      setSimplifiedReport(res)
    } finally {
      setSimplifying(false)
    }
  }

  const handleCheckInteractions = async () => {
    setCheckingInteractions(true)
    try {
      const names = medications.map(m => `${m.name} ${m.dosage}`)
      const res = await geminiService.checkMedicationInteractions(names)
      setInteractionResult(res)
    } finally {
      setCheckingInteractions(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-800 to-forest-900 p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-700 text-sage-200 text-xs font-semibold">
            <Sparkles className="h-4 w-4 text-sage-400" />
            <span>CareCircle AI Healthcare Engine • Intelligence that protects.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            CareCircle AI Clinical Intelligence & Assistant
          </h1>
          <p className="text-sage-100 text-sm max-w-xl">
            Empowering elderly seniors and family caregivers with automated drug interaction cross-checks and high-readability plain language report translation.
          </p>
        </div>

        <Badge
          variant="outline"
          className="border-sage-400/40 text-sage-200 bg-forest-950/40 text-xs font-semibold py-1.5 px-3 self-start md:self-auto"
        >
          Model: {GEMINI_CONFIG.model}
        </Badge>
      </div>

      {/*  Intelligent AI modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Plain Language Medical Report Simplifier */}
        <Card className="rounded-3xl border border-sage-200 bg-white shadow-card flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-sage-600" />
              <CardTitle className="text-xl">Plain Language Report Simplifier</CardTitle>
            </div>
            <p className="text-xs text-slate-500">
              Transforms dense clinical physician notes into calming, easy-to-read steps for seniors.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 flex-1 flex flex-col">
            <div>
              <label htmlFor="doctor-notes-input" className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                Paste Doctor Note / Lab Report
              </label>
              <textarea
                id="doctor-notes-input"
                rows={5}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className="w-full rounded-2xl border border-sage-200 p-3 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>

            <Button
              onClick={handleSimplify}
              variant="default"
              isLoading={simplifying}
              className="font-bold gap-2 self-start"
            >
              <Bot className="h-4 w-4" />
              Simplify for Eleanor
            </Button>

            {simplifiedReport && (
              <div className="mt-4 p-4 rounded-2xl bg-warm-50 border border-warm-200 text-forest-950 space-y-2 animate-in fade-in">
                <span className="text-xs font-bold uppercase text-sage-800 tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sage-600" />
                  Elderly-Friendly Translation
                </span>
                <div className="text-sm leading-relaxed whitespace-pre-line font-medium text-slate-800">
                  {simplifiedReport}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Polypharmacy & Drug Interaction Checker */}
        <Card className="rounded-3xl border border-sage-200 bg-white shadow-card flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-sage-600" />
              <CardTitle className="text-xl">Polypharmacy Interaction Analyzer</CardTitle>
            </div>
            <p className="text-xs text-slate-500">
              AI checks for drug-drug contraindications and food/supplement conflicts across all active prescriptions.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 flex-1 flex flex-col">
            <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200/70 text-xs text-forest-900 space-y-1">
              <span className="font-bold block">Active Prescriptions Loaded:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                {medications.map(m => (
                  <li key={m.id}>{m.name} ({m.dosage}) — {m.frequency}</li>
                ))}
              </ul>
            </div>

            <Button
              onClick={handleCheckInteractions}
              variant="default"
              isLoading={checkingInteractions}
              className="font-bold gap-2 self-start"
            >
              <Sparkles className="h-4 w-4" />
              Scan Active Prescriptions
            </Button>

            {interactionResult && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-forest-950 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Severity: {interactionResult.severity}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {interactionResult.summary}
                </p>
                <div className="rounded-xl bg-white p-3 border border-emerald-200 text-xs space-y-1">
                  <strong className="text-forest-900">Advice for Senior:</strong>
                  <p className="text-slate-600 italic">"{interactionResult.elderlyFriendlyNotice}"</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
