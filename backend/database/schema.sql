-- BookNest - PostgreSQL schema + seed data

DROP TABLE IF EXISTS fines;
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS book_copies;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX users_email_unique_ci ON users (LOWER(email));

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(20) NOT NULL UNIQUE,
  category VARCHAR(50),
  is_rare BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE book_copies (
  copy_id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'issued', 'reserved', 'lost')),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
  loan_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  copy_id INTEGER NOT NULL REFERENCES book_copies(copy_id) ON DELETE CASCADE,
  issue_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP DEFAULT NULL
);

CREATE TABLE fines (
  fine_id SERIAL PRIMARY KEY,
  loan_id INTEGER NOT NULL REFERENCES loans(loan_id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: same bcrypt hash for all demo users (password: password123)
INSERT INTO users (name, email, password, role) VALUES
  ('Alice Student', 'student@test.com', '$2b$10$LWTj3DDGL5tUZQOZQ.8YSejavnmrXAGj66dO7YB9186MeYJinbVHu', 'student'),
  ('Bob Faculty', 'faculty@test.com', '$2b$10$LWTj3DDGL5tUZQOZQ.8YSejavnmrXAGj66dO7YB9186MeYJinbVHu', 'faculty'),
  ('Carol Admin', 'admin@test.com', '$2b$10$LWTj3DDGL5tUZQOZQ.8YSejavnmrXAGj66dO7YB9186MeYJinbVHu', 'admin');

-- 5 books (1 rare)
INSERT INTO books (title, author, isbn, category, is_rare) VALUES
  ('The Rare Manuscript', 'E. Vance', '978-0000000001', 'History', TRUE),
  ('Algorithms Unlocked', 'T. Cormen', '978-0000000002', 'Computer Science', FALSE),
  ('Database Systems', 'R. Ramakrishnan', '978-0000000003', 'Computer Science', FALSE),
  ('Modern Physics', 'K. Krane', '978-0000000004', 'Science', FALSE),
  ('Pride and Prejudice', 'J. Austen', '978-0000000005', 'Literature', FALSE);

-- 3 copies per book (15 copies), all available
INSERT INTO book_copies (book_id, status) VALUES
  (1, 'available'), (1, 'available'), (1, 'available'),
  (2, 'available'), (2, 'available'), (2, 'available'),
  (3, 'available'), (3, 'available'), (3, 'available'),
  (4, 'available'), (4, 'available'), (4, 'available'),
  (5, 'available'), (5, 'available'), (5, 'available');
