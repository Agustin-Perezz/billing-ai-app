import { getAnalysisData } from "./actions";
import { AnalysisBottomNav } from "./components/AnalysisBottomNav";
import { AnalysisRecentScans } from "./components/AnalysisRecentScans";
import { AnalysisSummaryCards } from "./components/AnalysisSummaryCards";
import { AnalysisTopBar } from "./components/AnalysisTopBar";
import { AnalysisTrendsChart } from "./components/AnalysisTrendsChart";
import { AnalysisUploadZone } from "./components/AnalysisUploadZone";

export default async function AnalizePage() {
  const { summaryCards, monthlyTrends, recentScans, navItems } =
    await getAnalysisData();

  return (
    <div className="flex min-h-screen flex-col pb-24 md:pb-0">
      <AnalysisTopBar />
      <main className="mx-auto w-full max-w-7xl grow px-5 py-6">
        <div className="grid grid-cols-12 gap-6">
          <AnalysisUploadZone />
          <AnalysisSummaryCards cards={summaryCards} />
          <AnalysisTrendsChart trends={monthlyTrends} />
          <AnalysisRecentScans scans={recentScans} />
        </div>
      </main>
      <AnalysisBottomNav items={navItems} />
    </div>
  );
}
