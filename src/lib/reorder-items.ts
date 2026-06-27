export function reorderItems<T extends { id: string }>(
  items: T[],
  draggedId: string,
  targetId: string
): T[] {
  if (draggedId === targetId) return items;

  const fromIndex = items.findIndex((item) => item.id === draggedId);
  const toIndex = items.findIndex((item) => item.id === targetId);

  if (fromIndex === -1 || toIndex === -1) return items;

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}
