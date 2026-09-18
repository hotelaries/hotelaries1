import React from 'react';
import { useSite } from '../context/SiteContext';
import { ArrowRight, Compass, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceSection: React.FC = () => {
  const { siteData, language, t, setCurrentPage } = useSite();
  const { experienceIntro } = siteData.pages;

  return (
    <section id="experience-section" className="py-20 sm:py-28 md:py-36 bg-[#FAF8F5] text-[#23201C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#23201C]/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#9E7D53]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
                {language === 'de' ? 'Südtirol Erleben' : language === 'it' ? 'Vivere l\'Alto Adige' : 'Curated Experiences'}
              </span>
            </div>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight">
              {t(experienceIntro.heading)}
            </h3>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-[#7D7468] font-light leading-relaxed">
              {t(experienceIntro.subtitle)}
            </p>
          </div>
        </div>

        {/* Experiences Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteData.experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between bg-white rounded-xl overflow-hidden border border-[#23201C]/8 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                  <img
                    src={exp.image}
                    alt={t(exp.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-xs text-white text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-medium">
                    {exp.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-[#7D7468]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#9E7D53]" />
                      <span>{exp.duration}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <CalendarDays className="w-3 h-3 text-[#9E7D53]" />
                      <span>{t(exp.season)}</span>
                    </span>
                  </div>

                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-light text-[#1E1B18] group-hover:text-[#9E7D53] transition-colors leading-snug">
                    {t(exp.title)}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#5B544B] font-light leading-relaxed">
                    {t(exp.shortDesc)}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => setCurrentPage('experience')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#9E7D53] group-hover:text-[#7C5F39] transition-colors"
                >
                  <span>{language === 'de' ? 'Mehr erfahren' : language === 'it' ? 'Scopri di più' : 'Read Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#EFECE6] border border-[#23201C]/8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-luxury text-xl sm:text-2xl font-light text-[#1E1B18]">
              {language === 'de' ? 'Individuelle Touren & E-Bike Verleih' : language === 'it' ? 'Tour su Misura & Noleggio E-Bike' : 'Bespoke Itineraries & Complimentary E-Bikes'}
            </h4>
            <p className="text-xs text-[#7D7468] font-light">
              {language === 'de' ? 'Als Gastgeber stellen wir Ihnen personalisierte Empfehlungen und erstklassige E-Bikes zur Verfügung.' : language === 'it' ? 'Come padroni di casa vi offriamo consigli autentici e moderne e-bike per le vostre uscite.' : 'We provide insider trail routes, GPX tracking, and premium e-bikes directly at the residence.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="shrink-0 px-6 py-3 rounded-lg bg-[#1E1B18] hover:bg-[#3D3831] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            {language === 'de' ? 'Aktivitäten Anfragen' : language === 'it' ? 'Richiedi Info' : 'Inquire Activities'}
          </button>
        </div>
      </div>
    </section>
  );
};
