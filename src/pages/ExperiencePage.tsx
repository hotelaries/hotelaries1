import React from 'react';
import { useSite } from '../context/SiteContext';
import { ExperienceSection } from '../components/ExperienceSection';
import { Compass, Calendar, Mountain, Wine, Bike, Sparkles, ArrowRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();

  const seasons = [
    {
      title: { de: 'Frühling im Rebenmeer', en: 'Spring in the Vineyards', it: 'Primavera tra le Viti' },
      time: { de: 'März – Mai', en: 'March – May', it: 'Marzo – Maggio' },
      desc: {
        de: 'Milde mediterrane Temperaturen, duftende Apfelblüten im Tal und schneebedeckte Bergriesen am Horizont.',
        en: 'Gentle Mediterranean breezes, blooming apple orchards in the valley and snow-capped peaks on the horizon.',
        it: 'Temperature miti, meleti in fiore nella vallata e cime alpine ancora innevate all\'orizzonte.'
      }
    },
    {
      title: { de: 'Alpiner Hochsommer', en: 'Alpine High Summer', it: 'Alta Estate Alpina' },
      time: { de: 'Juni – August', en: 'June – August', it: 'Giugno – Agosto' },
      desc: {
        de: 'Schwimmen im 32°C warmen Infinity Pool, Abkühlung in den Bergseen von Montiggl und laue Sommerabende bei Vernatsch und Kerzenlicht.',
        en: 'Floating in our heated pool, refreshing dips in the crystal Montiggl forest lakes, and balmy candlelit evenings.',
        it: 'Bagni nella piscina riscaldata, nuotate nei laghi di Monticolo e serate stellate con un calice di vino fresco.'
      }
    },
    {
      title: { de: 'Goldener Herbst & Weinlese', en: 'Golden Harvest & Autumn', it: 'Autunno Dorato & Vendemmia' },
      time: { de: 'September – November', en: 'September – November', it: 'Settembre – Novembre' },
      desc: {
        de: 'Die Reben leuchten in tiefem Goldgelb. Törggelen in urigen Buschenschänken, geröstete Kastanien und junge Spitzenweine.',
        en: 'The vine terraces glow in vibrant amber. Traditional Törggelen in rustic wine taverns, roasted sweet chestnuts and rare vintages.',
        it: 'I vigneti si tingono d\'oro. La tradizione del Törggelen, caldarroste e i primi vini novelli nei masi storici.'
      }
    }
  ];

  return (
    <div id="experience-page" className="w-full pt-28 pb-20 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
          {language === 'de' ? 'Überetsch & Dolomiten' : language === 'it' ? 'Oltradige & Dolomiti' : 'South Tyrol Highlights'}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {language === 'de' ? 'Erlebnisse & Weite' : language === 'it' ? 'Esperienze & Territorio' : 'Experiences & Surroundings'}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {language === 'de'
            ? 'Zwischen historischen Weinterrassen, schroffen Dolomitengipfeln und mediterranem Dolce Vita – jeder Tag hält eine neue Entdeckung bereit.'
            : language === 'it'
            ? 'Tra vigneti terrazzati secolari, vette dolomitiche e dolce vita alpina: ogni giornata riserva una nuova emozione.'
            : 'Between historic hillside vineyards, sheer UNESCO Dolomite faces and Mediterranean joie de vivre.'}
        </p>
      </div>

      {/* Main Experience Cards Component */}
      <ExperienceSection />

      {/* Seasons Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-[#23201C]/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
            {language === 'de' ? 'Südtirol im Wandel des Lichts' : language === 'it' ? 'Le Stagioni del Gusto' : 'The Seasons of South Tyrol'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1E1B18] mt-2">
            {language === 'de' ? 'Zu jeder Jahreszeit ein stiller Zauber' : language === 'it' ? 'Un fascino unico in ogni stagione' : 'A Unique Magic in Every Season'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seasons.map((season, idx) => (
            <div key={idx} className="bg-[#F5F2EB] p-8 rounded-2xl border border-[#23201C]/6 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E7D53] font-semibold">
                {t(season.time)}
              </span>
              <h3 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
                {t(season.title)}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B544B] font-light leading-relaxed">
                {t(season.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
