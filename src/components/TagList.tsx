"use client";

import { useState, KeyboardEvent } from "react";

interface TagListProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagList({ tags, onChange }: TagListProps) {
  const [input, setInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || tags.includes(tag)) return;
    onChange([...tags, tag]);
    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium tracking-wide text-muted uppercase">
        Tags
      </label>

      <div className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-background p-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-0.5 text-xs text-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-muted hover:text-foreground"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? "Add a tag…" : ""}
          className="min-w-[80px] flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted"
        />
      </div>

      <p className="text-[10px] text-muted">Press Enter to add a tag</p>
    </div>
  );
}
