'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

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

/* ───────── SVG Icons ───────── */
const ICONS: Record<string, React.ReactNode> = {
  website: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  booking: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>,
  social: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/><path d="M2 8c0-3.3 2.7-6 6-6"/><path d="M22 8c0-3.3-2.7-6-6-6"/></svg>,
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  seo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  analytics: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1.27c.34-.6.99-1 1.73-1a2 2 0 110 4c-.74 0-1.39-.4-1.73-1H21a7 7 0 01-7 7v1.27c.6.34 1 .99 1 1.73a2 2 0 11-4 0c0-.74.4-1.39 1-1.73V23a7 7 0 01-7-7H3.73c-.34.6-.99 1-1.73 1a2 2 0 110-4c.74 0 1.39.4 1.73 1H5a7 7 0 017-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/></svg>,
  chatbot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/></svg>,
  automation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  crm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  content: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  leads: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  invoicing: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  reviews: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  reports: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  scheduling: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  notifications: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  security: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  integration: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  voice: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  payments: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  loyalty: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  multilang: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>,
}

const CAPABILITIES = [
  { name: 'Website Design', icon: 'website', color: '#6366f1' },
  { name: 'Online Booking', icon: 'booking', color: '#8b5cf6' },
  { name: 'Social Automation', icon: 'social', color: '#ec4899' },
  { name: 'Email Campaigns', icon: 'email', color: '#f59e0b' },
  { name: 'SEO Optimisation', icon: 'seo', color: '#22c55e' },
  { name: 'Live Analytics', icon: 'analytics', color: '#06b6d4' },
  { name: 'AI Agents', icon: 'ai', color: '#6366f1' },
  { name: 'Smart Chatbot', icon: 'chatbot', color: '#8b5cf6' },
  { name: 'Workflow Automation', icon: 'automation', color: '#ec4899' },
  { name: 'CRM & Contacts', icon: 'crm', color: '#f59e0b' },
  { name: 'Content Generation', icon: 'content', color: '#22c55e' },
  { name: 'Lead Capture', icon: 'leads', color: '#06b6d4' },
  { name: 'Auto Invoicing', icon: 'invoicing', color: '#6366f1' },
  { name: 'Review Management', icon: 'reviews', color: '#8b5cf6' },
  { name: 'Smart Reports', icon: 'reports', color: '#ec4899' },
  { name: 'Staff Scheduling', icon: 'scheduling', color: '#f59e0b' },
  { name: 'Push Notifications', icon: 'notifications', color: '#22c55e' },
  { name: 'Security & SSL', icon: 'security', color: '#06b6d4' },
  { name: 'Cloud Database', icon: 'database', color: '#6366f1' },
  { name: 'API Integrations', icon: 'integration', color: '#8b5cf6' },
  { name: 'Voice Assistant', icon: 'voice', color: '#ec4899' },
  { name: 'Payment Processing', icon: 'payments', color: '#f59e0b' },
  { name: 'Loyalty Programs', icon: 'loyalty', color: '#22c55e' },
  { name: 'Multi-language', icon: 'multilang', color: '#06b6d4' },
]

/* ───────── data ───────── */
const FEATURE_DETAILS: Record<string, { title: string; detail: string }> = {
  'Custom website design & build': {
    title: 'Custom Website Design & Build',
    detail: 'A fully bespoke website designed from scratch to match Pukka Padel\'s brand identity. Mobile-first responsive design, fast loading speeds, modern UI/UX, and built on enterprise-grade technology. Includes homepage, about, services, gallery, contact, and any custom pages you need.',
  },
  'Online booking platform': {
    title: 'Online Booking Platform',
    detail: 'A complete court booking system where customers can view availability in real time, select their preferred time slots, and pay online. Includes recurring bookings, group sessions, coaching slots, and automated confirmation emails. Fully integrated with your calendar.',
  },
  'Hosting, SSL & domain management': {
    title: 'Hosting, SSL & Domain Management',
    detail: 'Enterprise-grade cloud hosting with 99.9% uptime guarantee. Free SSL certificate for secure connections, CDN for fast global loading, automatic scaling during peak traffic, and full domain management including DNS configuration.',
  },
  'Automated social media content': {
    title: 'Automated Social Media Content',
    detail: 'AI-powered social media management that creates, schedules, and publishes content across Instagram, Facebook, Twitter/X, and TikTok. Generates branded posts, stories, and reels using your photos and brand guidelines. Includes hashtag strategy, optimal posting times, and engagement tracking.',
  },
  'Automated email campaigns': {
    title: 'Automated Email Campaigns',
    detail: 'Intelligent email marketing that runs on autopilot. Welcome sequences for new members, re-engagement campaigns for lapsed players, promotional blasts for events and offers, birthday emails, and post-visit follow-ups. All branded and personalised with dynamic content.',
  },
  'Monthly analytics reports': {
    title: 'Monthly Analytics Reports',
    detail: 'Comprehensive monthly reports covering website traffic, booking patterns, social media performance, email open rates, revenue trends, and customer behaviour insights. Delivered as a clean dashboard with actionable recommendations for growth.',
  },
  'Priority support & updates': {
    title: 'Priority Support & Updates',
    detail: 'Dedicated support channel with same-day response times. Regular platform updates, new feature rollouts, design refreshes, and content updates all included. You never have to worry about maintenance or keeping things current.',
  },
  'Security patches & backups': {
    title: 'Security Patches & Backups',
    detail: 'Automated daily backups with 30-day retention. Real-time security monitoring, automatic vulnerability patching, DDoS protection, and regular security audits. Your data and your customers\' data stay safe at all times.',
  },
  'Full platform build & design': {
    title: 'Full Platform Build & Design',
    detail: 'Everything from the Managed option, built as a standalone system you own outright. Complete website, booking platform, and automation tools, all designed and developed to Pukka Padel\'s exact specifications. Built with clean, documented code that any developer can maintain.',
  },
  'Website + booking system': {
    title: 'Website + Booking System',
    detail: 'A fully integrated website with embedded booking engine. Customers book and pay directly on your site with no third-party redirects. Includes court management, pricing tiers, membership handling, promo codes, and a staff admin panel for manual bookings.',
  },
  'Social media automation setup': {
    title: 'Social Media Automation Setup',
    detail: 'We configure and deploy your entire social media automation pipeline. AI content generation trained on your brand voice, scheduling tools, cross-platform publishing, analytics dashboards, and a content calendar. You\'ll have everything ready to run independently.',
  },
  'Email marketing automation': {
    title: 'Email Marketing Automation',
    detail: 'Full email automation system configured and handed over. Customer segmentation, trigger-based flows (welcome, re-engagement, post-visit), template library, A/B testing setup, and integration with your booking system for personalised communications.',
  },
  'Complete source code handover': {
    title: 'Complete Source Code Handover',
    detail: 'You receive the entire codebase via a private GitHub repository. Clean, well-documented code with README files, deployment guides, and architecture documentation. You can modify, extend, or hire any developer to work on it. No vendor lock-in.',
  },
  'Database & hosting ownership': {
    title: 'Database & Hosting Ownership',
    detail: 'Your database, your servers, your data. We set up hosting on your preferred provider (or recommend one), migrate everything, and hand over all credentials. You control your own infrastructure and can scale as needed.',
  },
  'Documentation & setup guide': {
    title: 'Documentation & Setup Guide',
    detail: 'A comprehensive setup guide covering every aspect of the system: how to deploy updates, manage bookings, update content, run email campaigns, troubleshoot common issues, and maintain security. Written in plain English, not developer jargon.',
  },
  'Transition support (30 days)': {
    title: 'Transition Support (30 Days)',
    detail: '30 days of dedicated support after handover to ensure a smooth transition. Includes bug fixes, questions, minor adjustments, and a weekly check-in call. After 30 days, optional ongoing support packages are available.',
  },
  'Everything in Client-Owned': {
    title: 'Everything in Client-Owned',
    detail: 'All features from the Client-Owned System option are included as standard. Full platform build, website, booking, social media automation, email marketing, source code, database ownership, documentation, and transition support.',
  },
  'MacBook Pro (configured & ready)': {
    title: 'MacBook Pro (Configured & Ready)',
    detail: 'A brand new MacBook Pro pre-configured with all the tools you need to manage and maintain the platform. Development environment, admin dashboards, analytics tools, content management, and AI automation tools all set up and ready to use out of the box.',
  },
  '3 days in-person training with Jake': {
    title: '3 Days In-Person Training with Jake',
    detail: 'Three full days of hands-on training at your location. Day 1: Platform overview, admin panel, and booking management. Day 2: Social media automation, email campaigns, and content creation. Day 3: Troubleshooting, advanced features, and Q&A. Your team will be fully self-sufficient by the end.',
  },
  'Complete system handbook': {
    title: 'Complete System Handbook',
    detail: 'A printed and digital handbook covering every aspect of the system in detail. Step-by-step guides with screenshots, troubleshooting flowcharts, FAQ sections, and quick-reference cards. Your operational bible for running the platform day to day.',
  },
  'Operational playbook': {
    title: 'Operational Playbook',
    detail: 'A strategic guide covering daily, weekly, and monthly tasks to keep everything running smoothly. Social media content calendars, email campaign schedules, analytics review checklists, and growth strategies. Think of it as your digital operations manual.',
  },
  'Staff training materials': {
    title: 'Staff Training Materials',
    detail: 'Training resources designed for your team members who will use the system day to day. Video walkthroughs, cheat sheets, and role-specific guides (front desk, marketing, management). New staff can get up to speed quickly without needing external support.',
  },
  'Emergency support line (90 days)': {
    title: 'Emergency Support Line (90 Days)',
    detail: 'A dedicated emergency support line for the first 90 days after launch. If anything breaks or you hit a wall, you can reach us directly for immediate assistance. Covers critical bugs, downtime issues, and urgent technical questions.',
  },
  'Quarterly check-in calls (1 year)': {
    title: 'Quarterly Check-in Calls (1 Year)',
    detail: 'Four scheduled video calls over the first year to review performance, discuss optimisations, and plan next steps. We\'ll look at analytics together, suggest improvements, and help you get the most out of the platform as your business grows.',
  },
}

const OPTIONS = [
  {
    id: 1,
    tag: 'MANAGED',
    title: 'Fully Managed Platform',
    price: '1,200',
    unit: '/month',
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.4)',
    description: 'We build it, run it, and keep it humming. You focus on padel, we handle the tech.',
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
    ownership: 'anyOS owns and operates the platform. You get a fully managed service with zero tech headaches.',
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
    glow: 'rgba(139,92,246,0.4)',
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
    ownership: 'You own everything: code, data, hosting, domain. Full control from day one.',
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
    glow: 'rgba(236,72,153,0.4)',
    description: 'The full package. Hardware, software, training: everything you need to run it independently.',
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
    ownership: 'You own the hardware, the software, the data, and you know how to run it all.',
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
  { label: 'Hardware Included', o1: 'None', o2: 'None', o3: 'MacBook Pro' },
  { label: 'In-Person Training', o1: 'None', o2: 'None', o3: '3 days with Jake' },
  { label: 'Ongoing Support', o1: 'Included always', o2: '30 days', o3: '90 days + quarterly' },
]

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We sit down, understand your operations, your brand, your goals. What works, what doesn\'t, what you wish existed.',
    color: '#6366f1',
    timeline: [
      { phase: 'Initial Consultation', duration: 'Day 1', detail: 'Deep-dive meeting to understand Pukka Padel operations, current pain points, branding, and goals.' },
      { phase: 'Competitor & Market Review', duration: 'Days 2-3', detail: 'We analyse your local market, competitor presence, and identify opportunities for digital advantage.' },
      { phase: 'Requirements Document', duration: 'Day 4', detail: 'We deliver a full spec document outlining everything we will build, with wireframes and feature list.' },
      { phase: 'Sign-Off', duration: 'Day 5', detail: 'Review the plan together, lock in scope, and greenlight the build phase.' },
    ],
    totalTime: '~1 week',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'We design and build your platform: website, booking, automations, all tailored to Pukka Padel. You see progress at every stage.',
    color: '#8b5cf6',
    timeline: [
      { phase: 'Design & Branding', duration: 'Week 1-2', detail: 'Full website design, colour palette, typography, and visual identity aligned with Pukka Padel.' },
      { phase: 'Core Development', duration: 'Week 2-4', detail: 'Website build, booking system integration, payment processing, and mobile responsiveness.' },
      { phase: 'Automation Setup', duration: 'Week 4-5', detail: 'Social media scheduling, email campaign templates, AI chatbot configuration, and CRM setup.' },
      { phase: 'Testing & QA', duration: 'Week 5-6', detail: 'Full testing across devices, load testing, security audit, and user acceptance testing with your team.' },
    ],
    totalTime: '~6 weeks',
  },
  {
    num: '03',
    title: 'Launch',
    desc: 'Go live. Everything connected, tested, and running. Depending on your option, we either manage it for you or hand over the keys.',
    color: '#ec4899',
    timeline: [
      { phase: 'Soft Launch', duration: 'Day 1', detail: 'Deploy to production with limited visibility. Final checks on live environment.' },
      { phase: 'Public Launch', duration: 'Day 2-3', detail: 'Full public launch with social media announcement, email blast to existing contacts, and SEO go-live.' },
      { phase: 'Handover / Onboarding', duration: 'Week 1-2', detail: 'For managed plans: onboarding call. For owned plans: full system handover, documentation walkthrough, and training.' },
      { phase: 'Post-Launch Support', duration: 'Ongoing', detail: 'Bug fixes, performance monitoring, and iterative improvements based on real user data.' },
    ],
    totalTime: '~2 weeks',
  },
]

/* ───────── component ───────── */
export default function PukkaProposal() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', plan: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => { setShowForm(false); setFormSubmitted(false) }, 3000)
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

      {/* BIG cursor spotlight */}
      <div style={{
        position: 'fixed',
        left: mousePos.x - 350,
        top: mousePos.y - 350,
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 30%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
        filter: 'blur(10px)',
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
                Proposal - April 2026
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
                x anyOS
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '540px', lineHeight: 1.7, margin: '0 auto 3rem',
            }}>
              A bespoke digital platform to automate bookings, marketing, and operations so you can focus on what matters: the game.
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

        {/* ═══════ CAPABILITIES MARQUEE ═══════ */}
        <section style={{ padding: '2rem 0 4rem', overflow: 'hidden', position: 'relative' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 2rem' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#6366f1',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
              }}>
                What We Deliver
              </span>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}>
                Your complete digital backbone.
              </h2>
            </div>
          </FadeIn>

          {/* Row 1 - scrolls left */}
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <div style={{ display: 'flex', animation: 'marqueeLeft 40s linear infinite', width: 'max-content' }}>
              {[...CAPABILITIES.slice(0, 12), ...CAPABILITIES.slice(0, 12)].map((cap, i) => (
                <div key={`r1-${i}`} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.75rem 1.25rem', marginRight: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                  transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${cap.color}50`
                  e.currentTarget.style.background = `${cap.color}10`
                  e.currentTarget.style.boxShadow = `0 0 30px ${cap.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{ width: 20, height: 20, color: cap.color, flexShrink: 0 }}>
                    {ICONS[cap.icon]}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                    {cap.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - scrolls right (reversed) */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', animation: 'marqueeRight 45s linear infinite', width: 'max-content' }}>
              {[...CAPABILITIES.slice(12), ...CAPABILITIES.slice(12)].map((cap, i) => (
                <div key={`r2-${i}`} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.75rem 1.25rem', marginRight: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                  transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${cap.color}50`
                  e.currentTarget.style.background = `${cap.color}10`
                  e.currentTarget.style.boxShadow = `0 0 30px ${cap.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  <div style={{ width: 20, height: 20, color: cap.color, flexShrink: 0 }}>
                    {ICONS[cap.icon]}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                    {cap.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #050507, transparent)', zIndex: 3, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #050507, transparent)', zIndex: 3, pointerEvents: 'none' }} />
        </section>

        {/* ═══════ PRICING OPTIONS ═══════ */}
        <section id="options" style={{ padding: '4rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
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
                    boxShadow: activeCard === opt.id ? `0 0 80px ${opt.glow}, 0 0 160px ${opt.glow}` : 'none',
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
                        <li
                          key={j}
                          onClick={() => setActiveFeature(f)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '10px',
                            fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)',
                            padding: '0.5rem 0.5rem', lineHeight: 1.5,
                            cursor: 'pointer', borderRadius: '8px',
                            transition: 'background 0.2s, color 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${opt.accent}10`; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke={opt.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0, marginTop: 2 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ flex: 1 }}>{f}</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke={opt.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12, flexShrink: 0, marginTop: 3, opacity: 0.4 }}>
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                          </svg>
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
                      fontSize: '0.78rem', color: val === '✓' ? '#34d399' : val === 'None' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)',
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

        {/* ═══════ PROCESS / TIMELINE ═══════ */}
        <section style={{ padding: '4rem 2rem 6rem', maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, color: '#ec4899',
                letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block',
              }}>
                The Process
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {STEPS.map((step, i) => {
              const isOpen = expandedStep === i
              return (
                <FadeIn key={step.num} delay={i * 0.1}>
                  <div style={{
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isOpen ? `${step.color}40` : 'rgba(255,255,255,0.05)'}`,
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxShadow: isOpen ? `0 0 40px ${step.color}15` : 'none',
                    overflow: 'hidden',
                  }}>
                    {/* Header - clickable */}
                    <div
                      onClick={() => setExpandedStep(isOpen ? null : i)}
                      style={{
                        display: 'flex', gap: '1.5rem', alignItems: 'center',
                        padding: '1.5rem', cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '2.5rem', fontWeight: 800, color: step.color,
                        opacity: 0.3, lineHeight: 1, flexShrink: 0,
                      }}>
                        {step.num}
                      </span>
                      <div style={{ flex: 1 }}>
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 700, color: step.color,
                          padding: '0.25rem 0.75rem', borderRadius: '100px',
                          background: `${step.color}15`, border: `1px solid ${step.color}25`,
                          whiteSpace: 'nowrap',
                        }}>
                          {step.totalTime}
                        </span>
                        <svg viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" style={{
                          width: 20, height: 20,
                          transition: 'transform 0.3s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable timeline */}
                    <div style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0,
                      transition: 'max-height 0.5s cubic-bezier(.16,1,.3,1), opacity 0.3s ease',
                      overflow: 'hidden',
                    }}>
                      <div style={{ padding: '0 1.5rem 1.5rem', paddingLeft: '5.5rem' }}>
                        {step.timeline.map((t, j) => (
                          <div key={j} style={{
                            display: 'flex', gap: '1rem', alignItems: 'flex-start',
                            padding: '0.75rem 0',
                            borderBottom: j < step.timeline.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                          }}>
                            <div style={{
                              width: 8, height: 8, borderRadius: '50%',
                              background: step.color, flexShrink: 0, marginTop: 6,
                              opacity: 0.6,
                            }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                                  {t.phase}
                                </span>
                                <span style={{
                                  fontSize: '0.65rem', fontWeight: 600, color: step.color,
                                  padding: '0.15rem 0.5rem', borderRadius: '4px',
                                  background: `${step.color}10`,
                                }}>
                                  {t.duration}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                                {t.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
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
                Pick the option that fits and we will take it from there. Got questions? Let&apos;s talk.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '0.875rem 2.5rem',
                    background: 'white', color: '#050507',
                    border: 'none', borderRadius: '8px',
                    fontSize: '0.8rem', fontWeight: 800,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  Choose Your Plan
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
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
            &copy; 2026 anyOS - AI that actually does things.
          </p>
        </footer>

      </div>

      {/* ═══════ FEATURE DETAIL MODAL ═══════ */}
      {activeFeature && FEATURE_DETAILS[activeFeature] && (
        <div
          onClick={() => setActiveFeature(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f0f14',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '520px', width: '100%',
              boxShadow: '0 0 80px rgba(99,102,241,0.15)',
              animation: 'popIn 0.3s cubic-bezier(.16,1,.3,1)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setActiveFeature(null)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div style={{
              width: 48, height: 48, borderRadius: '12px',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem',
              letterSpacing: '-0.02em', lineHeight: 1.3,
            }}>
              {FEATURE_DETAILS[activeFeature].title}
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0,
            }}>
              {FEATURE_DETAILS[activeFeature].detail}
            </p>
          </div>
        </div>
      )}

      {/* ═══════ FORM MODAL ═══════ */}
      {showForm && (
        <div
          onClick={() => { if (!formSubmitted) setShowForm(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f0f14',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '480px', width: '100%',
              boxShadow: '0 0 80px rgba(99,102,241,0.15)',
              animation: 'popIn 0.3s cubic-bezier(.16,1,.3,1)',
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  We&apos;ll be in touch
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                  Thanks for your interest. Jake will reach out shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem',
                }}>
                  Choose Your Plan
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Select your preferred option and we will get back to you within 24 hours.
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    type="text" placeholder="Your name" required
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                    style={{
                      padding: '0.75rem 1rem', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.85rem', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <input
                    type="email" placeholder="Email address" required
                    value={formData.email}
                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    style={{
                      padding: '0.75rem 1rem', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.85rem', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <input
                    type="tel" placeholder="Phone number"
                    value={formData.phone}
                    onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                    style={{
                      padding: '0.75rem 1rem', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.85rem', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />

                  <div style={{ position: 'relative' }}>
                    <select
                      required
                      value={formData.plan}
                      onChange={e => setFormData(d => ({ ...d, plan: e.target.value }))}
                      style={{
                        width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: formData.plan ? 'white' : 'rgba(255,255,255,0.4)',
                        fontSize: '0.85rem', outline: 'none',
                        appearance: 'none', cursor: 'pointer',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      <option value="" disabled>Select a plan</option>
                      <option value="managed" style={{ background: '#0f0f14', color: 'white' }}>Option 1: Fully Managed (from £1,200/mo)</option>
                      <option value="owned" style={{ background: '#0f0f14', color: 'white' }}>Option 2: Client-Owned System (from £5,000)</option>
                      <option value="dedicated" style={{ background: '#0f0f14', color: 'white' }}>Option 3: Dedicated System + Training (from £10,000)</option>
                      <option value="unsure" style={{ background: '#0f0f14', color: 'white' }}>Not sure yet, let&apos;s discuss</option>
                    </select>
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      width: 16, height: 16, pointerEvents: 'none',
                    }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  <textarea
                    placeholder="Anything else you'd like to tell us? (optional)"
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                    style={{
                      padding: '0.75rem 1rem', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.85rem', outline: 'none',
                      resize: 'vertical', fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />

                  <button
                    type="submit"
                    style={{
                      padding: '0.875rem', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      border: 'none', color: 'white',
                      fontSize: '0.8rem', fontWeight: 800,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.2); }
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
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
