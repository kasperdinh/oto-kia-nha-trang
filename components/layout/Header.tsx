"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, PhoneIcon } from "@heroicons/react/24/outline";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { buttonVariants } from "../ui/Button";
import Image from "next/image";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/xe" },
  { name: "Báo giá", href: "/bao-gia" },
  { name: "Giới thiệu", href: "/gioi-thieu" },
  { name: "Liên hệ", href: "/lien-he" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-13 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:min-w-0 lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <span className="sr-only">KIA Khánh Hòa</span>
              {/* Replace with actual Logo Image later */}
              <Image
                src="/logo-header.svg"
                alt="Logo"
                width={100}
                height={100}
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <Navbar navigation={navigation} />

          {/* Right Action Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link
              href="tel:0933806910"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "flex items-center gap-2",
              })}
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Hotline: 0933.806.910</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}
