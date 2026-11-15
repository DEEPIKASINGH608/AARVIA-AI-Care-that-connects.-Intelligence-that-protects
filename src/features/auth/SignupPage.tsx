import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Heart, Shield, Users, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const BRAND = {
  primary: '#477B62',
  dark: '#254E3B',
  bg: '#F7F8F3',
  text: '#25352D',
  card: '#FFFFFF',
  border: '#C4DDD0',
  warning: '#D99A38',
  danger: '#C65D59',
}

type Role = 'elderly' | 'family' | 'caregiver'

const featureHighlights = [
  {
    icon: <Heart size={22} color="#fff" />,
    title: 'Personalised Care',
    desc: 'AI-tailored health insights and medication management crafted for each individual.',
  },
  {
    icon: <Shield size={22} color="#fff" />,
    title: 'Safe & Secure',
    desc: 'Your health data is encrypted and private — shared only with those you trust.',
  },
  {
    icon: <Users size={22} color="#fff" />,
    title: 'Family Connected',
    desc: 'Stay seamlessly linked with loved ones and caregivers for round-the-clock support.',
  },
]

const roleOptions: { label: string; value: Role }[] = [
  { label: 'Elderly Person', value: 'elderly' },
  { label: 'Family Member', value: 'family' },
  { label: 'Caregiver', value: 'caregiver' },
]

export default function SignupPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth() as any

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('elderly')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim()) return setError('Please enter your full name.')
    if (!email.trim()) return setError('Please enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (password !== confirmPassword) return setError('Passwords do not match.')
    if (!agreeTerms) return setError('Please accept the Terms of Service to continue.')

    setLoading(true)
    try {
      await signUp(email, password, { fullName, role })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    suffix,
  }: {
    label: string
    type?: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
    suffix?: React.ReactNode
  }) => (
    <div>
      <label className="block text-sm font-medium mb-1" style={{ color: BRAND.dark }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{
            border: `1.5px solid ${BRAND.border}`,
            backgroundColor: BRAND.bg,
            color: BRAND.text,
          }}
          onFocus={e => (e.target.style.borderColor = BRAND.primary)}
          onBlur={e => (e.target.style.borderColor = BRAND.border)}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: BRAND.bg }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-2/5 p-10"
        style={{ background: `linear-gradient(160deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)` }}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
              <Heart size={22} color="#fff" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">AARVIA</span>
          </div>

          {/* Tagline */}
          <h2 className="text-3xl font-bold text-white leading-snug mb-3">
            Care that connects.
            <br />
            Intelligence that protects.
          </h2>
          <p className="text-sm text-white opacity-75 leading-relaxed mb-10">
            Join thousands of families using AARVIA to deliver smarter, safer elder care every day.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-5">
            {featureHighlights.map(f => (
              <div key={f.title} className="flex gap-4 items-start">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white text-xs opacity-70 leading-relaxed mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white opacity-50">
          © {new Date().getFullYear()} AARVIA AI. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: BRAND.primary }}
            >
              <Heart size={18} color="#fff" />
            </div>
            <span className="text-xl font-bold" style={{ color: BRAND.dark }}>
              AARVIA
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: BRAND.dark }}>
            Create your account
          </h1>
          <p className="text-sm mb-7" style={{ color: BRAND.text, opacity: 0.7 }}>
            Join AARVIA and start your care journey today.
          </p>

          {/* Error banner */}
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-5"
              style={{ backgroundColor: '#FEF0EE', color: BRAND.danger, border: `1px solid ${BRAND.danger}` }}
            >
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <InputField
              label="Full Name"
              value={fullName}
              onChange={setFullName}
              placeholder="Eleanor Vance"
            />

            {/* Email */}
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="eleanor@example.com"
            />

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: BRAND.dark }}>
                I am a…
              </label>
              <div className="flex gap-2">
                {roleOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className="flex-1 py-2 px-2 rounded-xl text-xs font-medium border transition-colors"
                    style={
                      role === opt.value
                        ? {
                            backgroundColor: BRAND.primary,
                            color: '#fff',
                            borderColor: BRAND.primary,
                          }
                        : {
                            backgroundColor: '#fff',
                            color: BRAND.text,
                            borderColor: BRAND.border,
                          }
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="Min. 6 characters"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ color: BRAND.primary }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Re-enter password"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  style={{ color: BRAND.primary }}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded"
                style={{ accentColor: BRAND.primary }}
              />
              <span className="text-xs leading-relaxed" style={{ color: BRAND.text, opacity: 0.8 }}>
                I agree to the{' '}
                <span style={{ color: BRAND.primary }} className="font-medium underline cursor-pointer">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span style={{ color: BRAND.primary }} className="font-medium underline cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ backgroundColor: BRAND.primary }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: BRAND.text, opacity: 0.7 }}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold hover:underline"
              style={{ color: BRAND.primary }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
