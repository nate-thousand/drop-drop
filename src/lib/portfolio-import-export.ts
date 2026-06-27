import type { PortfolioItem } from "@/types/portfolio";

export const EXPORT_VERSION = 1;

export interface PortfolioExport {
  version: typeof EXPORT_VERSION;
  exportedAt: string;
  items: PortfolioItem[];
}

function isPortfolioItem(value: unknown): value is PortfolioItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.imageUrl === "string" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    Array.isArray(item.tags) &&
    item.tags.every((tag) => typeof tag === "string") &&
    typeof item.category === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string" &&
    typeof item.featured === "boolean"
  );
}

export function createExportPayload(items: PortfolioItem[]): PortfolioExport {
  return {
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    items,
  };
}

export function downloadPortfolioExport(items: PortfolioItem[]): void {
  const payload = createExportPayload(items);
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const date = new Date().toISOString().slice(0, 10);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `drop-drop-portfolio-${date}.json`;
  anchor.click();

  URL.revokeObjectURL(url);
}

export function parsePortfolioImport(json: string): PortfolioItem[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON file.");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid portfolio file format.");
  }

  const record = parsed as Record<string, unknown>;
  let items: unknown;

  if (Array.isArray(record.items)) {
    items = record.items;
  } else if (Array.isArray(parsed)) {
    items = parsed;
  } else {
    throw new Error("Portfolio file must contain an items array.");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Portfolio file contains no projects.");
  }

  const valid = items.filter(isPortfolioItem);

  if (valid.length === 0) {
    throw new Error("No valid portfolio projects found in file.");
  }

  return valid.map((item) => ({
    ...item,
    tags: [...item.tags],
  }));
}

export function reassignPortfolioIds(items: PortfolioItem[]): PortfolioItem[] {
  return items.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    tags: [...item.tags],
  }));
}

export function mergePortfolioItems(
  existing: PortfolioItem[],
  imported: PortfolioItem[]
): PortfolioItem[] {
  return [...existing, ...reassignPortfolioIds(imported)];
}
