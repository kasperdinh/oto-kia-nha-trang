import prisma from "@/lib/prisma";

// --- DATA DEFINITIONS ---

const COLORS = [
  {
    nameVI: "Trắng",
    nameEN: "Gracial White Pearl",
    code: "GWP",
    hexCode: "#F5F5F2", // trắng ngọc
  },
  {
    nameVI: "Vàng",
    nameEN: "Star Bright Yellow",
    code: "B4Y",
    hexCode: "#F2C200", // vàng tươi
  },
  {
    nameVI: "Đỏ",
    nameEN: "Runaway Red",
    code: "CR5",
    hexCode: "#9E1B32", // đỏ đậm ánh rượu vang
  },
  {
    nameVI: "Xanh",
    nameEN: "Mineral Blue",
    code: "M4B",
    hexCode: "#2F5D8C", // xanh khoáng
  },
  {
    nameVI: "Xám",
    nameEN: "Steel Grey",
    code: "KLG",
    hexCode: "#6E7175", // xám thép
  },
  {
    nameVI: "Xanh",
    nameEN: "Cityscape Green",
    code: "CGE",
    hexCode: "#3E5F4F", // xanh lục đô thị
  },
];

const CARS = [
  {
    name: "KIA Morning",
    slug: "kia-morning",
    category: "Hatchback",
    description: "",
    variants: [
      {
        name: "New Morning MT",
        price: 349000000,
        promotionPrice: 300000000,
      },
      {
        name: "New Morning AT",
        price: 439000000,
        promotionPrice: undefined,
      },
      {
        name: "New Morning GT-Line",
        price: 469000000,
        promotionPrice: undefined,
      },
    ],
    // Common images for gallery
    images: [
      "",
    ],
  },
];

async function main() {
  console.log("Start seeding ...");

  // 1. Seed Colors
  for (const color of COLORS) {
    await prisma.colorMaster.upsert({
      where: { code: color.code }, 
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
                url: car.images[0]!, // Re-use main image for demo
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

  // console.log("Seeding 100 random leads...");
  // // ... (Same random logic)
  // const NAMES = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];
  // const TYPES = ["QUOTE", "CONTACT"];
  // const STATUSES = ["PENDING", "PROCESSED", "ARCHIVED"];

  // const leadsData = Array.from({ length: 20 }).map(() => {
  //   // Reduced to 20 for speed
  //   return {
  //     type: TYPES[Math.floor(Math.random() * TYPES.length)]!,
  //     name: NAMES[Math.floor(Math.random() * NAMES.length)]!,
  //     phone: "0900000000",
  //     email: "demo@example.com",
  //     carModel: "KIA Seltos",
  //     status: STATUSES[Math.floor(Math.random() * STATUSES.length)]!,
  //   };
  // });

  // for (const lead of leadsData) {
  //   await prisma.lead.create({ data: lead });
  // }

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
