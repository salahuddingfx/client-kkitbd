# KKIT - Enterprise Tech & Training Platform

> Accelerate your career and business with enterprise-grade tech training, professional development courses, and world-class development services.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS 4, Radix UI Primitives
- **State:** Redux Toolkit, Zustand, TanStack Query
- **Animation:** GSAP (ScrollTrigger), Framer Motion, Three.js
- **Icons:** Lucide React, React Icons
- **Forms:** React Hook Form + Zod Validation
- **Theme:** next-themes (Light/Dark)

## Features

### Public Pages
- Landing page with 3D hero section
- Services, Courses, Portfolio, Team, Blog
- Course detail pages with intro videos & reviews
- Team profile pages with dynamic routing
- Contact, Careers, Pricing, FAQ, Technologies
- 8 legal/policy pages

### Student Dashboard
- Overview, My Courses, Assignments, Projects
- Leaderboard, Reviews, Certificates
- Wishlist, Billing, Profile, Settings
- Responsive sidebar with collapsible navigation

### UI/UX
- Light & Dark theme with red accent (#DC2626)
- Neumorphism & Glassmorphism effects
- GSAP scroll-triggered curriculum timeline with F1 car tracker
- Skeleton loading states for all routes
- Mobile-first responsive design

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 4000 |
| `npm run build` | Production build |
| `npm run start` | Start production server on port 4000 |
| `npm run lint` | Run ESLint |

## Project Structure

```
client-kkitbd/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (main)/       # Public pages
│   │   └── dashboard/    # Student dashboard
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Shared components
│   │   ├── navigation/   # Navbar, Footer
│   │   └── ui/           # Base UI primitives
│   ├── config/           # Site & app configuration
│   ├── constants/        # Static constants
│   ├── data/             # Mock data
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities & helpers
│   ├── schemas/          # Zod validation schemas
│   ├── services/         # API & data services
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Utility functions
├── public/               # Static assets
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Website:** [kkitbd.com](https://kkitbd.com)
- **Email:** info@kkitbd.com
- **GitHub:** [github.com/kkitbd](https://github.com/kkitbd)
