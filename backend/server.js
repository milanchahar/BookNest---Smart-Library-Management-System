import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import fineRoutes from './routes/fineRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow Vercel frontend and local dev
const allowedOrigins = [
  process.env.FRONTEND_URL,           // e.g. https://booknest-sepia.vercel.app
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/fines', fineRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: "BookNest API is running" });
});

// Database connection check on startup
pool.query('SELECT 1')
  .then(() => {
    console.log('Successfully connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
