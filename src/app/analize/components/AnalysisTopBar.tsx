import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AnalysisTopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface-container-lowest">
      <div className="flex items-center justify-between px-5 py-2">
        <div className="flex items-center gap-2">
          <img
            alt="User Avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-vcNPEileIAYNAmuMtA2f7uPjuf7BxlHbgovd6A2w0JsjzUE21IWqfCrhIiwdU-pgaJsjnfCP295fqj2NRgrnlLvYXq31rDKBx-pAeRBYOPLCAmop9OsQ3LI5eMz93ZadODpbjL6bFab2FFsQXpwqw-M27EEa94ic8CjzVkawKh4V2-IPG_n5Me3RTwp3CADJbhj8itgcKBfPe2ogBQBWoGSint0ign0pxkVNzgH-WisWN-KKlyazawgRuxYVzxUQm_59CQig091p"
            className="size-8 rounded-full border border-outline-variant object-cover"
          />
          <h1 className="font-heading text-2xl font-semibold tracking-tighter text-on-surface">
            ANALYSIS
          </h1>
        </div>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="size-5 text-on-surface" />
        </Button>
      </div>
    </header>
  );
}
