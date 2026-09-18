import React from 'react';
import { useSite } from '../context/SiteContext';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialSection: React.FC = () => {
  const { siteData, language, t } = useSite();

  return (
    <section id="testimonials-section" className="py-20 sm:py-28 md:py-36 bg-[#F5F2EB] text-[#23201C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#9E7D53]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
              {language === 'de' ? 'Stimmen & Pressestimmen' : language === 'it' ? 'Riconoscimenti & Recensioni' : 'Praise & Press'}
            </span>
            <span className="w-8 h-px bg-[#9E7D53]" />
          </div>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight">
            {language === 'de' ? 'Was Gäste über LINGERS sagen' : language === 'it' ? 'Cosa dicono di LINGERS' : 'In the Words of Our Guests'}
          </h3>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-[#FAF8F5] p-8 sm:p-9 rounded-2xl border border-[#23201C]/8 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#9E7D53]">
                  {[...Array(test.rating || 5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-7 h-7 text-[#9E7D53]/40" />

                <p className="font-serif-luxury text-lg sm:text-xl text-[#23201C] font-light italic leading-relaxed">
                  "{t(test.quote)}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#23201C]/8 flex items-center justify-between">
                <div>
                  <h5 className="font-sans-clean text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                    {test.author}
                  </h5>
                  <p className="text-[11px] text-[#7D7468]">
                    {test.role}
                  </p>
                </div>
                {test.publication && (
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#9E7D53] font-medium px-2 py-1 bg-[#EFECE6] rounded-md">
                    {test.publication}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
