import { EmiPlan } from "@/lib/types/marketplace";
import { formatInr } from "@/lib/utils/emi";

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
}

export function EmiPlanSelector({ plans, selectedPlanId, onSelect }: EmiPlanSelectorProps) {
  return (
    <div>
      <p className="mb-2.5 text-[13px] font-medium text-ink-muted">Choose an EMI plan</p>
      <div className="flex flex-col gap-2">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          return (
            <button
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors ${
                isSelected
                  ? "border-brand bg-brand-light"
                  : "border-border bg-surface hover:border-ink-faint"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-brand bg-brand" : "border-ink-faint"
                  }`}
                >
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    {plan.tenureMonths} months
                    {plan.badge && (
                      <span className="ml-2 rounded-full bg-success-tint px-2 py-0.5 text-[10.5px] font-medium text-success">
                        {plan.badge}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">
                    {plan.isNoCost
                      ? "0% interest · no-cost EMI"
                      : `${plan.interestRate.toFixed(1)}% p.a. · total ${formatInr(plan.totalPayable)}`}
                  </p>
                </div>
              </div>
              <p className="whitespace-nowrap text-[14px] font-semibold text-ink">
                {formatInr(plan.monthlyAmount)}
                <span className="text-[11.5px] font-normal text-ink-muted">/mo</span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}