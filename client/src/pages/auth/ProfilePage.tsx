import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  MenuItem,
  Divider,
} from '@mui/material';
import { toast } from 'react-toastify';
import { authService } from '../../services/auth.service';

const departments = [
  { value: 'software', label: 'Yazılım Geliştirme' },
  { value: 'hardware', label: 'Donanım' },
  { value: 'ai', label: 'Yapay Zeka' },
  { value: 'network', label: 'Ağ Sistemleri' },
  { value: 'security', label: 'Siber Güvenlik' },
];

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    department: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        department: user.department || '',
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updateProfile({
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        department: formData.department,
      });
      toast.success('Profil bilgileri güncellendi');
    } catch (error: any) {
      toast.error(error.message || 'Profil güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor');
      return;
    }

    setLoading(true);
    try {
      await authService.updatePassword(formData.currentPassword, formData.newPassword);
      toast.success('Şifreniz başarıyla güncellendi');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error: any) {
      toast.error(error.message || 'Şifre güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3 }}
              src={authService.getCurrentUser()?.profilePicture}
            />
            <Box>
              <Typography variant="h5" gutterBottom>
                Profil Bilgileri
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kişisel bilgilerinizi güncelleyebilirsiniz
              </Typography>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleProfileUpdate} sx={{ mb: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Kullanıcı Adı"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="E-posta"
              value={formData.email}
              disabled
              helperText="E-posta adresi değiştirilemez"
            />

            <TextField
              margin="normal"
              fullWidth
              name="phoneNumber"
              label="Telefon Numarası"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              margin="normal"
              fullWidth
              select
              name="department"
              label="Departman"
              value={formData.department}
              onChange={handleChange}
              disabled={loading}
            >
              {departments.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Profili Güncelle'}
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Şifre Değiştir
          </Typography>

          <Box component="form" onSubmit={handlePasswordUpdate}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="currentPassword"
              label="Mevcut Şifre"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Yeni Şifre"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Yeni Şifre (Tekrar)"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Şifreyi Güncelle'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};