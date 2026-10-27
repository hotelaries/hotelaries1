import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SuitesPreview } from '../components/SuitesPreview';
import { ShieldCheck, Coffee, Waves, Wifi, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const SuitesPage: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const [filter, setFilter] = useState<'all' | 'suite' | 'apartment' | 'penthouse'>('all');

  const inclusiveServices = [
    {
      icon: Coffee,
      title: { de: 'Feines Frühstück', en: 'Gourmet Breakfast', it: 'Colazione Gourmet' },
      desc: { de: 'Täglich reichhaltiges Buffet & à-la-carte Spezialitäten für einen perfekten Start.', en: 'Fresh daily breakfast spreads and curated specialties to begin your morning.', it: 'Colazione fresca a buffet e specialità à la carte per iniziare al meglio la giornata.' }
    },
    {
      icon: Waves,
      title: { de: 'Sky Lounge Zugang', en: 'Sky Lounge Privileges', it: 'Accesso Sky Lounge' },
      desc: { de: 'Exklusiver Zugang zu unserer stilvollen Sky Lounge mit Panoramablick & Abendcocktails.', en: 'Direct access to our rooftop sky lounge for panoramic sunset views and craft cocktails.', it: 'Accesso prioritario alla sky lounge con vista panoramica e cocktail ricercati.' }
    },
    {
      icon: Sparkles,
      title: { de: '24/7 Concierge & Service', en: '24/7 Front Desk & Concierge', it: 'Concierge & Reception 24/7' },
      desc: { de: 'Rund um die Uhr engagierter Zimmerservice, Gepäckaufbewahrung und persönliche Betreuung.', en: 'Round-the-clock reception, attentive room service, luggage assistance, and warm hospitality.', it: 'Reception 24 ore su 24, servizio in camera dedicato e massima attenzione alle vostre esigenze.' }
    },
    {
      icon: Wifi,
      title: { de: 'High-Speed Glasfaser-WLAN', en: 'High-Speed Fiber Wi-Fi', it: 'Wi-Fi Fibra Ultraveloce' },
      desc: { de: 'Stabiles Highspeed-Internet in allen Zimmern, öffentlichen Bereichen und der Lounge.', en: 'Seamless high-speed wireless connectivity throughout all rooms, suites, and public spaces.', it: 'Connessione internet ultraveloce in tutte le camere, negli spazi comuni e nella lounge.' }
    }
  ];

  return (
    <div id="suites-page" className="w-full pt-28 pb-20 bg-[#FAF8F5]">
      {/* Page Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
          {language === 'de' ? 'Hotel Aries Unterkünfte' : language === 'it' ? 'Camere Hotel Aries' : 'Hotel Aries Accommodations'}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {language === 'de' ? 'Zimmer & Suiten' : language === 'it' ? 'Camere & Suite' : 'Rooms & Suites'}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {language === 'de'
            ? 'Insgesamt 26 stilvoll ausgestattete Zimmer: 24 Deluxe Zimmer und 2 exklusive Supreme Zimmer für gehobenen Komfort.'
            : language === 'it'
            ? '26 alloggi arredati con cura: 24 Camere Deluxe e 2 esclusive Camere Supreme studiate per il massimo comfort.'
            : 'A boutique collection of 26 thoughtfully appointed accommodations: 24 Deluxe Rooms and 2 exclusive Supreme Rooms crafted for elevated comfort.'}
        </p>

        {/* Room Inventory Banner: 26 Rooms (24 Deluxe, 2 Supreme) */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-[#F5F2EB] border border-[#9E7D53]/30 rounded-xl px-6 py-3 text-xs sm:text-sm text-[#1E1B18] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E7D53]"></span>
            <span className="font-medium font-sans-clean uppercase tracking-[0.15em] text-[11px]">Total:</span>
            <span className="font-serif-luxury text-base sm:text-lg font-normal text-[#1E1B18]">26 Rooms</span>
          </div>
          <span className="hidden sm:inline text-[#9E7D53]/40">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[#7D7468] text-[11px] uppercase tracking-[0.12em]">Deluxe:</span>
            <span className="font-serif-luxury text-base font-semibold text-[#9E7D53]">24 Rooms</span>
          </div>
          <span className="hidden sm:inline text-[#9E7D53]/40">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[#7D7468] text-[11px] uppercase tracking-[0.12em]">Supreme:</span>
            <span className="font-serif-luxury text-base font-semibold text-[#9E7D53]">2 Rooms</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => openBookingModal()}
            className="px-6 py-3 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <span>{language === 'de' ? 'Verfügbarkeit prüfen' : language === 'it' ? 'Verifica disponibilità' : 'Check Availability'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suites Catalog Grid (showing all suites) */}
      <SuitesPreview limit={10} showAllButton={false} />

      {/* Included Amenities & Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-[#23201C]/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
            {language === 'de' ? 'Hotel Aries Vorzüge' : language === 'it' ? 'Privilegi Hotel Aries' : 'Hotel Aries Guest Privileges'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1E1B18] mt-2">
            {language === 'de' ? 'Komfort bei jedem Aufenthalt' : language === 'it' ? 'Comfort in ogni soggiorno' : 'Crafted For Seamless Comfort'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inclusiveServices.map((service, sIdx) => {
            const Icon = service.icon;
            return (
              <div
                key={sIdx}
                className="bg-[#F5F2EB] p-6 rounded-xl border border-[#23201C]/6 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#9E7D53]/15 text-[#9E7D53] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
                  {t(service.title)}
                </h4>
                <p className="text-xs text-[#5B544B] font-light leading-relaxed">
                  {t(service.desc)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
