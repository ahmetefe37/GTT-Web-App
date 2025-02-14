import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const TechnologySection = () => {
  const navigate = useNavigate();
  
  const technologies = [
    {
      id: 'land-technologies',
      title: 'Kara Teknolojileri',
      description: 'Modern kara harp ve savunma teknolojileri.',
      image: '/src/assets/land_bg1.jpg'
    },
    {
      id: 'naval-technologies',
      title: 'Deniz Teknolojileri',
      description: 'Modern deniz harp ve savunma teknolojileri.',
      image: '/src/assets/naval_bg1.jpg'
    },
    {
      id: 'air-technologies',
      title: 'Hava Teknolojileri',
      description: 'Modern hava harp ve savunma teknolojileri.',
      image: '/src/assets/air_bg1.jpg'
    },
    {
      id: 'software-technologies',
      title: 'Yazılım Teknolojileri',
      description: 'Sistem kontrol uygulamaları ve yönetimleri.',
      image: '/src/assets/software_bg1.jpg'
    },
    {
      id: 'hardware-technologies',
      title: 'Donanım Teknolojileri',
      description: 'Elektronik kart ve sistem çözümleri.',
      image: '/src/assets/hardware_bg1.jpg'
    },
    {
      id: 'ai-technologies',
      title: 'Yapay Zeka Teknolojileri',
      description: 'İleri düzey yapay zeka ve büyük veri çözümleri.',
      image: '/src/assets/ai_bg1.jpg'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 6 }}
        >
          Çözümlerimiz
        </Typography>
        <Grid container spacing={4}>
          {technologies.map((tech) => (
            <Grid item xs={12} key={tech.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', md: 400 },
                    height: { xs: 240, md: 300 },
                    objectFit: 'cover'
                  }}
                  image={tech.image}
                  alt={tech.title}
                />
                <CardContent 
                  sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    p: 4 
                  }}
                >
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {tech.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {tech.description}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(`/solutions/${tech.id}`)}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Detaylı İncele
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};