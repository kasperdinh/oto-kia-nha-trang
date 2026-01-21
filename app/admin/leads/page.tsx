import { getLeadsAction } from "@/app/actions/admin-leads";
// import { redirect } from "next/navigation";
import { LeadsTable } from "@/components/admin/leads/LeadsTable";
import { LeadFilters } from "@/components/admin/leads/LeadFilters";

// Update Props to include searchParams
export default async function AdminLeadsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  // Parse page from searchParams
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const limit = 10;

  // Parse filters
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;
  const type =
    typeof searchParams.type === "string" ? searchParams.type : undefined;
  const sort =
    typeof searchParams.sort === "string" &&
    (searchParams.sort === "asc" || searchParams.sort === "desc")
      ? (searchParams.sort as "asc" | "desc")
      : "desc";

  const { leads, totalPages } = await getLeadsAction(page, limit, {
    status,
    type,
    sort,
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Quản lý yêu cầu
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả các yêu cầu từ khách hàng bao gồm báo giá, lái thử
            và liên hệ.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <LeadFilters totalPages={totalPages} currentPage={page} />
      </div>

      <LeadsTable leads={leads} totalPages={totalPages} currentPage={page} />
    </div>
  );
}
