import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { GlassWater, Clock, Sparkles, ArrowRight, Calendar, MapPin, Eye, CheckCircle2 } from 'lucide-react';

export const SkyLoungeSection: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const skyLounge = siteData.skyLounge;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!skyLounge || skyLounge.status === 'draft') {
    return null;
  }

  const galleryImages = [
    skyLounge.mainImage,
    ...(skyLounge.gallery || []),
    skyLounge.nightAmbienceImage
  ].filter(Boolean) as string[];

  return (
    <section
      id="skylounge-section"
      className="py-20 sm:py-28 md:py-36 bg-[#161412] text-[#FAF8F5] relative overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#9E7D53]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#9E7D53]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#9E7D53]/40 bg-[#9E7D53]/10 text-[#C7A778] text-[11px] uppercase tracking-[0.25em] font-sans-clean font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t(skyLounge.title, 'Sky Lounge & Rooftop')}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide leading-tight">
            {t(skyLounge.subtitle, 'Above the Ordinary – Panoramic Rooftop Bar')}
          </h2>

          <p className="mt-5 text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            {t(skyLounge.description)}
          </p>
        </div>

        {/* Showcase Grid: Main Visual Showcase & Editorial Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Main Visual Carousel / Active Image (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-16/10 rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={galleryImages[activeImageIndex] || skyLounge.mainImage}
                alt="Sky Lounge at Hotel Aries"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A778] block font-sans-clean font-medium">
                    Hotel Aries Rooftop
                  </span>
                  <p className="font-serif-luxury text-lg sm:text-xl font-light mt-0.5">
                    {activeImageIndex === 0
                      ? 'Panoramic Skyline Horizons'
                      : activeImageIndex === 1
                      ? 'Sophisticated Open-Air Seating'
                      : 'Evening Atmosphere & Artisan Drinks'}
                  </p>
                </div>
                {skyLounge.seatingCapacity && (
                  <span className="hidden sm:inline-block text-[11px] bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/20">
                    {skyLounge.seatingCapacity}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-16/10 rounded-lg overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#C7A778] scale-105 ring-2 ring-[#9E7D53]/40'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Sky lounge thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Reservation Card (5 cols) */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.22em] text-[#C7A778] font-sans-clean font-semibold">
                Atmosphere & Ambiance
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white">
                Cocktails, Horizon & Evening Sky
              </h3>
            </div>

            {/* Configured Features List */}
            {skyLounge.features && skyLounge.features.length > 0 && (
              <div className="space-y-3 pt-2">
                {skyLounge.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-white/85 font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#C7A778] shrink-0" />
                    <span>{t(feat)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Timings / Opening hours info */}
            {skyLounge.openingHours && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                <Clock className="w-4 h-4 text-[#C7A778] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">
                    {language === 'de' ? 'Öffnungszeiten' : language === 'it' ? 'Orari di Apertura' : 'Hours'}
                  </span>
                  <p className="mt-0.5 text-white/70">{t(skyLounge.openingHours)}</p>
                </div>
              </div>
            )}

            {/* Action Buttons: Reserve Sky Lounge & Direct Call */}
            <div className="pt-4 space-y-3">
              <button
                id="skylounge-reserve-btn"
                onClick={() => openBookingModal({
                  type: 'inquiry',
                  notes: 'Sky Lounge reservation request'
                })}
                className="w-full py-3.5 px-6 rounded-none bg-[#9E7D53] hover:bg-[#B89768] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg group"
              >
                <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{t(skyLounge.reservationCtaText, 'Reserve at Sky Lounge')}</span>
              </button>

              {skyLounge.menuLink && (
                <a
                  href={skyLounge.menuLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-6 rounded-none border border-white/25 hover:border-white text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>{language === 'de' ? 'Speise- & Barkarte' : language === 'it' ? 'Menu della Lounge' : 'View Lounge Menu'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Atmosphere Highlight Cards: Evening Lighting, Seating & Panoramic Views */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C7A778] font-sans-clean font-medium">
              01 · Ambience
            </span>
            <h4 className="font-serif-luxury text-xl font-light text-white">
              Sunset to Starlight
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Transition smoothly from daytime relaxation to intimate evening drinks under warm starlight and subtle architectural lighting.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C7A778] font-sans-clean font-medium">
              02 · Seating
            </span>
            <h4 className="font-serif-luxury text-xl font-light text-white">
              Comfortable Open-Air Lounging
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Spacious low-profile sofas, intimate high-top tables, and sheltered corners designed for relaxed social gatherings.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C7A778] font-sans-clean font-medium">
              03 · Mixology
            </span>
            <h4 className="font-serif-luxury text-xl font-light text-white">
              Artisan Beverages & Small Bites
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Curated drink selection, refreshing signature beverages, and chef-prepared sharing plates to elevate your rooftop stay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
