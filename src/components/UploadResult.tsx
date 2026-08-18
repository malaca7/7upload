"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, ExternalLink, RefreshCw } from "lucide-react";

interface UploadResultProps {
  preview: string;
  url: string;
  onReset: () => void;
}

export default function UploadResult({ preview, url, onReset }: UploadResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Upload concluído!
        </h2>
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <Image
          src={preview}
          alt="Imagem enviada"
          fill
          className="object-contain"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Link direto
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-medium rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir imagem</span>
          </a>
          <button
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-medium rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Enviar outra</span>
          </button>
        </div>
      </div>
    </div>
  );
}
