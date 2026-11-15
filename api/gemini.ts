import { GoogleGenAI } from '@google/genai'

// Initialize the Gemini client using the secure server-side environment variable (no VITE_ prefix)
const apiKey = process.env.GEMINI_API_KEY
const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null
const MODEL_NAME = 'gemini-2.5-flash'

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  if (!aiClient) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server environment.' })
  }

  try {
    const { action, payload } = req.body
    let prompt = ''

    if (action === 'interactions') {
      const { medicationNames } = payload || {}
      if (!medicationNames || !Array.isArray(medicationNames)) {
        return res.status(400).json({ error: 'medicationNames array is required for interactions check.' })
      }

      prompt = `You are a clinical geriatric pharmacology AI advisor for AARVIA AI.
Tagline: Care that connects. Intelligence that protects.
Analyze the following list of medications for potential drug-drug interactions, food interactions, and elderly-specific cautions:
${medicationNames.join(', ')}

Respond ONLY in valid JSON matching this schema:
{
  "hasInteractions": boolean,
  "severity": "none" | "mild" | "moderate" | "severe",
  "summary": "Short 2-sentence clinical summary",
  "details": [
    {
      "medicationA": "Drug 1",
      "medicationB": "Drug 2",
      "effect": "Description of potential effect",
      "recommendation": "Actionable timing or monitoring advice"
    }
  ],
  "elderlyFriendlyNotice": "Simple, large-print friendly, calming advice in plain language for the senior."
}`
    } else if (action === 'simplify') {
      const { medicalText } = payload || {}
      if (!medicalText) {
        return res.status(400).json({ error: 'medicalText is required for simplification.' })
      }

      prompt = `As AARVIA AI (Care that connects. Intelligence that protects.), convert this doctor note or medical report into simple, encouraging, high-readability language for an 80-year-old grandmother. Avoid frightening clinical terms and emphasize what she should do next in 3 friendly bullet points:\n\n${medicalText}`
    } else if (action === 'insights') {
      const { elderName, takenCount, totalDoses, adherenceRate } = payload || {}

      prompt = `Generate a concise daily care circle summary for senior ${elderName || 'Eleanor'} via AARVIA AI.
Adherence rate: ${adherenceRate}% (${takenCount} of ${totalDoses} doses taken today).
Respond in JSON:
{
  "date": "${new Date().toISOString().split('T')[0]}",
  "adherenceRate": ${adherenceRate || 100},
  "overallStatus": "excellent" | "stable" | "attention_needed" | "critical",
  "keyHighlights": ["bullet 1", "bullet 2"],
  "concernsOrAlerts": ["concern 1"],
  "suggestedActionItems": ["action 1"],
  "aiGeneratedAt": "${new Date().toISOString()}"
}`
    } else {
      return res.status(400).json({ error: 'Invalid action specified in request body.' })
    }

    const response = await aiClient.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    })

    const textResult = response.text
    if (!textResult) {
      return res.status(500).json({ error: 'Received empty response from Gemini model.' })
    }

    return res.status(200).json({ result: textResult })
  } catch (err: any) {
    console.error('[AARVIA Serverless Gemini Error]:', err)
    return res.status(500).json({ error: err.message || 'Internal server error while processing AI request.' })
  }
}