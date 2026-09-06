interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-8 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-tint">
        {icon ?? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7l1.5-3h13L20 7M4 7h16M4 7v12a1 1 0 001 1h14a1 1 0 001-1V7M9 11a3 3 0 006 0"
              stroke="#6C28D9"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div>
        <p className="text-[15px] font-medium text-ink">{title}</p>
        <p className="mt-1 max-w-[240px] text-[13px] leading-relaxed text-ink-muted">
          {description}
        </p>
      </div>
    </div>
  );
}