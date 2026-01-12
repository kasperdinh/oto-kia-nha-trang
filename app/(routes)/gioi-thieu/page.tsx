import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | KIA Nha Trang",
  description:
    "Giới thiệu về đại lý KIA Nha Trang - Showroom trưng bày, xưởng dịch vụ và đội ngũ nhân viên chuyên nghiệp.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Placeholder for About Hero Image */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40 z-10"></div>
          {/* Replace with actual showroom image */}
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2000"
            alt="KIA Nha Trang Showroom"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Về KIA Nha Trang
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Đại lý ủy quyền chính thức của KIA Motors tại Khánh Hòa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-kia-dark mb-6">
              Chào mừng đến với KIA Nha Trang
            </h2>
            <div className="prose text-gray-600 space-y-4 text-justify">
              <p>
                Tọa lạc tại vị trí đắc địa trên đường 23/10, TP. Nha Trang, KIA
                Nha Trang là đại lý 3S chính hãng theo tiêu chuẩn toàn cầu của
                KIA Motors. Chúng tôi tự hào mang đến cho khách hàng những sản
                phẩm xe ô tô KIA chất lượng cao cùng dịch vụ hậu mãi chuyên
                nghiệp.
              </p>
              <p>
                Với diện tích xây dựng rộng lớn, showroom được thiết kế hiện
                đại, sang trọng, tạo không gian thoải mái nhất cho Quý khách
                hàng khi đến tham quan và lựa chọn xe. Đội ngũ tư vấn bán hàng
                được đào tạo bài bản, am hiểu sản phẩm, luôn sẵn sàng hỗ trợ Quý
                khách tìm được chiếc xe ưng ý nhất.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"
              alt="Showroom Interior"
              fill
              className="object-cover"
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
                T
              </div>
              <h3 className="text-xl font-bold mb-4">Tận Tâm</h3>
              <p className="text-gray-600">
                Đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu. Phục vụ
                với thái độ nhiệt tình, chu đáo nhất.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-kia-dark rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                C
              </div>
              <h3 className="text-xl font-bold mb-4">Chuyên Nghiệp</h3>
              <p className="text-gray-600">
                Quy trình làm việc bài bản, đội ngũ nhân sự trình độ cao, cơ sở
                vật chất hiện đại chuẩn quốc tế.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                U
              </div>
              <h3 className="text-xl font-bold mb-4">Uy Tín</h3>
              <p className="text-gray-600">
                Minh bạch trong mọi giao dịch, cam kết chất lượng sản phẩm và
                dịch vụ đúng như đã công bố.
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-3xl font-bold text-center text-kia-dark mb-12">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"
                  alt="Sales"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tư vấn mua xe mới</h3>
                <p className="text-gray-600 text-sm">
                  Cung cấp đầy đủ các dòng xe KIA mới nhất với nhiều ưu đãi hấp
                  dẫn. Hỗ trợ lái thử xe tận nhà.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"
                  alt="Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Bảo hành & Bảo dưỡng</h3>
                <p className="text-gray-600 text-sm">
                  Xưởng dịch vụ quy mô lớn, trang thiết bị hiện đại. Kỹ thuật
                  viên được đào tạo chuyên sâu về xe KIA.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"
                  alt="Parts"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Phụ tùng chính hãng</h3>
                <p className="text-gray-600 text-sm">
                  Cung cấp phụ tùng, phụ kiện chính hãng KIA, đảm bảo chất lượng
                  và độ bền cho xe của bạn.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="shrink-0 w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300"
                  alt="Finance"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Hỗ trợ tài chính</h3>
                <p className="text-gray-600 text-sm">
                  Tư vấn vay mua xe trả góp với lãi suất ưu đãi, thủ tục nhanh
                  gọn, tỷ lệ duyệt vay cao.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
