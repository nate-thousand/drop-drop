"use client";

interface DragHandleProps {
  label: string;
  onDragStart: (e: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnd: () => void;
}

export function DragHandle({ label, onDragStart, onDragEnd }: DragHandleProps) {
  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={(e) => e.stopPropagation()}
      className="card-drag-handle absolute top-2 left-2 z-10 flex cursor-grab items-center justify-center rounded-md border border-border/80 bg-card/95 p-1.5 text-muted shadow-sm backdrop-blur-sm transition-opacity duration-200 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 active:cursor-grabbing"
      aria-label={`Drag to reorder ${label}`}
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="9" cy="6" r="1.5" />
        <circle cx="15" cy="6" r="1.5" />
        <circle cx="9" cy="12" r="1.5" />
        <circle cx="15" cy="12" r="1.5" />
        <circle cx="9" cy="18" r="1.5" />
        <circle cx="15" cy="18" r="1.5" />
      </svg>
    </button>
  );
}
