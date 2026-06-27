"use client";

interface ImportDialogProps {
  open: boolean;
  itemCount: number;
  onCancel: () => void;
  onMerge: () => void;
  onReplace: () => void;
}

export function ImportDialog({
  open,
  itemCount,
  onCancel,
  onMerge,
  onReplace,
}: ImportDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/20"
        onClick={onCancel}
        aria-label="Cancel import"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-dialog-title"
        aria-describedby="import-dialog-description"
        className="relative w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        <h2
          id="import-dialog-title"
          className="text-base font-semibold text-foreground"
        >
          Import Portfolio?
        </h2>
        <p
          id="import-dialog-description"
          className="mt-2 text-sm text-muted"
        >
          Found {itemCount} {itemCount === 1 ? "project" : "projects"} in this
          file. How would you like to import them?
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onMerge}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            Add to portfolio
          </button>
          <button
            type="button"
            onClick={onReplace}
            className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Replace everything
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
