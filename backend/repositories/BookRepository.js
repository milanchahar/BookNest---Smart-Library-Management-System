import pool from '../config/db.js';

class BookRepository {
  async findAll() {
    const query = `
      SELECT b.*, 
      (
        SELECT COUNT(*)
        FROM book_copies bc
        WHERE bc.book_id = b.book_id AND bc.status = 'available'
      ) AS available_copies
      FROM books b
      ORDER BY b.book_id
    `;
    const { rows } = await pool.query(query);
    return rows.map((row) => ({
      ...row,
      available_copies: Number(row.available_copies),
    }));
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE book_id = $1', [id]);
    return rows[0];
  }

  async create(book) {
    const { title, author, isbn, category, is_rare } = book;
    const { rows } = await pool.query(
      `
        INSERT INTO books (title, author, isbn, category, is_rare)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING book_id
      `,
      [title, author, isbn, category, is_rare]
    );
    return rows[0].book_id;
  }

  async search(searchTerm) {
    const query = `
      SELECT b.*, 
      (
        SELECT COUNT(*)
        FROM book_copies bc
        WHERE bc.book_id = b.book_id AND bc.status = 'available'
      ) AS available_copies
      FROM books b
      WHERE b.title ILIKE $1 OR b.author ILIKE $2 OR b.category ILIKE $3
      ORDER BY b.book_id
    `;
    const term = `%${searchTerm}%`;
    const { rows } = await pool.query(query, [term, term, term]);
    return rows.map((row) => ({
      ...row,
      available_copies: Number(row.available_copies),
    }));
  }
}

export default new BookRepository();
