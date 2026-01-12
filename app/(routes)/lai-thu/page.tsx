import { Metadata } from "next";
import { TestDriveForm } from "../../../components/forms/TestDriveForm";

export const metadata: Metadata = {
  title: "Đăng Ký Lái Thử | KIA Nha Trang",
  description:
    "Đăng ký lái thử các dòng xe KIA mới nhất tại KIA Nha Trang. Trải nghiệm thực tế công nghệ và khả năng vận hành.",
};

export default function TestDrivePage() {
  return (
    <div className="bg-white">
      {/* Hero/Header */}
      <div className="bg-kia-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Đăng Ký Lái Thử
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Trải nghiệm cảm giác lái phấn khích cùng các dòng xe KIA thế hệ mới
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-8">
            <div className="prose text-gray-600">
              <p>
                Việc lái thử xe là bước quan trọng nhất để bạn có thể cảm nhận
                thực tế về khả năng vận hành, tiện nghi và các tính năng an toàn
                của chiếc xe. Tại KIA Nha Trang, chúng tôi luôn chuẩn bị sẵn các
                dòng xe lái thử mới nhất để phục vụ Quý khách hàng.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <span className="block text-3xl font-bold text-kia-red mb-2">
                  10+
                </span>
                <span className="text-gray-600 font-medium">
                  Dòng xe có sẵn
                </span>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <span className="block text-3xl font-bold text-kia-red mb-2">
                  24/7
                </span>
                <span className="text-gray-600 font-medium">
                  Đăng ký online
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <h3 className="font-bold text-lg text-kia-dark mb-4">
                Lưu ý khi đi lái thử:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Mang theo Giấy phép lái xe (bản gốc) còn hạn sử dụng.</li>
                <li>Nên đi cùng người thân để có thêm đánh giá khách quan.</li>
                <li>Đến đúng giờ hẹn để được phục vụ tốt nhất.</li>
                <li>Tuân thủ các hướng dẫn an toàn của nhân viên tư vấn.</li>
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <TestDriveForm />
          </div>
        </div>
      </div>
    </div>
  );
}
