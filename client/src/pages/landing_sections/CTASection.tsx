import { Box, Button, Container, Typography } from '@mui/material';

export const CTASection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ mb: 3 }}>
          Geleceği Birlikte İnşa Edelim
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
          Türkiye'nin teknolojik dönüşümünde yerinizi alın.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/contact"
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Bize Ulaşın
        </Button>
      </Container>
    </Box>
  );
};