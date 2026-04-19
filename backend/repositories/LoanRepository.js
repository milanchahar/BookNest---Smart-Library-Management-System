import pool from '../config/db.js';

class LoanRepository {
  async create(loanData) {
    const { user_id, copy_id, issue_date, due_date } = loanData;
    const [result] = await pool.query(
      'INSERT INTO LOANS (user_id, copy_id, issue_date, due_date) VALUES (?, ?, ?, ?)',
      [user_id, copy_id, issue_date, due_date]
    );
    return result.insertId;
  }

  async findById(id) {
    const query = `
      SELECT l.*, b.is_rare, u.role
      FROM LOANS l
      JOIN BOOK_COPIES bc ON l.copy_id = bc.copy_id
      JOIN BOOKS b ON bc.book_id = b.book_id
      JOIN USERS u ON l.user_id = u.user_id
      WHERE l.loan_id = ?
    `;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  async findActiveByUser(userId) {
    const query = `
      SELECT l.*, b.title, b.author
      FROM LOANS l
      JOIN BOOK_COPIES bc ON l.copy_id = bc.copy_id
      JOIN BOOKS b ON bc.book_id = b.book_id
      WHERE l.user_id = ? AND l.return_date IS NULL
    `;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  }

  async updateReturnDate(loanId, returnDate) {
    await pool.query('UPDATE LOANS SET return_date = ? WHERE loan_id = ?', [returnDate, loanId]);
  }

  async countActiveByUser(userId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM LOANS WHERE user_id = ? AND return_date IS NULL',
      [userId]
    );
    return rows[0].count;
  }

  async getAllActive() {
    const query = `
      SELECT l.*, u.name as user_name, b.title as book_title
      FROM LOANS l
      JOIN USERS u ON l.user_id = u.user_id
      JOIN BOOK_COPIES bc ON l.copy_id = bc.copy_id
      JOIN BOOKS b ON bc.book_id = b.book_id
      WHERE l.return_date IS NULL
    `;
    const [rows] = await pool.query(query);
    return rows;
  }
}

export default new LoanRepository();
