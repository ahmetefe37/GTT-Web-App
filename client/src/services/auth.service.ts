import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  department?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    department?: string;
    phoneNumber?: string;
    profilePicture?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    isAdmin: boolean;
  };
}

interface UpdateProfileData {
  username: string;
  phoneNumber?: string;
  department?: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Giriş yapılırken bir hata oluştu';
      const errorField = error.response?.data?.field || 'general';
      throw {
        message: errorMessage,
        field: errorField,
        response: error.response
      };
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Kayıt olurken bir hata oluştu';
      const errorField = error.response?.data?.field || 'general';
      throw {
        message: errorMessage,
        field: errorField,
        response: error.response
      };
    }
  },

  async updateProfile(data: UpdateProfileData): Promise<AuthResponse> {
    try {
      const token = this.getToken();
      const response = await axios.put(
        `${API_URL}/auth/profile`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Yerel kullanıcı bilgilerini güncelle
      const currentUser = this.getCurrentUser();
      const updatedUser = { ...currentUser, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Profil güncellenirken bir hata oluştu',
        field: error.response?.data?.field || 'general',
        response: error.response
      };
    }
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const token = this.getToken();
      await axios.put(
        `${API_URL}/auth/password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Şifre güncellenirken bir hata oluştu',
        field: error.response?.data?.field || 'general',
        response: error.response
      };
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.isAdmin || false;
  }
};