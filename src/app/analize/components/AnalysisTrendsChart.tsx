import { BarChart3 } from "lucide-react";

import type { MonthlyTrend } from "../data";

type AnalysisTrendsChartProps = {
  trends: readonly MonthlyTrend[];
};

export function AnalysisTrendsChart({ trends }: AnalysisTrendsChartProps) {
  return (
    <div className="col-span-12 flex min-h-75 flex-col border border-[#E5E7EB] bg-white p-4 md:col-span-8">
      <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-2">
        <h2 className="font-heading text-2xl font-semibold text-on-surface">
          Monthly Trends
        </h2>
        <BarChart3 className="size-5 text-on-surface-variant" />
      </div>
      <div className="flex grow items-end justify-between gap-4 px-2 pt-6">
        {trends.map((trend) => (
          <div
            key={trend.month}
            className={`group relative h-full w-full ${trend.barClass}`}
            style={{ height: `${trend.heightPercent}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-xs opacity-0 group-hover:opacity-100">
              {trend.amount}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between border-t border-[#E5E7EB] px-2 pt-2">
        {trends.map((trend) => (
          <span
            key={trend.month}
            className={`font-mono text-xs text-on-surface-variant ${trend.isCurrent ? "font-bold text-primary-container" : ""}`}
          >
            {trend.month}
          </span>
        ))}
      </div>
    </div>
  );
}
