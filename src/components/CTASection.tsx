import React from 'react';
import { useSite } from '../context/SiteContext';
import { Calendar, Phone, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export const CTASection: React.FC = () => {
  const { siteData, language, t, openBookingModal, setCurrentPage } = useSite();

  return (
    <section id="cta-section" className="relative py-24 sm:py-32 md:py-40 bg-[#1E1B18] text-white overflow-hidden">
      {/* High-res background image with rich dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-[#1E1B18]/80 to-[#1E1B18]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#9E7D53]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
            {siteData.contact.hotelName} · {siteData.contact.subtitle}
          </span>
          <span className="w-8 h-px bg-[#9E7D53]" />
        </div>

        <h3 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.12em] uppercase text-white leading-tight">
          {t(siteData.hero.mainTagline)}
        </h3>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 font-light leading-relaxed">
          {language === 'de'
            ? 'Stilvolle Zimmer & Suiten sowie unsere exklusive Sky Lounge erwarten Sie. Erleben Sie modernen Komfort und herzliche Gastfreundschaft.'
            : language === 'it'
            ? 'Camere raffinate e la nostra esclusiva sky lounge vi aspettano. Scoprite il comfort contemporaneo e un’ospitalità calorosa.'
            : 'Comfortable rooms & suites and an elevated Sky Lounge experience await. Immerse yourself in modern hospitality and panoramic vistas.'}
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="cta-book-btn"
            onClick={() => openBookingModal({ type: 'direct_booking' })}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'de' ? 'Aufenthalt Buchen' : language === 'it' ? 'Prenota Soggiorno' : 'Book Your Stay'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="cta-inquire-btn"
            onClick={() => openBookingModal({ type: 'inquiry' })}
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>{language === 'de' ? 'Unverbindliche Anfrage' : language === 'it' ? 'Invia Richiesta' : 'Send Inquiry'}</span>
          </button>
        </div>

        {/* Contact direct line strip */}
        <div className="pt-6 border-t border-white/10 max-w-lg mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/60">
          <a href={`tel:${siteData.contact.phoneFormatted || '+917259332223'}`} className="flex items-center gap-1.5 hover:text-white transition-colors font-mono">
            <Phone className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>{siteData.contact.phone}</span>
          </a>
          {siteData.contact.phone2 && (
            <>
              <span className="hidden sm:inline">•</span>
              <a href={`tel:${siteData.contact.phone2Formatted || '+918968399764'}`} className="flex items-center gap-1.5 hover:text-white transition-colors font-mono">
                <Phone className="w-3.5 h-3.5 text-[#9E7D53]" />
                <span>{siteData.contact.phone2}</span>
              </a>
            </>
          )}
          <span className="hidden sm:inline">•</span>
          <a href={`mailto:${siteData.contact.email}`} className="hover:text-white transition-colors">
            {siteData.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
};
