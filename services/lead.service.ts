import { CreateLeadInput } from "@/types/lead";
import {
  createLead as createLeadRepo,
  findLeads,
  countLeads,
  countLeadsByType,
  updateLeadStatus as updateLeadStatusRepo,
  deleteLead as deleteLeadRepo,
} from "@/repositories/lead.repository";

export async function submitLead(data: CreateLeadInput) {
  return createLeadRepo(data);
}

export async function getAllLeads(
  page: number = 1,
  limit: number = 10,
  filters?: { status?: string; type?: string; sort?: "asc" | "desc" },
) {
  return findLeads(page, limit, filters);
}

export async function getLeadStats() {
  const [total, quote, contact] = await Promise.all([
    countLeads(),
    countLeadsByType("QUOTE"),
    countLeadsByType("CONTACT"),
  ]);

  return {
    total,
    quote,
    contact,
  };
}

export async function updateLeadStatus(id: string, status: string) {
  return updateLeadStatusRepo(id, status);
}

export async function deleteLead(id: string) {
  return deleteLeadRepo(id);
}
