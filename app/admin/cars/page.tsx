import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getAllCars } from "@/services/car.service";

export default async function AdminCarsPage() {
  const { data: cars } = await getAllCars();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Sản phẩm</h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách các dòng xe đang hiển thị trên website.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/cars/new"
            className="block rounded-md bg-kia-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-kia-red"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            Thêm xe mới
          </Link>
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
                      className="w-[40%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Tên xe
                    </th>
                    <th
                      scope="col"
                      className="w-[20%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Danh mục
                    </th>
                    <th
                      scope="col"
                      className="w-[20%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="w-[20%] px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {cars.map((car: any) => (
                    <tr key={car.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {car.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {car.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {car.isPublic ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Công khai
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            Ẩn
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                        <Link
                          href={`/admin/cars/${car.slug}`}
                          className="text-kia-red hover:text-red-900"
                        >
                          Sửa
                        </Link>
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
