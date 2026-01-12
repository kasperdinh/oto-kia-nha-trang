"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  navigation: { name: string; href: string }[];
  className?: string;
}

export function Navbar({ navigation, className }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden lg:flex items-center space-x-8", className)}>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-kia-red uppercase tracking-wide",
              isActive ? "text-kia-red font-bold" : "text-gray-700"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
