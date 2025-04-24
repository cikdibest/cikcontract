import { Router } from "express";
import { deposit, borrow, repay, getDebt } from "../controllers/lendingController"; // ✅ named import

const router = Router();

// ✅ direkt fonksiyonları kullan
router.post("/:version/lending/deposit", deposit);
router.post("/:version/lending/borrow", borrow);
router.post("/:version/lending/repay", repay);
router.get("/:version/lending/debt", getDebt);

export default router;
