import { useState } from 'react'
import { useCare } from '@/context/CareContext'
import { CareCircle, CareCircleMember } from '@/types'

export interface UseCareCircleReturn {
  careCircle: CareCircle | null
  members: CareCircleMember[]
  primaryEmergencyContact: CareCircleMember | undefined
  inviteCode: string | undefined
  copyInviteCode: () => Promise<boolean>
  isCopied: boolean
}

export function useCareCircle(): UseCareCircleReturn {
  const { careCircle } = useCare()
  const [isCopied, setIsCopied] = useState(false)

  const members = careCircle?.members || []
  const primaryEmergencyContact = members.find(m => m.isEmergencyContact)

  const copyInviteCode = async (): Promise<boolean> => {
    if (!careCircle?.inviteCode) return false
    try {
      await navigator.clipboard.writeText(careCircle.inviteCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
      return true
    } catch {
      return false
    }
  }

  return {
    careCircle,
    members,
    primaryEmergencyContact,
    inviteCode: careCircle?.inviteCode,
    copyInviteCode,
    isCopied,
  }
}
