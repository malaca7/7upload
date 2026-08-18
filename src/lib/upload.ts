import crypto from "crypto";
import path from "path";

export function generateRandomFilename(originalFilename: string): string {
  // Extract extension safely
  const ext = path.extname(originalFilename).toLowerCase();
  
  // Generate random 8-character string
  const randomStr = crypto.randomBytes(4).toString("hex");
  
  return `${randomStr}${ext || ".bin"}`;
}

export function getUploadDir(): string {
  // Use env UPLOAD_DIR if specified, otherwise public/uploads for direct Next.js static & route serving
  const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
  return dir;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
