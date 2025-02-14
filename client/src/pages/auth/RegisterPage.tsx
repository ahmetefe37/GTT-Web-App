import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { validateRegisterForm, FormErrors } from '../../utils/validation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { toast } from 'react-toastify';

const departments = [
  { value: 'software', label: 'Yazılım Geliştirme' },
  { value: 'hardware', label: 'Donanım' },
  { value: 'ai', label: 'Yapay Zeka' },
  { value: 'network', label: 'Ağ Sistemleri' },
  { value: 'security', label: 'Siber Güvenlik' },
];

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    department: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Hata mesajını temizle
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { username, email, password, phoneNumber } = formData;
    const validationErrors = validateRegisterForm(username, email, password, phoneNumber);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setError(null);
    setErrors({});

    try {
      await authService.register(formData);
      toast.success('Kayıt işlemi başarılı! Hoş geldiniz.');
      navigate('/'); // Başarılı kayıttan sonra ana sayfaya yönlendir
    } catch (err: any) {
      const errorField = err.field || 'general';
      const errorMessage = err.message || 'Kayıt olurken bir hata oluştu';
      
      // Özel alan hatalarını göster
      if (errorField !== 'general') {
        setErrors(prev => ({
          ...prev,
          [errorField]: errorMessage
        }));
      } else {
        setError(errorMessage);
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              borderRadius: '50%',
              mb: 2,
              color: 'white',
            }}
          >
            <PersonAddIcon />
          </Box>
          
          <Typography component="h1" variant="h5" gutterBottom>
            Kayıt Ol
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
            />

            <TextField
              margin="normal"
              fullWidth
              name="phoneNumber"
              label="Telefon Numarası"
              type="tel"
              id="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              disabled={loading}
            />

            <TextField
              margin="normal"
              fullWidth
              select
              name="department"
              label="Departman"
              id="department"
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
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Kayıt Ol'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Zaten hesabınız var mı? Giriş yapın
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};