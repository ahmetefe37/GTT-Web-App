import { Box, Container, Grid, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DataObjectIcon from '@mui/icons-material/DataObject';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Siber Güvenlik',
      description: 'Kritik altyapılar için gelişmiş siber güvenlik çözümleri.',
    },
    {
      icon: <MilitaryTechIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'İHA Sistemleri',
      description: 'Son teknoloji insansız hava araçları ve kontrol sistemleri.',
    },
    {
      icon: <DataObjectIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Yazılım Çözümleri',
      description: 'Savunma sanayii için özel yazılım ve simülasyon sistemleri.',
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'AR/VR Teknolojileri',
      description: 'Eğitim ve operasyon için artırılmış gerçeklik çözümleri.',
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 6, color: 'text.primary' }}
        >
          Uzmanlık Alanlarımız
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};