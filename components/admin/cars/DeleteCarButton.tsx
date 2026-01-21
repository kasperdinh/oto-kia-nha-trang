"use client";

import { Button } from "@/components/ui/Button";
import { deleteCar } from "@/app/actions/cars";

export default function DeleteCarButton({ slug }: { slug: string }) {
  async function handleDelete() {
    if (
      !confirm("Bạn có chắc muốn xóa xe này? Hành động này không thể hoàn tác.")
    ) {
      return;
    }
    await deleteCar(slug);
  }

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleDelete}
      className="text-red-600 border-red-600 hover:bg-red-50"
    >
      Xóa xe
    </Button>
  );
}
