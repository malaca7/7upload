"use client";

import { UploadedFile } from "@/types";
import { formatBytes } from "@/lib/utils";
import { X, ExternalLink, Copy, Check, Eye, Download, FileText } from "lucide-react";
import { useState } from "react";

interface FilePreviewModalProps {
  file: UploadedFile | null;
  onClose: () => void;
  showToast: (text: string, type?: "success" | "error" | "info") => void;
}

export default function FilePreviewModal({
  file,
  onClose,
  showToast,
}: FilePreviewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!file) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(file.url);
    setCopied(true);
    showToast("Link copiado!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-black border border-white/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.15)] animate-in zoom-in-95 duration-200 font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded bg-white text-black flex items-center justify-center font-bold shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 className="text-xs font-bold text-white truncate uppercase">{file.name}</h3>
              <p className="text-[10px] text-zinc-500">
                {formatBytes(file.size)} • {file.uploadedAt}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Preview */}
        <div className="p-6 bg-zinc-950 flex items-center justify-center min-h-[250px] max-h-[420px] overflow-auto border-b border-zinc-800">
          {file.type === "image" ? (
            <img
              src={file.previewUrl || file.url}
              alt={file.name}
              className="max-h-[380px] w-auto object-contain rounded border border-zinc-800"
            />
          ) : file.type === "video" ? (
            <video
              src={file.previewUrl || file.url}
              controls
              autoPlay
              className="max-h-[380px] w-full rounded border border-zinc-800"
            />
          ) : (
            <div className="text-center py-10">
              <FileText className="w-12 h-12 text-white mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">{file.name}</h4>
              <p className="text-[10px] text-zinc-500 mb-4">{file.mimeType}</p>
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded bg-white text-black font-bold text-xs inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                BAIXAR ARQUIVO
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black">
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 truncate w-full sm:w-auto">
            <span className="text-zinc-600">URL:</span>
            <span className="text-white truncate">{file.url}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded bg-white text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIADO" : "COPIAR LINK"}</span>
            </button>
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 border border-zinc-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>ABRIR</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
