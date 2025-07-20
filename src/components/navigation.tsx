"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center px-4 text-sm font-medium text-gray-900 hover:text-gray-700"
            >
              Quiz Temperamento
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                isActive("/")
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              Início
            </Link>
            <Link
              href="/login"
              className={cn(
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                isActive("/login")
                  ? "border-indigo-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
