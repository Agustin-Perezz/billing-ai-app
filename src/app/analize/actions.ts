"use server";

import { MONTHLY_TRENDS, NAV_ITEMS, RECENT_SCANS, SUMMARY_CARDS } from "./data";

export async function getAnalysisData() {
  return {
    summaryCards: SUMMARY_CARDS,
    monthlyTrends: MONTHLY_TRENDS,
    recentScans: RECENT_SCANS,
    navItems: NAV_ITEMS,
  };
}
