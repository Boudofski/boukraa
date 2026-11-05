# BOUKRAA — Website Platform

> **SIMPLE. EFFECTIVE. PURPOSEFUL.**  
> *Personalized training built around you.*  
> Official web platform for **Mohamed Amine Boukraa** — PE Teacher, Strength & Conditioning Coach, and Football Coach.

---

## 🌟 Overview

BOUKRAA is a premium, mobile-first client acquisition and athletic assessment platform designed to:
1. Present Mohamed Amine Boukraa’s coaching philosophy, background, and athletic methodology.
2. Allow prospective athletes and clients to choose from 3 core offerings:
   - **01 — Strength & Conditioning** (Performance & physical preparation)
   - **02 — Réathlétisation** (Late-stage return-to-sport physical preparation after rehabilitation)
   - **03 — Private Coaching** (Direct 1-on-1 personalized coaching)
3. Guide clients through a focused, **one-question-at-a-time mobile-first assessment** right on the homepage without navigating away.
4. Reinforce genuine client capacity limits (honest monthly quota) post-submission.
5. Provide Coach Mohamed Amine Boukraa with a built-in, secure administrative portal to review dossiers, manage statuses, save private coaching notes, open direct WhatsApp chats with 1 click, and export submissions to CSV.

---

## 🎨 Visual Identity & Brand System

- **Colors**:
  - Deep Navy: `#071827` (60%)
  - Navy Steel: `#102A3B` (25%)
  - Performance Red: `#F21D27` (5%)
  - Soft Silver: `#D9E0E5`
  - Off White: `#F5F7F8` (10%)
  - Cool Gray: `#9BA9B3`
  - Charcoal: `#172027`
- **Typography**: Montserrat (Latin) paired with Tajawal / Cairo (Arabic).
- **Geometry**: Subtle diagonal accents inspired by the 3 slashes of the BOUKRAA logo mark.
- **Photography**: Professional coaching imagery establishing quiet authority, scientific thinking, and individualization.

---

## 🌐 Multilingual & RTL Architecture

- **Supported Languages**:
  - 🇫🇷 **Français** (FR) — Default
  - 🇸🇦 **العربية** (AR) — Full Right-to-Left (RTL) layout, mirrored navigation, and Arabic typography
  - 🇬🇧 **English** (EN)
- **Language Switcher**: Prominently accessible in the header and footer.
- **Persistence**: Saved automatically in `localStorage`.

---

## 📋 Interactive Questionnaires

All 3 service questionnaires feature:
- One question at a time.
- Thin red progress bar + question step counter (e.g. `03 / 10`).
- Conditional questions (e.g., injuries or physical limitations dynamically toggle follow-up explanation fields).
- International phone input with WhatsApp indicator.
- Summary review step prior to submission.
- Scarcity acknowledgment + Reference Code generator (e.g., `BK-2026-XXXX`).
- Direct 1-click WhatsApp button to reach Coach Boukraa with pre-filled reference details.

---

## 🛡️ Coach Admin Portal (`/admin` / Shield Button)

A secure management dashboard for Coach Mohamed Amine Boukraa:
- **Passcode**: `boukraa2026` *(configurable via `ADMIN_PASSWORD` in `.env`)*
- **Features**:
  - Real-time submission counters (Total, New, Contacted, Accepted/Active).
  - Filter by Service and Status (`NEW`, `REVIEWING`, `CONTACTED`, `ACCEPTED`, `PAYMENT_PENDING`, `ACTIVE`, `COMPLETED`).
  - Search by athlete name, phone number, sport, or goals.
  - Complete athlete questionnaire profile modal.
  - 1-Click "Contact via WhatsApp" pre-filling the athlete's name in their chosen language.
  - Coach Private Notes auto-saving to SQLite database.
  - One-click CSV export of all client assessment dossiers.

---

## 🚀 Quick Start

### 1. Requirements
- Node.js 18+ (tested on Node 26)
- npm 9+

### 2. Installation
```bash
npm install
```

### 3. Development Mode (Frontend + Backend API concurrently)
```bash
npm run dev
```
- Frontend will run on: `http://localhost:5173`
- Backend API will run on: `http://localhost:3001`

### 4. Production Build & Run
```bash
npm run build
npm start
```
- Complete standalone production application running on: `http://localhost:3001`

---

## 📁 Project Structure

```
BOUKRAA/
├── assets/                  # High-resolution coach photography
├── public/                  # Static assets & brand logos
│   ├── assets/              # Web-optimized coach photos
│   ├── favicon.png          # BOUKRAA icon favicon
│   ├── logo-header.png      # Header horizontal lockup
│   ├── logo-mark.png        # Icon mark
│   ├── logo-stacked.png     # Stacked vertical logo
│   ├── robots.txt           # Search engine directives
│   └── sitemap.xml          # Multilingual sitemap
├── server/
│   └── index.ts             # Express API server with SQLite persistence
├── data/                    # SQLite database storage (submissions.db)
├── src/
│   ├── components/
│   │   ├── Header.tsx                 # Navigation & language switcher
│   │   ├── Hero.tsx                   # Hero section with Photo 1
│   │   ├── ServicesSection.tsx        # 3 service assessment cards
│   │   ├── AssessmentModal.tsx        # One-question-at-a-time flow
│   │   ├── HowItWorks.tsx             # 3-step client journey
│   │   ├── ApproachSection.tsx        # Approach with Photo 2 & pricing policy
│   │   ├── PrivateCoachingSection.tsx # Direct 1-on-1 coaching
│   │   ├── CoursesSection.tsx         # Courses Coming Soon + waitlist
│   │   ├── AboutSection.tsx           # Mohamed Amine Boukraa biography
│   │   ├── FinalCTA.tsx               # Direct conversion section
│   │   ├── Footer.tsx                 # Footer with links & logo
│   │   └── AdminPortal.tsx            # Protected Coach CRM dashboard
│   ├── context/
│   │   └── LanguageContext.tsx        # Multilingual & RTL management
│   ├── data/
│   │   └── servicesData.ts            # Detailed questionnaire definitions
│   ├── i18n/
│   │   └── translations.ts            # FR, AR (RTL), and EN content
│   ├── types.ts                       # TypeScript interfaces
│   ├── index.css                      # Tailwind & custom brand styling
│   ├── App.tsx                        # Main page assembly
│   └── main.tsx                       # React entrypoint
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🔒 Security & Privacy

- Client submissions contain sensitive health, fitness, and injury details.
- Database entries are stored on the server filesystem (`data/submissions.db`) and are only accessible via authenticated Bearer token.
- No client accounts or passwords required for athletes.
