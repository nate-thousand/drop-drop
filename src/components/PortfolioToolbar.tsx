"use client";

import { useRef } from "react";

interface PortfolioToolbarProps {
  itemCount: number;
  importError: string | null;
  onExport: () => void;
  onImportFile: (file: File) => void;
  onDismissError: () => void;
}

export function PortfolioToolbar({
  itemCount,
  importError,
  onExport,
  onImportFile,
  onDismissError,
}: PortfolioToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-4 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExport}
            disabled={itemCount === 0}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImportFile(file);
              e.target.value = "";
            }}
          />
        </div>
        <p className="text-[10px] text-muted">
          {itemCount > 0
            ? "Hover a card for actions"
            : "Export disabled until you add projects"}
        </p>
      </div>

      {importError && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-xs text-red-600">{importError}</p>
          <button
            type="button"
            onClick={onDismissError}
            className="shrink-0 text-xs text-red-800 hover:text-red-950"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
