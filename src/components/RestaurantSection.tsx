import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Utensils, Clock, Sparkles, Calendar, CheckCircle2, Phone, ArrowRight, Award } from 'lucide-react';

export const RestaurantSection: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const restaurant = siteData.restaurant;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!restaurant || restaurant.status === 'draft') {
    return null;
  }

  const galleryImages = [
    restaurant.mainImage,
    ...(restaurant.gallery || [])
  ].filter(Boolean) as string[];

  return (
    <section
      id="restaurant-section"
      className="py-20 sm:py-28 md:py-36 bg-[#FAF8F5] text-[#23201C] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#9E7D53]/40 bg-[#9E7D53]/10 text-[#9E7D53] text-[11px] uppercase tracking-[0.25em] font-sans-clean font-medium mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span>{t(restaurant.title, 'Restaurant & Dining')}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1E1B18] tracking-wide leading-tight">
            {t(restaurant.subtitle, 'Culinary Elegance & Warm Hospitality')}
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#5B544B] font-light leading-relaxed max-w-2xl mx-auto">
            {t(restaurant.description)}
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Main Visual Image & Thumbnails (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-16/10 rounded-xl overflow-hidden shadow-2xl border border-[#23201C]/10 group">
              <img
                src={galleryImages[activeImageIndex] || restaurant.mainImage}
                alt="Restaurant at Hotel Aries"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A778] block font-sans-clean font-medium">
                    Hotel Aries Dining
                  </span>
                  <p className="font-serif-luxury text-lg sm:text-xl font-light mt-0.5">
                    {activeImageIndex === 0
                      ? 'Refined Dining & Fresh Ingredients'
                      : activeImageIndex === 1
                      ? 'Morning Breakfast & Artisan Coffee'
                      : 'Curated Dinner & Seasonal Menus'}
                  </p>
                </div>
                {restaurant.cuisine && (
                  <span className="hidden sm:inline-block text-[11px] bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/20">
                    {t(restaurant.cuisine)}
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
                        ? 'border-[#9E7D53] scale-105 ring-2 ring-[#9E7D53]/40'
                        : 'border-[#23201C]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Restaurant thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Reservation Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#F5F2EB] p-8 sm:p-10 rounded-2xl border border-[#23201C]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.22em] text-[#9E7D53] font-sans-clean font-semibold">
                Daily Dining Experience
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18]">
                {t(restaurant.tagline, 'Curated Flavors & Artisan Hospitality')}
              </h3>
            </div>

            {/* Configured Features List */}
            {restaurant.features && restaurant.features.length > 0 && (
              <div className="space-y-3 pt-2">
                {restaurant.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-[#3E3832] font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#9E7D53] shrink-0" />
                    <span>{t(feat)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Opening hours info */}
            {restaurant.openingHours && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#23201C]/8 text-xs text-[#5B544B]">
                <Clock className="w-4 h-4 text-[#9E7D53] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#1E1B18] block">
                    {language === 'de' ? 'Öffnungszeiten' : language === 'it' ? 'Orari di Apertura' : 'Service Hours'}
                  </span>
                  <p className="mt-0.5 text-[#7D7468]">{t(restaurant.openingHours)}</p>
                </div>
              </div>
            )}

            {/* Action Buttons: Table Reservation & Direct Call */}
            <div className="pt-4 space-y-3">
              <button
                id="restaurant-reserve-btn"
                onClick={() =>
                  openBookingModal({
                    type: 'inquiry',
                    notes: 'Restaurant Table Reservation Inquiry'
                  })
                }
                className="w-full py-3.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{t(restaurant.reservationCtaText, 'Reserve a Table')}</span>
              </button>

              {siteData.contact.phone1 && (
                <a
                  href={`tel:${siteData.contact.phoneFormatted || siteData.contact.phone1.replace(/\s+/g, '')}`}
                  className="w-full py-3 border border-[#23201C]/20 hover:border-[#23201C] text-[#23201C] text-xs uppercase tracking-[0.18em] font-medium transition-colors rounded-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {siteData.contact.phone1}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Menu Highlights Strip */}
        {restaurant.menuHighlights && restaurant.menuHighlights.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#23201C]/10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
                {language === 'de' ? 'Speisekarte Auszug' : language === 'it' ? 'Estratto Menu' : 'Signature Offerings'}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-2">
                {language === 'de' ? 'Kulinarische Höhepunkte' : language === 'it' ? 'Piatti d’Autore' : 'Featured Specialties'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {restaurant.menuHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-[#23201C]/8 shadow-xs space-y-2 hover:border-[#9E7D53]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-luxury text-lg font-normal text-[#1E1B18]">
                      {t(item.title)}
                    </h4>
                    {item.price && (
                      <span className="text-xs font-serif-luxury font-medium text-[#9E7D53]">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7D7468] font-light leading-relaxed">
                    {t(item.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
