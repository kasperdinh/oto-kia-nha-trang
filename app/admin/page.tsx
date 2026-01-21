import { UsersIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { getLeadStats } from "@/services/lead.service";
import { countCars } from "@/repositories/car.repository";

// Connect to real data
const getCarStats = async () => {
  const total = await countCars({ page: 1, limit: 1 }, false);
  return { total };
};

export default async function AdminDashboard() {
  const statsData = await getLeadStats();
  const carStats = await getCarStats();

  const stats = [
    {
      name: "Tổng Leads",
      value: statsData.total,
      icon: UsersIcon,
      color: "bg-blue-500",
    },
    {
      name: "Báo Giá",
      value: statsData.quote,
      icon: ChatBubbleLeftIcon,
      color: "bg-green-500",
    },

    {
      name: "Liên Hệ",
      value: statsData.contact,
      icon: ChatBubbleLeftIcon,
      color: "bg-purple-500",
    },
    {
      name: "Sản phẩm",
      value: carStats.total,
      icon: UsersIcon, // Todo: Update icon
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tổng quan</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
