interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-tint">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8v5M12 16h.01M10.29 3.86l-8.18 14.18A2 2 0 003.82 21h16.36a2 2 0 001.71-2.96L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="#D6403A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[15px] font-medium text-ink">Couldn&apos;t load this</p>
        <p className="mt-1 text-[13px] text-ink-muted">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-full bg-brand px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark active:scale-[0.98]"
        >
          Try again
        </button>
      )}
    </div>
  );
}