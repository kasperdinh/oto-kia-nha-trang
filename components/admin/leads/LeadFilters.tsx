"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";

const STATUS_OPTIONS = [
  { value: "ALL", label: "Tất cả trạng thái" },
  { value: "PENDING", label: "Chưa xử lý" },
  { value: "PROCESSED", label: "Đã xử lý" },
  { value: "ARCHIVED", label: "Lưu trữ" },
];

const TYPE_OPTIONS = [
  { value: "ALL", label: "Tất cả loại" },
  { value: "QUOTE", label: "Báo giá" },

  { value: "CONTACT", label: "Liên hệ" },
];

const SORT_OPTIONS = [
  { value: "desc", label: "Mới nhất", icon: BarsArrowDownIcon },
  { value: "asc", label: "Cũ nhất", icon: BarsArrowUpIcon },
];

interface LeadFiltersProps {
  totalPages: number;
  currentPage: number;
}

export function LeadFilters({ totalPages, currentPage }: LeadFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
        <div className="relative">
          <label htmlFor="status" className="sr-only">
            Trạng thái
          </label>
          <select
            id="status"
            value={searchParams.get("status") || "ALL"}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 focus:border-kia-red focus:outline-none focus:ring-1 focus:ring-kia-red sm:text-sm sm:leading-6 cursor-pointer"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="type" className="sr-only">
            Loại
          </label>
          <select
            id="type"
            value={searchParams.get("type") || "ALL"}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 focus:border-kia-red focus:outline-none focus:ring-1 focus:ring-kia-red sm:text-sm sm:leading-6 cursor-pointer"
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            Sắp xếp
          </label>
          <select
            id="sort"
            value={searchParams.get("sort") || "desc"}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 focus:border-kia-red focus:outline-none focus:ring-1 focus:ring-kia-red sm:text-sm sm:leading-6 cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>

        {searchParams.toString() && (
          <button
            onClick={() => router.push(pathname)}
            className="text-sm text-gray-500 hover:text-kia-red underline whitespace-nowrap"
          >
            Xoá bộ lọc
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center justify-center rounded-lg px-2 py-2 text-gray-500 hover:text-gray-900 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 focus:outline-none"
            >
              <span className="sr-only">Trang trước</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="hidden sm:flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isCurrent = page === currentPage;

                const shouldShow =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (shouldShow) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`relative inline-flex items-center justify-center min-w-9 h-9 px-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none
                      ${
                        isCurrent
                          ? "bg-kia-red text-white shadow-sm"
                          : "text-gray-600 hover:bg-red-50 hover:text-gray-900"
                      }
                      `}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span
                      key={page}
                      className="relative inline-flex items-center justify-center min-w-9 h-9 px-1 text-sm text-gray-400"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Mobile compact pagination view */}
            <span className="sm:hidden text-sm font-medium text-gray-700 mx-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center justify-center rounded-lg px-2 py-2 text-gray-500 hover:text-gray-900 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 focus:outline-none"
            >
              <span className="sr-only">Trang sau</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
