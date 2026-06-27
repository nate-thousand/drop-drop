"use client";

interface CardActionMenuProps {
  itemTitle: string;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function CardActionMenu({
  itemTitle,
  onEdit,
  onDuplicate,
  onDelete,
}: CardActionMenuProps) {
  const stop = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      role="toolbar"
      aria-label={`Actions for ${itemTitle}`}
      className="card-action-menu absolute top-2 right-2 z-10 flex flex-col gap-0.5 rounded-lg border border-border/80 bg-card/95 p-1 shadow-sm backdrop-blur-sm transition-opacity duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => stop(e, onEdit)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-label={`Edit ${itemTitle}`}
      >
        <svg
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <span>Edit</span>
      </button>
      <button
        type="button"
        onClick={(e) => stop(e, onDuplicate)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-label={`Duplicate ${itemTitle}`}
      >
        <svg
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625V7.875c0-.621.504-1.125 1.125-1.125h3.75M8.25 8.25H15a2.25 2.25 0 0 1 2.25 2.25v6.75A2.25 2.25 0 0 1 15 19.5H8.25A2.25 2.25 0 0 1 6 17.25V10.5a2.25 2.25 0 0 1 2.25-2.25Z"
          />
        </svg>
        <span>Duplicate</span>
      </button>
      <button
        type="button"
        onClick={(e) => stop(e, onDelete)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
        aria-label={`Delete ${itemTitle}`}
      >
        <svg
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <span>Delete</span>
      </button>
    </div>
  );
}
