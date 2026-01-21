import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Lead } from "@/types/lead";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type LeadDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onDelete: (id: string) => Promise<void>;
  isPending: boolean;
};

export function LeadDeleteModal({
  isOpen,
  onClose,
  lead,
  onDelete,
  isPending,
}: LeadDeleteModalProps) {
  const handleDelete = () => {
    if (lead) {
      onDelete(lead.id);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận xoá">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-red-600 bg-red-50 p-3 rounded-md">
          <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />
          <p className="text-sm font-medium">
            Hành động này không thể hoàn tác.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Bạn có chắc chắn muốn xoá thông tin của khách hàng{" "}
          <span className="font-bold text-gray-900">{lead?.name}</span> không?
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Hủy
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            onClick={handleDelete}
            isLoading={isPending}
          >
            Xoá vĩnh viễn
          </Button>
        </div>
      </div>
    </Modal>
  );
}
