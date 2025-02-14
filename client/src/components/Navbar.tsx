import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  Link,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const pages = [
  { title: 'Anasayfa', path: '/' },
  { title: 'Hakkımızda', path: '/about' },
  { title: 'Çözümler', path: '/solutions' },
  { title: 'İletişim', path: '/contact' }
];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Link href="/" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2, textDecoration: 'none' }}>
            <Box component="img" src="/src/assets/logo.png" alt="GTT Logo" sx={{ height: '40px', mr: 1 }} />
          </Link>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu} component={Link} href={page.path}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Link href="/" sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1, textDecoration: 'none' }}>
            <Box component="img" src="/src/assets/logo.png" alt="GTT Logo" sx={{ height: '32px', mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1rem',
              }}
            >
              GTT
            </Typography>
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: 'text.primary', 
                  display: 'block',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                    alt={user.username} 
                    src={user.profilePicture}
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: 40,
                      height: 40
                    }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                    <Typography textAlign="center">Profil</Typography>
                  </MenuItem>
                  {user.isAdmin && (
                    <MenuItem onClick={() => { navigate('/admin'); handleCloseUserMenu(); }}>
                      <Typography textAlign="center">Yönetim Paneli</Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Çıkış Yap</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  color="primary"
                  href="/login"
                >
                  Giriş Yap
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/register"
                >
                  Kayıt Ol
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};