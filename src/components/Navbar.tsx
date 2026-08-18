"use client";

import { ShieldCheck, Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full glass-tech border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white text-black font-extrabold shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300">
            <span className="text-base tracking-tighter font-mono">7</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white border border-black animate-ping" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-widest text-white uppercase font-mono group-hover:text-zinc-300 transition-colors">
              7UPLOAD
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-white/10 text-zinc-300 border border-white/20 rounded uppercase">
              v2.0
            </span>
          </div>
        </div>

        {/* Minimal Badges */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono">
            <Cpu className="w-3 h-3 text-white" />
            120 MB
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-black text-[11px] font-mono font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <ShieldCheck className="w-3 h-3 text-black" />
            DIRECT LINKS
          </span>
        </div>
      </div>
    </header>
  );
}
