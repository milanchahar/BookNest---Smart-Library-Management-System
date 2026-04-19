import pool from '../config/db.js';

class UserRepository {
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    return rows[0];
  }

  async create(user) {
    const { name, email, password, role } = user;
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id',
      [name, email, password, role]
    );
    return rows[0].user_id;
  }

  async getAll() {
    const { rows } = await pool.query(
      'SELECT user_id, name, email, role, created_at FROM users ORDER BY user_id'
    );
    return rows;
  }
}

export default new UserRepository();
