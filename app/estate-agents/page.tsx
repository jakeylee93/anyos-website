'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const DEMO_PROMPTS = [
  { category: 'Website', icon: '🌐', color: '#6366f1', prompts: [
    { prompt: '"Change the hero headline to \'Your Home, Our Priority\'"', desc: 'Live website copy change — deployed in seconds', tag: 'Instant' },
    { prompt: '"Add a new property: 4 bed detached in Chigwell, £895,000"', desc: 'New listing appears on the site immediately', tag: 'Instant' },
    { prompt: '"Add a Spring Sale banner at the top of the website"', desc: 'Promotional banner across all pages', tag: '30 secs' },
    { prompt: '"Change the brand colour from pink to gold"', desc: 'Full brand refresh across the entire site', tag: '60 secs' },
  ]},
  { category: 'Listings', icon: '🎙️', color: '#06b6d4', prompts: [
    { prompt: '"3 bed semi in Chingford, bay windows, south-facing garden, new kitchen, close to station"', desc: 'Voice note → full professional listing with description, key features, and SEO copy', tag: 'Voice' },
    { prompt: '"Generate a listing for 14 Queens Road — Victorian terrace, 2 reception rooms, recently refurbished"', desc: 'AI writes the full property description in your brand tone', tag: '30 secs' },
  ]},
  { category: 'Email & Marketing', icon: '📧', color: '#22c55e', prompts: [
    { prompt: '"Send a newsletter with 5 properties in the Chigwell area"', desc: 'Branded HTML email generated and sent to your database', tag: '60 secs' },
    { prompt: '"Draft a just-sold email for 14 Queens Road — sold for £680k, above asking"', desc: 'Celebration email ready to send to your network', tag: '30 secs' },
    { prompt: '"Write 3 Instagram captions for this week\'s new listings"', desc: 'Social media content with hashtags, ready to post', tag: '30 secs' },
  ]},
  { category: 'Reports & Documents', icon: '📊', color: '#f59e0b', prompts: [
    { prompt: '"Generate a market report for Theydon Bois"', desc: 'Average prices, trends, comparable sales — branded PDF ready for vendor appraisals', tag: '60 secs' },
    { prompt: '"Create a viewing confirmation email template"', desc: 'Professional template with property details, directions, and agent contact', tag: '30 secs' },
  ]},
  { category: 'Operations', icon: '⚡', color: '#ec4899', prompts: [
    { prompt: '"Schedule viewings for 22 Oak Lane this Saturday between 10am and 2pm"', desc: 'AI manages time slots, sends confirmations, and follows up for feedback', tag: 'Auto' },
    { prompt: '"Chase the solicitor on the Morrison chain — it\'s been 5 days since last update"', desc: 'Professional follow-up email sent, response tracked, you get notified', tag: 'Auto' },
  ]},
]

const BENEFITS = [
  { icon: '🎙️', title: 'Voice-to-Listing', desc: 'Dictate property details on site — your AI creates the full listing with photos, floor plans, and descriptions. Published in minutes, not hours.' },
  { icon: '📧', title: 'Automated Email Campaigns', desc: 'New instruction? Your AI emails matching buyers instantly. Price reduction? Your database is notified before you hang up the phone.' },
  { icon: '📅', title: 'Viewing Management', desc: 'AI schedules viewings, sends confirmations, follows up for feedback, and chases offers — all without you lifting a finger.' },
  { icon: '📊', title: 'Market Reports On Demand', desc: 'Generate hyper-local market reports for vendor appraisals. Comparable sales, price trends, days on market — branded and ready to present.' },
  { icon: '⛓️', title: 'Chain Progression', desc: 'Your AI monitors the entire chain, chases solicitors, updates all parties, and flags delays before they become problems.' },
  { icon: '🔒', title: 'AML & Compliance', desc: 'Automated ID verification, source of funds checks, and PEP screening. Stay compliant without the paperwork mountain.' },
  { icon: '📱', title: 'Social Media Content', desc: 'AI generates property posts, area guides, and market updates for Instagram, Facebook, and LinkedIn. Consistent content without a marketing team.' },
  { icon: '🌐', title: 'Custom Website', desc: 'A stunning, modern website built and maintained by AI. Property pages auto-generated, SEO optimised, always up to date.' },
  { icon: '📞', title: 'Missed Call Follow-Up', desc: 'Every missed call gets an instant text. Every voicemail gets transcribed and actioned. No lead falls through the cracks.' },
  { icon: '📝', title: 'Offer Management', desc: 'Track all offers, generate memorandums of sale, and keep vendors informed — automatically. Professional, transparent, instant.' },
  { icon: '🏠', title: 'Portal Syndication', desc: 'List once, publish everywhere. Rightmove, Zoopla, OnTheMarket — all updated simultaneously from a single voice note.' },
  { icon: '💰', title: 'Fee Tracking', desc: 'Automatic fee calculations on completion, invoice generation, and payment tracking. Your accounts stay clean without admin.' },
]

const PAIN_POINTS = [
  { before: 'Spending 45 mins writing one listing', after: 'Voice note → full listing in 2 minutes' },
  { before: 'Manually emailing buyers one by one', after: 'AI matches and emails instantly on instruction' },
  { before: 'Playing phone tag to arrange viewings', after: 'AI books, confirms, and follows up automatically' },
  { before: 'Losing leads from missed calls', after: 'Every missed call gets an instant follow-up text' },
  { before: 'Hours creating market appraisal packs', after: 'Branded report generated in 30 seconds' },
  { before: 'Chasing solicitors for chain updates', after: 'AI chases weekly and flags delays to you' },
]

export default function EstateAgentsPage() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <>
      <Nav />
      <main style={{ background: '#0a0a0a', color: 'white', fontFamily: "'Inter', sans-serif" }}>

        {/* ═══ HERO ═══ */}
        <section style={{
          minHeight: '85vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '8rem 2rem 4rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div style={{ position: 'absolute', top: '10%', left: '10%', width: 300, height: 300, background: 'rgba(6,182,212,0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, background: 'rgba(212,98,139,0.06)', borderRadius: '50%', filter: 'blur(100px)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
            {/* Butler & Stag case study badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, padding: '0.5rem 1.5rem', borderRadius: 30,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '2rem', backdropFilter: 'blur(8px)',
            }}>
              <img src="/case-studies/butler-stag.png" alt="Butler & Stag" style={{ height: 28, borderRadius: 6, objectFit: 'contain' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Case Study: Butler & Stag Estate Agents</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
              lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Sell More.<br />
              <span style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin Less.</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 2.5rem' }}>
              Your own AI assistant that creates listings from voice notes, emails matching buyers instantly, schedules viewings, and handles compliance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: 'white', padding: '1rem 2.5rem', borderRadius: 12,
                textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 4px 25px rgba(6,182,212,0.3)', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Book a Demo →
              </Link>
              <a href="#demo-prompts" style={{
                background: 'rgba(255,255,255,0.08)', color: 'white', padding: '1rem 2.5rem', borderRadius: 12,
                textDecoration: 'none', fontWeight: 700, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.12)',
              }}>
                See Live Demos ↓
              </a>
            </div>
          </div>
        </section>

        {/* ═══ BEFORE / AFTER ═══ */}
        <section style={{ padding: '5rem 2rem', position: 'relative' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                fontSize: '0.65rem', fontWeight: 700, color: '#ef4444',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                The Problem
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                Before & After anyOS
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {PAIN_POINTS.map((p, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem',
                  alignItems: 'center', padding: '1rem 1.5rem',
                  background: 'rgba(255,255,255,0.03)', borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ef4444', fontSize: 13, fontWeight: 700, flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</span>
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>{p.before}</span>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 22 }}>→</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 700, flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                    <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>{p.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LIVE DEMO PROMPTS — The star of the show ═══ */}
        <section id="demo-prompts" style={{ padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.5rem 1.2rem', borderRadius: 20,
                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
                fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                <img src="/case-studies/butler-stag.png" alt="" style={{ height: 18, borderRadius: 4 }} />
                Live Demo — Butler & Stag
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                Try Saying <span style={{ color: '#06b6d4' }}>This</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem', maxWidth: 500, margin: '0.5rem auto 0' }}>
                Real prompts. Real results. Pick any of these and watch it happen live.
              </p>
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {DEMO_PROMPTS.map((cat, i) => (
                <button key={i} onClick={() => setActiveCategory(i)} style={{
                  padding: '0.6rem 1.2rem', borderRadius: 12, cursor: 'pointer',
                  fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: activeCategory === i ? `${cat.color}25` : 'rgba(255,255,255,0.05)',
                  color: activeCategory === i ? cat.color : 'rgba(255,255,255,0.5)',
                  border: activeCategory === i ? `1px solid ${cat.color}40` : '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span>{cat.icon}</span> {cat.category}
                </button>
              ))}
            </div>

            {/* Prompts display */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEMO_PROMPTS[activeCategory].prompts.map((p, i) => (
                <div key={i} style={{
                  padding: '1.5rem 2rem', borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${DEMO_PROMPTS[activeCategory].color}08`; e.currentTarget.style.borderColor = `${DEMO_PROMPTS[activeCategory].color}30` }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: 6,
                        fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
                        background: 'linear-gradient(90deg, rgba(6,182,212,0.15), transparent)',
                        padding: '8px 14px', borderRadius: 8, display: 'inline-block',
                        borderLeft: `3px solid ${DEMO_PROMPTS[activeCategory].color}`,
                      }}>
                        {p.prompt}
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', margin: '8px 0 0', paddingLeft: 14 }}>{p.desc}</p>
                    </div>
                    <div style={{
                      padding: '4px 12px', borderRadius: 20, flexShrink: 0,
                      background: `${DEMO_PROMPTS[activeCategory].color}15`,
                      border: `1px solid ${DEMO_PROMPTS[activeCategory].color}30`,
                      fontSize: '0.7rem', fontWeight: 700, color: DEMO_PROMPTS[activeCategory].color,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                      {p.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BENEFITS GRID ═══ */}
        <section style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20,
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                fontSize: '0.65rem', fontWeight: 700, color: '#6366f1',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                Full Feature List
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                Everything an Agent Needs
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {BENEFITS.map((b, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)', borderRadius: 16,
                  padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: 28, marginBottom: '0.75rem' }}>{b.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{b.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                fontSize: '0.65rem', fontWeight: 700, color: '#22c55e',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                Getting Started
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                Three Steps to Transform Your Agency
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { step: '01', title: 'We Set Everything Up', desc: 'We install your AI system on dedicated hardware at your office. Your branding, your data, your rules. Takes one afternoon.', color: '#6366f1' },
                { step: '02', title: 'Train It Like a New Hire', desc: 'Spend a few days showing it how you work — your processes, your tone, your standards. It learns fast and never forgets.', color: '#06b6d4' },
                { step: '03', title: 'Watch It Work', desc: 'Your AI handles the admin while you handle the clients. Listings, emails, viewings, compliance — all on autopilot.', color: '#22c55e' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.03)',
                  borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: `3px solid ${s.color}`,
                }}>
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900, color: s.color, opacity: 0.25,
                    fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0, lineHeight: 1,
                  }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>{s.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{
          padding: '6rem 2rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.06))', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          
          <div style={{ maxWidth: 650, margin: '0 auto', position: 'relative' }}>
            <img src="/case-studies/butler-stag.png" alt="Butler & Stag" style={{ height: 48, borderRadius: 10, marginBottom: '1.5rem', objectFit: 'contain' }} />
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.03em', marginBottom: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Ready to Sell More <span style={{ color: '#06b6d4' }}>&amp; Admin Less</span>?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Book a 30-minute demo and we&apos;ll show you exactly how anyOS would work for your agency.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)', color: 'white', padding: '1rem 2.5rem', borderRadius: 12,
                textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 4px 25px rgba(6,182,212,0.3)',
              }}>
                Book a Demo →
              </Link>
              <a href="tel:02089816611" style={{
                background: 'rgba(255,255,255,0.08)', color: 'white', padding: '1rem 2.5rem', borderRadius: 12,
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
