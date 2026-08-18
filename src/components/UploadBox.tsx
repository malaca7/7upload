"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 120 * 1024 * 1024; // 120MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export default function UploadBox({ onFileSelect }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato não suportado. Use JPG, PNG, GIF ou WebP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("O arquivo excede o limite de 120 MB.");
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      validateAndProcessFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden",
          isDragging 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" 
            : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
          <div className="mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 p-4 text-neutral-600 dark:text-neutral-300 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="mb-2 text-lg font-medium text-neutral-700 dark:text-neutral-200">
            Clique ou arraste a imagem aqui
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            JPG, PNG, GIF ou WebP — máximo 120 MB
          </p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/gif, image/webp"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
