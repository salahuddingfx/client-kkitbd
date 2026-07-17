<div align="center">

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=30&duration=3000&pause=800&color=DC2626&center=true&vCenter=true&multiline=true&repeat=true&width=750&height=90&lines=KKIT+Client+%F0%9F%96%A5%EF%B8%8F;Premium+Digital+Learning+Platform;Built+with+Next.js+16+%2B+TypeScript" alt="Typing SVG" />
</a>

<br/>

![License](https://img.shields.io/badge/license-GNU%20GPL%20v3-dc2626?style=for-the-badge&logo=gnu)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)

<p>The official frontend for <strong>KKIT</strong> — Bangladesh's premium digital solutions and e-learning platform.<br/>
Expert-led courses · Portfolio showcase · Digital services · Blog · Payments · Certificates</p>

[![Live Demo](https://img.shields.io/badge/Live-kkitbd.com-dc2626?style=for-the-badge&logo=vercel)](https://kkitbd.com)

</div>

---

## ✨ Features

- 🎓 **Course Platform** — Browse, enroll, and learn from expert-led courses
- 🏆 **Certificates** — Auto-generated PDF certificates on completion
- 💳 **Payments** — SSLCommerz, bKash & Stripe integration
- 📝 **Blog** — Full-featured blog with rich content
- 🎨 **Portfolio** — Showcase of KKIT's projects
- 🌙 **Dark / Light Mode** — Seamless theme switching
- ⚡ **Animated UI** — Framer Motion + GSAP micro-animations
- 🌐 **3D Elements** — Three.js + React Three Fiber scenes
- 📱 **Fully Responsive** — Mobile-first design
- 🔒 **Auth** — JWT-based with role-based access (user / admin)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State Management | Redux Toolkit + Zustand |
| Data Fetching | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion + GSAP |
| 3D Graphics | Three.js + React Three Fiber |
| Charts | Recharts |
| Icons | Lucide React + React Icons |
| Fonts | Geist Sans + Geist Mono |

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth pages (login, register)
│   ├── (dashboard)/            # Dashboard (user & admin)
│   └── (main)/                 # Public pages
│       ├── page.tsx            # Home page
│       ├── courses/            # Courses listing & detail
│       ├── blog/               # Blog listing & posts
│       ├── services/           # Services page
│       ├── portfolio/          # Portfolio page
│       ├── about/              # About us
│       ├── team/               # Team page
│       ├── contact/            # Contact form
│       └── pricing/            # Pricing plans
├── components/
│   ├── ui/                     # shadcn/ui + custom primitives
│   │   ├── preloader.tsx       # Multilingual preloader animation
│   │   ├── preloader-wrapper.tsx
│   │   └── ...
│   ├── layout/                 # Header, footer, sidebar
│   ├── sections/               # Page sections (hero, features...)
│   ├── forms/                  # Form components
│   ├── cards/                  # Card variants
│   ├── animations/             # Animation wrappers
│   ├── navigation/             # Nav components
│   └── providers/              # React context providers
├── features/                   # Domain feature modules
├── hooks/                      # Custom React hooks
├── redux/                      # Store, slices, middleware
├── services/                   # API service layer
├── schemas/                    # Zod validation schemas
├── types/                      # TypeScript type definitions
├── constants/                  # App constants
├── data/                       # Static data
└── utils/                      # Helper utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- pnpm `>= 8` (`npm i -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/kkitbd/client-kkitbd.git
cd client-kkitbd

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:4000
```

### Running Locally

```bash
# Development (port 4000)
pnpm dev

# Production build
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

---

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/courses` | Course catalog |
| `/courses/[slug]` | Course detail |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/services` | Services |
| `/portfolio` | Portfolio |
| `/about` | About KKIT |
| `/team` | Team members |
| `/contact` | Contact form |
| `/pricing` | Pricing plans |
| `/dashboard` | User dashboard |

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.

---

## 📜 Code of Conduct

This project follows the [Contributor Covenant v2.1](./CODE_OF_CONDUCT.md).

---

## 🔒 Security

Found a vulnerability? Please read [SECURITY.md](./SECURITY.md) and report privately.

---

## 📄 License

Licensed under the **GNU General Public License v3.0** — see [LICENSE](./LICENSE) for details.

---

<div align="center">

Made with ❤️ by **KKIT Team** · Bangladesh 🇧🇩

[![Website](https://img.shields.io/badge/kkitbd.com-dc2626?style=flat-square&logo=googlechrome&logoColor=white)](https://kkitbd.com)

</div>