import productsData from "@/data/products.json";
import { Product, ProductListItem } from "@/lib/types/marketplace";
import { buildEmiPlans } from "@/lib/utils/emi";

const RAW_PRODUCTS = productsData as Product[];

/**
 * Simulates real network latency so loading states are genuinely exercised
 * rather than faked in the UI layer.
 */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates an occasional transient failure so error/retry states in the UI
 * are exercised honestly. Disabled by default — flip FAILURE_RATE to test.
 */
const FAILURE_RATE = 0; // e.g. set to 0.15 locally to test error states

function maybeFail() {
  if (Math.random() < FAILURE_RATE) {
    throw new MarketplaceApiError("Could not reach the marketplace service.");
  }
}

export class MarketplaceApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MarketplaceApiError";
  }
}

/**
 * Fetches the product list for the Marketplace grid.
 * Returns a lightweight projection (not the full product) — same shape a
 * real `/api/marketplace/products` list endpoint would return.
 */
export async function fetchProductList(): Promise<ProductListItem[]> {
  await delay(600);
  maybeFail();

  return RAW_PRODUCTS.map((product) => {
    const cheapestVariant = [...product.variants]
      .filter((v) => v.inStock)
      .sort((a, b) => a.price - b.price)[0] ?? product.variants[0];

    const plans = buildEmiPlans(cheapestVariant.price, product.emiTenureOptions);
    const cheapestPlan = [...plans].sort((a, b) => a.monthlyAmount - b.monthlyAmount)[0];

    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      startingPrice: cheapestVariant.price,
      minMonthlyEmi: cheapestPlan.monthlyAmount,
      isNoCostEmi: cheapestPlan.isNoCost,
      badge: product.rating >= 4.8 ? "Bestseller" : undefined,
    };
  });
}

/**
 * Fetches full detail for a single product, used on the product detail /
 * EMI selection screen.
 */
export async function fetchProductById(productId: string): Promise<Product | null> {
  await delay(500);
  maybeFail();

  const product = RAW_PRODUCTS.find((p) => p.id === productId);
  return product ?? null;
}