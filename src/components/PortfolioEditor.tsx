"use client";

import type { PortfolioItem } from "@/types/portfolio";
import { TagList } from "./TagList";

interface PortfolioEditorProps {
  item: PortfolioItem;
  onUpdate: (updates: Partial<Omit<PortfolioItem, "id" | "createdAt">>) => void;
  onClose: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function PortfolioEditor({
  item,
  onUpdate,
  onClose,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: PortfolioEditorProps) {
  return (
    <aside className="flex h-full flex-col border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">Edit Project</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-muted transition-colors hover:bg-background hover:text-foreground"
          aria-label="Close editor"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-5 overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={item.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase"
            >
              Description
            </label>
            <textarea
              id="description"
              value={item.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={item.category}
              onChange={(e) => onUpdate({ category: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground"
            />
          </div>

          <TagList
            tags={item.tags}
            onChange={(tags) => onUpdate({ tags })}
          />

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={item.featured}
              onChange={(e) => onUpdate({ featured: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-foreground"
            />
            <span className="text-sm text-foreground">Featured project</span>
          </label>
        </div>
      </div>

      <div className="space-y-2 border-t border-border p-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            Move up
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            Move down
          </button>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          Delete project
        </button>
      </div>
    </aside>
  );
}
