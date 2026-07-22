import { AnalysisBottomNav } from "./components/AnalysisBottomNav";
import { AnalysisExplorer } from "./components/AnalysisExplorer";
import { AnalysisTopBar } from "./components/AnalysisTopBar";
import { NAV_ITEMS } from "./data";

export default function AnalyzePage() {
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
