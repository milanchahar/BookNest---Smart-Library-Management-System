import pool from '../config/db.js';

class UserRepository {
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM USERS WHERE user_id = ?', [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM USERS WHERE email = ?', [email]);
    return rows[0];
  }

  async create(user) {
    const { name, email, password, role } = user;
    const [result] = await pool.query(
      'INSERT INTO USERS (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result.insertId;
  }

  async getAll() {
    const [rows] = await pool.query('SELECT user_id, name, email, role, created_at FROM USERS');
    return rows;
  }
}

export default new UserRepository();
