"use client";

import { ToastMessage } from "@/types";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none font-mono">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto p-3.5 rounded-xl bg-black border border-white/40 text-white shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-white text-black flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-200">
              {t.text}
            </span>
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="p-1 rounded hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
