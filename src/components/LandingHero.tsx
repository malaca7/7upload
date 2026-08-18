"use client";

import { 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Globe, 
  HardDrive, 
  Share2, 
  Gauge
} from "lucide-react";

interface LandingHeroProps {
  onLogin: () => void;
  onExploreDemo: () => void;
}

export default function LandingHero({ onLogin, onExploreDemo }: LandingHeroProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden py-12 md:py-20">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-medium mb-8 backdrop-blur-xl shadow-lg shadow-blue-950/40 animate-pulse-glow">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>7Upload v2.0 — Uploads ultrarrápidos de até 120 MB</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
          Hospedagem de arquivos <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            simples, rápida e confiável.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Compartilhe imagens, vídeos e arquivos instantaneamente com suporte a links diretos, 
          painel de controle em tempo real e integração direta com o Discord.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-blue-400/20"
          >
            <svg className="w-6 h-6 fill-current text-white shrink-0" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a73.57,73.57,0,0,0,64.32,0c.87.68,1.76,1.36,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74c6.48,0,11.54,5.74,11.43,12.74C53.88,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.07-12.74,11.44-12.74c6.48,0,11.54,5.74,11.43,12.74C96.12,60,91.08,65.69,84.69,65.69Z"/>
            </svg>
            <span>Entrar com Discord</span>
            <ArrowRight className="w-5 h-5 text-blue-200" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-300 hover:text-white font-semibold text-base border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Testar modo convidado</span>
          </button>
        </div>

        {/* Platform Highlights Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/60">
          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="flex items-center justify-center text-blue-400 mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <span className="block text-2xl font-extrabold text-white">120 MB</span>
            <span className="text-xs text-slate-400">Limite por arquivo</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="flex items-center justify-center text-cyan-400 mb-2">
              <Gauge className="w-5 h-5" />
            </div>
            <span className="block text-2xl font-extrabold text-white">&lt; 50 ms</span>
            <span className="text-xs text-slate-400">Latência global CDN</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="flex items-center justify-center text-indigo-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="block text-2xl font-extrabold text-white">99.99%</span>
            <span className="text-xs text-slate-400">Disponibilidade</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="flex items-center justify-center text-emerald-400 mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <span className="block text-2xl font-extrabold text-white">Links Diretos</span>
            <span className="text-xs text-slate-400">Sem páginas intermediárias</span>
          </div>
        </div>

        {/* Visual How It Works Section */}
        <div className="mt-24 text-left">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Como o 7Upload funciona?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Projetado para ser minimalista e eficiente. Três passos simples para gerenciar todos os seus envios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 relative">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold text-lg mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                Autentique-se com Discord
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Login instantâneo sem necessidade de guardar senhas adicionais. Seu perfil fica associado com total segurança.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 relative">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-lg mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                Arraste e Faça Upload
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Envie imagens, vídeos e arquivos com suporte a streaming contínuo e feedback visual instantâneo em tempo real.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-lg mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-400" />
                Copie e Compartilhe
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Obtenha links diretos formatados em um clique, prontos para uso em fóruns, Discord, códigos ou redes sociais.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
