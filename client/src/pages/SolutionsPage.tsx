import { Box, Container, Typography, Grid } from '@mui/material';
import { SolutionCard } from './solutions_sections/SolutionCard';

const solutions = [
  {
    id: 'land-technologies',
    title: 'Kara Teknolojileri',
    description: 'Modern kara harp ve savunma teknolojileri.',
    image: '/src/assets/land_bg1.jpg',
    details: {
      subtitle: 'Yeni Nesil Kara Savunma Sistemleri',
      features: [
        'Zırhlı Araç Sistemleri',
        'Elektronik Harp Sistemleri',
        'Komuta Kontrol Sistemleri',
        'Simülasyon ve Eğitim Sistemleri'
      ]
    }
  },
  {
    id: 'naval-technologies',
    title: 'Deniz Teknolojileri',
    description: 'Modern deniz harp ve savunma teknolojileri.',
    image: '/src/assets/naval_bg1.jpg',
    details: {
      subtitle: 'Gelişmiş Deniz Sistemleri',
      features: [
        'Gemi Savaş Yönetim Sistemleri',
        'Denizaltı Sistemleri',
        'Sonar Sistemleri',
        'Deniz Gözetleme Sistemleri'
      ]
    }
  },
  {
    id: 'air-technologies',
    title: 'Hava Teknolojileri',
    description: 'Modern hava harp ve savunma teknolojileri.',
    image: '/src/assets/air_bg1.jpg',
    details: {
      subtitle: 'İleri Hava Savunma Çözümleri',
      features: [
        'İHA Sistemleri',
        'Hava Savunma Sistemleri',
        'Aviyonik Sistemler',
        'Radar Sistemleri'
      ]
    }
  },
  {
    id: 'software-technologies',
    title: 'Yazılım Teknolojileri',
    description: 'Sistem kontrol uygulamaları ve yönetimleri.',
    image: '/src/assets/software_bg1.jpg',
    details: {
      subtitle: 'Askeri Yazılım Çözümleri',
      features: [
        'Komuta Kontrol Yazılımları',
        'Simülasyon Sistemleri',
        'Siber Güvenlik Çözümleri',
        'Veri Analiz Platformları'
      ]
    }
  },
  {
    id: 'hardware-technologies',
    title: 'Donanım Teknolojileri',
    description: 'Elektronik kart ve sistem çözümleri.',
    image: '/src/assets/hardware_bg1.jpg',
    details: {
      subtitle: 'Askeri Elektronik Sistemler',
      features: [
        'Elektronik Harp Sistemleri',
        'Haberleşme Sistemleri',
        'Güç Sistemleri',
        'Sensör Sistemleri'
      ]
    }
  },
  {
    id: 'ai-technologies',
    title: 'Yapay Zeka Teknolojileri',
    description: 'İleri düzey yapay zeka ve büyük veri çözümleri.',
    image: '/src/assets/ai_bg1.jpg',
    details: {
      subtitle: 'Askeri Yapay Zeka Sistemleri',
      features: [
        'Otonom Sistemler',
        'Görüntü İşleme',
        'Tahmine Dayalı Bakım',
        'Karar Destek Sistemleri'
      ]
    }
  }
];

export const solutionsData = solutions;

export const SolutionsPage = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Teknoloji Çözümlerimiz
        </Typography>
        <Grid container spacing={4}>
          {solutions.map((solution) => (
            <Grid item xs={12} md={6} lg={4} key={solution.id}>
              <SolutionCard solution={solution} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};