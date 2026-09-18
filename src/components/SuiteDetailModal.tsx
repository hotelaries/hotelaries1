import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Users, Maximize2, Check, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SuiteDetailModal: React.FC = () => {
  const { selectedSuite, setSelectedSuite, language, t, openBookingModal } = useSite();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!selectedSuite) return null;

  const gallery = selectedSuite.gallery && selectedSuite.gallery.length > 0
    ? selectedSuite.gallery
    : [selectedSuite.image];

  const handleInquiry = () => {
    const suite = selectedSuite;
    setSelectedSuite(null);
    openBookingModal({
      suiteId: suite.id,
      suiteName: t(suite.name),
      type: 'inquiry'
    });
  };

  const handleDirectBook = () => {
    const suite = selectedSuite;
    setSelectedSuite(null);
    openBookingModal({
      suiteId: suite.id,
      suiteName: t(suite.name),
      type: 'direct_booking'
    });
  };

  return (
    <AnimatePresence>
      <div
        id="suite-detail-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={() => setSelectedSuite(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FAF8F5] text-[#23201C] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/40 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#23201C]/10 bg-[#F5F2EB]/60">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E7D53] font-semibold font-sans-clean">
                {selectedSuite.category} · {selectedSuite.size}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-light text-[#1E1B18]">
                {t(selectedSuite.name)}
              </h3>
            </div>
            <button
              onClick={() => setSelectedSuite(null)}
              aria-label="Close modal"
              className="p-2 rounded-full hover:bg-[#23201C]/10 text-[#23201C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Gallery Viewer */}
            <div className="space-y-3">
              <div className="relative aspect-16/9 sm:aspect-21/9 rounded-xl overflow-hidden bg-neutral-100 shadow-md">
                <img
                  src={gallery[activePhotoIdx] || selectedSuite.image}
                  alt={t(selectedSuite.name)}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-mono">
                  {activePhotoIdx + 1} / {gallery.length}
                </div>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activePhotoIdx === idx ? 'border-[#9E7D53] scale-102' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F5F2EB] border border-[#23201C]/5 text-center">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] mb-0.5">Größe / Size</span>
                <span className="font-serif-luxury text-lg text-[#1E1B18] font-light">{selectedSuite.size}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] mb-0.5">Kapazität</span>
                <span className="font-serif-luxury text-lg text-[#1E1B18] font-light">Bis zu {selectedSuite.maxGuests} Gäste</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] mb-0.5">Ausblick / View</span>
                <span className="font-serif-luxury text-lg text-[#1E1B18] font-light">{t(selectedSuite.viewType)}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] mb-0.5">Preis ab</span>
                <span className="font-serif-luxury text-lg text-[#9E7D53] font-light">€{selectedSuite.priceFrom} / Nacht</span>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
                {language === 'de' ? 'Das Wohnerlebnis' : language === 'it' ? 'L\'esperienza' : 'The Experience'}
              </h4>
              <p className="text-sm sm:text-base text-[#3D3831] font-light leading-relaxed">
                {t(selectedSuite.fullDesc)}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
                {language === 'de' ? 'Ausstattung & Inkludierte Leistungen' : language === 'it' ? 'Servizi & Comfort Inclusi' : 'Amenities & Included Luxuries'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {selectedSuite.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#5B544B] bg-white p-2.5 rounded-lg border border-[#23201C]/6">
                    <Check className="w-3.5 h-3.5 text-[#9E7D53] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {selectedSuite.highlights && selectedSuite.highlights.length > 0 && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#9E7D53]/30 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-[#9E7D53] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Highlights:
                </span>
                {selectedSuite.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-[#9E7D53]/10 text-[#9E7D53] text-xs rounded-full font-medium">
                    {t(h)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer / CTAs */}
          <div className="p-4 sm:p-6 border-t border-[#23201C]/10 bg-[#F5F2EB]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#7D7468]">
                {language === 'de' ? 'Inklusive Boutique-Frühstück & Pool-Zugang' : language === 'it' ? 'Colazione boutique e accesso piscina inclusi' : 'Includes boutique breakfast & pool wellness access'}
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleInquiry}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-lg border border-[#23201C]/30 hover:border-[#23201C] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                {language === 'de' ? 'Unverbindlich Anfragen' : language === 'it' ? 'Richiedi Info' : 'Inquire'}
              </button>
              <button
                type="button"
                onClick={handleDirectBook}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{language === 'de' ? 'Jetzt Buchen' : language === 'it' ? 'Prenota Ora' : 'Book Suite'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
