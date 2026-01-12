import { PrismaClient } from "@prisma/client";
import { getAllCars } from "../lib/data/cars";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const cars = getAllCars();

  for (const car of cars) {
    const { specs, images } = car;

    // Create Car
    const createdCar = await prisma.car.upsert({
      where: { slug: car.slug },
      update: {},
      create: {
        slug: car.slug,
        name: car.name,
        price: car.price,
        promotionPrice: car.promotionPrice,
        description: car.description,
        category: car.category,
        seats: car.specs.seats,
        engine: car.specs.engine,
        imageUrl: car.imageUrl,

        // Create related CarSpec
        specs: {
          create: {
            engine: specs.engine,
            power: specs.power,
            torque: specs.torque,
            transmission: specs.transmission,
            fuelType: specs.fuelType,
            fuelConsumption: specs.fuelConsumption,
            seats: specs.seats,
            length: specs.dimensions.length,
            width: specs.dimensions.width,
            height: specs.dimensions.height,
            wheelbase: specs.dimensions.wheelbase,
            features: JSON.stringify(specs.features),
          },
        },

        // Create related CarImages
        images: {
          create: images.map((url) => ({ url })),
        },
      },
    });

    console.log(`Created car with id: ${createdCar.id}`);
  }

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
