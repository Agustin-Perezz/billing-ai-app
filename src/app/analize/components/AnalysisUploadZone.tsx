"use client";

import { FileDropzone } from "@/components/ui/file-dropzone";

export function AnalysisUploadZone() {
  return (
    <div className="col-span-12 mb-6">
      <FileDropzone
        label="Drop bill image here or click to browse"
        onFilesSelected={() => {}}
      />
    </div>
  );
}
