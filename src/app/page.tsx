import { AnalysisBottomNav } from "./analyze/components/AnalysisBottomNav";
import { AnalysisExplorer } from "./analyze/components/AnalysisExplorer";
import { AnalysisTopBar } from "./analyze/components/AnalysisTopBar";
import { NAV_ITEMS } from "./analyze/data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pb-24 md:pb-0">
      <AnalysisTopBar />
      <main className="mx-auto w-full max-w-7xl grow px-5 py-6">
        <AnalysisExplorer />
      </main>
      <AnalysisBottomNav items={NAV_ITEMS} />
    </div>
  );
}
