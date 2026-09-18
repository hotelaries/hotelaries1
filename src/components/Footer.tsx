import React from 'react';
import { useSite } from '../context/SiteContext';
import { Language } from '../types';
import { ShieldCheck, MapPin, Phone, Mail, Instagram, Facebook, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteData, language, setLanguage, setCurrentPage } = useSite();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#181614] text-[#FAF8F5] pt-16 sm:pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Hotel Identity & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl tracking-[0.25em] font-light text-white uppercase">
                {siteData.contact.hotelName}
              </h2>
              <span className="text-[10px] tracking-[0.35em] text-[#9E7D53] uppercase block mt-1 font-medium">
                {siteData.contact.subtitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-sm">
              {language === 'de'
                ? 'Ein modernes Luxushotel & Sky Lounge mit stilvollen Zimmern & Suiten, gehobener Gastronomie und Panoramablick.'
                : language === 'it'
                ? 'Un moderno hotel di lusso & sky lounge con camere raffinate, gastronomia d’eccellenza e lounge panoramica.'
                : 'A premium hotel and sky lounge offering comfortable luxury rooms & suites, curated dining, and panoramic rooftop hospitality.'}
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteData.contact.instagram ? `https://instagram.com/${siteData.contact.instagram.replace('@', '')}` : '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#9E7D53] hover:border-[#9E7D53] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://facebook.com/${siteData.contact.facebook || ''}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#9E7D53] hover:border-[#9E7D53] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
              {language === 'de' ? 'Navigation' : language === 'it' ? 'Navigazione' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/75 font-light">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('suites')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Zimmer & Suiten' : language === 'it' ? 'Camere & Suite' : 'Rooms & Suites'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('skylounge')} className="hover:text-white transition-colors">
                  Sky Lounge
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('experience')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Erlebnisse' : language === 'it' ? 'Esperienze' : 'Experiences & Leisure'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('wellness')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Ausstattung & Wellness' : language === 'it' ? 'Servizi & Wellness' : 'Amenities & Wellness'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('gallery')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Galerie' : language === 'it' ? 'Galleria' : 'Gallery'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Über das Hotel' : language === 'it' ? 'Chi Siamo' : 'About Hotel'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Kontakt & Anreise' : language === 'it' ? 'Contatto & Posizione' : 'Contact & Location'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
              {language === 'de' ? 'Standort & Kontakt' : language === 'it' ? 'Posizione & Contatto' : 'Location & Inquiries'}
            </h4>
            <div className="space-y-2.5 text-xs text-white/75 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9E7D53] shrink-0 mt-0.5" />
                <span>
                  {siteData.contact.address}
                  {siteData.contact.postalCode && !siteData.contact.address.includes(siteData.contact.postalCode) && (
                    <>
                      <br />
                      {siteData.contact.postalCode} {siteData.contact.city}
                    </>
                  )}
                  <br />
                  {siteData.contact.region}, {siteData.contact.country}
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#9E7D53] shrink-0" />
                <div className="space-y-1">
                  <a href={`tel:${siteData.contact.phoneFormatted || '+917259332223'}`} className="hover:underline font-mono block">
                    {siteData.contact.phone}
                  </a>
                  {siteData.contact.phone2 && (
                    <a href={`tel:${siteData.contact.phone2Formatted || '+918968399764'}`} className="hover:underline font-mono block">
                      {siteData.contact.phone2}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9E7D53] shrink-0" />
                <a href={`mailto:${siteData.contact.email}`} className="hover:underline truncate">
                  {siteData.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Language & Admin Access (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
              {language === 'de' ? 'Sprache' : language === 'it' ? 'Lingua' : 'Language'}
            </h4>
            <div className="flex items-center gap-2">
              {(['de', 'en', 'it'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-md text-xs uppercase font-medium transition-all ${
                    language === lang
                      ? 'bg-[#9E7D53] text-white font-semibold'
                      : 'border border-white/20 text-white/70 hover:border-white/60 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                id="footer-admin-link"
                onClick={() => setCurrentPage('admin')}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-[#9E7D53] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin CMS (/admin)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            <span>© {new Date().getFullYear()} {siteData.contact.hotelName} & {siteData.contact.subtitle}. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-[0.15em] text-[11px]"
          >
            <span>{language === 'de' ? 'Nach oben' : language === 'it' ? 'Torna su' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
