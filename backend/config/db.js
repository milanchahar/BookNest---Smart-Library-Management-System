import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const shouldUseSsl =
  isProduction ||
  process.env.DB_SSL === 'true' ||
  process.env.PGSSLMODE === 'require';

const baseConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
    }
  : {
      host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
      port: Number(process.env.DB_PORT || process.env.PGPORT || 5432),
      user: process.env.DB_USER || process.env.PGUSER || 'postgres',
      password: process.env.DB_PASS || process.env.PGPASSWORD || '',
      database: process.env.DB_NAME || process.env.PGDATABASE || 'booknest',
    };

const pool = new Pool({
  ...baseConfig,
  max: Number(process.env.DB_POOL_SIZE || 10),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000),
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error);
});

export default pool;
