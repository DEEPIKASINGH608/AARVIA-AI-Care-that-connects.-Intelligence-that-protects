import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Users, Stethoscope, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { UserRole } from '@/types'

export const LoginPage: React.FC = () => {
  const { signIn, setRole } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('eleanor.vance@aarvia.health')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickDemoLogin = async (role: UserRole) => {
    setRole(role)
    const emailMap = {
      elderly: 'eleanor.vance@aarvia.health',
      family: 'michael.vance@email.com',
      caregiver: 'maria.santos@carepro.com',
    }
    await signIn(emailMap[role], 'password123')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#477B62] to-[#254E3B] text-white shadow-soft mb-2 transition-transform hover:scale-105">
            <Heart className="h-7 w-7 fill-white/20 stroke-[2.2]" />
          </Link>
          <h1 className="text-3xl font-extrabold text-[#254E3B] tracking-tight">
            Sign In to AARVIA AI
          </h1>
          <p className="text-sm font-semibold text-[#5F7368]">
            Care that connects. Intelligence that protects.
          </p>
        </div>

        {/* Login Card */}
        <Card className="rounded-3xl border border-[#C4DDD0] bg-white shadow-card p-6 sm:p-8">
          <CardHeader className="p-0 pb-6 text-center">
            <CardTitle className="text-xl text-[#254E3B]">Welcome Back</CardTitle>
            <p className="text-xs text-[#5F7368] mt-1">Access your synchronized care ecosystem</p>
          </CardHeader>

          <CardContent className="p-0 space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@aarvia.health"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#5F7368] font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#C4DDD0] text-[#477B62] focus:ring-[#477B62]"
                  />
                  <span>Remember my login</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset link simulated for hackathon evaluation.') }} className="text-[#477B62] hover:underline font-semibold">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="default"
                isLoading={loading}
                className="w-full font-extrabold py-3 rounded-xl gap-2 bg-[#477B62] hover:bg-[#3A6550]"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E1EDE6]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 font-extrabold text-[#5F7368]">
                  Instant 1-Click Demo Profiles
                </span>
              </div>
            </div>

            {/* Quick Demo Access buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('elderly')}
                className="w-full flex items-center justify-between p-3 rounded-2xl border border-[#C4DDD0] hover:border-[#477B62] hover:bg-[#F2F7F4] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E1EDE6] text-[#254E3B] group-hover:scale-105 transition-transform">
                    <Heart className="h-4 w-4 text-[#477B62]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#254E3B] block">Eleanor Vance (Senior)</span>
                    <span className="text-[10px] text-[#5F7368]">High-contrast simple mode</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#5F7368] group-hover:text-[#477B62]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('family')}
                className="w-full flex items-center justify-between p-3 rounded-2xl border border-[#C4DDD0] hover:border-[#477B62] hover:bg-[#F2F7F4] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E1EDE6] text-[#254E3B] group-hover:scale-105 transition-transform">
                    <Users className="h-4 w-4 text-[#477B62]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#254E3B] block">Michael Vance (Son)</span>
                    <span className="text-[10px] text-[#5F7368]">Family peace of mind hub</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#5F7368] group-hover:text-[#477B62]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('caregiver')}
                className="w-full flex items-center justify-between p-3 rounded-2xl border border-[#C4DDD0] hover:border-[#477B62] hover:bg-[#F2F7F4] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E1EDE6] text-[#254E3B] group-hover:scale-105 transition-transform">
                    <Stethoscope className="h-4 w-4 text-[#477B62]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#254E3B] block">Maria Santos (Caregiver)</span>
                    <span className="text-[10px] text-[#5F7368]">Clinical administration roster</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#5F7368] group-hover:text-[#477B62]" />
              </button>
            </div>

            <div className="pt-4 border-t border-[#E1EDE6] text-center text-xs text-[#5F7368]">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-[#477B62] font-bold hover:underline">
                Create your Care Circle
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#5F7368] flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#477B62]" />
          AARVIA AI Secure Telehealth Platform
        </p>
      </div>
    </div>
  )
}
