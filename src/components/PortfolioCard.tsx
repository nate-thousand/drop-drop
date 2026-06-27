"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/types/portfolio";
import { CardActionMenu } from "./CardActionMenu";
import { DragHandle } from "./DragHandle";

interface PortfolioCardProps {
  item: PortfolioItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRequestDelete: (id: string) => void;
  onDrop: (draggedId: string, targetId: string) => void;
}

function clearDragVisuals(grid: Element | null) {
  if (!grid) return;
  grid
    .querySelectorAll("[data-dragging], [data-drop-target]")
    .forEach((el) => {
      el.removeAttribute("data-dragging");
      el.removeAttribute("data-drop-target");
    });
}

export function PortfolioCard({
  item,
  isSelected,
  onSelect,
  onDuplicate,
  onRequestDelete,
  onDrop,
}: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);

    const grid = e.currentTarget.closest(".masonry-grid");
    clearDragVisuals(grid);
    e.currentTarget.closest("article")?.setAttribute("data-dragging", "");
  };

  const handleDragEnd = (e: React.DragEvent<HTMLButtonElement>) => {
    clearDragVisuals(e.currentTarget.closest(".masonry-grid"));
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const card = e.currentTarget;
    if (card.hasAttribute("data-dragging")) return;

    const grid = card.closest(".masonry-grid");
    grid
      ?.querySelectorAll("[data-drop-target]")
      .forEach((el) => el.removeAttribute("data-drop-target"));
    card.setAttribute("data-drop-target", "");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    const card = e.currentTarget;
    if (card.contains(e.relatedTarget as Node)) return;
    card.removeAttribute("data-drop-target");
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const grid = e.currentTarget.closest(".masonry-grid");
    clearDragVisuals(grid);

    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId && draggedId !== item.id) onDrop(draggedId, item.id);
  };

  return (
    <article
      tabIndex={0}
      onClick={() => onSelect(item.id)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item.id);
        }
      }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`Open ${item.title}`}
      className={`group masonry-item cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-[transform,box-shadow,border-color,opacity] duration-200 ease-out hover:scale-[1.02] hover:border-accent hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] ${
        isSelected
          ? "border-foreground ring-2 ring-foreground/20"
          : "border-border"
      }`}
    >
      <div className="relative overflow-hidden bg-background/40">
        {!imageLoaded && (
          <div
            className="min-h-32 w-full animate-pulse bg-background"
            aria-hidden="true"
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`block h-auto w-full transition-[transform,opacity] duration-200 ease-out group-hover:scale-[1.04] ${
            imageLoaded ? "opacity-100" : "hidden"
          }`}
          draggable={false}
        />

        <DragHandle
          label={item.title}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />

        <CardActionMenu
          itemTitle={item.title}
          onEdit={() => onSelect(item.id)}
          onDuplicate={() => onDuplicate(item.id)}
          onDelete={() => onRequestDelete(item.id)}
        />

        {item.featured && (
          <span className="absolute bottom-2 left-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium tracking-wide text-background uppercase">
            Featured
          </span>
        )}
      </div>

      <div className="p-4 text-left">
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
      </div>
    </article>
  );
}
