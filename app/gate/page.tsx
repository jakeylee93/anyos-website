'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GatePage() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setPin('')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: '48px 40px', maxWidth: 380, width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
          anyOS
        </div>
        <div style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
          Enter PIN to continue
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError(false) }}
            placeholder="••••"
            autoFocus
            style={{
              width: '100%',
              padding: '16px',
              fontSize: 28,
              fontWeight: 600,
              textAlign: 'center',
              letterSpacing: 12,
              background: 'rgba(255,255,255,0.05)',
              border: error ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              color: '#fff',
              outline: 'none',
              transition: 'border 0.2s',
            }}
          />
          {error && (
            <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>
              Incorrect PIN. Try again.
            </div>
          )}
          <button
            type="submit"
            disabled={pin.length < 4 || loading}
            style={{
              width: '100%',
              padding: 14,
              marginTop: 20,
              background: pin.length === 4 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              cursor: pin.length === 4 ? 'pointer' : 'not-allowed',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
