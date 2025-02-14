import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface SolutionCardProps {
  solution: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}

export const SolutionCard = ({ solution }: SolutionCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={solution.image}
        alt={solution.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="h2">
          {solution.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {solution.description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/solutions/${solution.id}`)}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Detaylı İncele
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};