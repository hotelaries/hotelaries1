import React from 'react';
import { useSite } from '../context/SiteContext';
import { SkyLoungeSection } from '../components/SkyLoungeSection';
import { Sparkles, Calendar, Clock, MapPin, Wine, Users, ArrowRight } from 'lucide-react';

export const SkyLoungePage: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const skyLounge = siteData.skyLounge;

  return (
    <div id="skylounge-page" className="w-full pt-28 pb-20 bg-[#161412] text-[#FAF8F5]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#9E7D53]/40 bg-[#9E7D53]/10 text-[#C7A778] text-[11px] uppercase tracking-[0.25em] font-sans-clean font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{siteData.contact.hotelName}</span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-white mt-2 mb-4 tracking-tight">
          {t(skyLounge.title, 'Sky Lounge & Rooftop')}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/70 font-light leading-relaxed">
          {t(skyLounge.subtitle, 'Above the Ordinary – Panoramic Rooftop Bar & Lounge')}
        </p>
      </div>

      {/* Main Sky Lounge Component */}
      <SkyLoungeSection />

      {/* Additional Features / Reservation Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t border-white/10">
        <div className="bg-white/5 rounded-2xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white">
              {language === 'de' ? 'Private Veranstaltungen & Tischreservierung' : language === 'it' ? 'Eventi Privati & Prenotazioni' : 'Private Gatherings & Table Reservations'}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 max-w-xl">
              {language === 'de'
                ? 'Feiern Sie besondere Anlässe, geschäftliche Empfänge oder entspannte Abende über den Dächern mit persönlichem Service.'
                : 'Celebrate intimate occasions, evening receptions, or unwind under starlight with dedicated rooftop concierge service.'}
            </p>
          </div>

          <button
            onClick={() => openBookingModal({ type: 'inquiry', notes: 'Private event / rooftop gathering inquiry' })}
            className="shrink-0 px-8 py-4 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{t(skyLounge.reservationCtaText, 'Reserve at Sky Lounge')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
