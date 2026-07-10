"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#board", label: "הלוח החי" },
  { href: "#how", label: "איך זה עובד" },
  { href: "#archive", label: "מהדורות קודמות" },
  { href: "#contact", label: "יצירת קשר" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal-deep/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral shadow-lg shadow-coral/30">
            <LayoutGrid className="h-5 w-5 text-white" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-white">
              Business Table
            </span>
            <span className="block text-[11px] font-medium text-slate-400">
              לעסקים יש שולחן אחד
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-coral"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#board">
          <Button size="sm" className="h-9 px-4 sm:px-5">
            שריין מקום
          </Button>
        </a>
      </div>
    </header>
  );
}
