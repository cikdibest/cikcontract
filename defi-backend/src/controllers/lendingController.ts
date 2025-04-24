import { Request, Response } from "express";
import { LendingService } from "../services/lendingService";

type Version = "v1" | "v2" | "v3";

// Versiyon parametresini URL'den çıkar
function extractVersion(req: Request): Version {
  const v = req.params.version as Version;
  if (!["v1", "v2", "v3"].includes(v)) {
    throw new Error("Unsupported version");
  }
  return v;
}

export const deposit = async (req: Request, res: Response) => {
  const version = extractVersion(req);
  const { amount } = req.body;
  const correlationId = (req as any).correlationId;
  const result = await LendingService.deposit(amount, version, correlationId);
  res.json(result);
};

export const borrow = async (req: Request, res: Response) => {
  const version = extractVersion(req);
  const { amount } = req.body;
  const correlationId = (req as any).correlationId;
  const result = await LendingService.borrow(amount, version, correlationId);
  res.json(result);
};

export const repay = async (req: Request, res: Response) => {
  const version = extractVersion(req);
  const { amount } = req.body;
  const correlationId = (req as any).correlationId;
  const result = await LendingService.repay(amount, version, correlationId);
  res.json(result);
};

export const getDebt = async (req: Request, res: Response) => {
  const version = extractVersion(req);
  const correlationId = (req as any).correlationId;
  const result = await LendingService.getDebt(version, correlationId);
  res.json(result);
};
