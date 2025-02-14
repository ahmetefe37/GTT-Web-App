import { db } from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  department?: string;
  role: string;
  is_admin: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  profile_picture?: string;
  created_at: Date;
  updated_at: Date;
}

const dropAndCreateUsersTable = `
  DROP TABLE IF EXISTS users CASCADE;
  
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    profile_picture TEXT,
    department VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user',
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
  );

  -- Verimlilik için gerekli indeksler
  CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
  CREATE INDEX idx_users_username ON users(username) WHERE deleted_at IS NULL;
  CREATE INDEX idx_users_phone ON users(phone_number) WHERE deleted_at IS NULL;
  CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;
  CREATE INDEX idx_users_is_admin ON users(is_admin) WHERE deleted_at IS NULL;
`;

export const UserModel = {
  async createTable() {
    try {
      await db.query(dropAndCreateUsersTable);
      console.log('✅ Kullanıcılar tablosu başarıyla yeniden oluşturuldu');
    } catch (error) {
      console.error('❌ Tablo oluşturma hatası:', error);
      throw error;
    }
  },

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const result = await db.query(
      `INSERT INTO users (
        username, 
        email, 
        password, 
        phone_number, 
        department, 
        role,
        is_admin,
        email_verified,
        phone_verified,
        profile_picture
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        userData.username,
        userData.email,
        hashedPassword,
        userData.phone_number,
        userData.department,
        userData.role || 'user',
        userData.is_admin || false,
        userData.email_verified || false,
        userData.phone_verified || false,
        userData.profile_picture
      ]
    );

    return result.rows[0];
  },

  async findByEmail(email: string) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async findByUsername(username: string) {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  },

  async findById(id: number) {
    const result = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async comparePassword(providedPassword: string, hashedPassword: string) {
    return bcrypt.compare(providedPassword, hashedPassword);
  },

  async updateLastLogin(id: number) {
    const query = `
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = $1 AND deleted_at IS NULL 
      RETURNING *;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async softDelete(id: number) {
    const query = `
      UPDATE users 
      SET deleted_at = NOW() 
      WHERE id = $1 AND deleted_at IS NULL 
      RETURNING *;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async update(id: number, updates: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>) {
    const allowedUpdates = [
      'username', 'email', 'password', 'phone_number', 'profile_picture',
      'department', 'role', 'is_active', 'notifications_enabled',
      'email_verified', 'phone_verified', 'two_factor_enabled', 'metadata'
    ];

    const updateFields = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .map((key, index) => `${key} = $${index + 2}`);

    if (updateFields.length === 0) return null;

    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}, updated_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL 
      RETURNING *;
    `;

    const values = [id, ...Object.values(updates)];
    const result = await db.query(query, values);
    return result.rows[0];
  }
};