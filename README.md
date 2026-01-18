# Liquid Glass Portfolio

A high-end, animated portfolio for a full stack developer, built with **Vite + React (JavaScript)**, **Framer Motion** and **Lenis** smooth scrolling. It uses a liquid glassmorphism UI.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the build at http://localhost:4173
```

Requires Node **20.19+** or **22.12+**.

## Deploy to Vercel

**Option A: dashboard**
1. Push this folder to a GitHub, GitLab or Bitbucket repo.
2. On vercel.com choose **Add New → Project** and import the repo.
3. Vercel detects Vite. Keep the defaults (build `npm run build`, output `dist`) and click **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

`vercel.json` is already configured.

## Make it yours

All content lives in **`src/data/portfolio.js`**: name, roles, bio, stats, skills, projects, journey and social links. Edit that one file. Lines marked `TODO` still need your real details (GitHub/LinkedIn URLs, CV, projects).

Also update:
- the `<title>` and meta description in `index.html`
- `public/favicon.svg` (the initials)
- `profile.resumeUrl`: drop your CV into `public/resume.pdf` and set it to `/resume.pdf`. A "Download CV" button then appears in the hero.

The contact form is frontend-only. It opens the visitor's mail app with the message pre-filled. To send messages directly, replace `submit()` in `src/components/sections/Contact.jsx` with a call to Formspree, EmailJS or your own API.

## What's inside

| Feature | Where |
| --- | --- |
| Liquid glass material (blur, specular rim, cursor spotlight, SVG refraction) | `src/index.css` (`.lg`), `components/ui/Glass.jsx`, `components/GlassFilters.jsx` |
| Animated aurora background with mouse parallax | `components/Background.jsx` |
| Preloader with counter | `components/Loader.jsx` |
| Custom cursor with labels (`data-cursor="View"`) | `components/Cursor.jsx` |
| Glass navbar, active-section pill, animated mobile menu | `components/Navbar.jsx` |
| Hero: split-text reveal, role rotator, typing code card, 3D tilt, cursor-following liquid lens | `sections/Hero.jsx` |
| Count-up stats, services | `sections/About.jsx` |
| Skill cards with pop-in tiles, infinite tech marquee | `sections/Skills.jsx` |
| Project grid with layout animations (filter tabs appear once you have 3+ projects) | `sections/Projects.jsx` |
| Scroll-drawn education / journey timeline | `sections/Experience.jsx` |
| Floating-label form, copy email, toast | `sections/Contact.jsx` |
| Scroll-filled footer title | `components/Footer.jsx` |

### Browser notes
- The **refraction** (distortion) effect uses SVG filters inside `backdrop-filter`, which only Chromium browsers (Chrome, Edge, Arc, Brave) support. Safari and Firefox get the standard frosted glass automatically.
- `prefers-reduced-motion` is respected. Smooth scrolling and most animations turn off for users who ask for less motion.
