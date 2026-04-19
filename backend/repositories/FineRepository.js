import pool from '../config/db.js';

class FineRepository {
  async create(fineData) {
    const { loan_id, amount, status } = fineData;
    const { rows } = await pool.query(
      `
        INSERT INTO fines (loan_id, amount, status)
        VALUES ($1, $2, $3)
        RETURNING fine_id
      `,
      [loan_id, amount, status || 'pending']
    );
    return rows[0].fine_id;
  }

  async findByUserId(userId) {
    const query = `
      SELECT f.*, b.title
      FROM fines f
      JOIN loans l ON f.loan_id = l.loan_id
      JOIN book_copies bc ON l.copy_id = bc.copy_id
      JOIN books b ON bc.book_id = b.book_id
      WHERE l.user_id = $1
      ORDER BY f.created_at DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  async updateStatus(fineId, status) {
    await pool.query('UPDATE fines SET status = $1 WHERE fine_id = $2', [status, fineId]);
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM fines WHERE fine_id = $1', [id]);
    return rows[0];
  }
}

export default new FineRepository();
