import React from 'react';
import { useSite } from '../context/SiteContext';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Waves } from 'lucide-react';

export const WellnessSection: React.FC = () => {
  const { siteData, language, t, setCurrentPage } = useSite();
  const { wellnessIntro } = siteData.pages;

  return (
    <section id="wellness-section" className="py-20 sm:py-28 md:py-36 bg-[#1E1B18] text-[#FAF8F5] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E7D53]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#9E7D53]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
                {language === 'de' ? 'Stille & Wärme' : language === 'it' ? 'Silenzio & Calore' : 'Sanctuary of Stillness'}
              </span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              {t(wellnessIntro.heading)}
            </h3>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              {t(wellnessIntro.subtitle)}
            </p>
          </div>
        </div>

        {/* Feature Cards Grid (Pool, Sauna, Garden) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.wellness.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group flex flex-col justify-between bg-[#26231F] rounded-xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-16/11 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={t(feature.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#9E7D53] font-medium">
                    {t(feature.tag)}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h4 className="font-serif-luxury text-2xl font-light text-white group-hover:text-[#9E7D53] transition-colors">
                    {t(feature.title)}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {t(feature.desc)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setCurrentPage('wellness')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E7D53] hover:text-[#B89768] font-medium transition-colors"
                >
                  <span>{language === 'de' ? 'Mehr entdecken' : language === 'it' ? 'Scopri di più' : 'Explore Wellness'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sensory Quote or Highlight strip */}
        <div className="mt-14 p-8 rounded-xl bg-gradient-to-r from-[#2A2622] to-[#201D1A] border border-white/8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#9E7D53]/20 flex items-center justify-center text-[#9E7D53] shrink-0">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif-luxury text-xl font-light text-white">
                {language === 'de' ? '32°C Beheiztes Quellwasser · Täglich 07:00 – 21:00 Uhr' : language === 'it' ? 'Acqua di Sorgente Riscaldata a 32°C · Tutti i giorni 07:00 – 21:00' : '32°C Heated Mountain Spring Waters · Open Daily 07:00 – 21:00'}
              </h5>
              <p className="text-xs text-white/60 mt-0.5">
                {language === 'de' ? 'Schwimmen unter den Sternen mit Blick auf das leuchtende Tal.' : language === 'it' ? 'Nuotare sotto le stelle ammirando le luci della valle.' : 'Stargazing swim with unobstructed vistas across the valley lights.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('wellness')}
            className="shrink-0 px-6 py-3 rounded-none border border-white/30 hover:border-white hover:bg-white hover:text-[#1E1B18] text-xs uppercase tracking-[0.2em] font-medium transition-all"
          >
            {language === 'de' ? 'Wellness Philosophy' : language === 'it' ? 'Filosofia Wellness' : 'Wellness Philosophy'}
          </button>
        </div>
      </div>
    </section>
  );
};
