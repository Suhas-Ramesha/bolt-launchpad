
# Bolt+ Pre-Launch Landing Page — Plan

A single, conversion-focused pre-launch landing page for **Bolt+**, a natural energy gel brand, on the new Shopify dev store. Visual hierarchy and structure mirror HNY+ (clean hero, ingredient highlights, variant showcase, FAQ, lead-capture CTA). No purchase flow — leads only until launch.

## Brand & Visual System

- **Palette (oklch tokens in `src/styles.css`)**
  - Background: warm cream (`#FBF7EF`)
  - Foreground: near-black ink (`#0E0E10`)
  - Primary accent: deep honey/gold (`#C8881A`) with a brighter glow variant for gradients
  - Muted: sand/stone neutrals
- **Typography**: bold display sans for headlines (e.g. Inter Tight / Manrope) + clean sans body (Inter)
- **Look**: tons of whitespace, oversized headlines, hairline dividers, soft shadows, rounded-2xl product cards, subtle grain texture, big bold CTAs

## Page Structure (single route `/`)

1. **Sticky Nav** — Bolt+ wordmark, anchor links (Why, Variants, Ingredients, FAQ), small "Early Access" CTA
2. **Hero**
   - H1: "Clean, Smooth Energy — No Crash."
   - Sub: positioning copy
   - Three product mockups side-by-side (Classic / Buzz 50 / Buzz 150)
   - Primary CTA: "Join The Early Access List" → scrolls to opt-in form
3. **Why Bolt+** — 4 icon-led benefit tiles
4. **Choose Your Energy Level** — 3 product cards, color-coded (silver / gold / black-orange), each with caffeine level + description
5. **Ingredients You Can Trust** — Honey, Sea Salt, Potassium & Magnesium, Green Tea Caffeine; each as an icon + short copy
6. **No Crash. Just Clean Energy.** — persuasive comparison block + "4.9★ from early testers" stat
7. **Get Early Launch Access** — email + WhatsApp phone form, submit button "Get Early Access", success state
8. **FAQ** — 5 accordion items (ingredients, how to use, who it's for, safety, launch date)
9. **Footer** — brand statement, Privacy / Terms / Contact links, copyright, founder contact (Suman Ramesha, +91 8147760633)

## Lead Capture

- Form: `email` (required, validated with zod) + `phone` (E.164 / Indian mobile, validated with zod)
- Stored in a `early_access_signups` table on **Lovable Cloud** (Supabase) with RLS policies (anonymous insert allowed, no public select). Enables the user to export leads from the Cloud dashboard.
- Success toast + inline confirmation; no double-submits

## Shopify Integration Scope

This is a **pre-launch** page, so no cart / checkout / product purchase flow is built. The Shopify dev store stays empty for now and can be activated later when products are ready. We will:
- Skip product creation in Shopify for this iteration
- Keep the page fully static + lead form only
- Leave hooks ready so we can wire real Shopify products into the variant cards later

## Assets

Generated via image-gen (premium for product mockups, transparent backgrounds):
- `bolt-classic.png` — matte silver gel sachet
- `bolt-buzz-50.png` — shiny gold sachet
- `bolt-buzz-150.png` — matte black sachet with golden-orange typography
- Ingredient icons (honey, salt, mineral, leaf) — small flat illustrations
- Hero background texture (subtle grain/cream)

## SEO & Meta

- Title: "Bolt+ — Clean, Smooth Energy. No Crash."
- Meta description, og:title, og:description, og:image (hero composite), twitter card
- Single H1, semantic sections, alt text on all imagery, JSON-LD `Product` stub for the brand

## Technical Plan

- Stack: existing TanStack Start + Tailwind v4 + shadcn/ui
- New design tokens added to `src/styles.css` (cream bg, honey primary, gradient + shadow variables)
- Replace placeholder in `src/routes/index.tsx` with composed sections; each section as its own component under `src/components/landing/`
- Form handled via a TanStack server function (`createServerFn`) that inserts into the Cloud DB — requires enabling Lovable Cloud
- QA: responsive (mobile / tablet / desktop), check console + network after build

## Founder / Manufacturing Note

The contract-manufacturing inquiry text you shared is internal sourcing info, not landing-page copy. I'll keep it out of the public page. If you want a private "Press / Wholesale" page or a contact email link to surface it, say the word and I'll add it.

## Open Question

Lead capture needs persistence. I'll enable **Lovable Cloud** (free tier, no external setup) to store email + WhatsApp leads securely. Confirm or tell me to swap to a different destination (e.g. just email-to-inbox via Resend, or a Google Sheet via connector).
