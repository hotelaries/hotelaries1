import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Users, ArrowRight } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const slides = siteData.hero.slides && siteData.hero.slides.length > 0 ? siteData.hero.slides : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Booking box dates default to a future date
  const getFormattedDate = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split('T')[0];
  };

  const [arrivalDate, setArrivalDate] = useState(() => getFormattedDate(7));
  const [departureDate, setDepartureDate] = useState(() => getFormattedDate(12));
  const [guestCount, setGuestCount] = useState('2');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!siteData.hero.autoSlide || isPaused || slides.length <= 1) return;

    const intervalSeconds = (siteData.hero.slideIntervalSeconds || 6) * 1000;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalSeconds);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [siteData.hero.autoSlide, siteData.hero.slideIntervalSeconds, isPaused, slides.length, nextSlide]);

  const currentSlide = slides[currentIndex] || {
    id: 'fallback',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    title: { de: 'HOTEL ARIES', en: 'HOTEL ARIES', it: 'HOTEL ARIES' },
    subtitle: { de: 'SKY LOUNGE · Stilvolle Zimmer & Rooftop Panoramablick', en: 'SKY LOUNGE · Premium Rooms & Rooftop Panorama', it: 'SKY LOUNGE · Camere Raffinate & Terrazza Panoramica' }
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      arrivalDate,
      departureDate,
      adults: parseInt(guestCount, 10) || 2,
      type: 'inquiry'
    });
  };

  const handleDirectBook = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      arrivalDate,
      departureDate,
      adults: parseInt(guestCount, 10) || 2,
      type: 'direct_booking'
    });
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with smooth Crossfade Transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id + currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${currentSlide.image}")` }}
          />
        </AnimatePresence>

        {/* Soft Multi-layer Overlays for pristine luxury readability */}
        {siteData.hero.showOverlay && (
          <>
            {/* Top gradient for header contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70 pointer-events-none" />
            {/* Subtle radial vignette */}
            <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-black/15 to-black/45 pointer-events-none" />
          </>
        )}
      </div>

      {/* Hero Slide Left/Right subtle Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            id="hero-prev-btn"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xs text-white/80 hover:text-white hover:border-white/60 hover:bg-black/40 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="hero-next-btn"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xs text-white/80 hover:text-white hover:border-white/60 hover:bg-black/40 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Top Spacer for fixed Header */}
      <div className="pt-28 md:pt-32" />

      {/* Center Hero Content: Headline & Subtitle */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + '-text'}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Editorial Location tag or caption in luxury pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D53] animate-pulse" />
              <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#FAF8F5]/90 font-sans-clean font-medium">
                {currentSlide.caption
                  ? t(currentSlide.caption)
                  : language === 'de'
                  ? 'Hotel Aries & Sky Lounge'
                  : language === 'it'
                  ? 'Hotel Aries & Sky Lounge'
                  : 'Hotel Aries & Sky Lounge'}
              </p>
            </div>

            {/* Main Tagline: "YOUR PLACE TO LINGER" */}
            <h2
              id="hero-main-title"
              className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.22em] uppercase leading-tight sm:leading-tight drop-shadow-lg"
            >
              {t(currentSlide.title) || t(siteData.hero.mainTagline)}
            </h2>

            {/* Subtitle */}
            <p
              id="hero-main-subtitle"
              className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-[#FAF8F5]/90 font-light tracking-[0.09em] leading-relaxed drop-shadow-md"
            >
              {t(currentSlide.subtitle) || t(siteData.hero.heroSubtitle)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide Counter / Dots Indicator */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                id={`hero-indicator-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`group relative py-2 transition-all duration-300 flex items-center`}
              >
                <div
                  className={`h-0.5 transition-all duration-500 rounded-full ${
                    currentIndex === idx
                      ? 'w-10 bg-white shadow-sm'
                      : 'w-4 bg-white/40 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Booking / Search Box */}
      <div className="relative z-20 w-full pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="hero-booking-bar"
            className="bg-[#FAF8F5]/98 backdrop-blur-lg text-[#23201C] rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl border border-white/80 ring-1 ring-black/5"
          >
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center">
              {/* Field 1: Arrival Date */}
              <div className="md:col-span-3 border-b sm:border-b-0 sm:border-r border-[#23201C]/10 pb-2 sm:pb-0 sm:pr-3">
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-sans-clean font-medium mb-1">
                  {language === 'de' ? 'Anreise' : language === 'it' ? 'Arrivo' : 'Arrival'}
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9E7D53]" />
                  <input
                    id="booking-arrival-input"
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-sans-clean font-medium text-[#1E1B18] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Field 2: Departure Date */}
              <div className="md:col-span-3 border-b sm:border-b-0 md:border-r border-[#23201C]/10 pb-2 sm:pb-0 sm:pr-3">
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-sans-clean font-medium mb-1">
                  {language === 'de' ? 'Abreise' : language === 'it' ? 'Partenza' : 'Departure'}
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9E7D53]" />
                  <input
                    id="booking-departure-input"
                    type="date"
                    value={departureDate}
                    min={arrivalDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-sans-clean font-medium text-[#1E1B18] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Field 3: Guests Selector */}
              <div className="md:col-span-2 border-b sm:border-b-0 md:border-r border-[#23201C]/10 pb-2 sm:pb-0 sm:pr-3">
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[#7D7468] font-sans-clean font-medium mb-1">
                  {language === 'de' ? 'Gäste' : language === 'it' ? 'Ospiti' : 'Guests'}
                </label>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#9E7D53]" />
                  <select
                    id="booking-guests-select"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-sans-clean font-medium text-[#1E1B18] focus:outline-none cursor-pointer"
                  >
                    <option value="1">1 {language === 'de' ? 'Gast' : language === 'it' ? 'Ospite' : 'Guest'}</option>
                    <option value="2">2 {language === 'de' ? 'Gäste' : language === 'it' ? 'Ospiti' : 'Guests'}</option>
                    <option value="3">3 {language === 'de' ? 'Gäste' : language === 'it' ? 'Ospiti' : 'Guests'}</option>
                    <option value="4">4 {language === 'de' ? 'Gäste' : language === 'it' ? 'Ospiti' : 'Guests'}</option>
                  </select>
                </div>
              </div>

              {/* Buttons: Anfrage & Buchen */}
              <div className="md:col-span-4 flex items-center gap-2 sm:gap-2.5 pt-1 sm:pt-0">
                {/* Anfrage Button */}
                <button
                  type="button"
                  id="hero-anfrage-btn"
                  onClick={handleInquiry}
                  className="flex-1 py-3 px-3 sm:px-4 rounded-lg border border-[#23201C]/20 hover:border-[#23201C] text-[#23201C] hover:bg-[#23201C]/5 transition-all duration-200 text-center text-xs uppercase tracking-[0.18em] font-medium font-sans-clean"
                >
                  {t(siteData.hero.buttonInquiryText) || (language === 'de' ? 'Anfrage' : language === 'it' ? 'Richiesta' : 'Inquire')}
                </button>

                {/* Buchen Button */}
                <button
                  type="button"
                  id="hero-buchen-btn"
                  onClick={handleDirectBook}
                  className="flex-1 py-3 px-3 sm:px-4 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-[#FAF8F5] transition-all duration-200 text-center text-xs uppercase tracking-[0.18em] font-medium font-sans-clean flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>{t(siteData.hero.buttonBookText) || (language === 'de' ? 'Buchen' : language === 'it' ? 'Prenota' : 'Book Now')}</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Subtle Luxury Scroll Cue */}
      <div className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none opacity-70">
        <div className="w-px h-4 bg-gradient-to-b from-[#FAF8F5]/80 via-[#9E7D53] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
