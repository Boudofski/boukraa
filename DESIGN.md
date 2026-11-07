# DESIGN.md — COACH BOUKRAA DESIGN SYSTEM SPECIFICATION

> **Brand:** BOUKRAA — Mohamed Amine Boukraa  
> **Core Motto:** SIMPLE. EFFECTIVE. PURPOSEFUL.  
> **Aesthetic DNA:** Luxury Athletic Performance · Sports Science Editorial · Obsidian & Performance Crimson  
> **Inspirations:** Ferrari Scuderia / BMW M / Nike Lab / Tracksmith / Vercel Web Guidelines

---

## 1. Visual Theme & Atmosphere
- **Atmosphere:** Dark, cinematic, European-engineered athletic performance. Pure confidence, clinical precision, zero gimmickry.
- **Base Canvas:** Deep Obsidian Black (`#08090C` / `#0C0E14`), moving completely away from outdated muddy greenish-navy.
- **Brand Voltage:** Performance Crimson (`#EE1B24` / `#E5232A`), deployed with razor-sharp discipline for high-conversion CTAs, active states, progress indicators, and verified badges.
- **Surface Elevation:** Crisp charcoal slate layers (`#11151F` → `#171D2B`) bound by micro-hairline borders (`rgba(255, 255, 255, 0.08)` to `0.14`).
- **Photography:** 100% authentic photography of Mohamed Amine Boukraa (pitch coaching, athlete periodization on monitor, whiteboard tactical analysis, trackside portrait).

---

## 2. Color Palette & Roles

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `canvas-base` | `#08090C` | Root page background, deep obsidian |
| `canvas-subtle` | `#0D1017` | Alternate section background |
| `surface-card` | `#111622` | Cards, panels, interactive containers |
| `surface-elevated`| `#171E2E` | Hovered cards, dropdowns, modal surfaces |
| `surface-glass` | `rgba(17, 22, 34, 0.75)` | Floating navigation, blur backdrops |
| `brand-crimson` | `#EE1B24` | Primary conversion voltage, CTA fill, accents |
| `brand-crimson-hover` | `#D0121A` | Button hover and active states |
| `brand-crimson-subtle` | `rgba(238, 27, 36, 0.12)`| Accent badges, active pill backgrounds |
| `text-primary` | `#FFFFFF` | Display headlines, bold labels |
| `text-strong` | `#F1F3F5` | Body titles, prominent copy |
| `text-secondary` | `#9CA3AF` | Supporting paragraphs, descriptions |
| `text-muted` | `#6B7280` | Metadata, tags, timestamps |
| `border-hairline` | `rgba(255, 255, 255, 0.08)` | Dividers, card boundaries |
| `border-strong` | `rgba(255, 255, 255, 0.16)` | Active borders, hover outlines |
| `border-accent` | `rgba(238, 27, 36, 0.45)` | Selected cards, focus states |

---

## 3. Typography Hierarchy

- **Latin Font:** `Montserrat`, -apple-system, BlinkMacSystemFont, sans-serif
- **Arabic Font:** `Tajawal`, `Cairo`, sans-serif (proper RTL typography, ligatures, and optical sizing)
- **Monospace Accent:** `ui-monospace`, `SFMono-Regular`, `Menlo`, monospace (for stats, codes, and science badges)

| Role | Font & Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `clamp(2.5rem, 6vw, 4.5rem)` | Black (900) | `-0.03em` | Primary Hero statement |
| **Section H2** | `clamp(1.75rem, 4vw, 3rem)` | Black (900) | `-0.02em` | Major section headers |
| **Card H3** | `1.25rem - 1.5rem` | Extrabold (800) | `-0.01em` | Service & feature card titles |
| **Eyebrow / Badge** | `0.75rem (12px)` | Black (900) | `+0.15em` | Uppercase category tags |
| **Body Large** | `1.125rem (18px)` | Medium (500) | `normal` | Hero subtext, lead paragraphs |
| **Body Regular** | `0.9375rem (15px)` | Regular (400) | `normal` | Explanatory copy, card features |
| **Technical Label** | `0.75rem (12px)` | Mono Bold (700) | `+0.1em` | Sports science parameters, RPE |

---

## 4. Components & Micro-Interactions

### Buttons
- **Primary CTA:** Performance Crimson (`#EE1B24`), text white, `font-black`, `uppercase`, tracking `0.05em`. Rounded `12px` (`rounded-xl`). Subtle red radial glow (`shadow-lg shadow-brand-crimson/25`). Hover: scale `1.02`, background `#D0121A`. Active: scale `0.98`.
- **Secondary Ghost:** Surface elevated, border `border-white/10`, hover `border-white/25 text-white`.
- **Quick Selector Pills:** Rounded `9999px` (`rounded-full`), `px-4 py-2`, `bg-white/5 border border-white/10`, hover `border-brand-crimson/50 text-white`.

### Cards & Surfaces
- High-grade obsidian glass: `background: rgba(17, 22, 34, 0.7)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255, 255, 255, 0.08)`.
- Hover transformation: subtle `-4px` vertical lift, `border-color: rgba(238, 27, 36, 0.4)`, glow `0 12px 30px -10px rgba(0, 0, 0, 0.8)`.

### Form & Questionnaire UX
- Single-question mobile-first focus.
- Strict 16px minimum text size on inputs (avoids iOS Safari zoom bug).
- Crisp progress indicator (`03 / 09`) with a vibrant crimson progress bar.
- Direct validation, keyboard friendly (`Enter` to advance), thumb-friendly navigation bar on mobile.

---

## 5. Mobile Ergonomics & Breakpoints
- **Breakpoints:** Mobile `< 640px` (sm), Tablet `640px - 1024px` (md/lg), Desktop `> 1024px` (xl/2xl).
- **Sticky Mobile Conversion Bar:** Floats smoothly at viewport bottom on small screens with a single tap action: `COMMENCER LE BILAN →`.
- **Touch Targets:** Minimum 48px height across all clickable elements with generous padding.
- **RTL Integrity:** Arabic layout mirrors navigation, directional icons (`ArrowRight` becomes `rotate-180`), alignment, and progress bars smoothly without layout shifts.

---

## 6. Authentic Photographic Assets
1. `boukraa-hero-portrait.jpg`: Track portrait with whistle and stopwatch (Confidence, Authority).
2. `boukraa-program-building.jpg`: Workstation monitor showing Football Athlete Periodization, Trap Bar Deadlift protocol, BOUKRAA notebook (Individualization, Science).
3. `boukraa-coach-pitch.jpg`: Coach Boukraa on football pitch in Morocco kit (Credibility, High-Performance).
4. `boukraa-tactics-board.jpg`: Tactical whiteboard with players (Strategy, Pedagogy).
5. `boukraa-pitch-action.jpg`: Supervising field drill execution (Precision, Real-world coaching).
