import type { PortfolioItem } from "@/types/portfolio";

const STORAGE_KEY = "drop-drop-portfolio";

export function loadPortfolio(): PortfolioItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as PortfolioItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePortfolio(items: PortfolioItem[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage quota may be exceeded with many large images.
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function revokeImageUrl(imageUrl: string): void {
  if (imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(imageUrl);
  }
}
