'use client'

import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const BENEFITS = [
  { icon: '🎙️', title: 'Voice-to-Listing', desc: 'Dictate property details on site — your AI creates the full listing with photos, floor plans, and descriptions. Published in minutes, not hours.' },
  { icon: '📧', title: 'Automated Email Campaigns', desc: 'New instruction? Your AI emails matching buyers instantly. Price reduction? Your database is notified before you hang up the phone.' },
  { icon: '📅', title: 'Viewing Management', desc: 'AI schedules viewings, sends confirmations, follows up for feedback, and chases offers — all without you lifting a finger.' },
  { icon: '📊', title: 'Market Reports On Demand', desc: 'Generate hyper-local market reports for vendor appraisals. Comparable sales, price trends, days on market — branded and ready to present.' },
  { icon: '⛓️', title: 'Chain Progression Tracking', desc: 'Your AI monitors the entire chain, chases solicitors, updates all parties, and flags delays before they become problems.' },
  { icon: '🔒', title: 'AML & Compliance', desc: 'Automated ID verification, source of funds checks, and PEP screening. Stay compliant without the paperwork mountain.' },
  { icon: '📱', title: 'Social Media Content', desc: 'AI generates property posts, area guides, and market updates for Instagram, Facebook, and LinkedIn. Consistent content without a marketing team.' },
  { icon: '🌐', title: 'Custom Website', desc: 'A stunning, modern website built and maintained by AI. Property pages auto-generated, SEO optimised, always up to date.' },
  { icon: '📞', title: 'Missed Call Follow-Up', desc: 'Every missed call gets an instant text. Every voicemail gets transcribed and actioned. No lead falls through the cracks.' },
  { icon: '📝', title: 'Offer Management', desc: 'Track all offers, generate memorandums of sale, and keep vendors informed — automatically. Professional, transparent, instant.' },
  { icon: '🏠', title: 'Portal Syndication', desc: 'List once, publish everywhere. Rightmove, Zoopla, OnTheMarket — all updated simultaneously from a single voice note.' },
  { icon: '💰', title: 'Fee Tracking & Invoicing', desc: 'Automatic fee calculations on completion, invoice generation, and payment tracking. Your accounts stay clean without admin.' },
]

const PAIN_POINTS = [
  { before: 'Spending 45 mins writing one listing', after: 'Voice note → full listing in 2 minutes' },
  { before: 'Manually emailing buyers one by one', after: 'AI matches and emails instantly on instruction' },
  { before: 'Playing phone tag to arrange viewings', after: 'AI books, confirms, and follows up automatically' },
  { before: 'Losing leads from missed calls', after: 'Every missed call gets an instant follow-up text' },
  { before: 'Hours creating market appraisal packs', after: 'Branded report generated in 30 seconds' },
  { before: 'Chasing solicitors for chain updates', after: 'AI chases weekly and flags delays to you' },
]

const TESTIMONIALS = [
  { name: 'Neil L.', role: 'Director, Butler & Stag', text: 'We went from spending half our day on admin to spending it with clients. The AI handles everything we used to dread.' },
  { name: 'Estate Agent', role: 'Independent, East London', text: 'The voice-to-listing feature alone saved us 15 hours a week. That\'s 15 more hours of actual selling.' },
]

export default function EstateAgentsPage() {
  return (
    <>
      <Nav />
      <main style={{ background: '#0a0a0a', color: 'white', fontFamily: "'Inter', sans-serif" }}>

        {/* ═══ HERO ═══ */}
        <section style={{
          minHeight: '90vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '8rem 2rem 4rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ position: 'absolute', top: '10%', left: '10%', width: 300, height: 300, background: 'rgba(6,182,212,0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, background: 'rgba(99,102,241,0.06)', borderRadius: '50%', filter: 'blur(100px)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
            <div style={{
              display: 'inline-block', padding: '0.4rem 1.2rem', borderRadius: 20,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
              fontSize: '0.7rem', fontWeight: 700, color: '#06b6d4',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              anyOS for Estate Agents
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
              lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Sell More.<br />
              <span style={{ color: '#06b6d4' }}>Admin Less.</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 2rem' }}>
              Your own AI assistant that creates listings from voice notes, emails matching buyers instantly, schedules viewings, and handles compliance — so you can focus on what you do best: selling.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                background: '#06b6d4', color: 'white', padding: '0.9rem 2rem', borderRadius: 10,
                textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 20px rgba(6,182,212,0.3)',
              }}>
                Book a Demo →
              </Link>
              <Link href="/pricing" style={{
                background: 'rgba(255,255,255,0.08)', color: 'white', padding: '0.9rem 2rem', borderRadius: 10,
                textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ BEFORE / AFTER ═══ */}
        <section style={{ padding: '5rem 2rem', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              fontSize: '0.65rem', fontWeight: 700, color: '#ef4444',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              The Problem We Solve
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
              Before & After anyOS
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PAIN_POINTS.map((p, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem',
                alignItems: 'center', padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.03)', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#ef4444', fontSize: 16, flexShrink: 0 }}>✕</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{p.before}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 20 }}>→</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#22c55e', fontSize: 16, flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 600 }}>{p.after}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ BENEFITS GRID ═══ */}
        <section style={{ padding: '5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
              fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              Features
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
              Everything an Agent Needs
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem', maxWidth: 500, margin: '0.5rem auto 0' }}>
              One AI system that replaces half your tech stack and most of your admin
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: 16,
                padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s', cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ fontSize: 28, marginBottom: '0.75rem' }}>{b.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'white' }}>{b.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section style={{ padding: '5rem 2rem', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              fontSize: '0.65rem', fontWeight: 700, color: '#6366f1',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              How It Works
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
              Three Steps to Transform Your Agency
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'We Set Everything Up', desc: 'We install your AI system on dedicated hardware at your office. Your branding, your data, your rules. Takes one afternoon.' },
              { step: '02', title: 'Train It Like a New Hire', desc: 'Spend a few days showing it how you work — your processes, your tone, your standards. It learns fast and never forgets.' },
              { step: '03', title: 'Watch It Work', desc: 'Your AI handles the admin while you handle the clients. Listings created in minutes, buyers matched instantly, viewings scheduled automatically.' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  fontSize: '2rem', fontWeight: 900, color: '#6366f1', opacity: 0.3,
                  fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0, lineHeight: 1,
                }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>{s.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SOCIAL PROOF ═══ */}
        <section style={{ padding: '5rem 2rem', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                padding: '2rem', background: 'rgba(255,255,255,0.03)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
                borderLeft: '3px solid #06b6d4',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1rem' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{
          padding: '5rem 2rem', textAlign: 'center',
          background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.05))',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.03em', marginBottom: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Ready to Sell More <span style={{ color: '#06b6d4' }}>& Admin Less</span>?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Book a 30-minute demo and we&apos;ll show you exactly how anyOS would work for your agency. No obligation, no pressure — just a conversation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                background: '#06b6d4', color: 'white', padding: '1rem 2.5rem', borderRadius: 10,
                textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 4px 20px rgba(6,182,212,0.3)',
              }}>
                Book a Demo →
              </Link>
              <a href="tel:02089816611" style={{
                background: 'rgba(255,255,255,0.08)', color: 'white', padding: '1rem 2.5rem', borderRadius: 10,
                textDecoration: 'none', fontWeight: 700, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                📞 Call Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
