"use client";

import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const navigation = {
  products: [
    { name: "KIA Morning", href: "/xe/kia-morning" },
    { name: "KIA Soluto", href: "/xe/kia-soluto" },
    { name: "KIA K3", href: "/xe/kia-k3" },
    { name: "KIA K5", href: "/xe/kia-k5" },
    { name: "KIA Sonet", href: "/xe/kia-sonet" },
    { name: "KIA Seltos", href: "/xe/kia-seltos" },
    { name: "KIA Sportage", href: "/xe/kia-sportage" },
    { name: "KIA Sorento", href: "/xe/kia-sorento" },
    { name: "KIA Carnival", href: "/xe/kia-carnival" },
  ],
  support: [
    { name: "Đăng ký lái thử", href: "/lai-thu" },
    { name: "Yêu cầu báo giá", href: "/bao-gia" },
    { name: "Liên hệ", href: "/lien-he" },
  ],
  company: [{ name: "Về chúng tôi", href: "/gioi-thieu" }],
};

export function Footer() {
  return (
    <footer className="bg-kia-dark text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-black tracking-tighter text-kia-red">
                KIA
              </span>
              <span className="text-xl font-bold text-white">NHA TRANG</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Đại lý ủy quyền chính thức của KIA Motors Việt Nam tại Nha Trang.
              Cung cấp các dòng xe KIA chính hãng, dịch vụ bảo hành, bảo dưỡng
              chuyên nghiệp.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <MapPinIcon className="h-6 w-6 shrink-0 text-kia-red" />
                <span className="text-sm">
                  Lô số 1, Khu vực 2, Đường 23/10, Vĩnh Hiệp, Nha Trang, Khánh
                  Hòa
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <PhoneIcon className="h-5 w-5 shrink-0 text-kia-red" />
                <span className="text-sm">Hotline: 0123.123.123</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <EnvelopeIcon className="h-5 w-5 shrink-0 text-kia-red" />
                <span className="text-sm">test@mail.com</span>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  Sản phẩm
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.products.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-kia-red underline-offset-4"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  Hỗ trợ khách hàng
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-kia-red underline-offset-4"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  Công ty
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-kia-red underline-offset-4"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                {/* Social Embeds or Map could go here */}
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  Kết nối
                </h3>
                <div className="mt-6 flex space-x-6">
                  {/* Placeholder social icons */}
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} KIA Nha Trang. All rights
            reserved. Designed by kasperdinh.
          </p>
        </div>
      </div>
    </footer>
  );
}
