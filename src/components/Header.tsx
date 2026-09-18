import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Language } from '../types';
import { Menu, X, Phone, Calendar, Heart, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  isHeroPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isHeroPage = true }) => {
  const { siteData, language, setLanguage, currentPage, setCurrentPage, openBookingModal } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: { de: 'Home', en: 'Home', it: 'Home' } },
    { key: 'suites', label: { de: 'Zimmer & Suiten', en: 'Rooms & Suites', it: 'Camere & Suite' } },
    { key: 'skylounge', label: { de: 'Sky Lounge', en: 'Sky Lounge', it: 'Sky Lounge' } },
    { key: 'experience', label: { de: 'Erlebnisse', en: 'Experiences', it: 'Esperienze' } },
    { key: 'wellness', label: { de: 'Ausstattung & Wellness', en: 'Amenities & Wellness', it: 'Servizi & Wellness' } },
    { key: 'gallery', label: { de: 'Galerie', en: 'Gallery', it: 'Galleria' } },
    { key: 'about', label: { de: 'Über das Hotel', en: 'About Hotel', it: 'Chi Siamo' } },
    { key: 'contact', label: { de: 'Kontakt & Anreise', en: 'Contact & Location', it: 'Contatto & Posizione' } },
  ];

  const handleNavClick = (pageKey: string) => {
    setCurrentPage(pageKey);
    setIsMenuOpen(false);
  };

  const isLight = !isHeroPage || isScrolled;

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out ${
          isLight
            ? 'bg-[#FAF8F5]/96 backdrop-blur-md shadow-xs border-b border-[#9E7D53]/20 text-[#23201C] py-3.5 sm:py-4'
            : 'bg-gradient-to-b from-black/65 via-black/30 to-transparent text-white py-5 sm:py-6 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Top-Left: Hamburger Menu Button */}
          <div className="flex items-center gap-3">
            <button
              id="header-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-full border transition-all duration-300 ${
                isLight
                  ? 'border-[#23201C]/15 hover:border-[#23201C]/40 hover:bg-[#23201C]/5 text-[#23201C]'
                  : 'border-white/25 hover:border-white/70 hover:bg-white/10 text-white'
              }`}
            >
              <Menu className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.2em] font-medium font-sans-clean">
                {language === 'de' ? 'Menü' : language === 'it' ? 'Menu' : 'Menu'}
              </span>
            </button>
          </div>

          {/* Top-Middle: Centered HOTEL ARIES & SKY LOUNGE Logo */}
          <div className="flex flex-col items-center justify-center text-center cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <h1
              id="header-hotel-title"
              className={`font-serif-luxury text-xl sm:text-2xl md:text-3xl tracking-[0.24em] uppercase font-light transition-all duration-300 ${
                isLight ? 'text-[#1E1B18]' : 'text-white drop-shadow-xs'
              }`}
            >
              {siteData.contact.hotelName || 'HOTEL ARIES'}
            </h1>
            <span
              id="header-hotel-subtitle"
              className={`text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-light mt-0.5 transition-colors duration-300 ${
                isLight ? 'text-[#7D7468]' : 'text-white/85'
              }`}
            >
              {siteData.contact.subtitle || 'SKY LOUNGE'}
            </span>
          </div>

          {/* Top-Right: Phone, Booking / Favorite Icon, Language Selector */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Phone Quick Action with Popup */}
            <div className="relative">
              <button
                id="header-phone-btn"
                onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                aria-label="Call Hotel"
                className={`p-2 rounded-full border transition-all duration-300 ${
                  isLight
                    ? 'border-[#23201C]/15 hover:border-[#23201C]/40 text-[#23201C] hover:bg-[#23201C]/5'
                    : 'border-white/25 hover:border-white/70 text-white hover:bg-white/10'
                }`}
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <AnimatePresence>
                {isPhoneDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-72 bg-[#FAF8F5] text-[#23201C] rounded-lg shadow-xl p-4 border border-[#23201C]/10 z-50"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7D7468] mb-2 font-sans-clean font-semibold">
                      {language === 'de' ? 'Direkter Kontakt' : language === 'it' ? 'Contatto Diretto' : 'Direct Line & Inquiries'}
                    </p>
                    <div className="space-y-1.5 pb-2 border-b border-[#23201C]/10">
                      <a
                        href={`tel:${siteData.contact.phoneFormatted || '+917259332223'}`}
                        className="block text-sm font-serif-luxury font-medium text-[#1E1B18] hover:text-[#9E7D53] transition-colors"
                      >
                        {siteData.contact.phone || '72593 32223'}
                      </a>
                      {siteData.contact.phone2 && (
                        <a
                          href={`tel:${siteData.contact.phone2Formatted || '+918968399764'}`}
                          className="block text-sm font-serif-luxury font-medium text-[#1E1B18] hover:text-[#9E7D53] transition-colors"
                        >
                          {siteData.contact.phone2}
                        </a>
                      )}
                    </div>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="block text-xs text-[#7D7468] hover:text-[#9E7D53] transition-colors pt-2 truncate font-mono"
                    >
                      {siteData.contact.email}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Inquiry / Book CTA Icon Button */}
            <button
              id="header-inquiry-btn"
              onClick={() => openBookingModal()}
              aria-label="Direct Booking or Inquiry"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] tracking-[0.15em] uppercase font-sans-clean font-medium transition-all duration-300 ${
                isLight
                  ? 'border-[#9E7D53] text-[#9E7D53] hover:bg-[#9E7D53] hover:text-white'
                  : 'border-white/40 text-white hover:bg-white hover:text-[#1E1B18]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'de' ? 'Anfrage' : language === 'it' ? 'Richiesta' : 'Inquire'}</span>
            </button>

            {/* Language Selector (DE / EN / IT) */}
            <div
              id="header-lang-selector"
              className={`flex items-center rounded-full p-0.5 text-[11px] font-sans-clean font-medium tracking-wider border transition-colors duration-300 ${
                isLight ? 'border-[#23201C]/15 bg-[#23201C]/5' : 'border-white/25 bg-black/25 backdrop-blur-xs'
              }`}
            >
              {(['de', 'en', 'it'] as Language[]).map((lang) => {
                const isActive = language === lang;
                return (
                  <button
                    key={lang}
                    id={`lang-btn-${lang}`}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] uppercase transition-all duration-200 ${
                      isActive
                        ? isLight
                          ? 'bg-white text-[#1E1B18] shadow-xs font-semibold'
                          : 'bg-white text-[#1E1B18] font-semibold'
                        : isLight
                        ? 'text-[#7D7468] hover:text-[#1E1B18]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Navigation Drawer Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="nav-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#1E1B18]/95 backdrop-blur-xl text-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-y-auto"
          >
            {/* Top Bar inside drawer */}
            <div className="flex items-center justify-between max-w-6xl mx-auto w-full border-b border-white/10 pb-6">
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.25em] font-light">
                  {siteData.contact.hotelName}
                </span>
                <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase">
                  {siteData.contact.subtitle}
                </span>
              </div>
              <button
                id="nav-drawer-close-btn"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 transition-colors text-xs uppercase tracking-[0.2em]"
              >
                <span>{language === 'de' ? 'Schließen' : language === 'it' ? 'Chiudi' : 'Close'}</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links and Editorial Layout */}
            <div className="max-w-6xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col space-y-4 sm:space-y-6">
                {navItems.map((item, idx) => {
                  const isActive = currentPage === item.key;
                  return (
                    <button
                      key={item.key}
                      id={`drawer-nav-${item.key}`}
                      onClick={() => handleNavClick(item.key)}
                      className="group text-left flex items-baseline gap-4 sm:gap-6 transition-all duration-300"
                    >
                      <span className="text-xs sm:text-sm font-sans-clean text-[#9E7D53] tracking-widest opacity-60 group-hover:opacity-100">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.06em] transition-all duration-300 ${
                          isActive
                            ? 'text-[#9E7D53] translate-x-2'
                            : 'text-white/90 group-hover:text-white group-hover:translate-x-3'
                        }`}
                      >
                        {item.label[language] || item.label.en}
                      </span>
                    </button>
                  );
                })}

                {/* Admin direct link */}
                <button
                  id="drawer-nav-admin"
                  onClick={() => handleNavClick('admin')}
                  className="pt-4 text-left flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-[#9E7D53] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management Console (/admin)</span>
                </button>
              </div>

              {/* Right column in drawer: Highlights & Reservation Info */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 space-y-6 text-sm text-white/75">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] mb-2 font-medium">
                    {language === 'de' ? 'Unser Refugium' : language === 'it' ? 'Il Nostro Rifugio' : 'The Retreat'}
                  </h4>
                  <p className="font-light leading-relaxed text-xs sm:text-sm text-white/70">
                    {siteData.contact.hotelName} – {siteData.contact.subtitle}
                    <br />
                    {siteData.contact.address}
                    <br />
                    {siteData.contact.postalCode} {siteData.contact.city}
                    <br />
                    {siteData.contact.region}, {siteData.contact.country}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] mb-2 font-medium">
                    {language === 'de' ? 'Persönliche Buchung' : language === 'it' ? 'Prenotazione Diretta' : 'Reservations'}
                  </h4>
                  <p className="text-xs text-white/70 space-y-1">
                    <a href={`tel:${siteData.contact.phoneFormatted || '+917259332223'}`} className="hover:underline block font-mono">
                      {siteData.contact.phone}
                    </a>
                    {siteData.contact.phone2 && (
                      <a href={`tel:${siteData.contact.phone2Formatted || '+918968399764'}`} className="hover:underline block font-mono">
                        {siteData.contact.phone2}
                      </a>
                    )}
                    <a href={`mailto:${siteData.contact.email}`} className="hover:underline block font-mono pt-1 text-white/60">
                      {siteData.contact.email}
                    </a>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openBookingModal();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#9E7D53] hover:bg-[#8C6D44] text-[#FAF8F5] py-3 px-6 rounded-none text-xs uppercase tracking-[0.25em] font-medium transition-colors"
                  >
                    <span>{language === 'de' ? 'Jetzt Anfragen' : language === 'it' ? 'Richiedi Ora' : 'Inquire Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar in drawer */}
            <div className="max-w-6xl mx-auto w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
              <span>© {new Date().getFullYear()} {siteData.contact.hotelName} & {siteData.contact.subtitle}</span>
              <div className="flex items-center gap-6">
                <a href={siteData.contact.instagram ? `https://instagram.com/${siteData.contact.instagram.replace('@', '')}` : '#'} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#contact" onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors">
                  {language === 'de' ? 'Anreise' : language === 'it' ? 'Posizione' : 'Directions'}
                </a>
                <span className="font-mono text-[10px] text-white/30">GPS: {siteData.contact.coordinates}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
