import BookRepository from '../repositories/BookRepository.js';
import BookCopyRepository from '../repositories/BookCopyRepository.js';

class BookService {
  async getAllBooks() {
    return await BookRepository.findAll();
  }

  async getBookById(id) {
    const book = await BookRepository.findById(id);
    if (!book) throw new Error('Book not found');
    return book;
  }

  async searchBooks(query) {
    return await BookRepository.search(query);
  }

  async addBook(bookData) {
    const { title, author, isbn, category, is_rare, copiesCount } = bookData;
    
    // 1. Create the book entry
    const bookId = await BookRepository.create({
      title,
      author,
      isbn,
      category,
      is_rare: is_rare || false
    });

    // 2. Add initial copies
    const count = parseInt(copiesCount) || 1;
    await BookCopyRepository.createCopies(bookId, count);

    return { bookId, message: 'Book and copies added successfully' };
  }
}

export default new BookService();
