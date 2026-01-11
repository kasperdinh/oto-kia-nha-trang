# KIA Nha Trang – Website Bán Xe

## 📋 Tổng quan dự án

Đây là dự án website bán xe cho đại lý **KIA Nha Trang**, bao gồm:

* **Frontend**: Giao diện người dùng hiện đại, responsive
* **Backend**: RESTful API để quản lý xe, đơn hàng, khách hàng

---

## 🏗️ Kiến trúc dự án

```
oto-kia-nha-trang/
├── frontend/          # Next.js 16 + React 19 + TailwindCSS 4
│   ├── src/
│   │   └── app/       # App Router (Next.js)
│   └── public/        # Tài nguyên tĩnh
│
└── backend/           # NestJS 11 + TypeScript
    ├── src/
    │   ├── modules/   # Các module theo chức năng
    │   ├── common/    # Tiện ích dùng chung
    │   └── config/    # Cấu hình
    └── test/          # Kiểm thử E2E
```

---

## 🛠️ Công nghệ sử dụng

### Frontend

| Công nghệ   | Phiên bản | Mục đích             |
| ----------- | --------- | -------------------- |
| Next.js     | 16.1.1    | Framework React      |
| React       | 19.2.3    | Thư viện UI          |
| TailwindCSS | 4.x       | Styling              |
| TypeScript  | 5.x       | An toàn kiểu dữ liệu |

### Backend

| Công nghệ  | Phiên bản | Mục đích             |
| ---------- | --------- | -------------------- |
| NestJS     | 11.x      | Framework backend    |
| TypeScript | 5.7.3     | An toàn kiểu dữ liệu |
| Jest       | 30.x      | Kiểm thử             |

### Cơ sở dữ liệu (sẽ cài đặt)

* **PostgreSQL**
* **Prisma**

---

## 📁 Cấu trúc module Backend

### Các module cần phát triển:

```
src/
├── modules/
│   ├── cars/              # Quản lý xe
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── cars.controller.ts
│   │   ├── cars.service.ts
│   │   └── cars.module.ts
│   │
│   ├── categories/        # Danh mục xe (SUV, Sedan, MPV...)
│   ├── orders/            # Đơn hàng / yêu cầu tư vấn
│   ├── customers/         # Khách hàng
│   ├── testimonials/      # Đánh giá khách hàng
│   ├── gallery/           # Thư viện ảnh/video
│   ├── contacts/          # Liên hệ
│   └── auth/              # Xác thực (Admin)
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

## 📁 Cấu trúc Frontend

### Các trang cần phát triển:

```
src/app/
├── page.tsx                    # Trang chủ
├── layout.tsx                  # Layout gốc
├── globals.css                 # Style toàn cục
│
├── (routes)/
│   ├── xe/                     # Danh sách xe
│   │   ├── page.tsx
│   │   └── [slug]/             # Chi tiết xe
│   │       └── page.tsx
│   │
│   ├── gioi-thieu/             # Giới thiệu
│   │   └── page.tsx
│   │
│   ├── lien-he/                # Liên hệ
│   │   └── page.tsx
│   │
│   ├── bao-gia/                # Yêu cầu báo giá
│   │   └── page.tsx
│   │
│   └── lai-thu/                # Đăng ký lái thử
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

## 🗃️ Thiết kế Cơ sở dữ liệu

### Xe (Cars)

```typescript
interface Car {
  id: string;
  name: string; // Tên xe: "KIA Seltos"
  slug: string; // Slug URL: "kia-seltos"
  category: Category; // Danh mục: SUV, Sedan...
  price: number; // Giá niêm yết
  promotionPrice?: number; // Giá khuyến mãi
  description: string; // Mô tả
  specifications: CarSpec; // Thông số kỹ thuật
  images: string[]; // Hình ảnh
  colors: CarColor[]; // Màu sắc
  isNew: boolean; // Xe mới
  isFeatured: boolean; // Xe nổi bật
  status: "available" | "coming_soon" | "discontinued";
  createdAt: Date;
  updatedAt: Date;
}
```

### Thông số kỹ thuật (CarSpec)

```typescript
interface CarSpec {
  engine: string; // Động cơ: "1.6L Turbo"
  power: string; // Công suất: "177 HP"
  torque: string; // Mô-men xoắn: "265 Nm"
  transmission: string; // Hộp số: "7 cấp DCT"
  fuelType: string; // Nhiên liệu: "Xăng"
  fuelConsumption: string; // Mức tiêu thụ: "7.0L/100km"
  seats: number; // Số chỗ ngồi
  dimensions: {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
  };
  features: string[]; // Các tính năng nổi bật
}
```

### Đơn hàng (Order)

```typescript
interface Order {
  id: string;
  type: "quote" | "test_drive" | "purchase";
  customer: Customer;
  car: Car;
  color?: string;
  message?: string;
  status: "pending" | "contacted" | "completed" | "cancelled";
  preferredDate?: Date; // Ngày mong muốn (lái thử)
  createdAt: Date;
}
```

### Khách hàng (Customer)

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

## 🎨 Hướng dẫn thiết kế

### Màu sắc thương hiệu KIA

```css
:root {
  --kia-red: #bb162b; /* Đỏ KIA – màu chủ đạo */
  --kia-dark: #1a1a1a; /* Đen */
  --kia-gray: #4a4a4a; /* Xám */
  --kia-light: #f5f5f5; /* Xám nhạt */
  --kia-white: #ffffff; /* Trắng */
  --accent-gold: #c9a85c; /* Vàng sang trọng */
}
```

### Yêu cầu thiết kế

1. **Hiện đại & cao cấp**: Thiết kế sang trọng, tinh tế
2. **Mobile-first**: Ưu tiên hiển thị trên di động
3. **Tải nhanh**: Tối ưu ảnh, lazy loading
4. **Chuẩn SEO**: Meta tag, dữ liệu có cấu trúc
5. **Khả năng truy cập**: Tuân thủ WCAG 2.1 AA

### Font chữ

* **Tiêu đề**: Kia Signature (hoặc Montserrat)
* **Nội dung**: Inter hoặc Open Sans

---

## 🚀 Hướng dẫn phát triển

### Scripts

```bash
# Frontend
cd frontend
npm run dev          # Chạy môi trường dev (cổng 3000)
npm run build        # Build production
npm run lint         # Kiểm tra lỗi

# Backend
cd backend
npm run start:dev    # Chạy môi trường dev (cổng 3001)
npm run build        # Build production
npm run test         # Unit test
npm run test:e2e     # E2E test
```

### Biến môi trường

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

## 📌 Các tính năng cần phát triển

### MVP

* Trang chủ với banner, xe nổi bật
* Danh sách xe theo danh mục
* Trang chi tiết xe (gallery, thông số)
* Form báo giá / liên hệ
* Đăng ký lái thử
* Trang giới thiệu, liên hệ
* Chat widget (Zalo, Facebook)
* Trang quản trị (Admin dashboard)

---

## 📞 API Endpoints

### Xe

```
GET    /api/cars                 # Danh sách xe
GET    /api/cars/:slug           # Chi tiết xe
GET    /api/cars/featured        # Xe nổi bật
GET    /api/cars/category/:id    # Xe theo danh mục
```

### Danh mục

```
GET    /api/categories           # Danh sách danh mục
```

### Đơn hàng

```
POST   /api/orders/quote         # Gửi yêu cầu báo giá
POST   /api/orders/test-drive    # Đăng ký lái thử
POST   /api/orders/contact      # Gửi liên hệ
```

---

## ⚠️ Lưu ý quan trọng

1. **Không commit** file `.env` lên git
2. **Tối ưu hình ảnh** trước khi upload (WebP)
3. **Validate** toàn bộ dữ liệu người dùng
4. **Giới hạn tần suất** gửi form (rate limiting)
5. **Sao lưu database** định kỳ

---

## 📚 Tài liệu tham khảo

* Next.js Documentation
* NestJS Documentation
* TailwindCSS Documentation
* Prisma Documentation
