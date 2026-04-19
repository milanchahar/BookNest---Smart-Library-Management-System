import express from 'express';
import BookController from '../controllers/BookController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, BookController.getAllBooks);
router.get('/search', authMiddleware, BookController.searchBooks);
router.get('/:id', authMiddleware, BookController.getBookById);
router.post('/', authMiddleware, roleMiddleware(['admin']), BookController.addBook);

export default router;
