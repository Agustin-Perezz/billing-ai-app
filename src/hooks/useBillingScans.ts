"use client";

import { useCallback, useEffect, useState } from "react";
import type { ExpenseScan } from "@/app/analyze/schema";

const STORAGE_KEY = "billing_scans";

function readScans(): ExpenseScan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ExpenseScan[]) : [];
  } catch {
    return [];
  }
}

export type UseBillingScans = {
  scans: ExpenseScan[];
  addScan: (scan: ExpenseScan) => void;
  ready: boolean;
};

export function useBillingScans(): UseBillingScans {
  const [scans, setScans] = useState<ExpenseScan[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setScans(readScans());
    setReady(true);
  }, []);

  const addScan = useCallback((scan: ExpenseScan) => {
    setScans((prev) => {
      const next = [scan, ...prev];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  return { scans, addScan, ready };
}
