interface AppHeaderProps {
  title: string;
  onBack?: () => void;
}

export function AppHeader({ title, onBack }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-surface/95 px-4 py-3.5 backdrop-blur">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-sunken active:bg-border"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <h1 className="text-[17px] font-semibold text-ink">{title}</h1>
    </header>
  );
}