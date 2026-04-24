## Leah Hamilton — Portfolio

Personal portfolio built with Next.js App Router and Tailwind CSS. Showcases my projects, timeline, and contact links with a cohesive dark/light theme.

### Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- next-themes (dark/light toggle)
- Framer Motion / Motion One (animations)

### Features
- Hero carousel with responsive images
- About section with playful confetti tap effect
- Timeline with scroll progress indicator
- Project cards with hover parallax
- Contact section with email copy and social links
- Dark/light theme with no flicker on toggle

### Getting Started
- Install deps: `yarn`
- Dev server: `yarn dev`
- Lint: `yarn lint`
- Build: `yarn build`
- Start prod: `yarn start`

Open `http://localhost:3000` in your browser.

### Project Structure
- `app/` — App Router entry, layout, styles
- `components/` — UI sections and shared components
- `components/ui/` — Reusable UI primitives
- `public/` — Images and static assets

### Theming
- Theme is provided via `next-themes` with `attribute="class"` and `disableTransitionOnChange` to avoid flicker.
- CSS variables live in `app/globals.css` and drive light/dark tokens.

### Deployment
- Recommended: Vercel. Run `yarn build` and connect the repo.
- Static assets are served from `public/`. No external image domains required.

### Accessibility & Performance Notes
- Links include descriptive `aria-label`s and `rel="noopener noreferrer"` for external links.
- Animations are kept subtle; large container transitions are limited.
- Images use Next/Image with `priority` only for the first hero slide.

### License
This portfolio’s code is provided as-is for personal use. Do not copy content or images without permission.
