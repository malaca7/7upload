import { DiscordUser, UploadedFile } from "@/types";

export const MOCK_DISCORD_USER: DiscordUser = {
  id: "849201938472910384",
  username: "alex_dev",
  globalName: "Alexandre Silva",
  discriminator: "7777",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  bannerColor: "#2563eb",
  email: "alex.silva@discord.gg",
  plan: "VIP",
  joinedDate: "Março 2024",
  storageUsed: 2748779069, // 2.56 GB
  storageLimit: 10737418240, // 10 GB
};

export const INITIAL_MOCK_FILES: UploadedFile[] = [
  {
    id: "file-1",
    name: "hero-dashboard-preview.png",
    size: 4299161, // 4.1 MB
    type: "image",
    mimeType: "image/png",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    uploadedAt: "Hoje, 14:22",
    views: 1420,
    downloads: 389,
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "file-2",
    name: "design-system-v2.fig",
    size: 24641536, // 23.5 MB
    type: "document",
    mimeType: "application/octet-stream",
    url: "https://7upload.dev/f/design-system-v2.fig",
    uploadedAt: "Ontem, 18:45",
    views: 89,
    downloads: 42,
  },
  {
    id: "file-3",
    name: "gameplay-highlight-4k.mp4",
    size: 89128960, // 85 MB
    type: "video",
    mimeType: "video/mp4",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    uploadedAt: "16 de Ago, 09:10",
    views: 3840,
    downloads: 1120,
  },
  {
    id: "file-4",
    name: "7upload-brand-kit-assets.zip",
    size: 15728640, // 15 MB
    type: "document",
    mimeType: "application/zip",
    url: "https://7upload.dev/f/7upload-brand-kit-assets.zip",
    uploadedAt: "12 de Ago, 21:04",
    views: 654,
    downloads: 230,
  },
  {
    id: "file-5",
    name: "cyberpunk-wallpaper-4k.jpg",
    size: 6815744, // 6.5 MB
    type: "image",
    mimeType: "image/jpeg",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    uploadedAt: "08 de Ago, 11:30",
    views: 8900,
    downloads: 2450,
    previewUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
  },
];
