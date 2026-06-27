"use client";

interface UploadPreviewCardProps {
  file: File;
  previewUrl: string;
}

export function UploadPreviewCard({ file, previewUrl }: UploadPreviewCardProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={previewUrl}
        alt={file.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent px-2 pb-2 pt-6">
        <p className="truncate text-[10px] font-medium text-background">
          {file.name}
        </p>
      </div>
    </div>
  );
}
