"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ALLOWED_IMAGE_ACCEPT,
  partitionImageFiles,
} from "@/lib/image-validation";
import { UploadPreviewCard } from "./UploadPreviewCard";

interface PendingPreview {
  id: string;
  file: File;
  previewUrl: string;
}

interface DropZoneProps {
  onFilesDropped: (files: File[]) => void;
}

export function DropZone({ onFilesDropped }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<PendingPreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);
  const previewsRef = useRef<PendingPreview[]>([]);

  const clearPendingPreviews = useCallback(() => {
    previewsRef.current.forEach((preview) =>
      URL.revokeObjectURL(preview.previewUrl)
    );
    previewsRef.current = [];
    setPendingPreviews([]);
  }, []);

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((preview) =>
        URL.revokeObjectURL(preview.previewUrl)
      );
    };
  }, []);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const { valid, errors: validationErrors } = partitionImageFiles(
        Array.from(fileList)
      );

      setErrors(validationErrors);

      if (valid.length === 0) return;

      const previews: PendingPreview[] = valid.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      clearPendingPreviews();
      previewsRef.current = previews;
      setPendingPreviews(previews);

      onFilesDropped(valid);

      window.setTimeout(() => {
        clearPendingPreviews();
      }, 2500);
    },
    [onFilesDropped, clearPendingPreviews]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounterRef.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200 ${
          isDragging
            ? "scale-[1.01] border-foreground bg-foreground/5 shadow-lg"
            : "border-border bg-card hover:border-muted hover:bg-card/80"
        }`}
      >
        {isDragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/5">
            <div className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
              Drop to upload
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_IMAGE_ACCEPT}
          multiple
          className="hidden"
          onChange={handleInputChange}
        />

        <div
          className={`mx-auto flex max-w-sm flex-col items-center gap-2 transition-opacity ${
            isDragging ? "opacity-30" : "opacity-100"
          }`}
        >
          <div
            className={`rounded-full p-3 transition-colors ${
              isDragging ? "bg-foreground/10" : "bg-background"
            }`}
          >
            <svg
              className={`h-8 w-8 transition-colors ${
                isDragging ? "text-foreground" : "text-muted"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground">
            Drop images here or click to upload
          </p>
          <p className="text-xs text-muted">
            JPG, PNG, WebP, GIF — multiple files supported
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-xs font-medium text-red-800">
            {errors.length === 1
              ? "Unsupported file"
              : `${errors.length} unsupported files`}
          </p>
          <ul className="mt-1.5 space-y-1">
            {errors.map((error) => (
              <li key={error} className="text-xs text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {pendingPreviews.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-3 text-xs font-medium text-foreground">
            Added {pendingPreviews.length}{" "}
            {pendingPreviews.length === 1 ? "image" : "images"}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {pendingPreviews.map((preview) => (
              <UploadPreviewCard
                key={preview.id}
                file={preview.file}
                previewUrl={preview.previewUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
