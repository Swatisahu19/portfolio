# swati-sahu.com

Personal site and case studies. Next.js 14 (App Router, fully static), TypeScript, Tailwind, Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, type-check and lint
```

## Where things live

| What | Where |
|---|---|
| **All copy, metrics, roles, lab projects** | `app/content/site.ts` |
| **Case studies** (12-section structure) | `app/content/case-studies.ts` |
| Content types and the claim-verification model | `app/content/types.ts` |
| Design tokens (colour, radius, shadow, motion) | `app/globals.css` (`:root`) + `tailwind.config.ts` |
| Hero network / 3D canvas | `app/components/hero/NetworkCanvas.tsx` |
| Case study diagrams | `app/components/diagrams/Diagrams.tsx` |
| Homepage sections | `app/components/home/*` |
| Case study template | `app/components/case-study/*`, route `app/work/[slug]` |
| Printable resume (generated from content) | `app/resume` |

## Content integrity

Every claim carries a `check: { status, source, note }`.

- `verified`: matches a named source document.
- `confirm`: published in a source, but the definition, baseline or attribution still needs confirming.

- `drafted`: narrative written from experience and approved for publication.

`SHOW_REVIEW_MARKERS` in `site.ts` is **off** for the live site. With it off, review chips are hidden, and any case study section or field that is still unconfirmed (`todo`, "To confirm") is hidden, with the contents list renumbering itself. Turn it on locally to see every open question again.

Case studies don't name the employer or its products. Experience, About and the resume page name the employer.

## Photos

Hero: `swati-boardroom.jpg`. About: `swati-desk.jpg`. Contact: `swati-lobby.jpg`. Navigation avatar: `swati-avatar.jpg`, cropped from the desk photo. All are unedited apart from cropping and resizing.

## Resume PDF

Put a PDF in `/public` and set `site.resumePdf` (e.g. `"/Swati-Sahu-Resume.pdf"`). Until then every Resume link opens `/resume`, which prints to PDF.

## Design system

- **Type:** Instrument Serif (display, single weight, never faux-bolded), Inter (body and uppercase labels). Fluid scale `text-d-xl … text-d-sm`, `label`.
- **Colour:** ivory/paper surfaces, ink text, night for dark sections. Lime is the signature accent, used for fills and on dark only, never as text on light (use `lime-ink`). Cobalt is the secondary accent.
- **Motion:** `ease-out` cubic-bezier(0.22,1,0.36,1); 180/420/900 ms. Hero entrance is CSS so it paints before hydration. Everything respects `prefers-reduced-motion`, and the canvas pauses offscreen.
