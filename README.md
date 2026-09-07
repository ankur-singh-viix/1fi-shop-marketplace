# 1Fi Marketplace — Shop Page Assignment

A demo implementation of the **1Fi Marketplace** section on the Shop page, built for the SDE Intern assignment.

## What this is

1Fi is a LAMF-based (Loan Against Mutual Funds) shopping platform — users shop for products on no-cost EMI, backed by pledging mutual fund units instead of selling them. This project adds a fully-designed **1Fi Marketplace** section to the Shop page, alongside two blank placeholder tabs (**Top Brands**, **Nearby Stores**) as specified in the assignment.

## Stack

- **Next.js (App Router) + TypeScript + Tailwind CSS**

I chose this stack after inspecting 1Fi's actual web app (`app.1fi.in`) — its page metadata (`next-size-adjust`, PWA manifest tags) indicates it's built with Next.js and served as an installable PWA. I matched that stack rather than defaulting to React Native/Flutter, since 1Fi's real product isn't a native mobile app.

## Project structure
app/
shop/
layout.tsx → outer Shop wrapper
page.tsx → redirects to /shop/marketplace
(tabs)/ → route group: shares header + tab bar
layout.tsx
top-brands/page.tsx → blank, per assignment spec
nearby-stores/page.tsx → blank, per assignment spec
marketplace/page.tsx → product listing
marketplace/[productId]/
page.tsx → product detail + EMI selection (own header, no tab bar)
components/
ui/ → AppHeader, EmptyState, ErrorState — shared across the app
shop/ → ShopTabs, ProductCard, VariantSelector, EmiPlanSelector — marketplace-specific
lib/
types/ → Product, ProductVariant, EmiPlan, ProductListItem
utils/emi.ts → EMI calculation (reducing-balance formula) + INR formatting
api/ → mock API layer (fetchProductList, fetchProductById)
data/
products.json → mock product catalog


## Data & API approach

Per the assignment's requirement to avoid hardcoding data into components, all product/EMI data flows through `lib/api/marketplace.ts`:

- `fetchProductList()` and `fetchProductById(id)` return Promises with a simulated network delay, so loading states are genuinely exercised rather than faked in the UI.
- A `FAILURE_RATE` constant can be flipped to simulate transient failures, exercising the error + retry UI honestly.
- EMI plans are computed on the fly from a shared `buildEmiPlans()` utility (standard reducing-balance formula), not pre-baked into the data — so changing a variant recalculates every plan's monthly amount live.
- This layer is structured so swapping in a real backend later means changing only `lib/api/marketplace.ts` — no component changes required.

## Features implemented

- Shop page with 3 tabs: Top Brands (blank), Nearby Stores (blank), 1Fi Marketplace (full)
- Product listing grid: image, name, brand, starting price, EMI teaser, loading skeletons, error/retry state
- Product detail page: images, rating, description, highlights, variant selection, EMI plan selection with live recalculation, sticky CTA that's disabled until a plan is chosen
- Empty, loading, and error states throughout — not just the happy path
- Mobile-first responsive layout, styled to match 1Fi's existing purple brand identity (`#6C28D9`)

## What I'd do with more time

- Wire up real product images instead of generated placeholders
- Add a proper eligibility-check flow after "Proceed" (currently a simulated confirmation)
- Persist selected variant/plan in the URL so links are shareable
- Add unit tests for the EMI calculation utility
- Replace the mock API with real endpoints once available

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` → **Go to Shop** → **1Fi Marketplace**.

**Important:** always access the app via `http://localhost:3000`, not a network/LAN IP address — some network configurations interfere with Next.js's dev-mode hydration and can cause the page to appear stuck on loading skeletons.

To test the error state: in `lib/api/marketplace.ts`, temporarily set `FAILURE_RATE` to `0.9`, refresh a few times, then set it back to `0`.