import React from 'react';
import { useSite } from '../context/SiteContext';
import { Heart, Compass, Sparkles, Trees, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();
  const { aboutStory } = siteData.pages;

  return (
    <div id="about-page" className="w-full pt-28 pb-20 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
          {language === 'de' ? 'Das Hotel & Unser Team' : language === 'it' ? 'L\'Hotel & Il Nostro Team' : 'The Hotel & Our Team'}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {t(aboutStory.title)}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {t(aboutStory.subtitle)}
        </p>
      </div>

      {/* Main Narrative & Host Portrait */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-[#3D3831] font-light leading-relaxed">
            <p>{t(aboutStory.storyP1)}</p>
            <p>{t(aboutStory.storyP2)}</p>
            <p>{t(aboutStory.storyP3)}</p>

            <div className="pt-4 border-t border-[#23201C]/10 flex items-center justify-between">
              <div>
                <h4 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
                  {aboutStory.hostName}
                </h4>
                <span className="text-xs uppercase tracking-[0.2em] text-[#9E7D53]">
                  {t(aboutStory.hostRole)}
                </span>
              </div>
              <button
                onClick={() => openBookingModal()}
                className="px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-lg transition-colors"
              >
                {language === 'de' ? 'Kontakt aufnehmen' : language === 'it' ? 'Scrivici' : 'Get in Touch'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-2xl bg-neutral-200">
              <img
                src={aboutStory.hostImage}
                alt={aboutStory.hostName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">{siteData.contact.hotelName} & {siteData.contact.subtitle}</span>
                <p className="font-serif-luxury text-xl font-light">„Warm hospitality, elevated rooftop moments, and lasting memories.“</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainable Craftsmanship & Architecture */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-[#23201C]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F5F2EB] p-8 rounded-2xl border border-[#23201C]/6 space-y-3">
            <Trees className="w-6 h-6 text-[#9E7D53]" />
            <h4 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
              {language === 'de' ? 'Zeitlose Architektur' : language === 'it' ? 'Architettura Moderna' : 'Contemporary Design'}
            </h4>
            <p className="text-xs text-[#5B544B] font-light leading-relaxed">
              {language === 'de' ? 'Klarheit im Raumkonzept, akustischer Komfort und hochwertige Materialien für ein vollendetes Wohnerlebnis.' : 'Clean architectural lines, acoustic tranquility, and premium natural finishes creating a soothing environment.'}
            </p>
          </div>

          <div className="bg-[#F5F2EB] p-8 rounded-2xl border border-[#23201C]/6 space-y-3">
            <Sparkles className="w-6 h-6 text-[#9E7D53]" />
            <h4 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
              {language === 'de' ? 'Sky Lounge & Rooftop' : language === 'it' ? 'Sky Lounge & Rooftop' : 'Sky Lounge Culture'}
            </h4>
            <p className="text-xs text-[#5B544B] font-light leading-relaxed">
              {language === 'de' ? 'Ein eleganter Treffpunkt über den Dächern mit spektakulärem Rundumblick, erstklassigen Drinks und stilvoller Musik.' : 'An elevated destination offering panoramic sunset views, artisan mixology, fine wines, and refined lounge music.'}
            </p>
          </div>

          <div className="bg-[#F5F2EB] p-8 rounded-2xl border border-[#23201C]/6 space-y-3">
            <Heart className="w-6 h-6 text-[#9E7D53]" />
            <h4 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
              {language === 'de' ? 'Hingebungsvoller Service' : language === 'it' ? 'Servizio Dedicato' : 'Attentive Hospitality'}
            </h4>
            <p className="text-xs text-[#5B544B] font-light leading-relaxed">
              {language === 'de' ? 'Unser Team begleitet Sie von der ersten Buchungsanfrage bis zum Check-out mit Diskretion und Herzlichkeit.' : 'Our team attends to your every request with genuine warmth, discretion, and round-the-clock dedication.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
