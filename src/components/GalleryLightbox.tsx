import React, { useEffect, useCallback } from 'react';
import { GalleryImage } from '../types';
import { useSite } from '../context/SiteContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const { t } = useSite();

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    onNavigate((currentIndex + 1) % images.length);
  }, [images.length, onNavigate, currentIndex]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [images.length, onNavigate, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        id="gallery-lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 select-none"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="flex items-center justify-between text-white max-w-7xl mx-auto w-full z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E7D53] font-medium">
              {current.category}
            </span>
            <span className="text-white/40 text-xs font-mono">
              ({currentIndex + 1} / {images.length})
            </span>
          </div>

          <button
            id="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-2.5 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Image Container */}
        <div
          className="relative max-w-6xl max-h-[75vh] mx-auto my-auto flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id || currentIndex}
              src={current.url}
              alt={t(current.title)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div
          className="text-center text-white max-w-2xl mx-auto z-10 space-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          <h4 className="font-serif-luxury text-xl sm:text-2xl font-light tracking-wide">
            {t(current.title)}
          </h4>
          {current.caption && (
            <p className="text-xs text-white/70 font-light">
              {t(current.caption)}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
