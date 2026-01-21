"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FacebookIcon, ZaloIcon } from "../icons/Icons";

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:gap-4 items-center">
      {/* Contact Options (Collapsible) */}
      <div
        className={`flex flex-col gap-3 md:gap-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        }`}
      >
        {/* Hotline Button */}
        <Link
          href="tel:0933806910"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none md:h-12 md:w-12"
          aria-label="Gọi ngay"
        >
          <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Gọi ngay
          </span>
          <PhoneIcon className="h-5 w-5 md:h-6 md:w-6" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kia-red opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-kia-red"></span>
          </span>
        </Link>

        {/* Zalo Button */}
        <Link
          href="https://zalo.me/0933806910"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none md:h-12 md:w-12"
          aria-label="Chat Zalo"
        >
          <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Chat Zalo
          </span>
          <ZaloIcon className="h-6 w-6 text-current md:h-7 md:w-7" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kia-red opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-kia-red"></span>
          </span>
        </Link>

        {/* Facebook Button */}
        <Link
          href="https://www.facebook.com/kiakhanhhoa"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition-transform hover:scale-110 focus:outline-none md:h-12 md:w-12"
          aria-label="Facebook Messenger"
        >
          <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Facebook
          </span>
          <FacebookIcon className="h-full w-full text-current" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kia-red opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-kia-red"></span>
          </span>
        </Link>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-full bg-kia-red text-white shadow-lg transition-transform hover:scale-110 focus:outline-none md:h-12 md:w-12 ${
          !isOpen ? "animate-tada" : ""
        }`}
        aria-label="Liên hệ"
      >
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 z-10">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kia-red opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-kia-red"></span>
          </span>
        )}
        <div className="relative h-6 w-6 md:h-7 md:w-7">
          <ChatBubbleOvalLeftEllipsisIcon
            className={`absolute inset-0 h-full w-full transition-transform duration-300 ${
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <XMarkIcon
            className={`absolute inset-0 h-full w-full transition-transform duration-300 ${
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
