import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7Upload — Hospedagem de Arquivos Minimalista & Rápida",
  description: "Plataforma SaaS moderna de hospedagem de imagens, vídeos e arquivos com links diretos, autenticação via Discord e upload ultrarrápido de até 120MB.",
  keywords: ["upload", "hospedagem de imagens", "discord upload", "links diretos", "7upload", "saas upload"],
  authors: [{ name: "7Upload Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#030712] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
