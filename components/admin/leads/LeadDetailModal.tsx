import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Lead } from "@/types/lead";

type LeadDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  statusMap: Record<string, string>;
  typeConfig: Record<string, { label: string; className: string }>;
};

export function LeadDetailModal({
  isOpen,
  onClose,
  lead,
  statusMap,
  typeConfig,
}: LeadDetailModalProps) {
  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết yêu cầu">
      {lead && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Họ tên</p>
              <p className="font-medium text-gray-900">{lead.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Số điện thoại</p>
              <p className="font-medium text-gray-900">{lead.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{lead.email || "---"}</p>
            </div>
            <div>
              <p className="text-gray-500">Ngày tạo</p>
              <p className="font-medium text-gray-900">
                {formatDate(lead.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Loại yêu cầu</p>
              <p className="font-medium text-gray-900">
                {typeConfig[lead.type]?.label || lead.type}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Trạng thái</p>
              <p className="font-medium text-gray-900">
                {statusMap[lead.status] || lead.status}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Thông tin xe & Yêu cầu
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {lead.carModel && (
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-gray-500">Dòng xe quan tâm</p>
                  <p className="font-medium text-kia-red">{lead.carModel}</p>
                </div>
              )}
              {lead.location && (
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-gray-500">Khu vực</p>
                  <p className="font-medium text-kia-red">{lead.location}</p>
                </div>
              )}
              {lead.installment && (
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-gray-500">Hình thức mua xe</p>
                  <p className="font-medium text-kia-red">
                    {lead.installment === "no" ? "Trả thẳng" : "Trả góp"}
                  </p>
                </div>
              )}
              {lead.date && (
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-gray-500">Ngày hẹn lái thử</p>
                  <p className="font-medium text-kia-red">{lead.date}</p>
                </div>
              )}
            </div>
            {lead.message && (
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-1">Lời nhắn:</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 whitespace-pre-wrap">
                  {lead.message}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
