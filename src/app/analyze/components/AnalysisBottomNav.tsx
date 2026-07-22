import {
  CreditCard,
  type LucideIcon,
  ScanText,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavIcon, type NavItem } from "../data";

type AnalysisBottomNavProps = {
  items: readonly NavItem[];
};

const ICONS: Record<NavIcon, LucideIcon> = {
  [NavIcon.Scans]: ScanText,
  [NavIcon.Insights]: Sparkles,
  [NavIcon.Cards]: CreditCard,
  [NavIcon.Settings]: Settings,
};

export function AnalysisBottomNav({ items }: AnalysisBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-outline-variant bg-surface-container-lowest md:hidden">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center transition-transform duration-150 hover:bg-surface-container-low",
              item.active
                ? "font-bold text-primary-container"
                : "text-on-surface-variant",
            )}
          >
            <Icon className="mb-1 size-5" />
            <span className="font-mono text-xs">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
