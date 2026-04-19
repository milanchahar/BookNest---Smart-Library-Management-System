import pool from '../config/db.js';

class LoanRepository {
  async create(loanData) {
    const { user_id, copy_id, issue_date, due_date } = loanData;
    const { rows } = await pool.query(
      `
        INSERT INTO loans (user_id, copy_id, issue_date, due_date)
        VALUES ($1, $2, $3, $4)
        RETURNING loan_id
      `,
      [user_id, copy_id, issue_date, due_date]
    );
    return rows[0].loan_id;
  }

  async findById(id) {
    const query = `
      SELECT l.*, b.is_rare, u.role
      FROM loans l
      JOIN book_copies bc ON l.copy_id = bc.copy_id
      JOIN books b ON bc.book_id = b.book_id
      JOIN users u ON l.user_id = u.user_id
      WHERE l.loan_id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async findActiveByUser(userId) {
    const query = `
      SELECT l.*, b.title, b.author
      FROM loans l
      JOIN book_copies bc ON l.copy_id = bc.copy_id
      JOIN books b ON bc.book_id = b.book_id
      WHERE l.user_id = $1 AND l.return_date IS NULL
      ORDER BY l.issue_date DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  async updateReturnDate(loanId, returnDate) {
    await pool.query('UPDATE loans SET return_date = $1 WHERE loan_id = $2', [returnDate, loanId]);
  }

  async countActiveByUser(userId) {
    const { rows } = await pool.query(
      'SELECT COUNT(*) AS count FROM loans WHERE user_id = $1 AND return_date IS NULL',
      [userId]
    );
    return Number(rows[0].count);
  }

  async getAllActive() {
    const query = `
      SELECT l.*, u.name as user_name, b.title as book_title
      FROM loans l
      JOIN users u ON l.user_id = u.user_id
      JOIN book_copies bc ON l.copy_id = bc.copy_id
      JOIN books b ON bc.book_id = b.book_id
      WHERE l.return_date IS NULL
      ORDER BY l.issue_date DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

export default new LoanRepository();
