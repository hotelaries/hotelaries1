import React from 'react';
import { useSite } from '../context/SiteContext';
import { GalleryPreview } from '../components/GalleryPreview';

export const GalleryPage: React.FC = () => {
  const { language } = useSite();

  return (
    <div id="gallery-page" className="w-full pt-28 pb-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
          {language === 'de' ? 'Architektur & Natur' : language === 'it' ? 'Architettura & Paesaggio' : 'Architecture & Mood'}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {language === 'de' ? 'Fotogalerie' : language === 'it' ? 'Galleria Fotografica' : 'Visual Gallery'}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {language === 'de'
            ? 'Momente des Verweilens in Bildern. Klicken Sie auf ein Bild, um es in voller Auflösung zu betrachten.'
            : language === 'it'
            ? 'Attimi di serenità attraverso le immagini. Cliccate su una foto per visualizzarla ad alta risoluzione.'
            : 'Moments of unhurried presence captured in light. Select any photograph to open full-resolution view.'}
        </p>
      </div>

      <GalleryPreview limit={24} showAllButton={false} />
    </div>
  );
};
