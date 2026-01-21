import { prisma } from "@/lib/prisma";
import { CreateLeadInput } from "@/types/lead";

export async function createLead(data: CreateLeadInput) {
  return prisma.lead.create({
    data: {
      ...data,
      status: "PENDING",
    },
  });
}

export async function findLeads(
  page: number = 1,
  limit: number = 10,
  filters?: { status?: string; type?: string; sort?: "asc" | "desc" },
) {
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters?.type && filters.type !== "ALL") {
    where.type = filters.type;
  }

  const orderBy = {
    createdAt: filters?.sort || "desc",
  };

  const [leads, total] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    leads,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function countLeads() {
  return prisma.lead.count();
}

export async function countLeadsByType(type: string) {
  return prisma.lead.count({
    where: { type },
  });
}

export async function updateLeadStatus(id: string, status: string) {
  return prisma.lead.update({
    where: { id },
    data: { status },
  });
}

export async function deleteLead(id: string) {
  return prisma.lead.delete({
    where: { id },
  });
}
