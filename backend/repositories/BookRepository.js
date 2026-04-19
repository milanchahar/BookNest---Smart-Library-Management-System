import pool from '../config/db.js';

class BookRepository {
  async findAll() {
    const query = `
      SELECT b.*, 
      (SELECT COUNT(*) FROM BOOK_COPIES bc WHERE bc.book_id = b.book_id AND bc.status = 'available') as available_copies
      FROM BOOKS b
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM BOOKS WHERE book_id = ?', [id]);
    return rows[0];
  }

  async create(book) {
    const { title, author, isbn, category, is_rare } = book;
    const [result] = await pool.query(
      'INSERT INTO BOOKS (title, author, isbn, category, is_rare) VALUES (?, ?, ?, ?, ?)',
      [title, author, isbn, category, is_rare]
    );
    return result.insertId;
  }

  async search(searchTerm) {
    const query = `
      SELECT b.*, 
      (SELECT COUNT(*) FROM BOOK_COPIES bc WHERE bc.book_id = b.book_id AND bc.status = 'available') as available_copies
      FROM BOOKS b
      WHERE b.title LIKE ? OR b.author LIKE ? OR b.category LIKE ?
    `;
    const term = `%${searchTerm}%`;
    const [rows] = await pool.query(query, [term, term, term]);
    return rows;
  }
}

export default new BookRepository();
