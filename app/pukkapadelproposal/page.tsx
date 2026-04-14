'use client'

import { useEffect, useRef, useState } from 'react'

/* ───────── helpers ───────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ───────── data ───────── */
const OPTIONS = [
  {
    id: 1,
    tag: 'MANAGED',
    title: 'Fully Managed Platform',
    price: '1,200',
    unit: '/month',
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.25)',
    description: 'We build it, run it, and keep it humming. You focus on padel — we handle the tech.',
    features: [
      'Custom website design & build',
      'Online booking platform',
      'Hosting, SSL & domain management',
      'Automated social media content',
      'Automated email campaigns',
      'Monthly analytics reports',
      'Priority support & updates',
      'Security patches & backups',
    ],
    ownership: 'anyOS owns & operates the platform. You get a fully managed service with zero tech headaches.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 2,
    tag: 'OWN IT',
    title: 'Client-Owned System',
    price: '5,000',
    unit: ' one-off',
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.25)',
    popular: true,
    description: 'We build the entire system, then hand you the keys. Your data, your platform, your rules.',
    features: [
      'Full platform build & design',
      'Website + booking system',
      'Social media automation setup',
      'Email marketing automation',
      'Complete source code handover',
      'Database & hosting ownership',
      'Documentation & setup guide',
      'Transition support (30 days)',
    ],
    ownership: 'You own everything — code, data, hosting, domain. Full control from day one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="7.5,4.21 12,6.81 16.5,4.21" /><polyline points="7.5,19.79 7.5,14.6 3,12" /><polyline points="21,12 16.5,14.6 16.5,19.79" />
        <line x1="12" y1="22.08" x2="12" y2="12" /><line x1="3.27" y1="6.96" x2="12" y2="12" /><line x1="20.73" y1="6.96" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 3,
    tag: 'PREMIUM',
    title: 'Dedicated System & Training',
    price: '10,000',
    unit: ' one-off',
    accent: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
    description: 'The full package. Hardware, software, training — everything you need to run it independently.',
    features: [
      'Everything in Client-Owned',
      'MacBook Pro (configured & ready)',
      '3 days in-person training with Jake',
      'Complete system handbook',
      'Operational playbook',
      'Staff training materials',
      'Emergency support line (90 days)',
      'Quarterly check-in calls (1 year)',
    ],
    ownership: 'You own the hardware, the software, the data — and you know how to run it all.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
]

const COMPARE_ROWS = [
  { label: 'Website & Booking', o1: '✓', o2: '✓', o3: '✓' },
  { label: 'Social Media Automation', o1: '✓', o2: '✓', o3: '✓' },
  { label: 'Email Campaigns', o1: '✓', o2: '✓', o3: '✓' },
  { label: 'Hosting & Security', o1: 'anyOS manages', o2: 'You manage', o3: 'You manage' },
  { label: 'Code Ownership', o1: 'anyOS', o2: 'You', o3: 'You' },
  { label: 'Data Ownership', o1: 'Shared', o2: 'You', o3: 'You' },
  { label: 'Hardware Included', o1: '—', o2: '—', o3: 'MacBook Pro' },
  { label: 'In-Person Training', o1: '—', o2: '—', o3: '3 days with Jake' },
  { label: 'Ongoing Support', o1: 'Included', o2: '30 days', o3: '90 days + quarterly' },
]

/* ───────── component ───────── */
export default function PukkaProposal() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div style={{ background: '#050507', color: 'white', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Noise texture overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Ambient gradient orbs */}
      <div style={{
        position: 'fixed', top: '-20%', left: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-30%', right: '-15%', width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Cursor glow */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 200,
        top: mousePos.y - 200,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        transition: 'left 0.3s ease-out, top 0.3s ease-out',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ═══════ HERO ═══════ */}
        <section style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '4rem 2rem', textAlign: 'center',
          position: 'relative',
        }}>
          {/* Grid lines */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />

          <FadeIn>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.4rem 1.2rem', borderRadius: '100px',
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: '2rem',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#818cf8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Proposal — April 2026
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: '-0.04em', marginBottom: '1.5rem',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>Pukka Padel</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                × anyOS
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '540px', lineHeight: 1.7, margin: '0 auto 3rem',
            }}>
              A bespoke digital platform to automate bookings, marketing, and operations — so you can focus on what matters: the game.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a href="#options" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.875rem 2.5rem',
              background: 'white', color: '#050507',
              textDecoration: 'none', borderRadius: '8px',
              fontSize: '0.8rem', fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              View Options
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </FadeIn>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, rgba(99,102,241,0.5), transparent)',
              animation: 'scrollPulse 2s infinite',
            }} />
          </div>
        </section>

        {/* ═══════ OVERVIEW ═══════ */}
        <section style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{
              display: 'flex', gap: '3rem', alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: '1 1 400px' }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, color: '#6366f1',
                  letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
                }}>
                  What We&apos;re Building
                </span>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700, letterSpacing: '-0.03em',
                  lineHeight: 1.15, marginBottom: '1.5rem',
                }}>
                  Your complete<br />digital backbone.
                </h2>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
                  A modern website with integrated booking. Automated social media that posts while you sleep.
                  Email campaigns that nurture leads on autopilot. All connected, all branded, all yours.
                </p>
              </div>

              <div style={{
                flex: '0 0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '12px', width: '100%', maxWidth: '360px',
              }}>
                {[
                  { label: 'Website', icon: '🌐' },
                  { label: 'Bookings', icon: '📅' },
                  { label: 'Social', icon: '📱' },
                  { label: 'Email', icon: '📧' },
                  { label: 'SEO', icon: '🔍' },
                  { label: 'Analytics', icon: '📊' },
                ].map((item, i) => (
                  <FadeIn key={item.label} delay={i * 0.05}>
                    <div style={{
                      padding: '1rem', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center',
                      transition: 'border-color 0.3s, background 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{item.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ═══════ PRICING OPTIONS ═══════ */}
        <section id="options" style={{ padding: '6rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#8b5cf6',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
              }}>
                Three Paths Forward
              </span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 800, letterSpacing: '-0.03em',
              }}>
                Choose your model.
              </h2>
            </div>
          </FadeIn>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem', alignItems: 'stretch',
          }}>
            {OPTIONS.map((opt, i) => (
              <FadeIn key={opt.id} delay={i * 0.12}>
                <div
                  onMouseEnter={() => setActiveCard(opt.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    position: 'relative', borderRadius: '20px', padding: '2px',
                    background: activeCard === opt.id
                      ? `linear-gradient(135deg, ${opt.accent}, transparent 60%)`
                      : 'rgba(255,255,255,0.06)',
                    transition: 'all 0.4s ease',
                    boxShadow: activeCard === opt.id ? `0 0 60px ${opt.glow}` : 'none',
                    height: '100%',
                  }}
                >
                  {opt.popular && (
                    <div style={{
                      position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                      padding: '4px 16px', borderRadius: '100px',
                      fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div style={{
                    background: '#0a0a0f', borderRadius: '18px', padding: '2.25rem',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    backdropFilter: 'blur(20px)',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                    }}>
                      <span style={{
                        fontSize: '0.6rem', fontWeight: 800, color: opt.accent,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        padding: '0.3rem 0.8rem', borderRadius: '6px',
                        background: `${opt.accent}15`, border: `1px solid ${opt.accent}30`,
                      }}>
                        {opt.tag}
                      </span>
                      <div style={{ color: opt.accent, opacity: 0.6 }}>{opt.icon}</div>
                    </div>

                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem',
                      letterSpacing: '-0.02em',
                    }}>
                      {opt.title}
                    </h3>

                    <p style={{
                      fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.6, marginBottom: '1.5rem',
                    }}>
                      {opt.description}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>from</span>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}>
                        <span style={{ color: opt.accent }}>£</span>{opt.price}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                        {opt.unit}
                      </span>
                    </div>

                    <div style={{
                      width: '100%', height: '1px', marginBottom: '1.5rem',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                    }} />

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flex: 1 }}>
                      {opt.features.map((f, j) => (
                        <li key={j} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '10px',
                          fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)',
                          padding: '0.4rem 0', lineHeight: 1.5,
                        }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke={opt.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      padding: '1rem', borderRadius: '10px',
                      background: `${opt.accent}08`,
                      border: `1px solid ${opt.accent}15`,
                    }}>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: opt.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Ownership
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                        {opt.ownership}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ═══════ COMPARISON TABLE ═══════ */}
        <section style={{ padding: '4rem 2rem 6rem', maxWidth: '900px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#6366f1',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
              }}>
                Side by Side
              </span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
              }}>
                Compare at a glance.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
            }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ padding: '1rem 1.25rem' }} />
                {['Managed', 'Client-Owned', 'Dedicated'].map((h, i) => (
                  <div key={h} style={{
                    padding: '1rem 0.75rem', textAlign: 'center',
                    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: OPTIONS[i].accent,
                  }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {COMPARE_ROWS.map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    padding: '0.75rem 1.25rem', fontSize: '0.82rem', fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    {row.label}
                  </div>
                  {[row.o1, row.o2, row.o3].map((val, j) => (
                    <div key={j} style={{
                      padding: '0.75rem', textAlign: 'center',
                      fontSize: '0.78rem', color: val === '✓' ? '#34d399' : val === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)',
                      fontWeight: val === '✓' ? 700 : 500,
                    }}>
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ═══════ PROCESS ═══════ */}
        <section style={{ padding: '4rem 2rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#ec4899',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
              }}>
                How It Works
              </span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
              }}>
                Three steps. That&apos;s it.
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { num: '01', title: 'Discovery', desc: 'We sit down, understand your operations, your brand, your goals. What works, what doesn\'t, what you wish existed.', color: '#6366f1' },
              { num: '02', title: 'Build', desc: 'We design and build your platform — website, booking, automations — all tailored to Pukka Padel. You see progress at every stage.', color: '#8b5cf6' },
              { num: '03', title: 'Launch', desc: 'Go live. Everything connected, tested, and running. Depending on your option, we either manage it for you or hand over the keys.', color: '#ec4899' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  padding: '1.5rem', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${step.color}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                >
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2.5rem', fontWeight: 800, color: step.color,
                    opacity: 0.3, lineHeight: 1, flexShrink: 0,
                  }}>
                    {step.num}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section style={{
          padding: '6rem 2rem 8rem', textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '60vw', height: '60vw', maxWidth: '600px', maxHeight: '600px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <FadeIn>
            <div style={{ position: 'relative' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#6366f1',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
              }}>
                Ready?
              </span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800, letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
              }}>
                Let&apos;s build something<br />
                <span style={{ color: '#6366f1' }}>brilliant.</span>
              </h2>
              <p style={{
                fontSize: '1rem', color: 'rgba(255,255,255,0.4)',
                maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7,
              }}>
                Pick the option that fits, and we&apos;ll take it from there. Got questions?
                Let&apos;s talk.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="mailto:jake@anyvendor.co.uk" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '0.875rem 2.5rem',
                  background: 'white', color: '#050507',
                  textDecoration: 'none', borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: 800,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  Get In Touch
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="tel:+447000000000" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '0.875rem 2.5rem',
                  background: 'transparent', color: 'white',
                  textDecoration: 'none', borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                  Call Jake
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer style={{
          padding: '2rem', textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem',
          }}>
            any<span style={{ color: '#6366f1' }}>OS</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>
            © 2026 anyOS — AI that actually does things.
          </p>
        </footer>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
        @media (max-width: 768px) {
          #options > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
