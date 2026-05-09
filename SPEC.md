---
name: personal-portfolio
description: Dark themed dynamic portfolio for Java backend + AI engineering intern
---

# Personal Portfolio - Dark Dynamic Theme

## 1. Project Overview
- **Project Name**: Personal Portfolio
- **Type**: Single-page personal portfolio website
- **Core Functionality**: Showcase skills, projects, and contact info for a Java backend/AI engineering intern
- **Target Users**: Recruiters, hiring managers, fellow developers

## 2. Visual & Rendering Specification

### Theme & Color Scheme
- **Aesthetic**: Dark cyberpunk-inspired theme with vibrant accents
- **Primary Background**: Near-black `#0a0a0b`
- **Secondary Background**: `#111113`
- **Card Surface**: `#161618`
- **Accent Primary**: Lime/chartreuse `#c8ff00` (main highlights, CTAs)
- **Accent Secondary**: Bright yellow `#ffe600` (stars, secondary accents)
- **Accent Tertiary**: Cyan `#00d4ff` (tech elements, links)
- **Text Primary**: Pure white `#ffffff`
- **Text Secondary**: Muted `#a0a0a5`
- **Text Tertiary**: Subtle `#5c5c60`

### Typography
- **Display Font**: "Space Grotesk" - modern tech feel for headings/numbers
- **Body Font**: "Inter" - clean readable sans-serif
- **Code Font**: "JetBrains Mono" - for stats labels and code elements

### Layout Sections
1. **Hero Section**: Full viewport, animated geometry, gradient title, CTA buttons
2. **About Section**: GitHub avatar with glow ring, stats grid, bio text
3. **Skills Section**: Flex-wrap pill badges with accent borders
4. **Projects Section**: 2-column grid, gradient border on hover
5. **Contact Section**: 4-column card grid with hover lift effect
6. **Footer**: Minimal with logo, tagline, links

### Background Effects
- Fixed grid overlay (80px grid, lime tinted)
- SVG noise texture overlay (2.5% opacity)
- Canvas-based particle system with connections
- Hero geometry: rotating ring, floating grid, dot pattern, hexagon

## 3. Animation Specification

### CSS Animations
| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| slideUp | 0.8s | cubic-bezier(0.16, 1, 0.3, 1) | Element reveals |
| float | 12-20s | ease-in-out | Hero geometry |
| rotateRing | 60s | linear | Decorative ring |
| pulse | 2s | ease-in-out | Badge indicator |
| borderShine | 0.6s | ease | Card hover effect |
| scrollWheel | 2s | ease-in-out | Scroll indicator |

### JavaScript Animations
| Animation | Trigger | Target |
|-----------|---------|--------|
| Particle System | Continuous | Background canvas |
| Counter Animation | On scroll into view | Stats numbers |
| Scroll Reveal | IntersectionObserver | All .animate-on-scroll elements |

### Hover Effects
- **Cards**: translateY(-8px), box-shadow glow, gradient border fade-in
- **Skill Pills**: translateY(-4px) scale(1.03), accent color border
- **Nav Links**: Background tint, underline slide-in
- **Avatar**: Glow ring blur animation

## 4. Interaction Specification

### Navigation
- Fixed frosted glass header with blur
- Smooth scroll to sections
- Active section highlight on scroll

### Interactive Elements
- Project cards: gradient border animation on hover
- Skill pills: lift and color change on hover
- Contact cards: lift and glow on hover
- Stats: number counter animation on reveal

### Responsiveness
- Desktop: Full layouts, 4-column stats/contact grids
- Tablet (768px): 2-column grids, adjusted spacing
- Mobile (480px): Single column, reduced hero geometry

## 5. External Dependencies

### Google Fonts
```
Space Grotesk: 400,500,600,700
Inter: 300,400,500,600,700
JetBrains Mono: 400,500,600
```

### GitHub API
- User info: `https://api.github.com/users/{username}`
- Repos: `https://api.github.com/users/{username}/repos`

## 6. Acceptance Criteria

- [x] Dark theme with lime accent colors
- [x] Background grid overlay and particles
- [x] Hero section with animated geometry
- [x] Scroll-triggered reveal animations
- [x] GitHub avatar and stats (from API)
- [x] Project cards with gradient border hover
- [x] Contact cards with lift/glow effect
- [x] Responsive design (mobile, tablet, desktop)
- [x] Frosted glass navigation
- [x] Counter animations for stats
- [x] Smooth scroll navigation

## 7. File Structure

```
My_Web/
├── index.html      # Main HTML with SVG decorations
├── style.css       # Complete dark theme styles
├── script.js       # Particle system + animations
├── server.py       # Local dev server
└── SPEC.md         # This specification
```
