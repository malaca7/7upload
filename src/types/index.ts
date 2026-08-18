export interface DiscordUser {
  id: string;
  username: string;
  globalName: string;
  discriminator: string;
  avatarUrl: string;
  bannerColor?: string;
  email?: string;
  plan: "Free" | "Pro" | "VIP";
  joinedDate: string;
  storageUsed: number; // in bytes
  storageLimit: number; // in bytes
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  mimeType: string;
  url: string;
  uploadedAt: string;
  views: number;
  downloads: number;
  previewUrl?: string;
}

export type UploadFilter = "all" | "images" | "videos" | "documents";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}
