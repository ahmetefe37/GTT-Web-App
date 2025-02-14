import { Box, Container, Typography, Link, Stack } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderColor: 'grey.200',
        py: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Greater Turk Technologies. Tüm hakları saklıdır.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/privacy" color="text.secondary" sx={{ textDecoration: 'none' }}>
              Gizlilik Politikası
            </Link>
            <Link href="/terms" color="text.secondary" sx={{ textDecoration: 'none' }}>
              Kullanım Şartları
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};