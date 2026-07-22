"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FileDropzone } from "@/components/ui/file-dropzone";
import type { ExpenseScan } from "../schema";

type AnalysisUploadZoneProps = {
  onExtracted: (scan: ExpenseScan) => void;
};

const ACCEPTED_IMAGE_TYPES: Record<string, string[]> = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function AnalysisUploadZone({ onExtracted }: AnalysisUploadZoneProps) {
  const [loading, setLoading] = useState(false);

  async function handleFiles(files: File[]) {
    if (!files[0] || loading) return;
    setLoading(true);
    try {
      const image = await fileToDataUrl(files[0]);
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      if (!res.ok)
        throw new Error((await res.json()).error ?? "Extraction failed");
      const data = (await res.json()) as { expense: ExpenseScan };
      onExtracted(data.expense);
    } catch {
      // ponytail: surface a toast/toast lib later; for now silent fail keeps diff small
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="col-span-12 mb-6 relative">
      <FileDropzone
        label="Drop bill image here or click to browse"
        accept={ACCEPTED_IMAGE_TYPES}
        multiple={false}
        onFilesSelected={handleFiles}
      />
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70">
          <Loader2 className="size-6 animate-spin text-on-surface-variant" />
        </div>
      )}
    </div>
  );
}
