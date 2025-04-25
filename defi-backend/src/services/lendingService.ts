import { parseEther, formatEther } from "ethers";
import { getContract } from "../contracts";
import { prisma } from "../db/prisma";

export class LendingService {
  static async deposit(amount: string, version: "v1" | "v2" | "v3", correlationId: string) {
    const { contract, signer } = getContract(version);
    const tx = await contract.deposit({ value: parseEther(amount) });
    await tx.wait();

    await prisma.transactionLog.create({
      data: {
        correlationId,
        walletAddress: await signer.getAddress(),
        txHash: tx.hash,
        amount: amount,
        type: "deposit",
        version,
        isSuccess: true,
      },
    });

    return { success: true, hash: tx.hash };
  }

  static async borrow(amount: string, version: "v1" | "v2" | "v3", correlationId: string) {
    const { contract, signer } = getContract(version);
    const tx = await contract.borrow(parseEther(amount));
    await tx.wait();

    await prisma.transactionLog.create({
      data: {
        correlationId,
        walletAddress: await signer.getAddress(),
        txHash: tx.hash,
        amount,
        type: "borrow",
        version,
        isSuccess: true,
      },
    });

    return { success: true, hash: tx.hash };
  }

  static async repay(amount: string, version: "v1" | "v2" | "v3", correlationId: string) {
    const { contract, signer } = getContract(version);
    const tx = await contract.repay({ value: parseEther(amount) });
    await tx.wait();

    await prisma.transactionLog.create({
      data: {
        correlationId,
        walletAddress: await signer.getAddress(),
        txHash: tx.hash,
        amount,
        type: "repay",
        version,
        isSuccess: true,
      },
    });

    return { success: true, hash: tx.hash };
  }

  static async getDebt(version: "v1" | "v2" | "v3", correlationId: string) {
    const { contract, signer } = getContract(version);
    const debt = await contract.getDebt();

   await prisma.transactionLog.create({
  data: {
    correlationId,
    walletAddress: await signer.getAddress(),
    txHash: null, // ✅ zincire yazılmadığı için null
    amount: formatEther(debt),
    type: "getDebt",
    version,
    isSuccess: true,
  },
});

    return { debt: formatEther(debt) };
  }
}
