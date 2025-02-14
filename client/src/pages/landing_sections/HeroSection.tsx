import { Box, Button, Container, Grid, Typography } from '@mui/material';

export const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #4F46E5 100%)',
        color: 'white',
        py: { xs: 10, md: 20 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              İleri Teknoloji ile Geleceği Şekillendiriyoruz
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 400 }}>
              Savunma teknolojilerinde çığır açan çözümler ve milli teknoloji hamleleri ile ülkemizin geleceğine yön veriyoruz.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                mr: 2,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Çözümlerimiz
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'grey.100',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              İletişime Geç
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '50%',
                  transform: 'scale(0.8)',
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: { xs: 300, md: 400 },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '4rem' },
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                }}
              >
                GTT
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};