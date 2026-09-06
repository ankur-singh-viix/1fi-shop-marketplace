import { EmptyState } from "@/components/ui/EmptyState";

export default function NearbyStoresPage() {
  return (
    <EmptyState
      title="Nearby Stores is on its way"
      description="Find partner stores near you to shop in person, using your 1Fi limit."
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7-6.1-7-11a7 7 0 1114 0c0 4.9-7 11-7 11z"
            stroke="#6C28D9"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.5" stroke="#6C28D9" strokeWidth="1.6" />
        </svg>
      }
    />
  );
}