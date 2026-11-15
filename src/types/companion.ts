export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant' | 'system'
  text: string
  timestamp: string
  suggestedActions?: string[]
  isAudioPlaying?: boolean
  category?: 'medication' | 'appointment' | 'wellness' | 'emergency' | 'general'
}
