import { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Yêu Cầu Báo Giá | KIA Nha Trang",
  description:
    "Nhận báo giá xe KIA lăn bánh mới nhất tại Nha Trang. Ưu đãi hấp dẫn, hỗ trợ trả góp lãi suất thấp.",
};

export default function QuotePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-kia-dark sm:text-4xl mb-4">
                Yêu Cầu Báo Giá
              </h1>
              <p className="text-lg text-gray-600">
                Hãy để lại thông tin để nhân viên tư vấn của chúng tôi gửi đến
                bạn bảng báo giá chi tiết và các chương trình khuyến mãi mới
                nhất.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-kia-red mb-4">
                Quyền lợi khi mua xe tại KIA Nha Trang
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-kia-red font-bold text-xs">
                    1
                  </span>
                  <span className="text-gray-700">
                    Giá xe tốt nhất thị trường với nhiều ưu đãi độc quyền.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-kia-red font-bold text-xs">
                    2
                  </span>
                  <span className="text-gray-700">
                    Tư vấn tài chính ngân hàng miễn phí, lãi suất thấp.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-kia-red font-bold text-xs">
                    3
                  </span>
                  <span className="text-gray-700">
                    Hỗ trợ đăng ký, đăng kiểm, giao xe tận nhà.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-kia-red font-bold text-xs">
                    4
                  </span>
                  <span className="text-gray-700">
                    Bảo hành 5 năm hoặc 150.000km chính hãng.
                  </span>
                </li>
              </ul>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000"
                alt="KIA Customer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:mt-0">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
