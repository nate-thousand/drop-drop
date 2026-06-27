import type { PortfolioItem } from "@/types/portfolio";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioGridProps {
  items: PortfolioItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export function PortfolioGrid({
  items,
  selectedId,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <svg
          className="mb-4 h-10 w-10 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
          />
        </svg>
        <h3 className="text-sm font-medium text-foreground">No projects yet</h3>
        <p className="mt-1 max-w-xs text-xs text-muted">
          Drop images above to start building your portfolio. Each image becomes a
          project card you can edit.
        </p>
      </div>
    );
  }

  return (
    <div className="masonry-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
      {items.map((item, index) => (
        <PortfolioCard
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          onSelect={onSelect}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      ))}
    </div>
  );
}
