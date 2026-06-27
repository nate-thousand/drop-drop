export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const ALLOWED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
] as const;

export const ALLOWED_IMAGE_ACCEPT = ALLOWED_IMAGE_EXTENSIONS.join(",");

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot).toLowerCase();
}

export function validateImageFile(file: File): ImageValidationResult {
  const extension = getExtension(file.name);
  const typeValid = ALLOWED_IMAGE_TYPES.includes(
    file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
  );
  const extensionValid = ALLOWED_IMAGE_EXTENSIONS.includes(
    extension as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
  );

  if (!typeValid && !extensionValid) {
    return {
      valid: false,
      error: `"${file.name}" is not supported. Use JPG, PNG, WebP, or GIF.`,
    };
  }

  return { valid: true };
}

export function partitionImageFiles(files: File[]): {
  valid: File[];
  errors: string[];
} {
  const valid: File[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const result = validateImageFile(file);
    if (result.valid) {
      valid.push(file);
    } else if (result.error) {
      errors.push(result.error);
    }
  }

  return { valid, errors };
}
