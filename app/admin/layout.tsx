import { auth, signOut } from "@/lib/auth/index";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block shrink-0">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold text-kia-red">Admin Panel</span>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              href="/admin"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-kia-red"
            >
              <HomeIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-kia-red" />
              Tổng quan
            </Link>
            <Link
              href="/admin/leads"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-kia-red"
            >
              <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-kia-red" />
              Quản lý yêu cầu
            </Link>
            <Link
              href="/admin/cars"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-kia-red"
            >
              <ArchiveBoxIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-kia-red" />
              Sản phẩm
            </Link>
            <Link
              href="/admin/colors"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-kia-red"
            >
              <SwatchIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-kia-red" />
              Quản lý màu sắc
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
              >
                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
