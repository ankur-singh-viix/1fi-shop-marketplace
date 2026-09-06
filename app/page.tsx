import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-[20px] font-bold text-white">
        1Fi
      </div>
      <div>
        <h1 className="text-[18px] font-semibold text-ink">1Fi Marketplace assignment</h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
          A demo Shop page with a fully built 1Fi Marketplace section, styled to match
          the existing 1Fi app.
        </p>
      </div>
      <Link
        href="/shop"
        className="rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark active:scale-[0.98]"
      >
        Go to Shop
      </Link>
    </div>
  );
}