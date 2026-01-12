import prisma from "@/lib/prisma";

export type LeadData = {
  id: string;
  type: string;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  carModel?: string | null;
  date?: string | null;
  location?: string | null;
  installment?: string | null;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function createLead(data: LeadData) {
  try {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        status: "PENDING",
      },
    });
    return { success: true, data: lead };
  } catch (error) {
    console.error("Error creating lead:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function getLeads() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: leads };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}
