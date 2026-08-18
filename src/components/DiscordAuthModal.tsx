"use client";

import { useState } from "react";
import { Shield, Check, X, Loader2 } from "lucide-react";

interface DiscordAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthorize: () => void;
}

export default function DiscordAuthModal({
  isOpen,
  onClose,
  onAuthorize,
}: DiscordAuthModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuthorizeClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthorize();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#2b2d31] rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Discord Header banner */}
        <div className="h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-4 relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a73.57,73.57,0,0,0,64.32,0c.87.68,1.76,1.36,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.48,0,11.54,5.74,11.43,12.74C53.88,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.07-12.74,11.44-12.74c6.48,0,11.54,5.74,11.43,12.74C96.12,60,91.08,65.69,84.69,65.69Z"/>
            </svg>
            <span className="font-bold text-lg text-white tracking-wide">Discord OAuth2</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User preview & app connection */}
        <div className="p-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-700/50 mb-6">
            {/* App side */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 mb-2">
                <span className="font-extrabold text-2xl text-white">7</span>
              </div>
              <span className="font-bold text-sm text-white">7Upload</span>
              <span className="text-xs text-blue-400">7upload.dev</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-wider">Conectar</span>
            </div>

            {/* Discord account side */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                  alt="Alexandre Silva"
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 shadow-lg"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#2b2d31]" />
              </div>
              <span className="font-bold text-sm text-white">Alexandre Silva</span>
              <span className="text-xs text-slate-400">@alex_dev</span>
            </div>
          </div>

          {/* Permissions requested */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              7Upload solicita acesso a:
            </h4>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Acessar seu nome de usuário, avatar e tag</p>
                <p className="text-slate-400">Para personalizar seu perfil e espaço de upload no 7Upload</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mt-0.5 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Saber em quais servidores você está</p>
                <p className="text-slate-400">Para fornecer integrações diretas com canais do Discord</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAuthorizeClick}
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Autorizar</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
