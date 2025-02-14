import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FlagIcon from '@mui/icons-material/Flag';

export const MissionSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Misyon */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <TrackChangesIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Misyonumuz
              </Typography>
              <Typography color="text.secondary">
                Türkiye'nin savunma teknolojileri alanında bağımsızlığını güçlendirmek ve yenilikçi çözümlerle global pazarda öncü olmak.
              </Typography>
            </Paper>
          </Grid>

          {/* Vizyon */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <VisibilityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Vizyonumuz
              </Typography>
              <Typography color="text.secondary">
                Sürdürülebilir teknolojik gelişim ile savunma sanayiinde dünya standardını belirleyen bir teknoloji şirketi olmak.
              </Typography>
            </Paper>
          </Grid>

          {/* Hedefler */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <FlagIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Hedeflerimiz
              </Typography>
              <Typography color="text.secondary" component="div">
                <ul style={{ paddingLeft: '20px' }}>
                  <li>%100 yerli teknoloji üretimi</li>
                  <li>Global pazarda lider konuma ulaşmak</li>
                  <li>Sürekli AR-GE ve inovasyon</li>
                  <li>Nitelikli istihdam sağlamak</li>
                </ul>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};