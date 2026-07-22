"use client";

import { useMemo } from "react";
import { useBillingScans } from "@/hooks/useBillingScans";
import { monthlyTrends, recentScans, summarize } from "../aggregations";
import { AnalysisRecentScans } from "./AnalysisRecentScans";
import { AnalysisSummaryCards } from "./AnalysisSummaryCards";
import { AnalysisTrendsChart } from "./AnalysisTrendsChart";
import { AnalysisUploadZone } from "./AnalysisUploadZone";

export function AnalysisExplorer() {
  const { scans, addScan, ready } = useBillingScans();

  const summaryCards = useMemo(() => summarize(scans), [scans]);
  const trends = useMemo(() => monthlyTrends(scans), [scans]);
  const recent = useMemo(() => recentScans(scans), [scans]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <AnalysisUploadZone onExtracted={addScan} />
      {ready && (
        <>
          <AnalysisSummaryCards cards={summaryCards} />
          <AnalysisTrendsChart trends={trends} />
          <AnalysisRecentScans scans={recent} />
        </>
      )}
    </div>
  );
}
