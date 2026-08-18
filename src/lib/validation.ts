const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE_MB || "120", 10) * 1024 * 1024;

const BLOCKED_EXTENSIONS = [
  ".exe", ".bat", ".cmd", ".sh", ".msi", ".dll", ".scr", ".vbs", ".ps1", ".com", ".sys"
];

export function isValidMimeType(mimeType: string): boolean {
  if (!mimeType) return true;
  const lower = mimeType.toLowerCase();
  
  // Allow all images, videos, audio, text, documents, archives
  return (
    lower.startsWith("image/") ||
    lower.startsWith("video/") ||
    lower.startsWith("audio/") ||
    lower.startsWith("text/") ||
    lower.includes("pdf") ||
    lower.includes("zip") ||
    lower.includes("rar") ||
    lower.includes("tar") ||
    lower.includes("7z") ||
    lower.includes("json") ||
    lower.includes("octet-stream") ||
    lower.includes("document")
  );
}

export function isValidExtension(ext: string): boolean {
  if (!ext) return true;
  return !BLOCKED_EXTENSIONS.includes(ext.toLowerCase());
}

export function isValidFileSize(size: number): boolean {
  return size <= MAX_FILE_SIZE;
}

export function getMaxSizeInBytes(): number {
  return MAX_FILE_SIZE;
}
