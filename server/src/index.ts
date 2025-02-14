import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { UserModel } from './models/user.model';
import authRoutes from './routes/auth.routes';
import { testDatabaseConnection } from './config/db.test';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Uygulama başlangıç fonksiyonu
async function startServer() {
  try {
    // Veritabanı bağlantısını test et
    const isDbConnected = await testDatabaseConnection();
    if (!isDbConnected) {
      throw new Error('Veritabanı bağlantısı başarısız');
    }

    // Veritabanı tablolarını oluştur
    await UserModel.createTable();
    console.log('📚 Veritabanı tabloları hazır');

    // Sunucuyu başlat
    app.listen(port, () => {
      console.log(`
🚀 Sunucu http://localhost:${port} adresinde çalışıyor
📌 Test için:
   - GET  http://localhost:${port}/api/auth/test
   - POST http://localhost:${port}/api/auth/register
   - POST http://localhost:${port}/api/auth/login
      `);
    });
  } catch (error) {
    console.error('❌ Sunucu başlatma hatası:', error);
    process.exit(1);
  }
}

startServer();