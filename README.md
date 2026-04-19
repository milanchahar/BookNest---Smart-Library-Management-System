# BookNest — Smart Library Management System 📚

BookNest is a premium, full-stack library management solution built with modern web technologies. It features an advanced fine calculation engine, role-based membership borrowing rules, and a sleek, glassmorphic user interface.

## ✨ Features

- **Dynamic Fine Engine**: Strategy Pattern implementation for calculation of fines.
  - Students: ₹10/day
  - Faculty: ₹2/day
  - Rare Books: ₹50/day (overrides role fine)
- **Role-Based Membership**: OOP-based borrowing limits.
  - **Students**: Max 3 books, 14-day loan period.
  - **Faculty**: Max 10 books, 90-day loan period.
- **Inventory Management**: Real-time status tracking for book availability.
- **Secure Authentication**: JWT-based auth with Role-Based Access Control (RBAC).

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: React.js (Vite), Vanilla CSS (Custom Design System)
- **Patterns**: MVC Architecture, Repository Pattern, Strategy Pattern, OOP Inheritance.

## 🚀 Setup Instructions

### 1. Database Setup
1. Open your MySQL client.
2. Execute the schema found in `backend/database/schema.sql`.
   - This will create the `booknest` database, tables, and seed it with demo users and books.

### 2. Backend Setup
1. Navigate to the `backend/` directory.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example` and fill in your MySQL credentials and a JWT secret.
4. Start the server: `npm start`.

### 3. Frontend Setup
1. Navigate to the `frontend/` directory.
2. Run `npm install`.
3. Start the development server: `npm run dev`.

## 📸 Demo Accounts
- **Admin**: `admin@test.com` / `password123`
- **Faculty**: `faculty@test.com` / `password123`
- **Student**: `student@test.com` / `password123`

## 🔗 Live Demo
[ADD YOUR HOSTED LINK HERE]

---
*Developed as a University Project for Advanced Software Engineering.*
