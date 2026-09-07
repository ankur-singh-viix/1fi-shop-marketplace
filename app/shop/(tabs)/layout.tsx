import { Suspense } from "react";
import { AppHeader } from "@/components/ui/AppHeader";
import { ShopTabs } from "@/components/shop/ShopTabs";
import { PromoBanner } from "@/components/shop/PromoBanner";
import { SearchBar } from "@/components/shop/SearchBar";

export default function ShopTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-sunken">
      <AppHeader title="Shop" />
      <PromoBanner />
      <ShopTabs />
      <Suspense fallback={<div className="h-[52px]" />}>
        <SearchBar />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  );
}