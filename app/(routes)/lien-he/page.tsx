import { Metadata } from "next";
import { ContactForm } from "../../../components/forms/ContactForm";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Liên Hệ | KIA Nha Trang",
  description:
    "Liên hệ với KIA Nha Trang để được tư vấn về xe, báo giá, lái thử và dịch vụ bảo dưỡng.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-xl text-gray-300">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 lg:col-span-1 h-fit">
            <h3 className="text-xl font-bold text-kia-dark mb-6">
              Thông Tin Liên Hệ
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-kia-red shrink-0">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Showroom</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Lô số 1, Khu vực 2, Đường 23/10, Vĩnh Hiệp, Nha Trang, Khánh
                    Hòa
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-kia-red shrink-0">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hotline</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="block">Kinh doanh: 0905.123.456</span>
                    <span className="block">Dịch vụ: 0905.654.321</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-kia-red shrink-0">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    info@kianhatrang.vn
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-full text-kia-red shrink-0">
                  <ClockIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Giờ làm việc</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="block">Thứ 2 - Thứ 7: 08:00 - 17:30</span>
                    <span className="block">Chủ nhật: 08:00 - 12:00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 lg:col-span-2">
            <h3 className="text-xl font-bold text-kia-dark mb-2">
              Gửi Tin Nhắn
            </h3>
            <p className="text-gray-500 mb-8">
              Điền thông tin vào biểu mẫu dưới đây, chúng tôi sẽ phản hồi trong
              thời gian sớm nhất.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-lg h-96 border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.8687728612!2d109.1354563!3d12.25701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317067d02dc0420d%3A0xe5396560946654e9!2sKia%20Nha%20Trang!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
