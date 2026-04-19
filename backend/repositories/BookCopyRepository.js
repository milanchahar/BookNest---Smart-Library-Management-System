import pool from '../config/db.js';

class BookCopyRepository {
  async findAvailableByBookId(bookId) {
    const [rows] = await pool.query(
      "SELECT * FROM BOOK_COPIES WHERE book_id = ? AND status = 'available' LIMIT 1",
      [bookId]
    );
    return rows[0];
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM BOOK_COPIES WHERE copy_id = ?', [id]);
    return rows[0];
  }

  async updateStatus(copyId, status) {
    await pool.query('UPDATE BOOK_COPIES SET status = ? WHERE copy_id = ?', [status, copyId]);
  }

  async createCopies(bookId, count) {
    const values = Array(count).fill([bookId, 'available']);
    await pool.query('INSERT INTO BOOK_COPIES (book_id, status) VALUES ?', [values]);
  }
}

export default new BookCopyRepository();
