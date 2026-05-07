import { Router } from 'express';
import { uploadSop, getSops, getSopById, deleteSop, regenerateSop } from '../controllers/sopController';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.use(requireAuth);

router.post('/upload', upload.single('video'), uploadSop);
router.get('/', getSops);
router.get('/:id', getSopById);
router.delete('/:id', deleteSop);
router.post('/:id/regenerate', regenerateSop);

export default router;
