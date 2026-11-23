# DESIGN SYSTEM: GROUPE MOCOMEL (Awwwards-Grade Architectural Swiss-Grid)

**Project:** Corporate & Commercial Platform for Groupe MOCOMEL (Casablanca, Maroc)  
**Aesthetic Vision:** Architectural Swiss-Grid Industrial — Editorial clarity, dark-to-light monolithic contrast, razor-sharp technical hairlines, and zero generic SaaS gradients. Inspired by leading industrial and infrastructure references (Anduril Industries, ABB, Siemens Energy, Herzog & de Meuron monographs).

---

## 1. Visual Theme & Philosophical Foundations

The design language of Groupe MOCOMEL translates electrical engineering mastery into a digital medium:
1. **Architectural Grid Precision:** Every component adheres to an explicit 12-column and 16-column modular grid with 1px razor-sharp hairlines (`#E2E8F0` on light, `rgba(255, 255, 255, 0.1)` on dark).
2. **Editorial Monolithic Contrast:** Sections transition boldly between deep architectural slate (`#0B1120`) and immaculate porcelain galleries (`#F8FAFC`, `#FFFFFF`), echoing the transition from heavy industrial substations to clean room automation control labs.
3. **Engineered Tri-Entity Theming:** Three distinct operational branches are unified under one parent umbrella, differentiated through purposeful primary accents:
   - **MOCOMEL Ingénierie:** High-voltage precision Emerald Teal (`#007A63`)
   - **MOCOMEL Solutions:** Smart building Royal Blue (`#22409A` / `#5A7BB8`)
   - **MOCOMEL Retail:** Technical supply Deep Crimson (`#9B112B`) & Slate (`#334155`)
4. **Information Architecture (Swiss School):** Functional data hierarchy where technical telemetry (voltages, kVA, sections, MAD HT pricing) is typeset in tabular monospace, while authoritative statements employ monumental Plus Jakarta Sans.

---

## 2. Three-Layer Token Architecture

```
Layer 1: Primitives (Raw brand hex values & absolute measures)
       ↓
Layer 2: Semantics (Context-aware functional tokens: surface, text, border, focus)
       ↓
Layer 3: Component (Entity-bound classes & dedicated UI wrappers)
```

### Layer 1: Primitive Tokens

#### Neutral Canvas & Structural Surfaces
- `--color-slate-950`: `#0B1120` (Deep Architectural Void / Hero & Footer Canvas)
- `--color-slate-900`: `#0F172A` (Secondary Dark Surface / Card Elevate)
- `--color-slate-800`: `#1E293B` (Dark Stroke & Divider)
- `--color-slate-700`: `#334155` (Muted Dark Text / Retail Secondary)
- `--color-slate-600`: `#475569` (Dark Secondary Typography)
- `--color-slate-400`: `#94A3B8` (Subtle Technical Indicators)
- `--color-slate-200`: `#E2E8F0` (Hairline Grid Border / Structural Dividers)
- `--color-slate-100`: `#F1F5F9` (Retail Studio Neutral Canvas)
- `--color-slate-50`: `#F8FAFC` (Porcelain Background / Gallery Fill)
- `--color-white`: `#FFFFFF` (Pure Card White / Contrast Highlights)

#### Entity 1 — MOCOMEL Ingénierie (HT/BT & Postes)
- `--color-ingenierie-primary`: `#007A63` (Emerald Teal)
- `--color-ingenierie-hover`: `#005F4D` (Deep Forest Green)
- `--color-ingenierie-accent`: `#D97706` (Amber Industrial Indicator)
- `--color-ingenierie-tint`: `#ECFDF5` (Soft Emerald Fill)

#### Entity 2 — MOCOMEL Solutions (Courant Faible & Sûreté)
- `--color-solutions-primary`: `#22409A` (Corporate Royal Blue)
- `--color-solutions-hover`: `#1D4ED8` (Electric Blue State)
- `--color-solutions-secondary`: `#5A7BB8` (Cerulean Muted Slate)
- `--color-solutions-tint`: `#EFF6FF` (Soft Royal Tint)

#### Entity 3 — MOCOMEL Retail (Comptoir B2B)
- `--color-retail-primary`: `#9B112B` (Deep Industrial Crimson)
- `--color-retail-hover`: `#7E0E23` (Dark Crimson Press)
- `--color-retail-secondary`: `#334155` (Technical Slate)
- `--color-retail-tint`: `#FFF1F2` (Soft Crimson Tint)

---

### Layer 2: Semantic Tokens (Light & Dark System)

| Token Name | Light Surface Role | Dark Surface Role |
| :--- | :--- | :--- |
| `--surface-canvas` | `#FFFFFF` (Pure White) | `#0B1120` (Architectural Slate) |
| `--surface-elevated` | `#F8FAFC` (Porcelain) | `#0F172A` (Elevated Panel) |
| `--surface-subtle` | `#F1F5F9` (Studio Neutral) | `#1E293B` (Sunken Card Surface) |
| `--border-hairline` | `#E2E8F0` (1px Solid) | `rgba(255, 255, 255, 0.1)` |
| `--border-strong` | `#CBD5E1` (Interactive Border)| `rgba(255, 255, 255, 0.2)` |
| `--text-primary` | `#0F172A` (Deepest Charcoal) | `#F8FAFC` (Pure Titanium) |
| `--text-secondary` | `#475569` (Slate Mid-tone) | `#94A3B8` (Atmospheric Muted) |
| `--text-tertiary` | `#94A3B8` (Technical Muted) | `#64748B` (De-emphasized Spec) |

---

### Layer 3: Dynamic Entity Theming

Applied via `.theme-ingenierie`, `.theme-solutions`, and `.theme-retail` wrapper scopes:

```css
/* Entity Theming Scope Variables */
.theme-ingenierie {
  --entity-primary: #007A63;
  --entity-hover: #005F4D;
  --entity-tint: #ECFDF5;
  --entity-badge-text: #007A63;
  --entity-badge-bg: #ECFDF5;
  --entity-border: rgba(0, 122, 99, 0.2);
}

.theme-solutions {
  --entity-primary: #22409A;
  --entity-hover: #1D4ED8;
  --entity-tint: #EFF6FF;
  --entity-badge-text: #22409A;
  --entity-badge-bg: #EFF6FF;
  --entity-border: rgba(34, 64, 154, 0.2);
}

.theme-retail {
  --entity-primary: #9B112B;
  --entity-hover: #7E0E23;
  --entity-tint: #FFF1F2;
  --entity-badge-text: #9B112B;
  --entity-badge-bg: #FFF1F2;
  --entity-border: rgba(155, 17, 43, 0.2);
}
```

---

## 3. Typography Architecture

### Font Families
- **Display Headings (`--font-heading`):** `Plus Jakarta Sans` (Geometric, architectural, confident, precise apertures).
- **Body & Interface (`--font-body`):** `Inter` (Neutral Swiss grotesque, optimized for complex technical copy, high x-height, flawless legibility in French).
- **Technical Specs & Telemetry (`--font-mono`):** `JetBrains Mono` (Code-grade tabular numerals, voltages e.g. `22 kV`, sections `240 mm²`, prices `MAD HT`).

### Modular Scale (Major Third — 1.250 Ratio)
- **Hero Display:** `3.5rem` to `4.5rem` (`56px`–`72px`), leading `1.05`, tracking `-0.03em`, weight `800`.
- **H1 Section Title:** `2.5rem` to `3.25rem` (`40px`–`52px`), leading `1.15`, tracking `-0.025em`, weight `700`.
- **H2 Subsection:** `1.875rem` to `2.25rem` (`30px`–`36px`), leading `1.25`, tracking `-0.02em`, weight `700`.
- **H3 Card Header:** `1.25rem` to `1.5rem` (`20px`–`24px`), leading `1.35`, tracking `-0.01em`, weight `600`.
- **Technical Overline / Tag:** `0.75rem` (`12px`), uppercase, leading `1.2`, tracking `0.1em`, weight `700` (`font-mono`).
- **Body Large:** `1.125rem` (`18px`), leading `1.6`, weight `400`.
- **Body Regular:** `1rem` (`16px`), leading `1.5`, weight `400`.
- **Body Small / Caption:** `0.875rem` (`14px`), leading `1.5`, weight `400`.
- **Micro Data / Status:** `0.75rem` (`12px`), leading `1.4`, tabular figures (`font-variant-numeric: tabular-nums`).

---

## 4. Architectural Geometry & Elevation

- **Corner Radii:** Strictly disciplined.
  - Buttons & Technical Pills: `4px` (`rounded-sm` or `rounded`) for precision instrument feel.
  - Cards & Architectural Frames: `6px` to `8px` (`rounded-md`).
  - Circular Indicators & Avatar Badges: `9999px` (`rounded-full`).
  - No bloated or bubbly corners (`rounded-3xl` forbidden on structural components).
- **Borders & Dividers:**
  - Structural Hairlines: `1px solid var(--border-hairline)`.
  - Grid intersections feature subtle crosshair markers (`+`) in high-level editorial headers.
- **Shadows & Depth:**
  - Standard Elevation: Whisper-thin border contrast (`box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)`).
  - Hover Elevation: Clean spatial lift (`0 10px 25px -5px rgba(11, 17, 32, 0.08)`).
  - Zero heavy fuzzy drop shadows.

---

## 5. Component Styling Patterns

### Technical Buttons
- **Primary Action:** Solid fill with entity color, white text, 4px radius, `font-medium`, 0.01em letter spacing. Smooth scale hover `transform: translateY(-1px)`.
- **Secondary Action:** Transparent fill, 1px hairline border, subtle background tint on hover.
- **Monospace Action (RFQ / Technical):** JetBrains Mono uppercase, arrow indicator (`->`), instant tactile state.

### Engineering Cards
- 1px hairline border, solid surface (`#FFFFFF` or `#0F172A`).
- Top-anchored metadata pill showing branch (`MOCOMEL INGÉNIERIE` / `SOLUTIONS` / `RETAIL`).
- Crisp image frame with 4:3, 16:9, or 3:4 aspect ratio.

### Live Telemetry Indicators
- Pulsing green status dot (`#10B981`) for accredited ONEE status.
- Technical stat badges (`+40 COLLABORATEURS`, `22 kV HTA`, `3200A TGBT`).
