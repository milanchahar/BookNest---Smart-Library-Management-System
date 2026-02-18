# Project Name: BookNest - Smart Library Management System

## Project Overview
BookNest is a full-stack library management solution designed to handle complex borrowing rules, dynamic fine calculations, and role-based access control. Unlike standard library systems, BookNest focuses on the **backend logic** of enforcing different rules for different user types (Students vs. Faculty) using strict **Object-Oriented Programming (OOP)** principles.

## Core Features
### 1. Advanced Fine Calculation Engine (Backend Focus)
- **Dynamic Rates:** Implements the **Strategy Pattern** to calculate fines based on user role and item type.
- **Rules:**
    - Students: 10 INR/day (Strict limit).
    - Faculty: 2 INR/day (Lenient limit).
    - Rare Books: 50 INR/day (High priority).

### 2. Role-Based Membership System
- **Inheritance Model:** A base `Member` class extended by `Student` and `Faculty`.
- **Borrowing Limits:**
    - Students: Max 3 books for 14 days.
    - Faculty: Max 10 books for 90 days.

### 3. Inventory & Reservation Management
- **Concurrency Handling:** Prevents two users from reserving the last copy of a book simultaneously.
- **Status Tracking:** Real-time updates for Available, Issued, Reserved, and Lost items.

## Tech Stack
- **Backend:** Node.js (TypeScript/JavaScript), Express.js
- **Database:** MySQL (Relational Schema with Foreign Keys)
- **Frontend:** React.js (Admin Dashboard & Student Portal)
- **Architecture:** Layered MVC (Model-View-Controller) with Repository Pattern.