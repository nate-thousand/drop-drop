export interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export const DEFAULT_TITLE = "Untitled Project";
export const DEFAULT_DESCRIPTION = "Short project description goes here.";
export const DEFAULT_CATEGORY = "Uncategorized";

export function createPortfolioItem(imageUrl: string): PortfolioItem {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    imageUrl,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    tags: [],
    category: DEFAULT_CATEGORY,
    createdAt: now,
    updatedAt: now,
    featured: false,
  };
}

export function updatePortfolioItem(
  item: PortfolioItem,
  updates: Partial<Omit<PortfolioItem, "id" | "createdAt">>
): PortfolioItem {
  return {
    ...item,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}
