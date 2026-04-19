import express from 'express';
import FineController from '../controllers/FineController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my', authMiddleware, FineController.getMyFines);
router.post('/pay/:fineId', authMiddleware, FineController.payFine);

export default router;
