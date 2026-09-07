export function PromoBanner() {
  return (
    <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-5 py-6">
      <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill="white" />
        </svg>
        NO-COST EMIs
      </span>

      <h2 className="relative z-10 mt-3 max-w-[62%] text-[22px] font-bold leading-tight text-white">
        Shop today,
        <br />
        <span className="italic">Pay later</span> using
        <br />
        Mutual funds.
      </h2>

      <p className="relative z-10 mt-2 max-w-[62%] text-[12.5px] leading-relaxed text-white/80">
        No credit score required. No interest. Backed by your investments.
      </p>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-6 -top-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 right-2 h-24 w-24 rounded-full bg-white/10 blur-xl" />

      {/* Illustration cluster — original flat-icon style, not a reproduction of any real artwork */}
      <svg
        className="pointer-events-none absolute bottom-1 right-2"
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
      >
        {/* Confetti ribbons */}
        <path d="M12 40 Q 22 30 14 20" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
        <path d="M130 30 Q 140 40 132 50" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 100 Q 8 108 14 118" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="15" r="2" fill="white" opacity="0.8" />
        <circle cx="140" cy="70" r="2" fill="white" opacity="0.7" />
        <circle cx="30" cy="130" r="2" fill="white" opacity="0.6" />

        {/* Shopping bag (back layer) */}
        <rect x="48" y="78" width="58" height="52" rx="6" fill="#FBBF24" />
        <path
          d="M62 78 V66 a15 15 0 0 1 30 0 V78"
          stroke="#B45309"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Motorcycle (simplified) */}
        <g transform="translate(78, 60)">
          <circle cx="6" cy="34" r="9" fill="none" stroke="white" strokeWidth="3" opacity="0.9" />
          <circle cx="46" cy="34" r="9" fill="none" stroke="white" strokeWidth="3" opacity="0.9" />
          <path
            d="M6 34 L22 18 L36 18 L46 34 M22 18 L28 8 M14 26 L34 26"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>

        {/* Car (simplified side view) */}
        <g transform="translate(4, 44)">
          <path
            d="M4 30 h56 a6 6 0 0 0 6-6 v-4 l-10-2 -8-12 h-30 l-10 12 -8 2 v4 a6 6 0 0 0 6 6z"
            fill="#EF4444"
          />
          <circle cx="16" cy="32" r="6" fill="#1F2937" />
          <circle cx="52" cy="32" r="6" fill="#1F2937" />
          <path d="M22 20 h26 l6 10 h-38 z" fill="#FCA5A5" opacity="0.6" />
        </g>

        {/* Phone */}
        <g transform="translate(96, 6)">
          <rect x="0" y="0" width="20" height="36" rx="4" fill="white" opacity="0.95" />
          <rect x="3" y="3" width="14" height="26" rx="1.5" fill="#6C28D9" opacity="0.8" />
        </g>

        {/* Laptop */}
        <g transform="translate(112, 22)">
          <rect x="0" y="0" width="30" height="20" rx="2" fill="white" opacity="0.95" />
          <rect x="2" y="2" width="26" height="16" rx="1" fill="#5620AD" opacity="0.7" />
          <rect x="-3" y="20" width="36" height="3" rx="1.5" fill="white" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}