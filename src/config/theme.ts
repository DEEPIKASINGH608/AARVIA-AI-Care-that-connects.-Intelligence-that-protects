/**
 * AARVIA AI Centralized Theme Tokens & Design System
 * Intelligent Elderly Care & Medication Management Ecosystem
 */

export const THEME_CONFIG = {
  appName: 'AARVIA AI',
  tagline: 'Care that connects. Intelligence that protects.',
  colors: {
    primary: '#477B62',      // Primary sage green
    darkGreen: '#254E3B',    // Dark forest green
    background: '#F7F8F3',   // Warm off-white background
    card: '#FFFFFF',         // Crisp white card
    text: '#25352D',         // Deep forest charcoal text
    warning: '#D99A38',      // Amber warning
    danger: '#C65D59',       // Muted terracotta danger
    border: '#C4DDD0',       // Soft organic border
  },
  typography: {
    fontSans: '"Manrope", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontDisplay: '"Manrope", -apple-system, sans-serif',
  },
  elderlyMode: {
    defaultTextSize: 'large',
    minTouchTargetPx: 48,
    highContrastRatio: 7.1,
  },
  shadows: {
    soft: '0 2px 10px -2px rgba(37, 78, 59, 0.05), 0 8px 24px -4px rgba(37, 78, 59, 0.04)',
    card: '0 4px 20px -2px rgba(37, 78, 59, 0.06), 0 2px 6px -1px rgba(37, 78, 59, 0.03)',
    hover: '0 12px 32px -4px rgba(37, 78, 59, 0.1), 0 4px 12px -2px rgba(37, 78, 59, 0.05)',
  },
} as const
