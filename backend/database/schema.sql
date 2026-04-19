-- BookNest — MySQL schema + seed data

CREATE DATABASE IF NOT EXISTS booknest;
USE booknest;

DROP TABLE IF EXISTS FINES;
DROP TABLE IF EXISTS LOANS;
DROP TABLE IF EXISTS BOOK_COPIES;
DROP TABLE IF EXISTS BOOKS;
DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'faculty', 'admin') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BOOKS (
  book_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(20) UNIQUE NOT NULL,
  category VARCHAR(50),
  is_rare BOOLEAN DEFAULT FALSE
);

CREATE TABLE BOOK_COPIES (
  copy_id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT NOT NULL,
  status ENUM('available', 'issued', 'reserved', 'lost') DEFAULT 'available',
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES BOOKS(book_id)
);

CREATE TABLE LOANS (
  loan_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  copy_id INT NOT NULL,
  issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  due_date DATETIME NOT NULL,
  return_date DATETIME DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (copy_id) REFERENCES BOOK_COPIES(copy_id)
);

CREATE TABLE FINES (
  fine_id INT PRIMARY KEY AUTO_INCREMENT,
  loan_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'paid') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (loan_id) REFERENCES LOANS(loan_id)
);

-- Seed: same bcrypt hash for all demo users (password: password123)
INSERT INTO USERS (name, email, password, role) VALUES
  ('Alice Student', 'student@test.com', '$2b$10$LWTj3DDGL5tUZQOZQ.8YSejavnmrXAGj66dO7YB9186MeYJinbVHu', 'student'),
  ('Bob Faculty', 'faculty@test.com', '$2b$10$LWTj3DDGL5tUZQOZQ.8YSejavnmrXAGj66dO7YB9186MeYJinbVHu', 'faculty'),
  ('Carol Admin', 'admin@test.com', '$2b$10$LWTj3DDGL5tUZQOZQ.8YSejavnmrXAGj66dO7YB9186MeYJinbVHu', 'admin');

-- 5 books (1 rare)
INSERT INTO BOOKS (title, author, isbn, category, is_rare) VALUES
  ('The Rare Manuscript', 'E. Vance', '978-0000000001', 'History', TRUE),
  ('Algorithms Unlocked', 'T. Cormen', '978-0000000002', 'Computer Science', FALSE),
  ('Database Systems', 'R. Ramakrishnan', '978-0000000003', 'Computer Science', FALSE),
  ('Modern Physics', 'K. Krane', '978-0000000004', 'Science', FALSE),
  ('Pride and Prejudice', 'J. Austen', '978-0000000005', 'Literature', FALSE);

-- 3 copies per book (15 copies), all available
INSERT INTO BOOK_COPIES (book_id, status) VALUES
  (1, 'available'), (1, 'available'), (1, 'available'),
  (2, 'available'), (2, 'available'), (2, 'available'),
  (3, 'available'), (3, 'available'), (3, 'available'),
  (4, 'available'), (4, 'available'), (4, 'available'),
  (5, 'available'), (5, 'available'), (5, 'available');
