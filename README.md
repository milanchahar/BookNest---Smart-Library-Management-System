# BookNest — Smart Library Management System 📚

**Live Demo**: [[LIVE_LINK_HERE]]

BookNest is a premium, full-stack library management solution built with modern web technologies. It features an advanced fine calculation engine, role-based membership borrowing rules, and a sleek, glassmorphic user interface.

## 🚀 Deployment (Railway)
This project is configured for easy deployment on **Railway.app**. Follow the [Deployment Checklist](#railway-deployment-checklist) below for a step-by-step guide.

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

- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React.js (Vite), Axios, React Router
- **Database**: PostgreSQL (hosted on Railway)
- **Deployment**: Railway.app (Nixpacks)

## 📸 Demo Accounts
- **Admin**: `admin@test.com` / `password123`
- **Faculty**: `faculty@test.com` / `password123`
- **Student**: `student@test.com` / `password123`

## ⚙️ Local Setup Instructions

### 1. Database Setup
1. Execute the schema found in `backend/database/schema.sql` on your local PostgreSQL.

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` from `.env.example` and fill in DB credentials.
4. `npm start`

### 3. Frontend Setup
1. `cd frontend`
2. `npm install`
3. Create `.env` from `.env.example`.
4. `npm run dev`

## 🌍 Railway Deployment Checklist

1. Go to **railway.app** → Login with GitHub.
2. **New Project** → **Deploy PostgreSQL**.
3. Click PostgreSQL service → **Variables** tab → copy `DATABASE_URL` (or the individual DB variables).
4. Click PostgreSQL → **Data** tab → paste `schema.sql` → **Run**.
5. **New service** → **GitHub Repo** → select BookNest repo.
6. Settings → **Root Directory** → type: `backend`.
7. Variables → add `DATABASE_URL` (from the PostgreSQL service), `JWT_SECRET`, `PORT=5000`, `FRONTEND_URL`.
8. Deploy → wait for logs to show "Server running".
9. Settings → **Domains** → **Generate Domain** → copy backend URL.
10. **New service** → **GitHub Repo** → select BookNest repo again.
11. Settings → **Root Directory** → type: `frontend`.
12. Variables → add `VITE_API_URL = [your backend URL]/api`.
13. Deploy → wait for build to complete.
14. Settings → **Domains** → **Generate Domain** → copy frontend URL (**THIS IS YOUR LIVE LINK**).
15. Add live link to this README and GitHub About section.
16. `git add . && git commit -m "docs: add live link" && git push`.
17. Submit Google Form.

---
*Developed for Advanced Software Engineering Course.*
