import React from 'react';
import { useSite } from '../context/SiteContext';
import { motion } from 'motion/react';
import { Clock, Utensils, Coffee, Wine } from 'lucide-react';

export const CulinarySection: React.FC = () => {
  const { siteData, language, t } = useSite();
  const { culinaryIntro } = siteData.pages;

  return (
    <section id="culinary-section" className="py-20 sm:py-28 md:py-36 bg-[#F5F2EB] text-[#23201C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#9E7D53]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
              {language === 'de' ? 'Kulinarik & Genuss' : language === 'it' ? 'Gusto & Tradizione' : 'Culinary Culture'}
            </span>
          </div>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight mb-4">
            {t(culinaryIntro.heading)}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[#5B544B] font-light leading-relaxed">
            {t(culinaryIntro.subtext)}
          </p>
        </div>

        {/* Featured Big Showcase Card + 2 Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Large Editorial Breakfast Photo */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-16/11 rounded-2xl overflow-hidden shadow-xl bg-neutral-200"
            >
              <img
                src={siteData.culinary[0]?.image || "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85"}
                alt="Boutique Breakfast at LINGERS"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[10px] uppercase tracking-[0.2em] font-medium mb-2">
                  <Coffee className="w-3 h-3" />
                  <span>07:30 – 11:00</span>
                </div>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl font-light">
                  {t(siteData.culinary[0]?.title)}
                </h4>
                <p className="text-xs sm:text-sm text-white/85 font-light mt-1 max-w-lg">
                  {t(siteData.culinary[0]?.desc)}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Afternoon Delights & Vineyard Aperitivo cards */}
          <div className="lg:col-span-5 space-y-6">
            {siteData.culinary.slice(1).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#FAF8F5] p-6 sm:p-7 rounded-xl border border-[#23201C]/8 shadow-xs flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden shrink-0 bg-neutral-200">
                  <img
                    src={item.image}
                    alt={t(item.title)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E7D53] font-semibold flex items-center gap-1.5">
                      {idx === 0 ? <Utensils className="w-3 h-3" /> : <Wine className="w-3 h-3" />}
                      {item.time}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-light text-[#1E1B18] leading-snug">
                    {t(item.title)}
                  </h4>
                  <p className="text-xs text-[#5B544B] font-light leading-relaxed">
                    {t(item.desc)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
