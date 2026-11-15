import { useState, useEffect } from 'react'
import { TextSizePreference } from '@/types'

export interface AccessibilitySettings {
  textSize: TextSizePreference
  highContrast: boolean
  audioEnabled: boolean
}

export function useAccessibility() {
  const [textSize, setTextSize] = useState<TextSizePreference>(() => {
    return (localStorage.getItem('carecircle_text_size') as TextSizePreference) || 'large'
  })

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('carecircle_high_contrast') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('carecircle_text_size', textSize)
    const root = document.documentElement
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xl')
    if (textSize === 'extra-large') {
      root.classList.add('text-size-xl')
    } else if (textSize === 'large') {
      root.classList.add('text-size-large')
    } else {
      root.classList.add('text-size-normal')
    }
  }, [textSize])

  useEffect(() => {
    localStorage.setItem('carecircle_high_contrast', String(highContrast))
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [highContrast])

  const toggleHighContrast = () => setHighContrast(prev => !prev)

  return {
    textSize,
    setTextSize,
    highContrast,
    toggleHighContrast,
  }
}
