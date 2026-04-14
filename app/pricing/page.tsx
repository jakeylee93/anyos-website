'use client'

import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

const TIERS = [
  {
    tag: 'MANAGED',
    name: 'Fully Managed',
    price: '1,200',
    unit: '/month',
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.3)',
    description: 'We build it, run it, and keep it running. You focus on your business, we handle the tech.',
    features: [
      'Custom website design & build',
      'Online booking / lead platform',
      'Hosting, SSL & domain management',
      'Automated social media content',
      'Automated email campaigns',
      'Monthly analytics reports',
      'Priority support & updates',
      'Security patches & backups',
    ],
    ownership: 'anyOS owns and operates the platform. You get a fully managed service with zero tech headaches.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    tag: 'OWN IT',
    name: 'Client-Owned System',
    price: '5,000',
    unit: ' one-off',
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
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
    ownership: 'You own everything: code, data, hosting, domain. Full control from day one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="7.5,4.21 12,6.81 16.5,4.21" /><polyline points="7.5,19.79 7.5,14.6 3,12" /><polyline points="21,12 16.5,14.6 16.5,19.79" />
      </svg>
    ),
  },
  {
    tag: 'PREMIUM',
    name: 'Dedicated System & Training',
    price: '10,000',
    unit: ' one-off',
    accent: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    description: 'The full package. Hardware, software, training: everything you need to run it independently.',
    features: [
      'Everything in Client-Owned',
      'MacBook Pro (configured & ready)',
      '3 days in-person training',
      'Complete system handbook',
      'Operational playbook',
      'Staff training materials',
      'Emergency support line (90 days)',
      'Quarterly check-in calls (1 year)',
    ],
    ownership: 'You own the hardware, the software, the data, and you know how to run it all.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
]

export default function Pricing() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <>
      <Nav />
      <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <section style={{ padding: '8rem 2rem 3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6366f1', fontWeight: 700, marginBottom: '0.75rem' }}>Pricing</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', fontWeight: 800, lineHeight: 1.05, marginBottom: '1rem' }}>
            Three models. Your choice.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
            Whether you want us to manage everything, own the platform yourself, or get the full package with hardware and training.
          </p>
        </section>

        <section style={{ padding: '0 2rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem', alignItems: 'stretch',
          }}>
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  position: 'relative', borderRadius: '20px', padding: '2px',
                  background: activeCard === i
                    ? `linear-gradient(135deg, ${t.accent}, transparent 60%)`
                    : 'rgba(255,255,255,0.06)',
                  transition: 'all 0.4s ease',
                  boxShadow: activeCard === i ? `0 0 80px ${t.glow}, 0 0 160px ${t.glow}` : 'none',
                }}
              >
                <div style={{
                  background: '#0a0a0f', borderRadius: '18px', padding: '2.25rem',
                  height: '100%', display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 800, color: t.accent,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      padding: '0.3rem 0.8rem', borderRadius: '6px',
                      background: `${t.accent}15`, border: `1px solid ${t.accent}30`,
                    }}>
                      {t.tag}
                    </span>
                    <div style={{ color: t.accent, opacity: 0.6 }}>{t.icon}</div>
                  </div>

                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                  }}>
                    {t.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {t.description}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>from</span>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '2.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1,
                    }}>
                      <span style={{ color: t.accent }}>£</span>{t.price}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{t.unit}</span>
                  </div>

                  <div style={{ width: '100%', height: '1px', marginBottom: '1.5rem', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flex: 1 }}>
                    {t.features.map((f, j) => (
                      <li key={j} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                        fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)',
                        padding: '0.4rem 0', lineHeight: 1.5,
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    padding: '1rem', borderRadius: '10px',
                    background: `${t.accent}08`, border: `1px solid ${t.accent}15`,
                    marginBottom: '1.5rem',
                  }}>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Ownership
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                      {t.ownership}
                    </p>
                  </div>

                  <Link href="/contact" style={{
                    display: 'block', textAlign: 'center',
                    padding: '0.75rem', borderRadius: '8px',
                    background: 'white', color: '#050507',
                    textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}>
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
