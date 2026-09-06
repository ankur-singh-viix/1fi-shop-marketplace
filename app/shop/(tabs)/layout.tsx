import { AppHeader } from "@/components/ui/AppHeader";
import { ShopTabs } from "@/components/shop/ShopTabs";

export default function ShopTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-sunken">
      <AppHeader title="Shop" />
      <ShopTabs />
      <main className="flex-1">{children}</main>
    </div>
  );
}