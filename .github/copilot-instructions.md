# AI Coding Agent Instructions: 3D Portfolio Starter

## Project Architecture
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **3D/Canvas**: React Three Fiber (`@react-three/fiber`), Drei helpers
- **Styling**: Tailwind CSS v4, custom cyan accent (`#04D9FF`) on black
- **Animation**: Framer Motion for transitions and scroll reveals

### Main Structure
- Entry: [src/app/page.tsx](src/app/page.tsx) — orchestrates Navbar, Hero (3D), Projects, Contact, Footer, Sound toggle
- 3D: [src/components/scene.tsx](src/components/scene.tsx) (canvas/camera/lights/controls), [src/components/model.tsx](src/components/model.tsx) (GLTF loader, rotation)
- UI: [src/components/hero.tsx](src/components/hero.tsx) (split text/3D), [src/components/contact.tsx](src/components/contact.tsx) (form, EmailJS placeholder), [src/components/sound.tsx](src/components/sound.tsx) (audio modal)

## Key Patterns & Conventions
- **3D Model**: Use `dynamic` import with `{ ssr: false }` for 3D models to avoid SSR issues
- **Camera**: `[7, 2, 8]`, fov 50; **Lighting**: ambient (0.5) + directional (`[5,5,5]`, intensity 2)
- **OrbitControls**: `enableZoom={false}` for UX consistency
- **Model**: Scale ≈2.2, position `[-1, -0.5, -2]`, rotation `[0, Math.PI/2, 0]`
- **Font**: Proxima Nova loaded via `@font-face` in [src/app/globals.css](src/app/globals.css); fallback to system sans
- **Color**: `bg-black text-white` with `text-[#04D9FF]` accents
- **Responsiveness**: Use `md:` Tailwind breakpoints
- **Animation**: Framer Motion with `initial/animate/transition` objects
- **Buttons**: Cyan background/outline, hover transitions

## Developer Workflow
- **Dev server**: `npm run dev --turbopack`
- **Build**: `npm run build --turbopack`
- **Lint**: `npm run lint`
- **Main content**: Edit [src/app/page.tsx](src/app/page.tsx)
- **3D model**: Place GLTF in `public/models/`, update path in [model.tsx](src/components/model.tsx)
- **Contact form**: EmailJS integration is a placeholder; see [contact.tsx](src/components/contact.tsx)

## Integration Points
- **EmailJS**: Use `@emailjs/browser` for contact form (service/template/public key required)
- **Audio**: Place music in `public/audio/`, controlled by [sound.tsx](src/components/sound.tsx)
- **Fonts**: Place TTF in `public/fonts/`, reference in [globals.css](src/app/globals.css)

## Notable Project-Specific Details
- All interactive components must use "use client"
- 3D models and audio are loaded from `/public` subfolders
- Animations and scroll reveals use Framer Motion and a custom [scrollReveal.tsx](src/components/scrollReveal.tsx)
- No test suite or backend API is present

## Examples
- To add a new 3D model: place `.gltf` in `public/models/`, update [model.tsx](src/components/model.tsx) import path, adjust scale/position as needed
- To change accent color: update Tailwind config and references to `#04D9FF`

Refer to this file and [README.md](README.md) for further conventions. When in doubt, check component usage in [src/app/page.tsx](src/app/page.tsx) and [src/components/].