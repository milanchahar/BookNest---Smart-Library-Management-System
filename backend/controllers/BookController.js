import BookService from '../services/BookService.js';

class BookController {
  async getAllBooks(req, res) {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getBookById(req, res) {
    try {
      const book = await BookService.getBookById(req.params.id);
      res.status(200).json(book);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async searchBooks(req, res) {
    try {
      const books = await BookService.searchBooks(req.query.q);
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async addBook(req, res) {
    try {
      // Check if user is admin (this would normally be handled by roleMiddleware)
      const result = await BookService.addBook(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new BookController();
