"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { formatBytes } from "@/lib/utils";

interface UploadProgressProps {
  file: File;
  preview: string;
  progress: number;
}

export default function UploadProgress({ file, preview, progress }: UploadProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {file.name}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {formatBytes(file.size)}
          </p>
        </div>
        <div className="shrink-0 flex items-center justify-center">
          {progress < 100 ? (
            <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-neutral-700 dark:text-neutral-300">
            {progress < 100 ? "Enviando..." : "Finalizando..."}
          </span>
          <span className="text-neutral-900 dark:text-neutral-100">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
