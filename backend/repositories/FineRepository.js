import pool from '../config/db.js';

class FineRepository {
  async create(fineData) {
    const { loan_id, amount, status } = fineData;
    const [result] = await pool.query(
      'INSERT INTO FINES (loan_id, amount, status) VALUES (?, ?, ?)',
      [loan_id, amount, status || 'pending']
    );
    return result.insertId;
  }

  async findByUserId(userId) {
    const query = `
      SELECT f.*, b.title
      FROM FINES f
      JOIN LOANS l ON f.loan_id = l.loan_id
      JOIN BOOK_COPIES bc ON l.copy_id = bc.copy_id
      JOIN BOOKS b ON bc.book_id = b.book_id
      WHERE l.user_id = ?
    `;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  }

  async updateStatus(fineId, status) {
    await pool.query('UPDATE FINES SET status = ? WHERE fine_id = ?', [status, fineId]);
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM FINES WHERE fine_id = ?', [id]);
    return rows[0];
  }
}

export default new FineRepository();
