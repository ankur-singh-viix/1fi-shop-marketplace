export function PromoBanner() {
  return (
    <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-5 py-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
            fill="white"
          />
        </svg>
        NO-COST EMIs
      </span>

      <h2 className="mt-3 text-[22px] font-bold leading-tight text-white">
        Shop today,
        <br />
        <span className="italic">Pay later</span> using
        <br />
        Mutual funds.
      </h2>

      <p className="mt-2 max-w-[210px] text-[12.5px] leading-relaxed text-white/80">
        No credit score required. No interest. Backed by your investments.
      </p>

      {/* Decorative accent shapes — original, not copied from any source */}
      <div className="pointer-events-none absolute -right-4 -top-2 h-28 w-28 rounded-full bg-white/10 blur-xl" />
      <div className="pointer-events-none absolute -bottom-6 right-6 h-20 w-20 rounded-full bg-white/10 blur-lg" />
      <svg
        className="pointer-events-none absolute -bottom-2 right-4"
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="none"
      >
        <rect x="10" y="20" width="34" height="55" rx="8" fill="white" opacity="0.18" />
        <rect x="42" y="8" width="40" height="28" rx="4" fill="white" opacity="0.14" />
      </svg>
    </div>
  );
}