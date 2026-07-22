import { History } from "lucide-react";

import type { RecentScan } from "../data";

type AnalysisRecentScansProps = {
  scans: readonly RecentScan[];
};

export function AnalysisRecentScans({ scans }: AnalysisRecentScansProps) {
  return (
    <div className="col-span-12 flex flex-col border border-[#E5E7EB] bg-white p-4 md:col-span-4">
      <div className="mb-2 flex items-center justify-between border-b border-[#E5E7EB] pb-2">
        <h2 className="font-heading text-2xl font-semibold text-on-surface">
          Recent Scans
        </h2>
        <History className="size-5 text-on-surface-variant" />
      </div>
      <ul className="flex grow flex-col justify-start">
        {scans.length === 0 ? (
          <li className="px-1 py-6 text-center font-mono text-xs text-on-surface-variant">
            No scans yet — upload a bill to begin.
          </li>
        ) : (
          scans.map((scan, index) => (
            <li
              key={scan.id}
              className={`flex cursor-pointer items-center justify-between px-1 py-2 transition-colors hover:bg-surface-container-low ${index < scans.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}
            >
              <div>
                <p className="text-base text-on-surface">{scan.name}</p>
                <p className="font-mono text-xs text-on-surface-variant">
                  {scan.date}
                </p>
              </div>
              <p className="text-base text-on-surface">{scan.amount}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
