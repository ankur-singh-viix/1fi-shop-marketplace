"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProductList } from "@/lib/api/marketplace";
import { ProductListItem } from "@/lib/types/marketplace";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { ErrorState } from "@/components/ui/ErrorState";

type LoadState = "loading" | "error" | "ready";

export default function MarketplacePage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const load = useCallback(async () => {
    console.log("STEP 1: load() called");
    setState("loading");
    try {
      console.log("STEP 2: about to call fetchProductList");
      const data = await fetchProductList();
      console.log("STEP 3: got data back", data);
      setProducts(data);
      setState("ready");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : undefined);
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <h2 className="text-[16px] font-semibold text-ink">1Fi Marketplace</h2>
        <p className="mt-0.5 text-[13px] text-ink-muted">
          Shop top electronics on no-cost EMI, backed by your mutual funds.
        </p>
      </div>

      {state === "loading" && (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {state === "error" && <ErrorState message={errorMessage} onRetry={load} />}

      {state === "ready" && products.length === 0 && (
        <div className="py-16 text-center text-[13px] text-ink-muted">
          No products available right now.
        </div>
      )}

      {state === "ready" && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}