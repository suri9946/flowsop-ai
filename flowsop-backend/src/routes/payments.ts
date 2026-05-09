import { Router } from 'express';
import { verifyPayment } from '../controllers/paymentController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/verify', requireAuth, verifyPayment);

export default router;
