// src/routes/lendingRoutes.ts
import { Router } from 'express';
import { deposit, borrow, repay, getDebt } from '../../controllers/lendingController';

const router = Router();

router.post('/deposit', deposit);
router.post('/borrow', borrow);
router.post('/repay', repay);
router.get('/debt', getDebt);

export default router;
