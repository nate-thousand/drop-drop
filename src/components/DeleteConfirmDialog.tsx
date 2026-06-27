"use client";

interface DeleteConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({
  open,
  onCancel,
  onConfirm,
}: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/20"
        onClick={onCancel}
        aria-label="Cancel delete"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="relative w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        <h2
          id="delete-dialog-title"
          className="text-base font-semibold text-foreground"
        >
          Delete Portfolio Item?
        </h2>
        <p
          id="delete-dialog-description"
          className="mt-2 text-sm text-muted"
        >
          This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
