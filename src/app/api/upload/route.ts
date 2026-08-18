import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import busboy from "busboy";
import { generateRandomFilename, getSiteUrl, getUploadDir } from "@/lib/upload";
import { getMaxSizeInBytes, isValidMimeType, isValidExtension } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, error: "Content-Type deve ser multipart/form-data" },
        { status: 400 }
      );
    }

    const uploadDir = getUploadDir();
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (!req.body) {
      return NextResponse.json(
        { success: false, error: "Corpo da requisição vazio" },
        { status: 400 }
      );
    }

    const nodeStream = Readable.fromWeb(req.body as any);

    return new Promise<NextResponse>((resolve) => {
      const bb = busboy({
        headers: {
          "content-type": contentType,
        },
        limits: {
          fileSize: getMaxSizeInBytes(),
          files: 1, // Only 1 file per request
        },
      });

      let fileUrl = "";
      let hasError = false;
      let errorMessage = "";
      let fileSaved = false;
      const filePromises: Promise<void>[] = [];

      bb.on("file", (name, fileStream, info) => {
        const { filename, mimeType } = info;
        const ext = path.extname(filename);

        if (!isValidMimeType(mimeType) || !isValidExtension(ext)) {
          hasError = true;
          errorMessage = "Formato de arquivo ou extensão não permitida.";
          fileStream.resume();
          return;
        }

        const randomName = generateRandomFilename(filename);
        const savePath = path.join(uploadDir, randomName);
        fileUrl = `${getSiteUrl()}/uploads/${randomName}`;

        const writeStream = fs.createWriteStream(savePath);

        const writePromise = new Promise<void>((res, rej) => {
          writeStream.on("finish", () => {
            if (!hasError) {
              fileSaved = true;
            }
            res();
          });

          writeStream.on("error", (err) => {
            hasError = true;
            errorMessage = "Erro ao salvar arquivo no sistema de arquivos.";
            console.error("Write stream error:", err);
            res();
          });

          fileStream.on("limit", () => {
            hasError = true;
            errorMessage = `O arquivo excede o limite de ${process.env.MAX_FILE_SIZE_MB || 120} MB.`;
            writeStream.destroy();
            fs.unlink(savePath, () => {});
            res();
          });
        });

        filePromises.push(writePromise);
        fileStream.pipe(writeStream);
      });

      bb.on("finish", async () => {
        // Wait for all disk writes to complete before evaluating result
        await Promise.all(filePromises);

        if (hasError) {
          return resolve(
            NextResponse.json(
              { success: false, error: errorMessage || "Falha ao processar arquivo." },
              { status: 400 }
            )
          );
        }

        if (!fileSaved) {
          return resolve(
            NextResponse.json(
              { success: false, error: "Nenhum arquivo válido foi recebido no envio." },
              { status: 400 }
            )
          );
        }

        return resolve(
          NextResponse.json({
            success: true,
            url: fileUrl,
          })
        );
      });

      bb.on("error", (err) => {
        console.error("Busboy error:", err);
        if (!hasError) {
          return resolve(
            NextResponse.json(
              { success: false, error: "Erro interno ao processar o upload." },
              { status: 500 }
            )
          );
        }
      });

      nodeStream.pipe(bb);
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
