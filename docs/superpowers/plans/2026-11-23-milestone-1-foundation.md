# Milestone 1: Foundation, Design System & AI Media Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the foundational architecture, design tokens, processed brand assets, and custom AI-generated media for Groupe MOCOMEL's Awwwards-caliber B2B corporate and commercial website.

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS configured with a 3-layer CSS custom property system (`primitive -> semantic -> component`). Architectural Swiss-Grid Industrial aesthetic with dark-to-light editorial contrast, razor-sharp hairlines, and dynamic 3-entity theming (MOCOMEL Ingénierie, MOCOMEL Solutions, MOCOMEL Retail). All media assets generated ahead of page development into `/public/media/` and optimized transparent logos into `/public/logos/`.

**Tech Stack:** Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, shadcn/ui, Google Fonts (`next/font/google` for Plus Jakarta Sans, Inter, JetBrains Mono), Python Pillow for image cropping and transparency generation, Higgsfield & Google AI for video and photography generation.

**Spec:** `c:\Users\ayoub\Downloads\Ayoub's Lab\MOCOMEL\mocomel_corporate_knowledge_base.md` & User Milestone 1 Requirements.

## Global Constraints
- **Language:** 100% French for all user-facing copy, labels, metadata, buttons, error states.
- **Source of Truth:** All corporate data, addresses, numbers, names, and clients strictly from `mocomel_corporate_knowledge_base.md`. Never hallucinate or invent legal identifiers or project details.
- **Visual Aesthetic:** Awwwards-grade Architectural Swiss-Grid Industrial aesthetic. Razor-sharp hairlines (`border-border`), dark architectural slate (`#0B1120`), pure white surfaces, high-contrast typography, zero generic SaaS rainbow gradients.
- **Zero Database:** No external database or Supabase.

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`, `components.json`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/lib/utils.ts`

**Interfaces:**
- Consumes: Next.js + React + Tailwind + Lucide React
- Produces: Working Next.js project structure with `@/*` path alias and shadcn utility functions

- [ ] **Step 1: Initialize Next.js project with Tailwind CSS & TypeScript**
- [ ] **Step 2: Install core dependencies (`clsx`, `tailwind-merge`, `lucide-react`, `class-variance-authority`)**
- [ ] **Step 3: Setup `components.json` and configure shadcn structure**
- [ ] **Step 4: Verify build with `npm run build`**

---

### Task 2: Process & Optimize Logos into `/public/logos/`

**Files:**
- Read: `20394_MOCOMEL_DY-01 (1).jpg`, `MOCOMEL SOLUTIONS.jpg`, `MOCOMEL Retail.jpg`
- Create: `public/logos/logo-mocomel.png`
- Create: `public/logos/logo-solutions.png`
- Create: `public/logos/logo-retail.png`
- Create: `public/logos/logo-mocomel-white.png`
- Create: `public/logos/logo-solutions-white.png`
- Create: `public/logos/logo-retail-white.png`

**Interfaces:**
- Consumes: Raw JPG assets in root directory
- Produces: Transparent high-res PNGs and monochrome white versions for dark navigation & footers

- [ ] **Step 1: Write Python script using Pillow to auto-detect bounding box, trim white borders, and set white background to transparent alpha channel**
- [ ] **Step 2: Generate clean monochrome white silhouettes (`*-white.png`) with alpha channel for dark backgrounds**
- [ ] **Step 3: Verify output resolutions, transparency, and file integrity**

---

### Task 3: Architectural Design System & CSS Tokens (`DESIGN.md` & `globals.css`)

**Files:**
- Create: `DESIGN.md`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx` (embed Google Fonts: Plus Jakarta Sans, Inter, JetBrains Mono)

**Interfaces:**
- Consumes: Typography specification from `google-fonts` MCP & Color rules from `better-colors`
- Produces: 3-layer design tokens (`primitive -> semantic -> component`) with entity switching classes (`.theme-ingenierie`, `.theme-solutions`, `.theme-retail`)

- [ ] **Step 1: Write `DESIGN.md` documenting the Swiss-Grid Industrial visual system, typography scale, 3-entity palette, and UI components**
- [ ] **Step 2: Implement full CSS custom property system in `src/app/globals.css`**
- [ ] **Step 3: Update `tailwind.config.ts` with custom colors, typography tokens, container rules, and hairline border utilities**
- [ ] **Step 4: Configure `next/font/google` in `src/app/layout.tsx` with Plus Jakarta Sans, Inter, and JetBrains Mono**

---

### Task 4: Generate Custom Media Assets in `/public/media/`

**Files:**
- Create:
  - **Videos (2 looping 16:9):**
    - `public/media/hero-power-grid.mp4`
    - `public/media/ingenierie-workshop.mp4`
  - **Entity & Editorial Photography (7 high-res stills):**
    - `public/media/card-ingenierie.jpg` (3:4)
    - `public/media/card-solutions.jpg` (16:9)
    - `public/media/card-retail.jpg` (16:9)
    - `public/media/lifecycle-atelier.jpg` (4:3)
    - `public/media/lifecycle-automation.jpg` (4:3)
    - `public/media/solutions-security.jpg` (4:3)
    - `public/media/team-philosophy.jpg` (16:9)
  - **MOCOMEL Retail Category Studio Visuals (8 stills 4:3 on `#F1F5F9`):**
    - `public/media/retail-cables-puissance.jpg`
    - `public/media/retail-cables-signal.jpg`
    - `public/media/retail-ligne-hta.jpg`
    - `public/media/retail-poste-transfo.jpg`
    - `public/media/retail-cheminement.jpg`
    - `public/media/retail-raccordement.jpg`
    - `public/media/retail-disjoncteurs.jpg`
    - `public/media/retail-energie-eclairage.jpg`
  - **Project Case Study Visuals (5 stills 16:9):**
    - `public/media/project-hopital-tetouan.jpg`
    - `public/media/project-datacenter-nador.jpg`
    - `public/media/project-gir-safi.jpg`
    - `public/media/project-lotissement-birjdid.jpg`
    - `public/media/project-eclairage-meknes.jpg`

- [ ] **Step 1: Generate 2 background videos via Higgsfield (`gemini_omni_flash_1_2` / `veo3_1`)**
- [ ] **Step 2: Generate 7 entity & editorial photography stills via AI image generation**
- [ ] **Step 3: Generate 8 Retail category studio stills via AI image generation with unified `#F1F5F9` clean minimalist backdrop**
- [ ] **Step 4: Generate 5 project case study stills via AI image generation**
- [ ] **Step 5: Inspect all generated assets for correct aspect ratios, zero watermarks, zero text on images**

---

### Task 5: Gate Check Verification

- [ ] **Step 1: Check all generated files in `/public/logos/` and `/public/media/`**
- [ ] **Step 2: Run `npm run build` to verify clean compilation**
- [ ] **Step 3: Present Milestone 1 summary and file inventory for user confirmation**
