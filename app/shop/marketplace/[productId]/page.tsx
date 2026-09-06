"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchProductById } from "@/lib/api/marketplace";
import { Product } from "@/lib/types/marketplace";
import { buildEmiPlans, formatInr } from "@/lib/utils/emi";
import { AppHeader } from "@/components/ui/AppHeader";
import { ErrorState } from "@/components/ui/ErrorState";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { EmiPlanSelector } from "@/components/shop/EmiPlanSelector";

type LoadState = "loading" | "error" | "ready";

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const data = await fetchProductById(params.productId);
      if (!data) {
        setErrorMessage("This product could not be found.");
        setState("error");
        return;
      }
      setProduct(data);
      const firstInStock = data.variants.find((v) => v.inStock) ?? data.variants[0];
      setSelectedVariantId(firstInStock.id);
      setState("ready");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : undefined);
      setState("error");
    }
  }, [params.productId]);

  useEffect(() => {
    load();
  }, [load]);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product, selectedVariantId]
  );

  const emiPlans = useMemo(() => {
    if (!product || !selectedVariant) return [];
    return buildEmiPlans(selectedVariant.price, product.emiTenureOptions);
  }, [product, selectedVariant]);

  // Reset plan selection whenever the variant (and therefore its EMI amounts) changes.
  useEffect(() => {
    setSelectedPlanId(null);
  }, [selectedVariantId]);

  const selectedPlan = emiPlans.find((p) => p.id === selectedPlanId) ?? null;

  const handleProceed = async () => {
    setIsConfirming(true);
    // Simulated proceed-to-eligibility-check network call.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsConfirming(false);
    setConfirmed(true);
  };

  if (state === "loading") {
    return (
      <>
        <AppHeader title="Product" onBack={() => router.back()} />
        <div className="animate-pulse px-4 py-4">
          <div className="aspect-square w-full rounded-2xl bg-border/70" />
          <div className="mt-4 h-4 w-2/3 rounded bg-border/70" />
          <div className="mt-2 h-3 w-1/3 rounded bg-border/70" />
          <div className="mt-6 h-3 w-1/4 rounded bg-border/70" />
          <div className="mt-3 flex gap-2">
            <div className="h-14 w-28 rounded-xl bg-border/70" />
            <div className="h-14 w-28 rounded-xl bg-border/70" />
          </div>
        </div>
      </>
    );
  }

  if (state === "error" || !product || !selectedVariant) {
    return (
      <>
        <AppHeader title="Product" onBack={() => router.back()} />
        <ErrorState message={errorMessage} onRetry={load} />
      </>
    );
  }

  return (
    <>
      <AppHeader title={product.name} onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="relative aspect-square w-full bg-brand-tint">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="480px"
            className="object-contain p-8"
          />
        </div>

        <div className="px-4 py-4">
          <p className="text-[11.5px] font-medium uppercase tracking-wide text-ink-faint">
            {product.brand}
          </p>
          <h2 className="mt-0.5 text-[19px] font-semibold text-ink">{product.name}</h2>
          <div className="mt-1 flex items-center gap-1.5 text-[12.5px] text-ink-muted">
            <span className="flex items-center gap-0.5 font-medium text-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#F5A623">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              {product.rating}
            </span>
            <span>·</span>
            <span>{product.reviewCount.toLocaleString("en-IN")} reviews</span>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
            {product.shortDescription}
          </p>

          <p className="mt-4 text-[20px] font-semibold text-ink">
            {formatInr(selectedVariant.price)}
          </p>

          <div className="mt-5">
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariant.id}
              onSelect={setSelectedVariantId}
            />
          </div>

          <div className="mt-6">
            <EmiPlanSelector
              plans={emiPlans}
              selectedPlanId={selectedPlanId}
              onSelect={setSelectedPlanId}
            />
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface p-4">
            <p className="mb-2 text-[13px] font-medium text-ink">Highlights</p>
            <ul className="space-y-1.5">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-[13px] text-ink-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-[13px] font-medium text-ink">About this item</p>
            <p className="text-[13px] leading-relaxed text-ink-muted">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-surface px-4 py-3">
        {confirmed ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-success-tint px-4 py-3 text-[13.5px] font-medium text-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Plan selected — proceeding to eligibility check
          </div>
        ) : (
          <button
            disabled={!selectedPlan || isConfirming}
            onClick={handleProceed}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[14.5px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-ink-faint enabled:hover:bg-brand-dark enabled:active:scale-[0.99]"
          >
            {isConfirming ? (
              "Checking eligibility…"
            ) : selectedPlan ? (
              `Proceed with ${selectedPlan.tenureMonths}-month plan · ${formatInr(selectedPlan.monthlyAmount)}/mo`
            ) : (
              "Select an EMI plan to continue"
            )}
          </button>
        )}
      </div>
    </>
  );
}