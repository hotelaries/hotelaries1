import React from 'react';
import { useSite } from '../context/SiteContext';
import { RestaurantSection } from '../components/RestaurantSection';
import { Utensils, Calendar, Clock, Phone, Sparkles, Coffee } from 'lucide-react';

export const DiningPage: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const restaurant = siteData.restaurant;

  return (
    <div id="dining-page" className="w-full pt-28 pb-20 bg-[#FAF8F5] text-[#23201C]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#9E7D53]/40 bg-[#9E7D53]/10 text-[#9E7D53] text-[11px] uppercase tracking-[0.25em] font-sans-clean font-medium mb-4">
          <Utensils className="w-3.5 h-3.5" />
          <span>{siteData.contact.hotelName}</span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {t(restaurant?.title, 'Restaurant & Fine Dining')}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {t(restaurant?.subtitle, 'Fresh regional & international flavors crafted with authentic hospitality.')}
        </p>
      </div>

      {/* Main Restaurant Section */}
      <RestaurantSection />

      {/* Table Reservation / Special Dining Inquiry Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t border-[#23201C]/10">
        <div className="bg-[#F5F2EB] rounded-2xl p-8 sm:p-12 border border-[#23201C]/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18]">
              {language === 'de' ? 'Tischreservierung & Feierlichkeiten' : language === 'it' ? 'Prenotazione Tavoli & Banchetti' : 'Table Reservations & Celebrations'}
            </h3>
            <p className="text-xs sm:text-sm text-[#7D7468] max-w-xl">
              {language === 'de'
                ? 'Genießen Sie ein romantisches Dinner, Geschäftsessen oder Familienfeiern in unserem Restaurant mit persönlicher Betreuung.'
                : 'Enjoy an intimate dinner, business luncheon, or celebratory gathering in our restaurant with attentive table hospitality.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openBookingModal({ type: 'inquiry', notes: 'Restaurant dining table reservation' })}
              className="px-8 py-4 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>{t(restaurant?.reservationCtaText, 'Reserve a Table')}</span>
            </button>

            {siteData.contact.phone1 && (
              <a
                href={`tel:${siteData.contact.phoneFormatted || siteData.contact.phone1.replace(/\s+/g, '')}`}
                className="px-6 py-4 border border-[#23201C]/20 hover:border-[#23201C] text-[#23201C] text-xs uppercase tracking-[0.18em] font-medium transition-colors rounded-lg flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{siteData.contact.phone1}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
