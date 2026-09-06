import { ProductVariant } from "@/lib/types/marketplace";
import { formatInr } from "@/lib/utils/emi";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div>
      <p className="mb-2.5 text-[13px] font-medium text-ink-muted">Choose a variant</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          return (
            <button
              key={variant.id}
              disabled={!variant.inStock}
              onClick={() => onSelect(variant.id)}
              className={`rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                !variant.inStock
                  ? "cursor-not-allowed border-border bg-surface-sunken opacity-50"
                  : isSelected
                    ? "border-brand bg-brand-light"
                    : "border-border bg-surface hover:border-ink-faint"
              }`}
            >
              <p
                className={`text-[13px] font-medium ${
                  isSelected ? "text-brand-dark" : "text-ink"
                }`}
              >
                {variant.label}
              </p>
              <p className="mt-0.5 text-[12px] text-ink-muted">
                {variant.inStock ? formatInr(variant.price) : "Out of stock"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}