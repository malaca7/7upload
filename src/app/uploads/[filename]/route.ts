import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getUploadDir } from "@/lib/upload";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const safeFilename = path.basename(filename);
    const filePath = path.join(getUploadDir(), safeFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
    }

    const fileStream = fs.createReadStream(filePath);
    const stat = fs.statSync(filePath);

    // Mime-type map
    const ext = path.extname(safeFilename).toLowerCase();
    let contentType = "application/octet-stream";
    if ([".jpg", ".jpeg"].includes(ext)) contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".mp4") contentType = "video/mp4";
    else if (ext === ".webm") contentType = "video/webm";
    else if (ext === ".mp3") contentType = "audio/mpeg";
    else if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".json") contentType = "application/json";
    else if (ext === ".txt") contentType = "text/plain";

    return new NextResponse(fileStream as any, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Erro ao ler arquivo." }, { status: 500 });
  }
}
