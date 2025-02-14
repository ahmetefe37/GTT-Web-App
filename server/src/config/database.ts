import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Geliştirme ortamında SSL sertifika doğrulamasını devre dışı bırakır
  }
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
  connect: () => pool.connect()
};

// Bağlantı havuzu hata yönetimi
pool.on('error', (err) => {
  console.error('🔴 Beklenmeyen veritabanı hatası:', err);
});