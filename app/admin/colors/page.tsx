import { getAllColors } from "@/services/color.service";
import ColorList from "@/components/admin/colors/ColorList";

export const metadata = {
  title: "Quản lý Màu sắc | Admin",
};

export default async function AdminColorsPage() {
  const colors = await getAllColors();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ColorList colors={colors} />
    </div>
  );
}
