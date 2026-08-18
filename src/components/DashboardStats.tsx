"use client";

import { DiscordUser } from "@/types";
import { formatBytes } from "@/lib/utils";
import { HardDrive, FileText, Eye, Zap, Sparkles } from "lucide-react";

interface DashboardStatsProps {
  user: DiscordUser;
  totalFiles: number;
  totalViews: number;
}

export default function DashboardStats({
  user,
  totalFiles,
  totalViews,
}: DashboardStatsProps) {
  const usagePercentage = Math.min(
    100,
    Math.round((user.storageUsed / user.storageLimit) * 100)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Storage Card */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Armazenamento
          </span>
          <div className="p-2 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
            <HardDrive className="w-4 h-4" />
          </div>
        </div>
        <div className="mb-3">
          <span className="text-2xl font-extrabold text-white">
            {formatBytes(user.storageUsed)}
          </span>
          <span className="text-xs text-slate-400 ml-1.5 font-mono">
            / {formatBytes(user.storageLimit)}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400">
          <span>{usagePercentage}% utilizado</span>
          <span className="text-cyan-400 font-medium">Plano {user.plan}</span>
        </div>
      </div>

      {/* Total Files Card */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total de Arquivos
          </span>
          <div className="p-2 rounded-xl bg-cyan-600/10 text-cyan-400 border border-cyan-500/20">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-2xl font-extrabold text-white">
            {totalFiles}
          </span>
          <span className="text-xs text-slate-400 ml-1.5">itens hospedados</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Suporta imagens, vídeos e documentos
        </p>
      </div>

      {/* Total Views Card */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Visualizações
          </span>
          <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
            <Eye className="w-4 h-4" />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-2xl font-extrabold text-white">
            {totalViews.toLocaleString("pt-BR")}
          </span>
          <span className="text-xs text-slate-400 ml-1.5">acessos diretos</span>
        </div>
        <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Sem limite de largura de banda
        </p>
      </div>

      {/* Account Info / Status */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Conta Discord
          </span>
          <div className="p-2 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <img
            src={user.avatarUrl}
            alt={user.globalName}
            className="w-8 h-8 rounded-lg object-cover border border-blue-500/30"
          />
          <div className="flex flex-col truncate">
            <span className="text-sm font-bold text-white truncate">
              {user.globalName}
            </span>
            <span className="text-[11px] text-blue-400 font-mono">
              @{user.username}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
          <span>Membro desde</span>
          <span className="text-slate-200 font-medium">{user.joinedDate}</span>
        </div>
      </div>
    </div>
  );
}
