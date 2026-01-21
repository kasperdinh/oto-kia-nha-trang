import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// --- DATA DEFINITIONS ---

const COLORS = [
  {
    nameVI: "Trắng Ngọc Trai",
    nameEN: "Snow White Pearl",
    code: "GWP",
    hexCode: "#ffffff",
  },
  { nameVI: "Đỏ", nameEN: "Red", code: "CR5", hexCode: "#bb162b" },
  { nameVI: "Xanh", nameEN: "Blue", code: "B2", hexCode: "#1F4FA3" },
  { nameVI: "Đen", nameEN: "Aurora Black", code: "ABP", hexCode: "#000000" },
  { nameVI: "Xám", nameEN: "Steel Gray", code: "KLG", hexCode: "#808080" },
];

const CARS = [
  {
    name: "KIA Seltos",
    slug: "kia-seltos",
    category: "SUV",
    description:
      "<p><strong>KIA Seltos</strong> - Mẫu SUV đô thị dẫn đầu xu hướng với thiết kế mạnh mẽ, thể thao, nhiều tiện nghi cao cấp và khả năng vận hành linh hoạt.</p>",
    variants: [
      {
        name: "1.4L Turbo Luxury",
        price: 604000000,
        promotionPrice: 599000000,
      },
      {
        name: "1.4L Turbo Premium",
        price: 699000000,
        promotionPrice: 689000000,
      },
    ],
    // Common images for gallery
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    name: "KIA Sonet",
    slug: "kia-sonet",
    category: "SUV",
    description:
      "<p><strong>KIA Sonet</strong> - SUV Đô thị nhỏ gọn, năng động và thông minh.</p>",
    variants: [
      {
        name: "Premium",
        price: 519000000,
        promotionPrice: undefined, // Explicitly undefined
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    name: "KIA Carnival",
    slug: "kia-carnival",
    category: "MPV",
    description:
      "<p><strong>KIA Carnival</strong> - SUV đô thị cỡ lớn, sang trọng và đẳng cấp.</p>",
    variants: [
      {
        name: "Signature",
        price: 1189000000,
        promotionPrice: undefined,
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    name: "KIA K3",
    slug: "kia-k3",
    category: "Sedan",
    description:
      "<p><strong>KIA K3</strong> - Sedan hạng C chuẩn mực công nghệ.</p>",
    variants: [
      {
        name: "Premium",
        price: 549000000,
        promotionPrice: undefined,
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    name: "KIA Morning",
    slug: "kia-morning",
    category: "Hatchback",
    description:
      "<p><strong>KIA Morning</strong> - Mẫu xe đô thị nhỏ gọn, linh hoạt.</p>",
    variants: [
      {
        name: "GT-Line",
        price: 369000000,
        promotionPrice: undefined,
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    name: "KIA Sorento",
    slug: "kia-sorento",
    category: "SUV",
    description: "<p><strong>KIA Sorento</strong> - SUV 7 chỗ sang trọng.</p>",
    variants: [
      {
        name: "Signature Diesel",
        price: 999000000,
        promotionPrice: undefined,
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
  },
];

async function main() {
  console.log("Start seeding ...");

  // 1. Seed Colors
  for (const color of COLORS) {
    await prisma.colorMaster.upsert({
      where: { code: color.code }, // Use code as unique identifier for upsert
      update: {
        nameVI: color.nameVI,
        nameEN: color.nameEN,
        hexCode: color.hexCode,
      },
      create: {
        nameVI: color.nameVI,
        nameEN: color.nameEN,
        code: color.code,
        hexCode: color.hexCode,
      },
    });
  }

  // Re-fetch all colors to get IDs
  const allColors = await prisma.colorMaster.findMany();

  // 2. Seed Cars
  for (const car of CARS) {
    // Create Car
    const createdCar = await prisma.car.upsert({
      where: { slug: car.slug },
      update: {
        name: car.name,
        category: car.category,
        description: car.description,
      },
      create: {
        slug: car.slug,
        name: car.name,
        category: car.category,
        description: car.description,
        // Add random gallery images
        images: {
          create: car.images.map((url) => ({ url })),
        },
      },
    });

    // Create Variants
    for (const variant of car.variants) {
      const createdVariant = await prisma.carVariant.create({
        data: {
          carId: createdCar.id,
          name: variant.name,
          price: variant.price,
          promotionPrice: variant.promotionPrice,
        },
      });

      // Assign random colors to this variant
      // Let's take first 3 colors for demo
      const selectedColors = allColors.slice(0, 3);
      for (const color of selectedColors) {
        await prisma.carColor.create({
          data: {
            variantId: createdVariant.id,
            colorMasterId: color.id,
            // Add a mock image for this specific color variant
            images: {
              create: {
                url: car.images[0], // Re-use main image for demo
              },
            },
          },
        });
      }
    }
  }

  // 3. Seed Leads (Legacy format adapted)
  // ... Keep mostly same, just check mandatory fields
  // Leads don't depend on Car ID strongly in the original Code (just text), so we can keep it as string.

  console.log("Seeding 100 random leads...");
  // ... (Same random logic)
  const NAMES = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];
  const TYPES = ["QUOTE", "CONTACT"];
  const STATUSES = ["PENDING", "PROCESSED", "ARCHIVED"];

  const leadsData = Array.from({ length: 20 }).map(() => {
    // Reduced to 20 for speed
    return {
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      phone: "0900000000",
      email: "demo@example.com",
      carModel: "KIA Seltos",
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    };
  });

  for (const lead of leadsData) {
    await prisma.lead.create({ data: lead });
  }

  // Seed Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@kia.com" },
    update: {},
    create: {
      email: "admin@kia.com",
      name: "Admin User",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
