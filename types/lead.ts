export interface Lead {
  id: string;
  type: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;

  // Context
  carModel: string | null;
  date: string | null;
  location: string | null;
  installment: string | null;

  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateLeadInput = {
  type: "QUOTE" | "CONTACT";
  name: string;
  phone: string;
  email?: string;
  message?: string;
  carModel?: string;
  location?: string;
  installment?: string;
  date?: string;
};
