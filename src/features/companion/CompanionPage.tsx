import { useState, useRef, useEffect } from 'react'
import { Bot, Mic, Send, Sparkles, MessageCircle, ChevronRight, X } from 'lucide-react'
import { MOCK_CHAT_MESSAGES } from '@/services/mockData'
import type { ChatMessage } from '@/types'

const SUGGESTED_QUESTIONS = [
  'What medications should I take this morning?',
  'Explain my blood pressure reading',
  'Am I due for any health screenings?',
  'Tips for managing arthritis pain?',
  'When is my next appointment?',
]

const MOCK_AI_RESPONSES = [
  "Based on your health profile, I'd recommend speaking with Dr. Martinez about that. Your next check-up is scheduled for November 20th.",
  "That's a great question! Your recent readings show positive trends. Keep up with your current routine and stay hydrated throughout the day.",
  "I found some helpful information for you. Remember to take any new information to your physician to confirm it applies to your personal health situation.",
  "Your care plan suggests gentle movement and consistent medication schedules. Would you like me to set a reminder for you?",
  "I've checked your records. Everything looks on track! Is there anything specific you'd like to know more about?",
]

export default function CompanionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (text?: string) => {
    const content = (text ?? inputText).trim()
    if (!content) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const aiText = MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)]
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#F7F8F3]">
      {/* Disclaimer bar */}
      <div className="bg-[#D99A38] bg-opacity-20 border-b border-[#D99A38] px-4 py-2 flex items-center gap-2 text-sm text-[#25352D]">
        <span className="text-base">⚕</span>
        <span>AI-generated responses are for informational purposes only. Always consult your physician for medical decisions.</span>
      </div>

      {/* Page header */}
      <div className="bg-[#FFFFFF] border-b border-[#C4DDD0] px-6 py-4 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#477B62] flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#254E3B] flex items-center gap-2">
            AI Care Companion
            <Sparkles className="w-4 h-4 text-[#477B62]" />
          </h1>
          <p className="text-sm text-[#477B62]">Your personal AI health assistant</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel – suggested questions */}
        <div className="w-72 bg-[#FFFFFF] border-r border-[#C4DDD0] flex flex-col p-4 gap-3 overflow-y-auto">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-[#477B62]" />
            <span className="text-sm font-semibold text-[#254E3B]">Suggested Questions</span>
          </div>
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="w-full text-left px-4 py-3 rounded-xl border border-[#C4DDD0] bg-[#F7F8F3] text-[#25352D] text-sm hover:bg-[#E1EDE6] hover:border-[#477B62] transition-colors flex items-center justify-between gap-2 group"
            >
              <span>{q}</span>
              <ChevronRight className="w-4 h-4 text-[#477B62] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Message history */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map(msg => {
              const isUser = msg.sender === 'user'
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#477B62] flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[70%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={
                        isUser
                          ? 'bg-[#477B62] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm shadow-sm'
                          : 'bg-[#E1EDE6] text-[#25352D] rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm border-l-4 border-[#477B62]'
                      }
                    >
                      {msg.text}
                    </div>
                    {/* Suggested actions for AI messages */}
                    {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(action)}
                            className="text-xs px-3 py-1 rounded-full border border-[#477B62] text-[#477B62] bg-[#FFFFFF] hover:bg-[#E1EDE6] transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                    <span className="text-xs text-[#477B62] mt-1 opacity-70">{msg.timestamp}</span>
                  </div>
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#254E3B] flex items-center justify-center ml-3 flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">ME</span>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Loading dots */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-[#477B62] flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#E1EDE6] border-l-4 border-[#477B62] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-[#477B62] animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#477B62] animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#477B62] animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="bg-[#FFFFFF] border-t border-[#C4DDD0] px-6 py-4">
            <div className="flex items-center gap-3 bg-[#F7F8F3] border border-[#C4DDD0] rounded-2xl px-4 py-2 focus-within:border-[#477B62] focus-within:ring-1 focus-within:ring-[#477B62] transition-all">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your care companion anything…"
                className="flex-1 bg-transparent text-[#25352D] placeholder-[#477B62] placeholder-opacity-50 text-sm outline-none"
              />
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="text-[#477B62] hover:text-[#254E3B] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                className="w-9 h-9 rounded-full bg-[#F7F8F3] border border-[#C4DDD0] flex items-center justify-center text-[#477B62] hover:bg-[#E1EDE6] transition-colors"
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-[#477B62] flex items-center justify-center text-white hover:bg-[#254E3B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-center text-[#477B62] opacity-60 mt-2">
              Powered by AARVIA AI · Responses may not reflect your latest health data
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
