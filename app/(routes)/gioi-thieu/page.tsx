import { Metadata } from "next";
import Image from "next/image";
import { getBaseUrl } from "@/lib/url-helper";

export const metadata: Metadata = {
  title: "Giới Thiệu Showroom KIA Nha Trang - Khánh Hòa",
  description:
    "KIA Nha Trang - Showroom tiểu chuẩn 3S tại Khánh Hòa. Cam kết mang đến trải nghiệm mua sắm và dịch vụ bảo dưỡng xe KIA tốt nhất.",
  alternates: {
    canonical: `${getBaseUrl()}/gioi-thieu`,
  },
  openGraph: {
    title: "Về KIA Nha Trang - Showroom Chính Hãng Tại Khánh Hòa",
    description: "Đại lý ủy quyền chính thức của KIA Motors tại Khánh Hòa.",
    images: ["/introduce-banner.webp"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40 z-10"></div>
          <Image
            src="/introduce-banner.webp"
            alt="Xe KIA hiện đại"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Giới Thiệu KIA Khánh Hòa
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Nguồn thông tin tổng hợp về các dòng xe KIA
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-kia-dark mb-6">
              Chào mừng bạn đến với website KIA Khánh Hòa
            </h2>
            <div className="prose text-gray-600 space-y-4 text-justify">
              <p>
                KIA Khánh Hòa là website chuyên cung cấp thông tin về các dòng
                xe KIA đang được phân phối tại thị trường Việt Nam. Trang web
                được xây dựng với mục tiêu mang đến cho người dùng cái nhìn đầy
                đủ, rõ ràng và dễ tiếp cận về sản phẩm.
              </p>
              <p>
                Tại đây, bạn có thể tìm thấy thông tin chi tiết về thiết kế,
                trang bị, thông số kỹ thuật, giá tham khảo cũng như những điểm
                nổi bật của từng mẫu xe KIA, giúp bạn dễ dàng so sánh và lựa
                chọn mẫu xe phù hợp với nhu cầu.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/introduce-banner-2.avif"
              alt="Thông tin xe KIA"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-kia-dark mb-12">
            Giá Trị Cốt Lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-kia-red rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                C
              </div>
              <h3 className="text-xl font-bold mb-4">Chính Xác</h3>
              <p className="text-gray-600">
                Thông tin xe được tổng hợp rõ ràng, nhất quán và dễ hiểu cho
                người dùng.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-kia-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                C
              </div>
              <h3 className="text-xl font-bold mb-4">Cập Nhật</h3>
              <p className="text-gray-600">
                Nội dung luôn được bổ sung và cập nhật theo các mẫu xe và phiên
                bản mới.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                T
              </div>
              <h3 className="text-xl font-bold mb-4">Thân Thiện</h3>
              <p className="text-gray-600">
                Giao diện trực quan, giúp người dùng dễ dàng tìm kiếm và tra cứu
                thông tin.
              </p>
            </div>
          </div>
        </div>

        {/* Website Features */}
        <div>
          <h2 className="text-3xl font-bold text-center text-kia-dark mb-12">
            Nội Dung Trên Website
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="/carlist.jpg"
                  alt="Dòng xe KIA"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Danh sách xe KIA</h3>
                <p className="text-gray-600 text-sm">
                  Tổng hợp các mẫu xe KIA phổ biến cùng thông tin chi tiết từng
                  phiên bản.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="/carspec.avif"
                  alt="Thông số kỹ thuật"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Thông số & trang bị</h3>
                <p className="text-gray-600 text-sm">
                  Cung cấp thông số kỹ thuật, công nghệ và tiện nghi nổi bật của
                  từng mẫu xe.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="/converse.jpg"
                  alt="Liên hệ báo giá xe KIA"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Liên Hệ Báo Giá</h3>
                <p className="text-gray-600 text-sm">
                  Cung cấp kênh liên hệ nhanh chóng để người dùng tham khảo giá
                  xe KIA theo từng dòng xe và phiên bản.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="/handshake.jpg"
                  alt="Liên hệ và tư vấn xe KIA"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Liên Hệ & Tư Vấn</h3>
                <p className="text-gray-600 text-sm">
                  Hỗ trợ giải đáp thắc mắc và cung cấp thông tin liên quan đến
                  các dòng xe KIA thông qua các kênh liên hệ trên website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
