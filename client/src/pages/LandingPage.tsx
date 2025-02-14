import { Box } from '@mui/material';
import { HeroSection } from './landing_sections/HeroSection';
import { MissionSection } from './landing_sections/MissionSection';
import { FeaturesSection } from './landing_sections/FeaturesSection';
import { TechnologySection } from './landing_sections/TechnologySection';
import { CTASection } from './landing_sections/CTASection';

export const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
      <TechnologySection />
      <CTASection />
    </Box>
  );
};