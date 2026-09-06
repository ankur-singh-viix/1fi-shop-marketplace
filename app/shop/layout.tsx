export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-surface-sunken">{children}</div>;
}