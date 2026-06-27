"use client";

import { useCallback, useEffect, useState } from "react";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { DropZone } from "@/components/DropZone";
import { ImportDialog } from "@/components/ImportDialog";
import { PortfolioEditor } from "@/components/PortfolioEditor";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PortfolioToolbar } from "@/components/PortfolioToolbar";
import {
  downloadPortfolioExport,
  mergePortfolioItems,
  parsePortfolioImport,
  reassignPortfolioIds,
} from "@/lib/portfolio-import-export";
import {
  fileToDataUrl,
  loadPortfolio,
  revokeImageUrl,
  savePortfolio,
} from "@/lib/portfolio-storage";
import {
  createPortfolioItem,
  duplicatePortfolioItem,
  updatePortfolioItem,
  type PortfolioItem,
} from "@/types/portfolio";

function moveItem(items: PortfolioItem[], id: string, direction: -1 | 1) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return items;

  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const next = [...items];
  const [moved] = next.splice(index, 1);
  next.splice(targetIndex, 0, moved);
  return next;
}

export default function HomePage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<PortfolioItem[] | null>(
    null
  );
  const [importError, setImportError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedItem = items.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    setItems(loadPortfolio());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    savePortfolio(items);
  }, [items, isLoaded]);

  const handleFilesDropped = useCallback(async (files: File[]) => {
    const dataUrls = await Promise.all(files.map(fileToDataUrl));
    const newItems = dataUrls.map((url) => createPortfolioItem(url));

    setItems((prev) => [...newItems, ...prev]);

    if (newItems.length === 1) {
      setSelectedId(newItems[0].id);
    }
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleUpdate = useCallback(
    (updates: Partial<Omit<PortfolioItem, "id" | "createdAt">>) => {
      if (!selectedId) return;

      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedId ? updatePortfolioItem(item, updates) : item
        )
      );
    },
    [selectedId]
  );

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) revokeImageUrl(item.imageUrl);
      return prev.filter((i) => i.id !== id);
    });
    setSelectedId((current) => (current === id ? null : current));
    setPendingDeleteId(null);
  }, []);

  const handleRequestDelete = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const handleDuplicate = useCallback((id: string) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;

      const duplicate = duplicatePortfolioItem(prev[index]);
      setSelectedId(duplicate.id);

      const next = [...prev];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
  }, []);

  const handleMoveUp = useCallback((id: string) => {
    setItems((prev) => moveItem(prev, id, -1));
  }, []);

  const handleMoveDown = useCallback((id: string) => {
    setItems((prev) => moveItem(prev, id, 1));
  }, []);

  const handleExport = useCallback(() => {
    downloadPortfolioExport(items);
  }, [items]);

  const handleImportFile = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const imported = parsePortfolioImport(text);
      setImportError(null);
      setPendingImport(imported);
    } catch (error) {
      setPendingImport(null);
      setImportError(
        error instanceof Error ? error.message : "Failed to import portfolio."
      );
    }
  }, []);

  const handleImportCancel = useCallback(() => {
    setPendingImport(null);
  }, []);

  const handleImportMerge = useCallback(() => {
    if (!pendingImport) return;

    setItems((prev) => mergePortfolioItems(prev, pendingImport));
    setPendingImport(null);
    setSelectedId(null);
  }, [pendingImport]);

  const handleImportReplace = useCallback(() => {
    if (!pendingImport) return;

    setItems((prev) => {
      prev.forEach((item) => revokeImageUrl(item.imageUrl));
      return reassignPortfolioIds(pendingImport);
    });
    setPendingImport(null);
    setSelectedId(null);
  }, [pendingImport]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Drop Drop
            </h1>
            <p className="text-xs text-muted">Portfolio builder</p>
          </div>
          {items.length > 0 && (
            <span className="text-xs text-muted">
              {items.length} {items.length === 1 ? "project" : "projects"}
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <main className="flex-1 px-6 py-8">
          <section className="mb-8">
            <DropZone onFilesDropped={handleFilesDropped} />
          </section>

          <section>
            <h2 className="mb-4 text-xs font-medium tracking-wide text-muted uppercase">
              Portfolio
            </h2>
            <PortfolioToolbar
              itemCount={items.length}
              importError={importError}
              onExport={handleExport}
              onImportFile={handleImportFile}
              onDismissError={() => setImportError(null)}
            />
            <PortfolioGrid
              items={items}
              selectedId={selectedId}
              onSelect={handleSelect}
              onDuplicate={handleDuplicate}
              onRequestDelete={handleRequestDelete}
            />
          </section>
        </main>

        {selectedItem && (
          <div className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-0 h-screen">
              <PortfolioEditor
                item={selectedItem}
                onUpdate={handleUpdate}
                onClose={handleClose}
                onDelete={() => handleRequestDelete(selectedItem.id)}
                onMoveUp={() => handleMoveUp(selectedItem.id)}
                onMoveDown={() => handleMoveDown(selectedItem.id)}
                isFirst={items[0]?.id === selectedItem.id}
                isLast={items[items.length - 1]?.id === selectedItem.id}
              />
            </div>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div className="absolute right-0 bottom-0 left-0 max-h-[85vh] overflow-hidden rounded-t-2xl bg-card shadow-xl">
            <PortfolioEditor
              item={selectedItem}
              onUpdate={handleUpdate}
              onClose={handleClose}
              onDelete={() => handleRequestDelete(selectedItem.id)}
              onMoveUp={() => handleMoveUp(selectedItem.id)}
              onMoveDown={() => handleMoveDown(selectedItem.id)}
              isFirst={items[0]?.id === selectedItem.id}
              isLast={items[items.length - 1]?.id === selectedItem.id}
            />
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        open={pendingDeleteId !== null}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) handleDelete(pendingDeleteId);
        }}
      />

      <ImportDialog
        open={pendingImport !== null}
        itemCount={pendingImport?.length ?? 0}
        onCancel={handleImportCancel}
        onMerge={handleImportMerge}
        onReplace={handleImportReplace}
      />
    </div>
  );
}
