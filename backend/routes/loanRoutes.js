import express from 'express';
import LoanController from '../controllers/LoanController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/issue', authMiddleware, LoanController.issueLoan);
router.post('/return/:loanId', authMiddleware, LoanController.returnLoan);
router.get('/my', authMiddleware, LoanController.getMyLoans);
router.get('/all', authMiddleware, roleMiddleware(['admin']), LoanController.getAllActiveLoans);

export default router;
