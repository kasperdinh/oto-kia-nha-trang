# KIA Khánh Hòa – Car Sales Website

> **Purpose of this document**: This README is written to be **explicit, structured, and unambiguous**, so that **AI agents (code assistants, autonomous planners, copilots)** can understand the project context, constraints, and expected implementation behavior without additional human clarification.

---

## 📋 Project Overview

This project is a **car sales website for the KIA Khánh Hòa dealership**, implemented as a **single Next.js fullstack application** using the **App Router**.

The website focuses on **vehicle showcasing and lead collection**, not e‑commerce checkout. All user actions ultimately generate **sales leads** (quote requests, test-drive registrations, contact inquiries).

### High-level Goals

- Present KIA car models in a **modern, premium, brand-consistent UI**
- Optimize for **SEO**, **performance**, and **mobile-first UX**
- Collect **high-quality leads** for dealership staff
- Maintain a **simple, scalable fullstack architecture** suitable for small teams

### Current Status

- **Frontend**: MVP under active development
- **Backend**: Not separated; handled via Next.js Server Components, Route Handlers, and (future) Server Actions
- **Data**:
  - Current: local **mock data** stored in `src/lib`
  - Planned: **Prisma + SQLite** (local) → extensible to PostgreSQL

### Non-goals (Explicit Constraints)

- ❌ No online payments
- ❌ No real-time chat system
- ❌ No microservices architecture

---

## 🏗️ Architecture Overview

This repository follows a **single-repo, fullstack Next.js architecture**.

- One deployment unit
- No separate backend service
- Clear separation between:
  - UI components
  - Domain components
  - Data access
  - Server logic

### Architectural Principles

- **Server-first** (Server Components by default)
- **Client Components only when required** (forms, animations, interactions)
- **Colocation**: components live close to the routes that use them
- **Predictable structure** so AI can infer responsibilities

---

## 📁 Repository Structure

```
oto-kia-nha-trang/
├── app/                      # Next.js App Router
│   ├── (routes)/             # Public website routes
│   │   ├── page.tsx          # Home page
│   │   ├── xe/               # Car listing
│   │   ├── bao-gia/           # Quote request
│   │   ├── lai-thu/           # Test drive
│   │   ├── lien-he/           # Contact
│   │   └── gioi-thieu/        # About
│   │
│   ├── globals.css           # Global styles & Tailwind layers
│   └── layout.tsx            # Root layout (HTML shell)
│
├── components/               # React components (UI)
│   ├── cars/                 # Car domain components
│   ├── forms/                # Lead capture forms
│   ├── home/                 # Homepage sections
│   ├── layout/               # Header / Footer / Navigation
│   └── ui/                   # Design system primitives
│
├── lib/                      # Infrastructure & Utilities
│   ├── prisma.ts             # Prisma Client Singleton
│   ├── auth.ts               # Auth Helper
│   ├── data/                 # Legacy Data Access (to be migrated)
│   ├── constants/            # Constants & enums
│   └── utils/                # Utilities
│
├── repositories/             # Data Access Layer (ORM ONLY)
│   └── car.repository.ts
│
├── services/                 # Business Logic Layer
│   └── car.service.ts
│
├── validators/               # Input Validation (Zod)
│   └── car.query.ts
│
├── dtos/                     # Data Transfer Objects (Output Mapping)
│   └── car.dto.ts
│
├── types/                    # Domain Types
│   └── user.ts
│
├── prisma/                   # Prisma schema & migrations
├── public/                   # Static assets
├── package.json
└── README.md
```

> **AI rule**: Do not introduce new top-level folders without strong justification.
> **Architecture note**: The project follows Clean Architecture principles with `repositories`, `services`, `validators`, and `dtos` at the root level.

---

## 🛠️ Tech Stack

### Core Technologies

| Technology  | Version | Responsibility                           |
| ----------- | ------- | ---------------------------------------- |
| Next.js     | 16.x    | Fullstack framework (SSR, routing, APIs) |
| TypeScript  | 5.x     | Type safety & contracts                  |
| TailwindCSS | 4.x     | Styling system                           |

### Supporting Libraries

- **Framer Motion** – animations & page transitions
- **Lucide / Heroicons** – iconography
- **clsx + tailwind-merge** – conditional class handling

---

## 🧭 Routing Specification

All public routes live under `src/app/(routes)`.

| Route         | Purpose       | Notes                                |
| ------------- | ------------- | ------------------------------------ |
| `/`           | Homepage      | Brand introduction & featured models |
| `/xe`         | Car listing   | Filterable model list                |
| `/xe/[slug]`  | Car detail    | SEO-optimized dynamic page           |
| `/bao-gia`    | Quote request | Lead capture                         |
| `/lai-thu`    | Test drive    | Lead capture                         |
| `/lien-he`    | Contact       | General inquiry                      |
| `/gioi-thieu` | About         | Dealership info                      |

> **AI rule**: Car detail pages must be statically optimizable (SSG-compatible).

---

## 🧩 Component Responsibilities

### `components/cars/`

- `CarCard`: summary card (image, name, price range)
- `CarList`: grid/list layout
- `CarGallery`: image slider
- `CarSpecs`: technical specifications table

### `components/forms/`

- QuoteForm
- TestDriveForm
- ContactForm

> All forms:
>
> - Validate input
> - Be client components
> - Submit to server actions or API routes

### `components/ui/`

Reusable primitives:

- Button
- Card
- Modal
- Carousel
- Input / Select

> **AI rule**: UI components must be stateless and reusable.

---

## 🎨 Design System

### Brand Colors (CSS Variables)

```css
:root {
  --kia-red: #bb162b;
  --kia-dark: #1a1a1a;
  --kia-gray: #4a4a4a;
  --kia-light: #f5f5f5;
  --kia-white: #ffffff;
  --accent-gold: #c9a85c;
}
```

### Design Principles

- Premium & minimal
- Strong typography hierarchy
- Clear CTAs
- High contrast & accessibility aware

### Typography

- Headings: **Montserrat**
- Body: **Inter**

---

## 🚀 Development Workflow

### Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Lint + type check
```

### Coding Rules (AI-Enforced)

- Prefer Server Components
- Avoid `use client` unless required
- Strong typing for props & data
- No inline magic values (use constants)

---

## 📌 Feature Roadmap

### MVP (Current Phase)

- Responsive layout
- Homepage sections
- Car listing (mock data)
- Car detail pages
- Quote / Test Drive / Contact forms
- About page

### Planned

- Prisma + SQLite
- Server Actions
- Basic admin dashboard
- Deployment on Vercel

---

## 🤖 AI Collaboration Notes

This project is designed to be:

- Easy to reason about
- Safe for autonomous refactoring
- Predictable in structure

**AI agents should**:

- Follow existing folder conventions
- Reuse UI primitives
- Preserve SEO semantics
- Avoid over-engineering
