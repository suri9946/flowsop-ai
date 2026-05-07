import { Router } from 'express';
import { exportPdf } from '../controllers/exportController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

router.get('/:id/pdf', exportPdf);

export default router;
