# Milestone 2: Site Architecture & All Commercial Pages (100% French)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete multi-page architecture, global Quote Cart Store, dynamic multi-brand Header & Footer, and all 6 commercial and editorial pages for Groupe MOCOMEL in 100% French.

**Architecture:** Next.js App Router with React Context store for Quote Cart, modular layout shell (Header with entity detection and live quote badge, Architectural Dark Footer with 3 Casablanca locations and official legal identifiers), typed French data repositories, and 6 high-conversion commercial routes (`/`, `/ingenierie`, `/solutions`, `/retail`, `/realisations`, `/contact`).

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, shadcn/ui components (`button`, `card`, `badge`, `input`, `dialog`, `separator`).

**Spec:** `mocomel_corporate_knowledge_base.md`, `DESIGN.md`, and User Milestone 2 Requirements.

## Global Constraints
- **Language:** 100% French across all copy, labels, tooltips, buttons, metadata.
- **Accuracy:** Zero lorem ipsum, zero invented data. All locations, phones, clients, certifications, and technical specs strictly from `mocomel_corporate_knowledge_base.md`.
- **Entity Identity:** Respect color palettes and typography rules defined in `DESIGN.md`.

---

### Task 1: Typed French Data Layer (`/src/data/`)

**Files:**
- Create: `src/data/retail-catalog.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/clients.ts`
- Create: `src/data/company.ts`

**Interfaces:**
- Produces: Strictly typed constants for Retail Catalog (all 8 categories), 5 Executed Projects, 12 Official Clients, and Institutional Company Metadata.

- [ ] **Step 1: Create `src/data/company.ts` with institutional data, locations, and legal identifiers**
- [ ] **Step 2: Create `src/data/retail-catalog.ts` with all 8 B2B categories and brochure items**
- [ ] **Step 3: Create `src/data/projects.ts` with the 5 executed flagship projects**
- [ ] **Step 4: Create `src/data/clients.ts` with the 12 accredited partners & clients**

---

### Task 2: Global Shell & Quote Cart State

**Files:**
- Create: `src/context/quote-cart-context.tsx`
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx` (wrap with `QuoteCartProvider`, mount Header and Footer)

**Interfaces:**
- Consumes: Next.js Navigation (`usePathname`), `src/data/company.ts`
- Produces: Shared quote cart accessible from anywhere, dynamic header with entity branding, and architectural dark footer.

- [ ] **Step 1: Implement `QuoteCartProvider` with `localStorage` persistence and cart actions**
- [ ] **Step 2: Implement `Header` component with dynamic entity logo switcher, nav links, live cart badge, and mobile drawer**
- [ ] **Step 3: Implement `Footer` component with 3 entity scopes, 3 Casablanca addresses, legal IDs, and accreditation badges**
- [ ] **Step 4: Wire `QuoteCartProvider`, `Header`, and `Footer` into `src/app/layout.tsx`**

---

### Task 3: Homepage Implementation (`src/app/page.tsx`)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/home/hero-section.tsx`
- Create: `src/components/home/telemetry-strip.tsx`
- Create: `src/components/home/entity-showcase.tsx`
- Create: `src/components/home/clients-marquee.tsx`
- Create: `src/components/home/featured-projects.tsx`
- Create: `src/components/home/philosophy-cta.tsx`

**Interfaces:**
- Consumes: `hero-power-grid.mp4`, `team-philosophy.jpg`, `projects.ts`, `clients.ts`
- Produces: Awwwards-grade corporate showcase homepage.

- [ ] **Step 1: Build full-viewport Hero with video background, telemetry strip, and dual CTAs**
- [ ] **Step 2: Build 3-Entity expanding showcase cards (Ingénierie, Solutions, Retail)**
- [ ] **Step 3: Build ONEE accreditation highlight and client logo marquee**
- [ ] **Step 4: Build Featured Projects teaser and Philosophy conversion block**

---

### Task 4: Entity Pages (`/ingenierie` & `/solutions`)

**Files:**
- Create: `src/app/ingenierie/page.tsx`
- Create: `src/app/solutions/page.tsx`

**Interfaces:**
- Consumes: `ingenierie-workshop.mp4`, `card-solutions.jpg`, `solutions-security.jpg`, entity theme CSS tokens.

- [ ] **Step 1: Build `/ingenierie` with split video hero, 5-step lifecycle, 3 technical pillars, and ONEE compliance**
- [ ] **Step 2: Build `/solutions` with editorial hero, 3 security/smart-building domains, sectors grid, and CTA**

---

### Task 5: Commercial Retail Catalog Page (`/retail`)

**Files:**
- Create: `src/app/retail/page.tsx`
- Create: `src/components/retail/product-card.tsx`
- Create: `src/components/retail/category-filter.tsx`

**Interfaces:**
- Consumes: `retail-catalog.ts`, `useQuoteCart()`
- Produces: Live search and category filtering product catalog with direct quote adding.

- [ ] **Step 1: Build Category filter pills and live search bar**
- [ ] **Step 2: Build Product Card with quantity stepper, unit selector, and "+ Ajouter au devis" instant feedback**
- [ ] **Step 3: Wire product grid and cart toast notification**

---

### Task 6: Réalisations & Contact Pages (`/realisations` & `/contact`)

**Files:**
- Create: `src/app/realisations/page.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `projects.ts`, `company.ts`, `shadcn/ui` Dialog.

- [ ] **Step 1: Build `/realisations` filterable project gallery with technical modal dialog**
- [ ] **Step 2: Build `/contact` with 3 Casablanca locations cards, phone/WhatsApp links, and map frame**

---

### Task 7: Build Verification & Gate Check

- [ ] **Step 1: Run `npm run build` to verify clean compilation with zero TypeScript errors**
- [ ] **Step 2: Verify all 6 routes render statically**
- [ ] **Step 3: Document completed architecture for user confirmation**
