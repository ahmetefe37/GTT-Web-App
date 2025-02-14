import { db } from './database';

export async function testDatabaseConnection() {
  try {
    // Veritabanı bağlantısını test et
    const result = await db.query('SELECT NOW()');
    console.log('🟢 Veritabanı bağlantısı başarılı');
    console.log('🕒 Sunucu zamanı:', result.rows[0].now);
    
    // Kullanıcılar tablosunu kontrol et
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      const userCount = await db.query('SELECT COUNT(*) FROM users');
      console.log('👥 Toplam kullanıcı sayısı:', userCount.rows[0].count);
    } else {
      console.log('⚠️ Users tablosu henüz oluşturulmamış');
    }

    return true;
  } catch (error) {
    console.error('🔴 Veritabanı bağlantı hatası:', error);
    return false;
  }
}