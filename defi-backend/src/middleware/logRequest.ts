import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";
import { createCorrelationId } from "../utils/correlation";

export async function logRequest(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const correlationId = createCorrelationId();
  (req as any).correlationId = correlationId;

  // CallLog'u önceden kaydet (async blok yerine direkt burada yap)
  try {
    await prisma.callLog.create({
      data: {
        correlationId,
        ip: req.ip || "unknown",
        url: req.originalUrl,
        method: req.method,
        requestBody: req.body || {},
        responseBody: {}, // response bilinmiyor henüz
        durationMs: 0,     // sonra güncelleyebiliriz istersen
      },
    });
  } catch (err) {
    console.error("❌ Failed to create CallLog:", err);
  }

  // Response'u yakalamaya devam (isteğe bağlı log için)
  const chunks: Buffer[] = [];
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  res.write = function (chunk: any, ...args: any[]): boolean {
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    return originalWrite(chunk, ...args);
  };

  res.end = function (chunk: any, ...args: any[]): Response {
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    const body = Buffer.concat(chunks).toString("utf8");

    // Response'ı güncelle (gerekirse)
    prisma.callLog.update({
      where: { correlationId },
      data: {
        responseBody: safeJson(body),
        durationMs: Date.now() - start,
      },
    }).catch((err) => {
      console.error("❌ Failed to update CallLog response:", err);
    });

    return originalEnd(chunk, ...args);
  };

  next();
}

function safeJson(data: string): any {
  try {
    return JSON.parse(data);
  } catch {
    return { raw: data };
  }
}
