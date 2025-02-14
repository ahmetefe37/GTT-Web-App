import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Button, Breadcrumbs, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { solutionsData } from '../SolutionsPage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const SolutionDetail = () => {
  const { techType } = useParams();
  const navigate = useNavigate();
  
  const solution = solutionsData.find(s => s.id === techType);

  if (!solution) {
    return (
      <Container>
        <Typography>Çözüm bulunamadı.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link 
            color="inherit" 
            href="/"
            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Anasayfa
          </Link>
          <Link 
            color="inherit" 
            href="/solutions"
            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Çözümler
          </Link>
          <Typography color="text.primary">{solution.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Hero Section */}
          <Grid item xs={12}>
            <Box
              sx={{
                position: 'relative',
                height: '400px',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
              }}
            >
              <Box
                component="img"
                src={solution.image}
                alt={solution.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h2" color="white" gutterBottom>
                  {solution.title}
                </Typography>
                <Typography variant="h5" color="white">
                  {solution.details.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Özellikler ve Kapsamlar
            </Typography>
            <List>
              {solution.details.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'grey.200' }}>
              <Typography variant="h6" gutterBottom>
                İletişime Geçin
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Bu çözüm hakkında detaylı bilgi almak için bizimle iletişime geçin.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ mb: 2 }}
              >
                İletişime Geç
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/solutions')}
              >
                Tüm Çözümler
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};