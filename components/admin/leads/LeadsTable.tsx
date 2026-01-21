"use client";

import { useState } from "react";
import { Lead } from "@/types/lead";
import { LeadDetailModal } from "./LeadDetailModal";
import { LeadEditModal } from "./LeadEditModal";
import { LeadDeleteModal } from "./LeadDeleteModal";
import {
  updateLeadStatusAction,
  deleteLeadAction,
} from "@/app/actions/admin-leads";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
// import { useRouter } from "next/navigation";

const LEAD_STATUS_MAP: Record<string, string> = {
  PENDING: "Chưa xử lý",
  PROCESSED: "Đã xử lý",
  ARCHIVED: "Lưu trữ",
};

const LEAD_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  QUOTE: {
    label: "Báo giá",
    className: "bg-green-50 text-green-700 ring-green-600/20",
  },

  CONTACT: {
    label: "Liên hệ",
    className: "bg-blue-50 text-blue-700 ring-blue-600/20",
  },
};

const DEFAULT_TYPE_CONFIG = {
  label: "Nhận tin", // Fallback label
  className: "bg-gray-50 text-gray-700 ring-gray-600/20",
};

interface LeadsTableProps {
  leads: Lead[];
  totalPages: number;
  currentPage: number;
}

export function LeadsTable({ leads: initialLeads }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // const router = useRouter(); // Unused

  const handleOpenDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteOpen(true);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsPending(true);
    try {
      await updateLeadStatusAction(id, newStatus);
      setIsEditOpen(false);
      setSelectedLead(null);
    } catch {
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsPending(true);
    try {
      await deleteLeadAction(id);
      setIsDeleteOpen(false);
      setSelectedLead(null);
    } catch {
      alert("Có lỗi xảy ra khi xoá lead.");
    } finally {
      setIsPending(false);
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  };

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tên khách hàng
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Loại
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ngày tạo
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-semibold text-gray-900"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {initialLeads.map((lead) => {
                    const typeConfig =
                      LEAD_TYPE_CONFIG[lead.type] || DEFAULT_TYPE_CONFIG;
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {lead.name}
                          <br />
                          <span className="font-normal text-gray-500">
                            {lead.phone}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${typeConfig.className}`}
                          >
                            {typeConfig.label}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={
                              lead.status === "PENDING"
                                ? "text-yellow-600 font-medium"
                                : lead.status === "PROCESSED"
                                  ? "text-green-600 font-medium"
                                  : "text-gray-500"
                            }
                          >
                            {LEAD_STATUS_MAP[lead.status] || lead.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(lead)}
                              className="text-gray-400 hover:text-indigo-600 transition-colors"
                              title="Xem chi tiết"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(lead)}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                              title="Cập nhật"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(lead)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              title="Xoá"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <LeadDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        lead={selectedLead}
        statusMap={LEAD_STATUS_MAP}
        typeConfig={LEAD_TYPE_CONFIG}
      />

      <LeadEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        lead={selectedLead}
        statusMap={LEAD_STATUS_MAP}
        onUpdate={handleUpdateStatus}
        isPending={isPending}
      />

      <LeadDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        lead={selectedLead}
        onDelete={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
