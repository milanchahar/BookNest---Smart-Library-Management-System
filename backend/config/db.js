import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configure MySQL Connection Pool
 * Supports both local environment variables and Railway's auto-generated names.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASS || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'booknest',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
