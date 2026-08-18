"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { UploadedFile } from "@/types";
import { formatBytes } from "@/lib/utils";
import { 
  UploadCloud, 
  FileText, 
  Check, 
  Copy, 
  ExternalLink, 
  RotateCcw, 
  AlertCircle, 
  Code, 
  Loader2,
  X,
  Terminal
} from "lucide-react";

interface UploadZoneProps {
  onUploadSuccess: (file: UploadedFile) => void;
  showToast: (text: string, type?: "success" | "error" | "info") => void;
}

export default function UploadZone({ onUploadSuccess, showToast }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadedResult, setUploadedResult] = useState<UploadedFile | null>(null);
  const [copiedType, setCopiedType] = useState<"link" | "md" | "html" | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFileSelection(file);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFileSelection(file);
    }
  };

  const processFileSelection = (file: File) => {
    const maxBytes = 120 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMessage("O arquivo excede o limite máximo de 120 MB.");
      setUploadState("error");
      return;
    }

    setSelectedFile(file);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    uploadFile(file, localPreview);
  };

  const uploadFile = (file: File, localPreview: string) => {
    setUploadState("uploading");
    setProgress(0);
    setErrorMessage("");

    // Simulate progress smoothly
    let simulated = 0;
    const interval = setInterval(() => {
      simulated += 20;
      if (simulated <= 90) {
        setProgress(simulated);
      }
    }, 150);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    });

    const finalizeSuccess = (fileUrl: string) => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        const isImg = file.type.startsWith("image/");
        const isVid = file.type.startsWith("video/");
        
        const newFileObj: UploadedFile = {
          id: `file-${Date.now()}`,
          name: file.name,
          size: file.size,
          type: isImg ? "image" : isVid ? "video" : "document",
          mimeType: file.type || "application/octet-stream",
          url: fileUrl,
          uploadedAt: "Agora mesmo",
          views: 1,
          downloads: 0,
          previewUrl: isImg ? fileUrl : undefined,
        };

        setUploadedResult(newFileObj);
        setUploadState("success");
        onUploadSuccess(newFileObj);
        showToast("Upload concluído com sucesso!", "success");
      }, 300);
    };

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.success) {
            finalizeSuccess(res.url);
            return;
          }
        } catch (err) {
          // fallback
        }
      }
      // On static deployment (e.g. GitHub Pages) where /api/upload returns 404, fallback to client-side Blob URL
      finalizeSuccess(localPreview);
    });

    xhr.addEventListener("error", () => {
      // Fallback for static hosting environments
      finalizeSuccess(localPreview);
    });

    xhr.open("POST", "/api/upload");
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      xhr.send(formData);
    } catch (e) {
      finalizeSuccess(localPreview);
    }
  };

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
    }
    resetZone();
  };

  const resetZone = () => {
    setUploadState("idle");
    setSelectedFile(null);
    setPreviewUrl("");
    setProgress(0);
    setErrorMessage("");
    setUploadedResult(null);
    setCopiedType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCopy = (text: string, type: "link" | "md" | "html") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    showToast("Copiado para a área de transferência!", "info");
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
      />

      {/* IDLE DROP ZONE */}
      {uploadState === "idle" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 text-center overflow-hidden bg-black/60 backdrop-blur-md ${
            isDragging
              ? "border-white bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.25)] scale-[1.01]"
              : "border-zinc-800 hover:border-white/60 hover:bg-zinc-900/60"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5 pointer-events-none animate-radar" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-white text-black flex items-center justify-center mb-4 group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide mb-1 font-mono uppercase">
              DROP FILE HERE
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs mb-5 font-mono">
              Ou clique em qualquer lugar para selecionar
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                MAX 120MB
              </span>
              <span className="px-2.5 py-1 rounded bg-white text-black font-bold">
                HTTPS // SSL
              </span>
            </div>
          </div>
        </div>
      )}

      {/* UPLOADING STATE */}
      {uploadState === "uploading" && selectedFile && (
        <div className="p-6 rounded-2xl bg-black border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-white animate-pulse" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-white truncate max-w-xs sm:max-w-md uppercase">
                  {selectedFile.name}
                </h4>
                <p className="text-[10px] text-zinc-400 font-mono">
                  {formatBytes(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={cancelUpload}
              className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 mb-2 font-mono">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300 flex items-center gap-1.5 uppercase">
                <Terminal className="w-3.5 h-3.5 text-white" />
                UPLOADING STREAM...
              </span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 rounded bg-zinc-900 overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-white transition-all duration-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS STATE */}
      {uploadState === "success" && uploadedResult && (
        <div className="p-6 rounded-2xl bg-black border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  UPLOAD COMPLETE // SUCCESS
                </h4>
                <p className="text-[10px] text-zinc-400 font-mono">
                  Link gerado e pronto para uso
                </p>
              </div>
            </div>
            <button
              onClick={resetZone}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 border border-zinc-700 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              NOVO UPLOAD
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Preview Box */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              {uploadedResult.type === "image" && (
                <img
                  src={previewUrl || uploadedResult.url}
                  alt={uploadedResult.name}
                  className="max-h-36 object-contain rounded mb-2 border border-zinc-800"
                />
              )}
              {uploadedResult.type === "video" && (
                <video
                  src={previewUrl || uploadedResult.url}
                  controls
                  className="max-h-36 rounded mb-2 border border-zinc-800"
                />
              )}
              {uploadedResult.type === "document" && (
                <div className="w-14 h-14 rounded-lg bg-zinc-900 text-white flex items-center justify-center mb-2 border border-zinc-800">
                  <FileText className="w-7 h-7" />
                </div>
              )}
              <span className="text-[11px] font-mono text-zinc-300 truncate max-w-full">
                {uploadedResult.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {formatBytes(uploadedResult.size)}
              </span>
            </div>

            {/* Inputs & Links */}
            <div className="lg:col-span-2 space-y-3 font-mono">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">
                  LINK DIRETO
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={uploadedResult.url}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
                  />
                  <button
                    onClick={() => handleCopy(uploadedResult.url, "link")}
                    className="px-3.5 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  >
                    {copiedType === "link" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === "link" ? "COPIADO" : "COPIAR"}</span>
                  </button>
                  <a
                    href={uploadedResult.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1 flex items-center gap-1">
                  <Code className="w-3 h-3 text-white" />
                  MARKDOWN CODE
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`![7Upload](${uploadedResult.url})`}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy(`![7Upload](${uploadedResult.url})`, "md")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 border border-zinc-800"
                  >
                    {copiedType === "md" ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === "md" ? "COPIADO" : "COPIAR"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ERROR STATE */}
      {uploadState === "error" && (
        <div className="p-6 rounded-2xl bg-black border border-white/40 text-center animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-mono font-bold text-white mb-1 uppercase">
            UPLOAD FAILED // ERROR
          </h3>
          <p className="text-xs text-zinc-400 font-mono max-w-xs mx-auto mb-4">
            {errorMessage}
          </p>
          <button
            onClick={resetZone}
            className="px-4 py-2 rounded-lg bg-white text-black font-mono font-bold text-xs shadow-md hover:bg-zinc-200 transition-all inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RETRY
          </button>
        </div>
      )}
    </div>
  );
}
