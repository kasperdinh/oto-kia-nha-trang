import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Lead } from "@/types/lead";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

type LeadEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  statusMap: Record<string, string>;
  onUpdate: (id: string, newStatus: string) => Promise<void>;
  isPending: boolean;
};

export function LeadEditModal({
  isOpen,
  onClose,
  lead,
  statusMap,
  onUpdate,
  isPending,
}: LeadEditModalProps) {
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (lead && lead.status !== newStatus) {
      setNewStatus(lead.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead?.id, lead?.status, isOpen]);

  const handleUpdate = () => {
    if (lead) {
      onUpdate(lead.id, newStatus);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cập nhật trạng thái">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Thay đổi trạng thái cho khách hàng{" "}
          <span className="font-bold text-gray-900">{lead?.name}</span>
        </p>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái mới
          </label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
          >
            {Object.entries(statusMap).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-500">
            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Hủy
          </Button>
          <Button onClick={handleUpdate} isLoading={isPending}>
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}
