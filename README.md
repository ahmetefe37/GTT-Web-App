# Greater Turk Defense Technologies (GTDT)

Modern savunma teknolojileri alanında yenilikçi çözümler sunan şirket web uygulaması.

## 🚀 Teknolojiler

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- React Toastify
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- TypeScript
- JWT Authentication
- Bcrypt

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- PostgreSQL (v14 veya üzeri)
- npm veya yarn

### Backend Kurulumu
```bash
cd server
npm install
# .env dosyasını oluşturun ve gerekli değişkenleri ayarlayın
npm run dev
```

### Frontend Kurulumu
```bash
cd client
npm install
npm run dev
```

## 🔐 Ortam Değişkenleri

### Backend (.env)
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/gtdt
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## 📦 Özellikler

- 🔐 JWT tabanlı kimlik doğrulama
- 👤 Kullanıcı profil yönetimi
- 🛡️ Rol tabanlı yetkilendirme
- 📱 Responsive tasarım
- 🌐 Modern kullanıcı arayüzü
- ⚡ Hızlı ve optimize edilmiş performans
- 🔒 Güvenli şifre yönetimi
- 📨 Modern bildirim sistemi

## 📝 API Endpoint'leri

### Kimlik Doğrulama
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `PUT /api/auth/profile` - Profil güncelleme
- `PUT /api/auth/password` - Şifre güncelleme

## 👥 Katkıda Bulunma
1. Bu depoyu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans
Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.