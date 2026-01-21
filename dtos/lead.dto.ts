import { Lead } from "@/types/lead";

export interface LeadDTO {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  carModel: string | null;
  status: string;
  createdAt: string;
}

export function toLeadDTO(lead: Lead): LeadDTO {
  return {
    id: lead.id,
    type: lead.type,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? null,
    message: lead.message ?? null,
    carModel: lead.carModel ?? null,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
  };
}
