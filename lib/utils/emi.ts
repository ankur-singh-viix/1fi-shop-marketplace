import { EmiPlan } from "@/lib/types/marketplace";

/**
 * Computes the monthly EMI amount for a given principal, annual interest rate,
 * and tenure in months. Uses the standard reducing-balance EMI formula.
 * When interestRate is 0 (no-cost EMI), this reduces to a simple principal / tenure split.
 */
export function calculateMonthlyEmi(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): number {
  if (annualInterestRate === 0) {
    return Math.round(principal / tenureMonths);
  }
  const monthlyRate = annualInterestRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

/**
 * Builds the full set of EMI plan options for a given product price and
 * list of tenure options. Shorter tenures (<=6 months) are modeled as
 * 0% no-cost EMI, matching 1Fi's real no-cost-EMI positioning; longer
 * tenures carry a modest interest rate, mirroring their marketing copy
 * ("0% interest" showcased alongside longer paid tenures up to 24 months+).
 */
export function buildEmiPlans(price: number, tenureOptions: number[]): EmiPlan[] {
  return tenureOptions.map((tenureMonths, index) => {
    const isNoCost = tenureMonths <= 6;
    const interestRate = isNoCost ? 0 : 10 + index * 1.5;
    const monthlyAmount = calculateMonthlyEmi(price, interestRate, tenureMonths);
    const totalPayable = monthlyAmount * tenureMonths;

    return {
      id: `emi-${tenureMonths}m`,
      tenureMonths,
      interestRate,
      monthlyAmount,
      totalPayable,
      isNoCost,
      badge: tenureMonths === 12 ? "Most popular" : undefined,
    };
  });
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}