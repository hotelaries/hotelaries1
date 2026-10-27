import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Users, ArrowRight } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const slides = siteData.hero.slides && siteData.hero.slides.length > 0 ? siteData.hero.slides : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<number>(1); // 1 = next, -1 = prev
  const [isFormFocused, setIsFormFocused] = useState(false);

  // Drag and touch gesture state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number; time: number; lockedDirection?: 'x' | 'y' } | null>(null);
  const isPointerDownRef = useRef(false);
  const pointerStartXRef = useRef(0);

  // Booking box dates default to a future date
  const getFormattedDate = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split('T')[0];
  };

  const [arrivalDate, setArrivalDate] = useState(() => getFormattedDate(7));
  const [departureDate, setDepartureDate] = useState(() => getFormattedDate(12));
  const [guestCount, setGuestCount] = useState('2');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Slide navigation
  const nextSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length <= 1) return;
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setSlideDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto-slide: Runs automatically every interval, only paused when user is dragging or focusing booking inputs
  useEffect(() => {
    const isAutoSlideActive = siteData.hero.autoSlide !== false;
    if (!isAutoSlideActive || isDragging || isFormFocused || slides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalSeconds = Math.max(3, siteData.hero.slideIntervalSeconds || 5) * 1000;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalSeconds);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [siteData.hero.autoSlide, siteData.hero.slideIntervalSeconds, isDragging, isFormFocused, slides.length, currentIndex, nextSlide]);

  // Touch event handlers (for finger swipe / drag on mobile and touch devices)
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, select, button, a, #hero-booking-bar')) {
      return;
    }

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    // Detect direction lock on initial swipe so vertical page scroll is preserved
    if (!touchStartRef.current.lockedDirection) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        touchStartRef.current.lockedDirection = Math.abs(diffX) >= Math.abs(diffY) ? 'x' : 'y';
      }
    }

    if (touchStartRef.current.lockedDirection === 'y') {
      return;
    }

    setDragOffset(diffX);
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) return;
    const swipeDistance = dragOffset;
    const swipeTime = Date.now() - touchStartRef.current.time;
    const isFastFlick = swipeTime < 320 && Math.abs(swipeDistance) > 30;

    if (swipeDistance < -45 || (isFastFlick && swipeDistance < 0)) {
      nextSlide();
    } else if (swipeDistance > 45 || (isFastFlick && swipeDistance > 0)) {
      prevSlide();
    }

    touchStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Pointer event handlers (for mouse drag on desktop)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('input, select, button, a, #hero-booking-bar, #hero-prev-btn, #hero-next-btn')) {
      return;
    }

    isPointerDownRef.current = true;
    pointerStartXRef.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const diffX = e.clientX - pointerStartXRef.current;
    setDragOffset(diffX);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (dragOffset < -45) {
      nextSlide();
    } else if (dragOffset > 45) {
      prevSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const currentSlide = slides[currentIndex] || {
    id: 'fallback',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    title: { de: 'ARIES & HOTEL SKY LOUNGE', en: 'ARIES & HOTEL SKY LOUNGE', it: 'ARIES & HOTEL SKY LOUNGE' },
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

  // Slide motion animation
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.05,
      x: dir > 0 ? 50 : -50
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? -50 : 50,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Background Slides with Live Drag Transform & Fluid Transitions */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: isDragging ? `translateX(${dragOffset * 0.65}px)` : 'translateX(0px)',
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <AnimatePresence custom={slideDirection} mode="sync">
          <motion.div
            key={currentSlide.id + currentIndex}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${currentSlide.image}")` }}
          />
        </AnimatePresence>

        {/* Soft Multi-layer Overlays for pristine readability */}
        {siteData.hero.showOverlay !== false && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-black/15 to-black/45 pointer-events-none" />
          </>
        )}
      </div>

      {/* Hero Slide Left/Right subtle Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            id="hero-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-xs text-white/85 hover:text-white hover:border-white/70 hover:bg-black/50 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            id="hero-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-xs text-white/85 hover:text-white hover:border-white/70 hover:bg-black/50 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Top Spacer for fixed Header */}
      <div className="pt-28 md:pt-32" />

      {/* Center Hero Content: Headline & Subtitle */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto transition-transform duration-300"
        style={{
          transform: isDragging ? `translateX(${dragOffset * 0.25}px)` : 'translateX(0px)',
          transition: isDragging ? 'none' : 'transform 0.4s ease-out'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + '-text'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Location / Brand tag in luxury pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-black/35 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D53] animate-pulse" />
              <p className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#FAF8F5]/90 font-sans-clean font-medium">
                {currentSlide.caption
                  ? t(currentSlide.caption)
                  : 'Aries & Hotel Sky Lounge'}
              </p>
            </div>

            {/* Main Headline */}
            <h2
              id="hero-main-title"
              className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.2em] uppercase leading-tight sm:leading-tight drop-shadow-lg"
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

        {/* Slide Counter / Dots Indicator with Slide Drag hint */}
        {slides.length > 1 && (
          <div className="flex flex-col items-center gap-2 mt-6 sm:mt-8">
            <div className="flex items-center justify-center gap-2.5">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  id={`hero-indicator-${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group relative py-2 px-1 transition-all duration-300 flex items-center cursor-pointer"
                >
                  <div
                    className={`h-1 transition-all duration-500 rounded-full ${
                      currentIndex === idx
                        ? 'w-10 bg-white shadow-md'
                        : 'w-3.5 bg-white/40 group-hover:bg-white/75 group-hover:w-6'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Subtle swipe / drag indicator text */}
            <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/60 font-sans-clean">
              <span>{`0${currentIndex + 1} / 0${slides.length}`}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Swipe or drag to explore</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Booking / Search Box */}
      <div
        id="hero-booking-container"
        className="relative z-20 w-full pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
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
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
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
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
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
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
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
                  className="flex-1 py-3 px-3 sm:px-4 rounded-lg border border-[#23201C]/20 hover:border-[#23201C] text-[#23201C] hover:bg-[#23201C]/5 transition-all duration-200 text-center text-xs uppercase tracking-[0.18em] font-medium font-sans-clean cursor-pointer"
                >
                  {t(siteData.hero.buttonInquiryText) || (language === 'de' ? 'Anfrage' : language === 'it' ? 'Richiesta' : 'Inquire')}
                </button>

                {/* Buchen Button */}
                <button
                  type="button"
                  id="hero-buchen-btn"
                  onClick={handleDirectBook}
                  className="flex-1 py-3 px-3 sm:px-4 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-[#FAF8F5] transition-all duration-200 text-center text-xs uppercase tracking-[0.18em] font-medium font-sans-clean flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
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
