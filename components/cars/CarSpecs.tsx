import { CarSpec } from "@/lib/data/cars";

export function CarSpecs({ specs }: { specs: CarSpec }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-bold text-kia-dark">Thông Số Kỹ Thuật</h3>
      </div>
      <div className="divide-y divide-gray-100">
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Động cơ</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.engine}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Công suất cực đại</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.power}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Mô-men xoắn</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.torque}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Hộp số</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.transmission}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Loại nhiên liệu</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.fuelType}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Mức tiêu thụ</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.fuelConsumption}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Số chỗ ngồi</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.seats}
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Kích thước (DxRxC)</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.dimensions.length} x {specs.dimensions.width} x{" "}
            {specs.dimensions.height} mm
          </span>
        </div>
        <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
          <span className="text-gray-500">Chiều dài cơ sở</span>
          <span className="font-medium text-gray-900 text-right">
            {specs.dimensions.wheelbase} mm
          </span>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <h4 className="text-md font-semibold text-kia-dark mb-3">
          Tính năng nổi bật
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {specs.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
