import React from 'react';
import { useSite } from '../context/SiteContext';
import { WellnessSection } from '../components/WellnessSection';
import { Waves, Sparkles, Droplets, Sun, Wind, ArrowRight } from 'lucide-react';

export const WellnessPage: React.FC = () => {
  const { siteData, language, t, openBookingModal } = useSite();

  const spaRituals = [
    {
      title: { de: 'Heimischer Zirben-Aufguss', en: 'Swiss Stone Pine Infusion', it: 'Aufguss al Cirmolo Alpino' },
      temp: '85°C – 90°C',
      desc: { de: 'Reines ätherisches Zirbenöl aus Südtiroler Hochwäldern senkt nachweislich die Herzfrequenz und vertieft den Atem.', en: 'Organic stone pine essence harvested from South Tyrolean high forests gently lowers pulse and deepens breathing.', it: 'Olio essenziale puro di cirmolo dei boschi altoatesini per rallentare il battito e favorire il riposo.' }
    },
    {
      title: { de: 'Bio-Bergkräuter Dampfbad', en: 'Wild Alpine Herb Steam', it: 'Bagno di Vapore alle Erbe' },
      temp: '55°C · 60% Feuchte',
      desc: { de: 'Schonende Wärme angereichert mit Salbei, Thymian und Kamille aus biologischem Anbau im Passeiertal.', en: 'Gentle warmth enriched with wild sage, mountain thyme and chamomile blossoms.', it: 'Calore delicato arricchito con salvia selvatica, timo montano e camomilla biologica.' }
    },
    {
      title: { de: 'Kneipp-Quellwasser Becken', en: 'Kneipp Natural Springs', it: 'Percorso Kneipp di Sorgente' },
      temp: '12°C Quellwasser',
      desc: { de: 'Kristallklares Wasser direkt aus den Porphyr-Quellen zur Aktivierung des Kreislaufs nach dem Saunagang.', en: 'Crystalline mountain spring water straight from porphyry rocks to stimulate circulation after thermal warmth.', it: 'Acqua cristallina di sorgente in pietra porfido per riattivare la circolazione dopo la sauna.' }
    }
  ];

  return (
    <div id="wellness-page" className="w-full pt-28 pb-20 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium font-sans-clean">
          {language === 'de' ? 'Körper, Geist & Wasser' : language === 'it' ? 'Corpo, Mente & Acqua' : 'Body, Mind & Springs'}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-[#1E1B18] mt-2 mb-4 tracking-tight">
          {language === 'de' ? 'Wellness, Pool & Garten' : language === 'it' ? 'Wellness, Piscina & Giardino' : 'Wellness, Pool & Garden'}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5B544B] font-light leading-relaxed">
          {language === 'de'
            ? 'Ein Refugium der bewussten Stille. Ganzjährig beheiztes Quellwasser, duftendes Zirbenholz und weitläufige Liegewiesen zwischen Reben und Zypressen.'
            : language === 'it'
            ? "Un'oasi di quiete consapevole. Acqua di sorgente riscaldata tutto l'anno, profumo di cirmolo e prati appartati tra viti e cipressi."
            : 'A haven of mindful quietude. Year-round heated alpine springs, fragrant timber saunas, and tranquil sun pergolas.'}
        </p>
      </div>

      {/* Main Wellness Section */}
      <WellnessSection />

      {/* Spa Rituals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-[#23201C]/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D53] font-medium font-sans-clean">
            {language === 'de' ? 'Saunarituale & Regeneration' : language === 'it' ? 'Rituali Sauna & Rigenerazione' : 'Thermal Heat & Sauna Rituals'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-[#1E1B18] mt-2">
            {language === 'de' ? 'Tiefe Entspannung nach alpinem Wandern' : language === 'it' ? 'Rigenerazione profonda dopo le escursioni' : 'Deep Restoration After Alpine Days'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaRituals.map((ritual, idx) => (
            <div key={idx} className="bg-[#F5F2EB] p-8 rounded-2xl border border-[#23201C]/6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E7D53] font-semibold">
                  Ritual 0{idx + 1}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 bg-white/80 rounded-md text-[#1E1B18]">
                  {ritual.temp}
                </span>
              </div>
              <h3 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
                {t(ritual.title)}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B544B] font-light leading-relaxed">
                {t(ritual.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
