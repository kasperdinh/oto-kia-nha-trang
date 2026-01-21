"use client";

import Link from "next/link";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FacebookIcon, ZaloIcon } from "../icons/Icons";

const navigation = {
  products: [
    { name: "Tất cả dòng xe", href: "/xe" },
    { name: "SUV", href: "/xe?category=SUV" },
    { name: "Sedan", href: "/xe?category=Sedan" },
    { name: "Hatchback", href: "/xe?category=Hatchback" },
  ],
  support: [
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
              <Image
                src="/logo-footer.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Ô Tô Kia Nha Trang chuyên giới thiệu các dòng xe Kia tại khu vực
              Nha Trang. Chúng tôi cung cấp sản phẩm chính hãng, tư vấn mua xe
              và hỗ trợ các dịch vụ bảo hành, bảo dưỡng theo quy định của nhà
              sản xuất.
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
                <div className="mt-6 flex space-x-5">
                  {/* Placeholder social icons Hotline, Facebook, Zalo */}
                  <a
                    href="tel:0905123456"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <span className="sr-only">Hotline</span>
                    <PhoneIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">Zalo</span>
                    <ZaloIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">Facebook</span>
                    <FacebookIcon
                      className="h-7.5 w-7.5 -mt-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 text-xs leading-5 text-gray-400">
          <div className="md:flex md:items-center md:justify-between">
            <div className="space-y-1">
              <p>
                &copy; {new Date().getFullYear()} Ô Tô Kia Nha Trang. Website
                này dùng cho mục đích giới thiệu sản phẩm.
              </p>
              <p>
                Website không phải là trang web chính thức của Kia Motors Việt
                Nam.
              </p>
              <p>KIA&reg; là thương hiệu đã đăng ký của Kia Motors Việt Nam.</p>
            </div>
            <div className="mt-4 md:order-2 md:mt-0">
              <p>
                Thiết kế và phát triển bởi{" "}
                <a
                  href="https://kasperdinh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-300 hover:text-white"
                >
                  kasperdinh
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
