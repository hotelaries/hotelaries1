import React from 'react';
import { useSite } from '../context/SiteContext';
import { Suite } from '../types';
import { Users, Maximize2, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SuitesPreviewProps {
  limit?: number;
  showAllButton?: boolean;
}

export const SuitesPreview: React.FC<SuitesPreviewProps> = ({ limit = 4, showAllButton = true }) => {
  const { siteData, language, t, setSelectedSuite, openBookingModal, setCurrentPage } = useSite();
  const { suitesIntro } = siteData.pages;
  const displayedSuites = limit ? siteData.suites.slice(0, limit) : siteData.suites;

  const handleOpenDetail = (suite: Suite) => {
    setSelectedSuite(suite);
  };

  const handleQuickBook = (suite: Suite, e: React.MouseEvent) => {
    e.stopPropagation();
    openBookingModal({
      suiteId: suite.id,
      suiteName: t(suite.name),
      type: 'inquiry'
    });
  };

  return (
    <section id="suites-section" className="py-20 sm:py-28 md:py-36 bg-[#F5F2EB] text-[#23201C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#23201C]/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#9E7D53]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
                {language === 'de' ? 'Wohnen & Verweilen' : language === 'it' ? 'Abitare & Rigenerarsi' : 'Sanctuaries & Suites'}
              </span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight">
              {t(suitesIntro.heading)}
            </h3>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-[#7D7468] font-light leading-relaxed">
              {t(suitesIntro.subtitle)}
            </p>
          </div>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayedSuites.map((suite, index) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleOpenDetail(suite)}
              className="group cursor-pointer bg-[#FAF8F5] rounded-xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 border border-[#23201C]/8 hover:border-[#9E7D53]/40 flex flex-col"
            >
              {/* Image Container with Hover Zoom & Quick Action */}
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-200">
                <img
                  src={suite.image}
                  alt={t(suite.name)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Centered subtle Explore Pill on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-white/95 text-[#1E1B18] text-[11px] uppercase tracking-[0.2em] font-medium shadow-lg backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition-transform flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#9E7D53]" />
                    <span>{language === 'de' ? 'Details ansehen' : language === 'it' ? 'Vedi dettagli' : 'View Details'}</span>
                  </span>
                </div>

                {/* Category & Room Count Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.2em] font-medium">
                    {suite.category}
                  </span>
                  {suite.roomCount && (
                    <span className="px-2.5 py-1 rounded-full bg-[#9E7D53] text-white text-[10px] uppercase tracking-[0.15em] font-semibold shadow-xs">
                      {suite.roomCount} {suite.roomCount === 1 ? 'Room' : 'Rooms'}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#1E1B18] text-[10px] uppercase tracking-[0.15em] font-semibold">
                    {suite.size}
                  </span>
                </div>

                {/* Price starting from badge */}
                <div className="absolute bottom-4 right-4 bg-[#1E1B18]/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-md text-right">
                  <span className="block text-[9px] uppercase tracking-[0.15em] text-white/60">
                    {language === 'de' ? 'ab' : language === 'it' ? 'da' : 'from'}
                  </span>
                  <span className="font-serif-luxury text-base sm:text-lg font-light">
                    €{suite.priceFrom}
                    <span className="text-[10px] font-sans-clean text-white/70 ml-1">
                      / {language === 'de' ? 'Nacht' : language === 'it' ? 'notte' : 'night'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Suite Information Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] group-hover:text-[#9E7D53] transition-colors">
                      {t(suite.name)}
                    </h4>
                  </div>

                  {/* View Type & Spec icons */}
                  <div className="flex items-center gap-4 text-xs text-[#7D7468] mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#9E7D53]" />
                      <span>bis {suite.maxGuests} {language === 'de' ? 'Gäste' : language === 'it' ? 'ospiti' : 'guests'}</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#9E7D53] font-medium">
                      {t(suite.viewType)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5B544B] font-light leading-relaxed line-clamp-2 mb-4">
                    {t(suite.shortDesc)}
                  </p>

                  {/* Highlights pills */}
                  {suite.highlights && suite.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {suite.highlights.slice(0, 2).map((highlight, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans-clean font-medium bg-[#EFECE6] text-[#5B544B]"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-[#9E7D53]" />
                          {t(highlight)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#23201C]/8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(suite)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#1E1B18] group-hover:text-[#9E7D53] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{language === 'de' ? 'Details ansehen' : language === 'it' ? 'Vedi dettagli' : 'Explore Suite'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickBook(suite, e)}
                    className="px-4 py-2 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{language === 'de' ? 'Anfragen' : language === 'it' ? 'Richiedi' : 'Inquire'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Suites CTA */}
        {showAllButton && (
          <div className="mt-14 text-center">
            <button
              id="suites-view-all-btn"
              onClick={() => setCurrentPage('suites')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-none border border-[#23201C]/30 hover:border-[#23201C] hover:bg-[#23201C] hover:text-white text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
            >
              <span>
                {language === 'de'
                  ? `Alle ${siteData.roomOverview?.totalRooms || 26} Zimmer entdecken (24 Deluxe · 2 Supreme)`
                  : language === 'it'
                  ? `Scopri tutte le ${siteData.roomOverview?.totalRooms || 26} camere (24 Deluxe · 2 Supreme)`
                  : `Explore All ${siteData.roomOverview?.totalRooms || 26} Rooms (24 Deluxe · 2 Supreme)`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
