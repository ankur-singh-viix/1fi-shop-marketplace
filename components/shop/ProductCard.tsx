import Image from "next/image";
import Link from "next/link";
import { ProductListItem } from "@/lib/types/marketplace";
import { formatInr } from "@/lib/utils/emi";

interface ProductCardProps {
  product: ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/marketplace/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-transform active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full bg-brand-tint">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 50vw, 200px"
          className="object-contain p-4"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-ink/85 px-2 py-0.5 text-[10.5px] font-medium text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[11.5px] font-medium uppercase tracking-wide text-ink-faint">
          {product.brand}
        </p>
        <p className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-ink">
          {product.name}
        </p>
        <p className="mt-0.5 text-[13px] text-ink-muted">
          From {formatInr(product.startingPrice)}
        </p>
        <p className="mt-auto pt-1.5 text-[12.5px] font-medium text-brand">
          {product.isNoCostEmi ? "0% EMI" : "EMI"} from {formatInr(product.minMonthlyEmi)}/mo
        </p>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-square w-full animate-pulse bg-border/70" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-2.5 w-12 animate-pulse rounded bg-border/70" />
        <div className="h-3.5 w-full animate-pulse rounded bg-border/70" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-border/70" />
        <div className="mt-1 h-3 w-3/4 animate-pulse rounded bg-border/70" />
      </div>
    </div>
  );
}