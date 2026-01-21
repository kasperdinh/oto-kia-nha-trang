"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
}

export function Sidebar({ isOpen, onClose, navigation }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-kia-dark">Menu</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-3 rounded-md text-base font-medium transition-colors",
                  isActive
                    ? "bg-[rgba(187,22,43,0.1)] text-kia-red"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={onClose}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-4 border-t mt-4">
            <Link
              href="/bao-gia"
              className="block w-full text-center px-4 py-3 rounded-md bg-kia-red text-white font-medium hover:bg-kia-red-hover transition-colors"
              onClick={onClose}
            >
              Nhận Báo Giá
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
