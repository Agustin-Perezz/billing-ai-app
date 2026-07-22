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

export const SUMMARY_CARDS: readonly SummaryCard[] = [
  {
    label: "Total Expenses",
    value: "$4,250.00",
    tone: SummaryCardTone.Secondary,
  },
  { label: "Top Category", value: "Utilities", tone: SummaryCardTone.Default },
  {
    label: "Savings Found",
    value: "$342.10",
    tone: SummaryCardTone.PrimaryContainer,
  },
];

export const MONTHLY_TRENDS: readonly MonthlyTrend[] = [
  {
    month: "Jun",
    amount: "$1.2k",
    heightPercent: 40,
    isCurrent: false,
    barClass: "bg-zinc-100",
  },
  {
    month: "Jul",
    amount: "$2.1k",
    heightPercent: 60,
    isCurrent: false,
    barClass: "bg-zinc-200",
  },
  {
    month: "Aug",
    amount: "$900",
    heightPercent: 30,
    isCurrent: false,
    barClass: "bg-zinc-300",
  },
  {
    month: "Sep",
    amount: "$3.4k",
    heightPercent: 80,
    isCurrent: false,
    barClass: "bg-zinc-400",
  },
  {
    month: "Oct",
    amount: "$4.2k",
    heightPercent: 100,
    isCurrent: true,
    barClass: "bg-primary-container",
  },
];

export const RECENT_SCANS: readonly RecentScan[] = [
  { id: "1", name: "AWS", date: "Oct 24", amount: "$152.00" },
  { id: "2", name: "Starbucks", date: "Oct 22", amount: "$12.50" },
  { id: "3", name: "Rent", date: "Oct 20", amount: "$2,100.00" },
];

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Scans", icon: NavIcon.Scans, href: "#", active: true },
  { label: "Insights", icon: NavIcon.Insights, href: "#", active: false },
  { label: "Cards", icon: NavIcon.Cards, href: "#", active: false },
  { label: "Settings", icon: NavIcon.Settings, href: "#", active: false },
];
