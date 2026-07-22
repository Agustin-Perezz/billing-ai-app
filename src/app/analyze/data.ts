export type SummaryCard = {
  label: string;
  value: string;
  tone: SummaryCardTone;
};

export enum SummaryCardTone {
  Secondary = "secondary",
  Default = "default",
  PrimaryContainer = "primary-container",
}

export type MonthlyTrend = {
  month: string;
  amount: string;
  heightPercent: number;
  isCurrent: boolean;
  barClass: string;
};

export type RecentScan = {
  id: string;
  name: string;
  date: string;
  amount: string;
};

export type NavItem = {
  label: string;
  icon: NavIcon;
  href: string;
  active: boolean;
};

export enum NavIcon {
  Scans = "scans",
  Insights = "insights",
  Cards = "cards",
  Settings = "settings",
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Scans", icon: NavIcon.Scans, href: "#", active: true },
  { label: "Insights", icon: NavIcon.Insights, href: "#", active: false },
  { label: "Cards", icon: NavIcon.Cards, href: "#", active: false },
  { label: "Settings", icon: NavIcon.Settings, href: "#", active: false },
];
