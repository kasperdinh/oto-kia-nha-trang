import prisma from "@/lib/prisma";

export async function findAllColors() {
  return prisma.colorMaster.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findColorById(id: string) {
  return prisma.colorMaster.findUnique({
    where: { id },
  });
}

export async function createColorRepository(data: {
  nameVI: string;
  nameEN?: string;
  code: string;
  hexCode?: string;
}) {
  return prisma.colorMaster.create({
    data,
  });
}

export async function updateColorRepository(
  id: string,
  data: {
    nameVI?: string;
    nameEN?: string;
    code?: string;
    hexCode?: string;
  },
) {
  return prisma.colorMaster.update({
    where: { id },
    data,
  });
}

export async function deleteColorRepository(id: string) {
  return prisma.colorMaster.delete({
    where: { id },
  });
}
