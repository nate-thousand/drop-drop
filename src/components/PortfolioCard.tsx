"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/types/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export function PortfolioCard({
  item,
  isSelected,
  isFirst,
  isLast,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className={`masonry-item group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md ${
        isSelected
          ? "border-foreground ring-2 ring-foreground/20"
          : "border-border hover:border-muted"
      }`}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="aspect-[4/3] w-full animate-pulse bg-background" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "absolute inset-0 h-full opacity-0"
          }`}
        />

        <div className="absolute top-2 left-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="rounded-full bg-foreground/80 p-1.5 text-background backdrop-blur-sm transition-colors hover:bg-red-600"
            aria-label={`Delete ${item.title}`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {!isFirst && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp(item.id);
              }}
              className="rounded-full bg-foreground/80 p-1.5 text-background backdrop-blur-sm transition-colors hover:bg-foreground"
              aria-label={`Move ${item.title} up`}
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75 12 8.25l7.5 7.5"
                />
              </svg>
            </button>
          )}
          {!isLast && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown(item.id);
              }}
              className="rounded-full bg-foreground/80 p-1.5 text-background backdrop-blur-sm transition-colors hover:bg-foreground"
              aria-label={`Move ${item.title} down`}
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25 12 15.75 4.5 8.25"
                />
              </svg>
            </button>
          )}
        </div>

        {item.featured && (
          <span className="absolute bottom-2 left-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium tracking-wide text-background uppercase">
            Featured
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className="w-full p-4 text-left"
      >
        <h3 className="truncate text-sm font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted">
          {item.description}
        </p>
        {item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-background px-2 py-0.5 text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-[10px] text-muted">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </button>
    </article>
  );
}
