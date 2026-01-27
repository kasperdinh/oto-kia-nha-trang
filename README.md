# Kia Nha Trang / Kia Khanh Hoa Management System

A comprehensive management system for the Kia dealership in Nha Trang/Khanh Hoa. This application handles car inventory, leads, rich content management for car models, and user administration.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication:** [NextAuth.js v5](https://authjs.dev/)
- **Storage:** AWS S3 (via `@aws-sdk/client-s3`)
- **Testing:** [Playwright](https://playwright.dev/)
- **Rich Text Editor:** [Tiptap](https://tiptap.dev/)

## ✨ Key Features

### 🚗 Car Management

- **Models:** Manage car models (e.g., Seltos, Carnival) with rich descriptions and SEO metadata.
- **Variants:** Handle specific variants (e.g., 1.4 Turbo Luxury) with pricing and hierarchy.
- **Colors:** Master color management and variant-specific color mappings.
- **Gallery:** Upload and manage images for specific variants or general galleries.
- **Documents:** Attach brochures and spec sheets to car models.

### 👥 Lead Management

- **Tracking:** Capture leads from quotes, test drive requests, and contact forms.
- **Workflow:** Track status (Pending, Processed, Archived).

### ⚙️ System

- **User Roles:** Admin and User role-based access control.
- **Master Data:** Centralized management for car colors.

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL
- An AWS Account (for S3 storage)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd oto-kia-nha-trang
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Copy the example environment file and configure your variables.

    ```bash
    cp .env.example .env
    ```

    Update `.env` with your database URL, auth secret, and AWS credentials.

4.  **Database Setup:**
    Generate the Prisma client and push the schema to your database.

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Seed Data:**
    Populate the database with initial data.
    ```bash
    npm run prisma:seed
    ```

### Running the Application

**Development Mode:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

**Production Build:**

```bash
npm run build
npm run start
```

## 🧪 Running Tests

This project uses Playwright for end-to-end testing.

```bash
# Run all tests
npx playwright test

# Run UI mode
npx playwright test --ui
```

## 📜 Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run start`: Start production server.
- `npm run lint`: Run ESLint.
- `npm run prisma:seed`: Seed the database.
- `npm run prisma:clear`: Clear the database (use with caution).
