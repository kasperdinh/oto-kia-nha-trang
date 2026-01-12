import prisma from "@/lib/prisma";

async function main() {
  console.log("Start clearing database...");

  // Delete Leads
  const deletedLeads = await prisma.lead.deleteMany();
  console.log(`Deleted ${deletedLeads.count} leads.`);

  // Delete Cars (Cascade deletes CarImages and CarSpecs)
  const deletedCars = await prisma.car.deleteMany();
  console.log(`Deleted ${deletedCars.count} cars.`);

  console.log("Database cleared successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
