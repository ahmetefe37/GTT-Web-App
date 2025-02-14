import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface AuthRequest extends Request {
  user?: any;
}

const generateToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'defaultSecret',
    { expiresIn: '24h' }
  );
};

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, phoneNumber, department } = req.body;

      // E-posta adresi kontrolü
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          message: 'Bu e-posta adresi zaten kullanımda',
          field: 'email'
        });
      }

      // Username kontrolü
      const existingUsername = await UserModel.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          message: 'Bu kullanıcı adı zaten kullanımda',
          field: 'username'
        });
      }

      // Yeni kullanıcı oluşturma
      const user = await UserModel.createUser({
        username,
        email,
        password,
        phone_number: phoneNumber,
        department,
        role: 'user',
        is_admin: false,
        email_verified: false,
        phone_verified: false
      });

      // Kullanıcı verilerinden hassas bilgileri çıkar
      const { password: _, ...userWithoutPassword } = user;

      // Token oluştur
      const token = generateToken(user.id);

      res.status(201).json({
        message: 'Kullanıcı başarıyla oluşturuldu',
        token,
        user: userWithoutPassword
      });
    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      
      // Veritabanı unique constraint hatalarını yakala
      if (error.code === '23505') { // PostgreSQL unique violation error code
        if (error.constraint === 'users_email_key') {
          return res.status(400).json({
            message: 'Bu e-posta adresi zaten kullanımda',
            field: 'email'
          });
        }
        if (error.constraint === 'users_username_key') {
          return res.status(400).json({
            message: 'Bu kullanıcı adı zaten kullanımda',
            field: 'username'
          });
        }
        if (error.constraint === 'users_phone_number_key') {
          return res.status(400).json({
            message: 'Bu telefon numarası zaten kullanımda',
            field: 'phoneNumber'
          });
        }
      }

      res.status(500).json({
        message: 'Kayıt işlemi sırasında bir hata oluştu',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Kullanıcıyı bul
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          message: 'E-posta adresi veya şifre hatalı',
          field: 'email'
        });
      }

      // Şifreyi kontrol et
      const isValidPassword = await UserModel.comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: 'E-posta adresi veya şifre hatalı',
          field: 'password'
        });
      }

      // Kullanıcı aktif değilse
      if (!user.is_active) {
        return res.status(403).json({
          message: 'Hesabınız devre dışı bırakılmış',
          field: 'general'
        });
      }

      // Hassas bilgileri çıkar
      const { password: _, ...userWithoutPassword } = user;

      // Token oluştur
      const token = generateToken(user.id);

      // Son giriş zamanını güncelle
      await UserModel.updateLastLogin(user.id);

      res.json({
        message: 'Giriş başarılı',
        token,
        user: userWithoutPassword
      });
    } catch (error: any) {
      console.error('Giriş hatası:', error);
      res.status(500).json({
        message: 'Giriş yapılırken bir hata oluştu',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { username, phoneNumber, department } = req.body;
      const userId = req.user.id;

      // Kullanıcı adı kontrolü
      if (username !== req.user.username) {
        const existingUsername = await UserModel.findByUsername(username);
        if (existingUsername) {
          return res.status(400).json({
            message: 'Bu kullanıcı adı zaten kullanımda',
            field: 'username'
          });
        }
      }

      const updatedUser = await UserModel.update(userId, {
        username,
        phone_number: phoneNumber,
        department
      });

      if (!updatedUser) {
        return res.status(400).json({ message: 'Güncelleme başarısız oldu' });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;

      res.json({
        message: 'Profil başarıyla güncellendi',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      res.status(500).json({ message: 'Sunucu hatası oluştu' });
    }
  },

  async updatePassword(req: AuthRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Mevcut şifreyi kontrol et
      const isValidPassword = await UserModel.comparePassword(
        currentPassword,
        req.user.password
      );

      if (!isValidPassword) {
        return res.status(400).json({
          message: 'Mevcut şifre yanlış',
          field: 'currentPassword'
        });
      }

      // Yeni şifreyi hashle
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Şifreyi güncelle
      await UserModel.update(userId, { password: hashedPassword });

      res.json({ message: 'Şifre başarıyla güncellendi' });
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      res.status(500).json({ message: 'Sunucu hatası oluştu' });
    }
  }
};