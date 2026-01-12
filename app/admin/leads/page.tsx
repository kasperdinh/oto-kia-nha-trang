import prisma from "@/lib/prisma";
import { Lead } from "@prisma/client";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Quản lý Leads
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả các yêu cầu từ khách hàng bao gồm báo giá, lái thử
            và liên hệ.
          </p>
        </div>
      </div>
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
                      Thông tin
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {leads.map((lead: Lead) => (
                    <tr key={lead.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {lead.name}
                        <br />
                        <span className="font-normal text-gray-500">
                          {lead.phone}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            lead.type === "QUOTE"
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : lead.type === "TEST_DRIVE"
                              ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                              : "bg-blue-50 text-blue-700 ring-blue-600/20"
                          }`}
                        >
                          {lead.type === "QUOTE"
                            ? "Báo giá"
                            : lead.type === "TEST_DRIVE"
                            ? "Lái thử"
                            : "Liên hệ"}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {lead.carModel && (
                          <div className="font-medium text-gray-900">
                            Xe: {lead.carModel}
                          </div>
                        )}
                        {lead.message && <div>{lead.message}</div>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {lead.status === "PENDING" ? "Chưa xử lý" : "Đã xử lý"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
