# KIA Nha Trang - Car Sales Website

## 📋 Project Overview

This is a car sales website project for KIA Nha Trang dealership, including:

- **Frontend**: Modern, responsive user interface
- **Backend**: RESTful API for managing cars, orders, customers

---

## 🏗️ Project Architecture

```
oto-kia-nha-trang/
├── frontend/          # Next.js 16 + React 19 + TailwindCSS 4
│   ├── src/
│   │   └── app/       # App Router (Next.js)
│   └── public/        # Static assets
│
└── backend/           # NestJS 11 + TypeScript
    ├── src/
    │   ├── modules/   # Feature modules
    │   ├── common/    # Shared utilities
    │   └── config/    # Configuration
    └── test/          # E2E tests
```

---

## 🛠️ Tech Stack

### Frontend

| Technology  | Version | Purpose         |
| ----------- | ------- | --------------- |
| Next.js     | 16.1.1  | React Framework |
| React       | 19.2.3  | UI Library      |
| TailwindCSS | 4.x     | Styling         |
| TypeScript  | 5.x     | Type Safety     |

### Backend

| Technology | Version | Purpose           |
| ---------- | ------- | ----------------- |
| NestJS     | 11.x    | Backend Framework |
| TypeScript | 5.7.3   | Type Safety       |
| Jest       | 30.x    | Testing           |

### Database (To be installed)

- **PostgreSQL** or **MongoDB** (PostgreSQL recommended)
- **Prisma** or **TypeORM** as ORM

---

## 📁 Backend Module Structure

### Modules to develop:

```
src/
├── modules/
│   ├── cars/              # Car management
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── cars.controller.ts
│   │   ├── cars.service.ts
│   │   └── cars.module.ts
│   │
│   ├── categories/        # Car categories (SUV, Sedan, MPV...)
│   ├── orders/            # Orders / Consultation requests
│   ├── customers/         # Customers
│   ├── testimonials/      # Customer reviews
│   ├── gallery/           # Photo/Video gallery
│   ├── contacts/          # Contact
│   └── auth/              # Authentication (Admin)
│
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
│
└── config/
    ├── database.config.ts
    └── app.config.ts
```

---

## 📁 Frontend Structure

### Pages to develop:

```
src/app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
│
├── (routes)/
│   ├── xe/                     # Car list
│   │   ├── page.tsx
│   │   └── [slug]/             # Car details
│   │       └── page.tsx
│   │
│   ├── gioi-thieu/             # About us
│   │   └── page.tsx
│   │
│   ├── lien-he/                # Contact
│   │   └── page.tsx
│   │
│   ├── bao-gia/                # Quote request
│   │   └── page.tsx
│   │
│   └── lai-thu/                # Test drive registration
│       └── page.tsx
│
└── components/
    ├── layout/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── Navbar.tsx
    │   └── Sidebar.tsx
    │
    ├── home/
    │   ├── HeroBanner.tsx
    │   ├── FeaturedCars.tsx
    │   ├── Promotions.tsx
    │   └── Testimonials.tsx
    │
    ├── cars/
    │   ├── CarCard.tsx
    │   ├── CarList.tsx
    │   ├── CarDetail.tsx
    │   ├── CarGallery.tsx
    │   └── CarSpecs.tsx
    │
    ├── forms/
    │   ├── ContactForm.tsx
    │   ├── QuoteForm.tsx
    │   └── TestDriveForm.tsx
    │
    └── ui/
        ├── Button.tsx
        ├── Modal.tsx
        ├── Carousel.tsx
        └── Card.tsx
```

---

## 🗃️ Database Schema

### Cars

```typescript
interface Car {
  id: string;
  name: string; // Car name: "KIA Seltos"
  slug: string; // URL slug: "kia-seltos"
  category: Category; // Category: SUV, Sedan...
  price: number; // Listed price
  promotionPrice?: number; // Promotional price
  description: string; // Description
  specifications: CarSpec; // Technical specifications
  images: string[]; // Images
  colors: CarColor[]; // Colors
  isNew: boolean; // New car
  isFeatured: boolean; // Featured car
  status: "available" | "coming_soon" | "discontinued";
  createdAt: Date;
  updatedAt: Date;
}
```

### CarSpec (Technical Specifications)

```typescript
interface CarSpec {
  engine: string; // Engine: "1.6L Turbo"
  power: string; // Power: "177 HP"
  torque: string; // Torque: "265 Nm"
  transmission: string; // Transmission: "7-speed DCT"
  fuelType: string; // Fuel: "Gasoline"
  fuelConsumption: string; // Consumption: "7.0L/100km"
  seats: number; // Number of seats
  dimensions: {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
  };
  features: string[]; // Key features
}
```

### Order

```typescript
interface Order {
  id: string;
  type: "quote" | "test_drive" | "purchase";
  customer: Customer;
  car: Car;
  color?: string;
  message?: string;
  status: "pending" | "contacted" | "completed" | "cancelled";
  preferredDate?: Date; // Preferred date (test drive)
  createdAt: Date;
}
```

### Customer

```typescript
interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: Date;
}
```

---

## 🎨 Design Guidelines

### KIA Brand Colors

```css
:root {
  --kia-red: #bb162b; /* Primary KIA Red */
  --kia-dark: #1a1a1a; /* Black */
  --kia-gray: #4a4a4a; /* Gray */
  --kia-light: #f5f5f5; /* Light Gray */
  --kia-white: #ffffff; /* White */
  --accent-gold: #c9a85c; /* Luxury Gold */
}
```

### Design Requirements

1. **Modern & Premium**: Elegant, modern design
2. **Mobile-first**: Prioritize mobile responsiveness
3. **Fast Loading**: Optimize images, lazy loading
4. **SEO Friendly**: Meta tags, structured data
5. **Accessibility**: WCAG 2.1 AA compliance

### Fonts

- **Heading**: Kia Signature (or Montserrat)
- **Body**: Inter or Open Sans

---

## 🚀 Development Guide

### Scripts

```bash
# Frontend
cd frontend
npm run dev          # Run development server (port 3000)
npm run build        # Build production
npm run lint         # Check for errors

# Backend
cd backend
npm run start:dev    # Run development server (port 3001)
npm run build        # Build production
npm run test         # Run unit tests
npm run test:e2e     # Run e2e tests
```

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (.env)

```env
PORT=3001
DATABASE_URL=postgresql://user:user@13402004@localhost:5432/oto_kia_nha_trang
JWT_SECRET=your-secret-key
```

---

## 📌 Features to Develop

### MVP

- [ ] Homepage with banner, featured cars
- [ ] Car list by category
- [ ] Car details with gallery, specifications
- [ ] Quote / Contact form
- [ ] Test drive registration form
- [ ] About us, Contact pages
- [ ] Chat widget (Zalo, Facebook)
- [ ] Admin dashboard

---

## 📞 API Endpoints

### Cars

```
GET    /api/cars                 # Car list
GET    /api/cars/:slug           # Car details
GET    /api/cars/featured        # Featured cars
GET    /api/cars/category/:id    # Cars by category
```

### Categories

```
GET    /api/categories           # Category list
```

### Orders

```
POST   /api/orders/quote         # Submit quote request
POST   /api/orders/test-drive    # Register test drive
POST   /api/orders/contact       # Submit contact
```

---

## ⚠️ Important Notes

1. **Do not commit** `.env` files to git
2. **Optimize images** before upload (WebP format)
3. **Validate** all user inputs
4. **Rate limiting** for form submissions
5. **Backup database** regularly

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
