import pool from '../config/db.js';

class BookCopyRepository {
  async findAvailableByBookId(bookId) {
    const { rows } = await pool.query(
      "SELECT * FROM book_copies WHERE book_id = $1 AND status = 'available' ORDER BY copy_id LIMIT 1",
      [bookId]
    );
    return rows[0];
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM book_copies WHERE copy_id = $1', [id]);
    return rows[0];
  }

  async updateStatus(copyId, status) {
    await pool.query('UPDATE book_copies SET status = $1 WHERE copy_id = $2', [status, copyId]);
  }

  async createCopies(bookId, count) {
    if (!count || count < 1) {
      return;
    }

    const params = [];
    const placeholders = Array.from({ length: count }, (_, index) => {
      const base = index * 2;
      params.push(bookId, 'available');
      return `($${base + 1}, $${base + 2})`;
    }).join(', ');

    await pool.query(
      `INSERT INTO book_copies (book_id, status) VALUES ${placeholders}`,
      params
    );
  }
}

export default new BookCopyRepository();
