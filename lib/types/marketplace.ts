export interface ProductVariant {
  id: string;
  label: string; // e.g. "256GB · Titanium Black"
  price: number; // in INR
  inStock: boolean;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  interestRate: number; // annual %, 0 for no-cost EMI
  monthlyAmount: number; // computed for the currently selected variant
  totalPayable: number;
  isNoCost: boolean;
  badge?: string; // e.g. "Most popular"
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  emiTenureOptions: number[]; // months, used to derive EmiPlan[] per variant
}

export interface ProductListItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  startingPrice: number;
  minMonthlyEmi: number;
  isNoCostEmi: boolean;
  badge?: string;
}

export type ShopTab = "top-brands" | "nearby-stores" | "marketplace";