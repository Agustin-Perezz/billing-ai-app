import {
  type MonthlyTrend,
  type RecentScan,
  type SummaryCard,
  SummaryCardTone,
} from "./data";
import type { ExpenseScan } from "./schema";

const RECENT_SCAN_LIMIT = 5;

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const BAR_CLASSES = [
  "bg-zinc-100",
  "bg-zinc-200",
  "bg-zinc-300",
  "bg-zinc-400",
];

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function monthKey(date: string): string {
  return date.slice(0, 7);
}

function topCategory(scans: readonly ExpenseScan[]): string {
  if (scans.length === 0) return "—";
  const counts = new Map<string, number>();
  for (const s of scans)
    counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
  let best = "—";
  let max = 0;
  for (const [cat, n] of counts) {
    if (n > max) {
      max = n;
      best = cat;
    }
  }
  return best;
}

export function summarize(scans: readonly ExpenseScan[]): SummaryCard[] {
  const total = scans.reduce((sum, s) => sum + s.amount, 0);
  const savings = scans.reduce((sum, s) => sum + s.savingsFound, 0);
  return [
    {
      label: "Total Expenses",
      value: formatCurrency(total),
      tone: SummaryCardTone.Secondary,
    },
    {
      label: "Top Category",
      value: topCategory(scans),
      tone: SummaryCardTone.Default,
    },
    {
      label: "Savings Found",
      value: formatCurrency(savings),
      tone: SummaryCardTone.PrimaryContainer,
    },
  ];
}

export function monthlyTrends(scans: readonly ExpenseScan[]): MonthlyTrend[] {
  const byMonth = new Map<string, number>();
  for (const s of scans) {
    const key = monthKey(s.date);
    byMonth.set(key, (byMonth.get(key) ?? 0) + s.amount);
  }
  const keys = [...byMonth.keys()].sort((a, b) => a.localeCompare(b));
  const max = Math.max(1, ...keys.map((k) => byMonth.get(k) ?? 0));
  const currentMonth = new Date().toISOString().slice(0, 7);
  return keys.map((key, i) => {
    const monthIndex = Number.parseInt(key.slice(5, 7), 10) - 1;
    const amount = byMonth.get(key) ?? 0;
    return {
      month: MONTH_LABELS[monthIndex] ?? key,
      amount: formatCurrency(amount),
      heightPercent: Math.round((amount / max) * 100),
      isCurrent: key === currentMonth,
      barClass:
        key === currentMonth
          ? "bg-primary-container"
          : BAR_CLASSES[i % BAR_CLASSES.length],
    } satisfies MonthlyTrend;
  });
}

export function recentScans(scans: readonly ExpenseScan[]): RecentScan[] {
  return scans.slice(0, RECENT_SCAN_LIMIT).map((s, i) => ({
    id: `${s.date}-${s.vendor}-${i}`,
    name: s.vendor,
    date: new Date(s.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: formatCurrency(s.amount),
  }));
}
