import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { GalleryImage } from '../types';
import { GalleryLightbox } from './GalleryLightbox';
import { motion } from 'motion/react';
import { ArrowRight, Maximize2 } from 'lucide-react';

interface GalleryPreviewProps {
  limit?: number;
  showAllButton?: boolean;
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ limit = 6, showAllButton = true }) => {
  const { siteData, language, t, setCurrentPage } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { key: 'all', label: { de: 'Alle', en: 'All', it: 'Tutti' } },
    { key: 'suites', label: { de: 'Suiten', en: 'Suites', it: 'Suite' } },
    { key: 'wellness', label: { de: 'Wellness & Pool', en: 'Wellness & Pool', it: 'Wellness' } },
    { key: 'vineyard', label: { de: 'Weinberge', en: 'Vineyards', it: 'Vigneti' } },
    { key: 'culinary', label: { de: 'Kulinarik', en: 'Culinary', it: 'Gusto' } },
  ];

  const filteredImages = siteData.gallery.filter((img) => {
    if (activeCategory === 'all') return true;
    return img.category === activeCategory;
  });

  const displayedImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery-section" className="py-20 sm:py-28 md:py-36 bg-[#FAF8F5] text-[#23201C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#23201C]/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#9E7D53]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
                {language === 'de' ? 'Visuelle Impressionen' : language === 'it' ? 'Impressioni Visive' : 'Visual Impressions'}
              </span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight">
              {language === 'de' ? 'Einblicke in das Refugium' : language === 'it' ? 'Scorci del Nostro Rifugio' : 'Glimpses into LINGERS'}
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#F5F2EB] text-[#7D7468] hover:bg-[#EFECE6] hover:text-[#1E1B18]'
                  }`}
                >
                  {cat.label[language] || cat.label.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => handleOpenLightbox(index)}
              className="group relative cursor-pointer aspect-4/3 rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 bg-neutral-200"
            >
              <img
                src={image.url}
                alt={t(image.title)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                <div className="self-end p-2 rounded-full bg-black/40 backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89768] font-medium">
                    {image.category}
                  </span>
                  <h4 className="font-serif-luxury text-xl font-light">
                    {t(image.title)}
                  </h4>
                  {image.caption && (
                    <p className="text-xs text-white/75 font-light line-clamp-1 mt-0.5">
                      {t(image.caption)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showAllButton && (
          <div className="mt-12 text-center">
            <button
              id="gallery-view-all-btn"
              onClick={() => setCurrentPage('gallery')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-none border border-[#23201C]/25 hover:border-[#23201C] hover:bg-[#23201C] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
            >
              <span>{language === 'de' ? 'Vollständige Galerie ansehen' : language === 'it' ? 'Vedi galleria completa' : 'View Full Photography Gallery'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        images={displayedImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
};
