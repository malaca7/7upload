"use client";

import { useState } from "react";
import { UploadedFile, UploadFilter } from "@/types";
import { formatBytes } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Trash2, 
  Eye, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Download,
  ExternalLink,
  Sparkles,
  HardDrive
} from "lucide-react";

interface FileHistoryProps {
  files: UploadedFile[];
  onDeleteFile: (id: string) => void;
  onPreviewFile: (file: UploadedFile) => void;
  showToast: (text: string, type?: "success" | "error" | "info") => void;
}

export default function FileHistory({
  files,
  onDeleteFile,
  onPreviewFile,
  showToast,
}: FileHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<UploadFilter>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (file: UploadedFile) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    showToast("Link direto copiado para a área de transferência!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    if (filterCategory === "images") {
      return matchesSearch && file.type === "image";
    }
    if (filterCategory === "videos") {
      return matchesSearch && file.type === "video";
    }
    if (filterCategory === "documents") {
      return matchesSearch && file.type === "document";
    }
    return matchesSearch;
  });

  const getFileIcon = (file: UploadedFile) => {
    if (file.type === "image") {
      return <ImageIcon className="w-4 h-4 text-blue-400" />;
    }
    if (file.type === "video") {
      return <Film className="w-4 h-4 text-purple-400" />;
    }
    return <FileText className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="w-full glass-panel border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-blue-400" />
            Histórico de Arquivos
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Gerencie seus envios recentes e obtenha links diretos a qualquer momento.
          </p>
        </div>

        {/* Search & Filter pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-60 bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Todos ({files.length})
            </button>
            <button
              onClick={() => setFilterCategory("images")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === "images"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Imagens
            </button>
            <button
              onClick={() => setFilterCategory("videos")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === "videos"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Vídeos
            </button>
            <button
              onClick={() => setFilterCategory("documents")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === "documents"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Outros
            </button>
          </div>
        </div>
      </div>

      {/* Files Table / Cards */}
      {filteredFiles.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
          <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-300">Nenhum arquivo encontrado</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            {searchTerm
              ? "Tente ajustar os termos de busca ou filtros."
              : "Faça seu primeiro upload acima para começar!"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Arquivo</th>
                <th className="py-3 px-4">Tamanho</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4 text-center">Visualizações</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredFiles.map((file) => (
                <tr
                  key={file.id}
                  className="group hover:bg-slate-900/60 transition-colors"
                >
                  {/* File Name & Thumbnail */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => onPreviewFile(file)}
                        className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer group-hover:border-blue-500/40 transition-colors"
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
                          onClick={() => onPreviewFile(file)}
                          className="font-bold text-slate-200 hover:text-blue-400 cursor-pointer truncate max-w-xs sm:max-w-md transition-colors"
                        >
                          {file.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono truncate">
                          {file.url}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Size */}
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {formatBytes(file.size)}
                  </td>

                  {/* Upload Date */}
                  <td className="py-3.5 px-4 text-slate-400">
                    {file.uploadedAt}
                  </td>

                  {/* Views */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 font-mono text-[11px] border border-slate-800">
                      <Eye className="w-3 h-3 text-blue-400" />
                      {file.views}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Direct Copy Button */}
                      <button
                        onClick={() => handleCopyLink(file)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          copiedId === file.id
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : "bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30"
                        }`}
                        title="Copiar link direto"
                      >
                        {copiedId === file.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Link</span>
                          </>
                        )}
                      </button>

                      {/* Preview Button */}
                      <button
                        onClick={() => onPreviewFile(file)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete File */}
                      <button
                        onClick={() => onDeleteFile(file.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/60 transition-colors"
                        title="Excluir arquivo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
