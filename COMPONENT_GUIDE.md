# Ananya Jain — Portfolio Architecture & Next.js / React Guide

This guide documents the design system, component hierarchy, and step-by-step conversion if you wish to run this portfolio in a **Next.js 14+ (App Router) + Tailwind CSS** project.

---

## 1. Design System & Color Tokens

The visual style is **Chic Minimalist & Soft Tech**: an editorial, deeply professional layout infused with tasteful warm cream, dusty rose, and champagne gold accents.

### Tailwind CSS Configuration (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#EBE5DC',
        },
        slate: {
          850: '#1C1B20',
          900: '#121117',
        },
        rose: {
          soft: '#C47B74',
          hover: '#B26B64',
          light: '#F9EBEA',
        },
        blush: {
          soft: '#E8B4B8',
          light: '#FBF4F5',
        },
        lavender: {
          soft: '#8E7DA8',
          light: '#F2EEF8',
        },
        gold: {
          soft: '#C5A059',
          light: '#FAF4E6',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
};
```

---

## 2. Next.js App Router Component Structure

```
portfolio/
├── app/
│   ├── layout.tsx         # Google Fonts (Playfair Display + Plus Jakarta Sans) + Theme Provider
│   ├── page.tsx           # Assembles all sections
│   └── globals.css        # Tailwind directives + glassmorphism utilities
├── components/
│   ├── Navbar.tsx         # Frosted glass header, theme toggle, mobile drawer
│   ├── Hero.tsx           # Status badge, headline, CTAs, portrait, metrics strip
│   ├── About.tsx          # Editorial narrative, quote block, academic milestone cards
│   ├── Projects.tsx       # Live project showcase (Commuto)
│   ├── ProjectModal.tsx   # Deep-dive architecture modal with diagrams
│   ├── Skills.tsx         # Bento grid categorized by technical domain
│   ├── Certifications.tsx # Credential cards with verified seals & verification modal
│   ├── CertModal.tsx      # Interactive verified credential inspector
│   ├── Leadership.tsx     # Class Representative responsibility showcase
│   ├── Contact.tsx        # Contact card (one-click copy) + interactive form
│   ├── ResumeModal.tsx    # Printable resume layout modal
│   └── Footer.tsx         # Monogram, quick navigation, copyright
├── data/
│   ├── projects.ts        # Typed project records
│   └── certs.ts           # Verification IDs, issuing dates, and skills
└── public/
    └── images/
        ├── ananya_portrait.jpg
        └── commuto.jpg
```

---

## 3. Sample Next.js Component Implementations

### `components/Hero.tsx` (with Framer Motion)

```tsx
'use client';

import Image from 'next/image';
import { ArrowRight, Mail, Download, Server, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <section className="min-h-[90vh] pt-36 pb-20 flex items-center bg-cream-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Software Engineering Roles • B.Tech '27 (CGPA 9.58)
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-slate-850 dark:text-cream-50 leading-[1.15] mb-6">
            Engineering scalable systems with <span className="italic font-normal text-rose-soft">architectural rigor</span> & thoughtful design.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
            Aspiring <strong>Full Stack Developer</strong> with strong foundations in <strong>Java</strong>, <strong>Data Structures & Algorithms</strong>, <strong>OOP</strong>, and <strong>SQL</strong>.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose-soft hover:bg-rose-hover text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-850 dark:text-cream-50 font-semibold text-sm hover:border-rose-soft transition-all">
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
            <button onClick={onOpenResume} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold-light dark:bg-gold-soft/10 border border-gold-soft/30 text-gold-soft font-semibold text-sm hover:bg-gold-soft hover:text-white transition-all">
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Portrait Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Floating Pill Top Left */}
          <div className="absolute -top-4 -left-6 z-10 hidden sm:flex items-center gap-3 px-4 py-3 bg-white/90 dark:bg-slate-850/90 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg">
            <div className="w-9 h-9 rounded-full bg-rose-light text-rose-soft flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-850 dark:text-white">Java, JSP & Servlets</div>
              <div className="text-[11px] text-slate-500">Backend & REST APIs</div>
            </div>
          </div>

          <div className="relative w-full max-w-[380px] aspect-[4/4.8] rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10">
            <Image 
              src="/images/ananya_portrait.jpg" 
              alt="Ananya Jain" 
              fill 
              className="object-cover object-top hover:scale-105 transition-transform duration-700" 
              priority 
            />
          </div>

          {/* Floating Pill Bottom Right */}
          <div className="absolute -bottom-4 -right-6 z-10 hidden sm:flex items-center gap-3 px-4 py-3 bg-white/90 dark:bg-slate-850/90 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg">
            <div className="w-9 h-9 rounded-full bg-lavender-light text-lavender-soft flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-850 dark:text-white">Next.js & TypeScript</div>
              <div className="text-[11px] text-slate-500">Reactive Architecture</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 4. Key Highlights of the Single-Page Version

The single-page HTML/CSS/JS implementation currently in this repository already contains:
1. **Zero build dependencies required**: You can open `index.html` right now in Chrome or Edge, or push to GitHub Pages in seconds.
2. **Instant Light/Dark Mode**: Soft Day Cream `#FAF8F5` and Midnight Velvet `#121117`.
3. **Interactive Modals**:
   - Commuto Safety logic & architecture modal explaining the women-only matching algorithm and emergency SOS triggers.
   - Verified Credential Inspector with automated credential ID copying for ServiceNow CSA, CAD, and Google Cloud.
   - Resume preview modal with direct `window.print()` formatting.
4. **Copy-to-Clipboard with Toast Feedback**: Immediate visual confirmation when copying email or phone.
5. **SEO & Social OpenGraph Tags**: Pre-configured with schema metadata for search engines and LinkedIn previews.
