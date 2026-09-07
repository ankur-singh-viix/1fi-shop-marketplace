"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/shop/top-brands", label: "Top Brands" },
  { href: "/shop/nearby-stores", label: "Nearby Stores" },
  { href: "/shop/marketplace", label: "1Fi Marketplace" },
] as const;

export function ShopTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-[57px] z-10 border-b border-border bg-surface px-4 py-3">
      <div className="flex gap-1 rounded-full bg-brand-light p-1">
        {TABS.map((tab) => {
          const isActive = pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 rounded-full px-2 py-2 text-center text-[12.5px] font-semibold transition-colors ${
                isActive
                  ? "bg-surface text-brand shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}