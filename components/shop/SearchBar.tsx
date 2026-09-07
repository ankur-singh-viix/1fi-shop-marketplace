"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search online stores..." }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  // Keep local input in sync if the URL changes from elsewhere (e.g. clearing via back button)
  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams.toString());
    if (newValue.trim()) {
      params.set("q", newValue);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="px-4 pb-3 pt-1">
      <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface-sunken px-4 py-3">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-ink-faint"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[13.5px] text-ink placeholder:text-ink-faint focus:outline-none"
        />
        {value && (
          <button
            onClick={() => handleChange("")}
            aria-label="Clear search"
            className="shrink-0 text-ink-faint hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}