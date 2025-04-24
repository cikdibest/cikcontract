import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

export async function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const correlationId = (req as any).correlationId;

  await prisma.errorLog.create({
    data: {
      correlationId,
      errorMessage: err.message || "Unknown error",
      stackTrace: err.stack || null,
    },
  });

  console.error("💥 ERROR", err);
  res.status(500).json({ error: err.message || "Internal Server Error", correlationId });
}
