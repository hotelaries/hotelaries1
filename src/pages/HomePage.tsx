import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { IntroSection } from '../components/IntroSection';
import { SuitesPreview } from '../components/SuitesPreview';
import { SkyLoungeSection } from '../components/SkyLoungeSection';
import { CulinarySection } from '../components/CulinarySection';
import { WellnessSection } from '../components/WellnessSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { GalleryPreview } from '../components/GalleryPreview';
import { TestimonialSection } from '../components/TestimonialSection';
import { LocationSection } from '../components/LocationSection';
import { CTASection } from '../components/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div id="home-page" className="w-full">
      <HeroSlider />
      <IntroSection />
      <SuitesPreview limit={4} showAllButton={true} />
      <SkyLoungeSection />
      <CulinarySection />
      <WellnessSection />
      <ExperienceSection />
      <GalleryPreview limit={6} showAllButton={true} />
      <TestimonialSection />
      <LocationSection />
      <CTASection />
    </div>
  );
};
