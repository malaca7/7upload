"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadZone from "@/components/UploadZone";
import FilePreviewModal from "@/components/FilePreviewModal";
import Toast from "@/components/Toast";
import { UploadedFile, ToastMessage } from "@/types";
import { formatBytes } from "@/lib/utils";
import { 
  Copy, 
  Check, 
  Trash2, 
  Eye, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Terminal,
  Zap,
  Globe,
  ShieldCheck
} from "lucide-react";

export default function Home() {
  const [sessionFiles, setSessionFiles] = useState<UploadedFile[]>([]);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Toast Helper
  const showToast = (text: string, type: "success" | "error" | "info" = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUploadSuccess = (newFile: UploadedFile) => {
    setSessionFiles((prev) => [newFile, ...prev]);
  };

  const handleDeleteFile = (id: string) => {
    setSessionFiles((prev) => prev.filter((f) => f.id !== id));
    showToast("Item removido.", "info");
  };

  const handleCopyLink = (file: UploadedFile) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    showToast("Link copiado!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.type === "image") return <ImageIcon className="w-3.5 h-3.5 text-white" />;
    if (file.type === "video") return <Film className="w-3.5 h-3.5 text-white" />;
    return <FileText className="w-3.5 h-3.5 text-white" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white bg-tech-grid selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white-glow pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10 flex flex-col items-center justify-center">
        
        {/* Minimalist Tech Headline */}
        <div className="text-center mb-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            FAST FILE HOSTING // NO LOGIN
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-mono mb-2">
            HOSPEDAGEM INSTANTÂNEA
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed">
            Arraste seu arquivo para obter o link direto sem cadastro ou limites.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="w-full mb-10">
          <UploadZone
            onUploadSuccess={handleUploadSuccess}
            showToast={showToast}
          />
        </div>

        {/* Recent Session Uploads Section */}
        {sessionFiles.length > 0 && (
          <div className="w-full bg-black border border-white/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(255,255,255,0.08)] animate-in fade-in duration-300 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-white" />
                RECENT UPLOADS ({sessionFiles.length})
              </h3>
            </div>

            <div className="space-y-2">
              {sessionFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      onClick={() => setPreviewFile(file)}
                      className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer hover:border-white transition-colors"
                    >
                      {file.type === "image" && (file.previewUrl || file.url) ? (
                        <img
                          src={file.previewUrl || file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getFileIcon(file)
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span 
                        onClick={() => setPreviewFile(file)}
                        className="font-bold text-xs text-zinc-200 hover:text-white cursor-pointer truncate transition-colors uppercase"
                      >
                        {file.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono truncate">
                        {formatBytes(file.size)} • {file.url}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopyLink(file)}
                      className={`px-3 py-1.5 rounded text-[11px] font-bold font-mono transition-all ${
                        copiedId === file.id
                          ? "bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                          : "bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 border border-zinc-800"
                      }`}
                    >
                      {copiedId === file.id ? "COPIADO" : "LINK"}
                    </button>

                    <button
                      onClick={() => setPreviewFile(file)}
                      className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                      title="Visualizar"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* High-Tech Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6 font-mono text-[11px]">
          <div className="p-3.5 rounded-xl bg-black border border-zinc-800 text-center">
            <div className="flex items-center justify-center text-white mb-1">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="block font-bold text-white uppercase">FAST CDN</span>
            <span className="text-[10px] text-zinc-500">Sub-50ms Response</span>
          </div>

          <div className="p-3.5 rounded-xl bg-black border border-zinc-800 text-center">
            <div className="flex items-center justify-center text-white mb-1">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <span className="block font-bold text-white uppercase">DIRECT URLS</span>
            <span className="text-[10px] text-zinc-500">Discord & Web Ready</span>
          </div>

          <div className="p-3.5 rounded-xl bg-black border border-zinc-800 text-center">
            <div className="flex items-center justify-center text-white mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="block font-bold text-white uppercase">ZERO LOGS</span>
            <span className="text-[10px] text-zinc-500">No Auth Required</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-5 font-mono text-[10px]">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white text-black flex items-center justify-center font-bold text-[9px]">
              7
            </div>
            <span className="font-bold text-white uppercase">7UPLOAD</span>
            <span>// MONOCHROME EDITION</span>
          </div>

          <span>© {new Date().getFullYear()} 7UPLOAD. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

      {/* Lightbox / File Preview Modal */}
      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        showToast={showToast}
      />

      {/* Toast Alerts */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
