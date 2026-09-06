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
    <nav className="sticky top-[57px] z-10 flex gap-1 border-b border-border bg-surface px-3 pt-1">
      {TABS.map((tab) => {
        const isActive = pathname?.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative px-3 py-3 text-[13.5px] font-medium transition-colors ${
              isActive ? "text-brand" : "text-ink-muted hover:text-ink"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-3 -bottom-px h-[2.5px] rounded-full bg-brand" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}