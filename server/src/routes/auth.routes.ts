import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import express from 'express';

const router = Router();

// Request body doğrulama middleware'i
const validateAuthRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'E-posta ve şifre zorunludur' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Geçerli bir e-posta adresi giriniz' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır' });
  }

  next();
};

router.post('/register', validateAuthRequest, authController.register);
router.post('/login', validateAuthRequest, authController.login);

// Korumalı rotalar
router.put('/profile', authMiddleware, authController.updateProfile);
router.put('/password', authMiddleware, authController.updatePassword);

// Test endpoint'i
router.get('/test', (req, res) => {
  res.json({ message: 'Auth rotaları çalışıyor' });
});

export default router;