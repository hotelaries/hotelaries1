import React from 'react';
import { useSite } from '../context/SiteContext';
import { motion } from 'motion/react';
import { ArrowRight, Compass, ShieldCheck, Sun } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const { siteData, language, t, setCurrentPage } = useSite();
  const { intro } = siteData.pages;

  return (
    <section id="intro-section" className="pt-0 pb-20 sm:pb-28 md:pb-36 bg-[#FAF8F5] text-[#23201C] relative overflow-hidden">
      {/* Luxury Curated Highlights Ribbon */}
      <div className="w-full border-b border-[#23201C]/8 bg-[#F5F2EB]/80 py-4 mb-16 sm:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-around gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#7D7468] font-sans-clean font-medium">
          <div className="flex items-center gap-2">
            <span className="text-[#9E7D53]">✦</span>
            <span>Premium Rooms & Suites</span>
          </div>
          <span className="hidden sm:inline text-[#9E7D53]/30">|</span>
          <div className="flex items-center gap-2">
            <span className="text-[#9E7D53]">✦</span>
            <span>Rooftop Sky Lounge</span>
          </div>
          <span className="hidden md:inline text-[#9E7D53]/30">|</span>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[#9E7D53]">✦</span>
            <span>Panoramic Skyline Vistas</span>
          </div>
          <span className="hidden lg:inline text-[#9E7D53]/30">|</span>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[#9E7D53]">✦</span>
            <span>24/7 Dedicated Concierge</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Eyebrow, Large Serif Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#9E7D53]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
                {t(intro.eyebrow)}
              </span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#1E1B18] leading-[1.25] tracking-tight">
              {t(intro.heading)}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#5B544B] font-light leading-relaxed max-w-2xl">
              <p>{t(intro.body1)}</p>
              <p>{t(intro.body2)}</p>
            </div>

            {/* Editorial Quote Block */}
            <div className="pt-2 border-l-2 border-[#9E7D53]/40 pl-5 sm:pl-6 my-6">
              <blockquote className="font-serif-luxury text-lg sm:text-xl md:text-2xl text-[#1E1B18] italic font-light">
                {t(intro.quote)}
              </blockquote>
              <cite className="block text-xs uppercase tracking-[0.2em] text-[#7D7468] not-italic mt-2">
                — {intro.quoteAuthor}
              </cite>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="intro-our-story-btn"
                onClick={() => setCurrentPage('about')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none border border-[#23201C]/25 hover:border-[#23201C] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#23201C] hover:text-white"
              >
                <span>{language === 'de' ? 'Unsere Geschichte' : language === 'it' ? 'La Nostra Storia' : 'Our Story'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="intro-suites-btn"
                onClick={() => setCurrentPage('suites')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#9E7D53] hover:text-[#7C5F39] transition-colors py-3 px-2"
              >
                <span>{language === 'de' ? 'Zimmer & Suiten ansehen' : language === 'it' ? 'Scopri le camere & suite' : 'Explore Rooms & Suites'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Layered Imagery & Boutique Metrics */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-lg aspect-4/5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85"
                  alt="Hotel Aries & Sky Lounge Rooms & Suites"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">{siteData.contact.hotelName}</span>
                  <p className="font-serif-luxury text-lg font-light">Stilvolles Ambiente, moderner Komfort & Weitblick</p>
                </div>
              </div>

              {/* Overlapping Floating Badge with 16 Suites Stat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute -bottom-8 -left-4 sm:-left-8 bg-[#1E1B18] text-[#FAF8F5] p-5 sm:p-6 rounded-lg shadow-2xl border border-white/10 max-w-[200px] sm:max-w-[220px]"
              >
                <div className="flex items-center gap-2 text-[#9E7D53] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Boutique</span>
                </div>
                <div className="font-serif-luxury text-3xl font-light text-white">
                  {intro.statSuites}
                </div>
                <p className="text-[11px] text-white/70 font-light mt-1">
                  {language === 'de' ? 'Für maximale Privatsphäre & persönliche Fürsorge' : language === 'it' ? 'Per la massima riservatezza e quiete' : 'For absolute privacy and curated hospitality'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3 Pillars / Stat Strips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-[#23201C]/10">
          <div className="space-y-2">
            <span className="text-xs font-serif-luxury text-2xl font-light text-[#9E7D53] block">
              16 Private Einheiten
            </span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#1E1B18]">
              {language === 'de' ? 'Boutique Maßstab' : language === 'it' ? 'Dimensione Boutique' : 'Boutique Scale'}
            </h4>
            <p className="text-xs text-[#7D7468] font-light leading-relaxed">
              {language === 'de' ? 'Kein anonymer Massenbetrieb, sondern ein geschützter Raum für achtsames Verweilen.' : language === 'it' ? 'Niente turismo di massa, solo uno spazio riservato per rigenerarsi.' : 'Intimate scale designed for serenity, privacy, and mindful unhurried living.'}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-serif-luxury text-2xl font-light text-[#9E7D53] block">
              {intro.statVineyard}
            </span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#1E1B18]">
              {language === 'de' ? 'Alpin-Mediterranes Klima' : language === 'it' ? 'Clima Alpino-Mediterraneo' : 'Alpine-Mediterranean Sun'}
            </h4>
            <p className="text-xs text-[#7D7468] font-light leading-relaxed">
              {language === 'de' ? 'Milde Lüfte der Südtiroler Weinstraße und schützende Felswände der Dolomiten.' : language === 'it' ? 'Le brezze miti della Strada del Vino e la corona protettiva delle Alpi.' : 'Gentle breezes of the South Tyrolean wine region combined with majestic alpine panoramas.'}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-serif-luxury text-2xl font-light text-[#9E7D53] block">
              Slow Living
            </span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#1E1B18]">
              {language === 'de' ? 'Das Versprechen an Zeit' : language === 'it' ? 'Il Tempo per Sé' : 'The Luxury of Time'}
            </h4>
            <p className="text-xs text-[#7D7468] font-light leading-relaxed">
              {language === 'de' ? 'Vom Morgenschwimmen im beheizten Quellwasser-Pool bis zum Glas Lagrein bei Sonnenuntergang.' : language === 'it' ? 'Dal nuoto mattutino in piscina riscaldata al calice di Lagrein al calar del sole.' : 'From sunrise floating in our heated spring pool to twilight wine tastings among old vines.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
