import React, { useState, useEffect } from 'react';
import { PageContent, Language, MultiLangText } from '../../types';
import { ImageUploader } from './ImageUploader';
import {
  BookOpen,
  Sparkles,
  Layers,
  Search,
  Eye,
  Check,
  ExternalLink,
  Save,
  Globe,
  User,
  Quote,
  Sliders,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-react';

interface PagesManagerProps {
  pages: PageContent;
  lang: Language;
  onSave: (updatedPages: PageContent) => void | Promise<void>;
  onViewLiveAbout?: () => void;
  onViewLiveHome?: () => void;
}

export const PagesManager: React.FC<PagesManagerProps> = ({
  pages,
  lang: initialLang,
  onSave,
  onViewLiveAbout,
  onViewLiveHome
}) => {
  const [activeLang, setActiveLang] = useState<Language>(initialLang);
  const [activeSubTab, setActiveSubTab] = useState<'about' | 'intro' | 'sections' | 'seo' | 'preview'>('about');
  const [activeSectionSubTab, setActiveSectionSubTab] = useState<'suites' | 'experiences' | 'culinary' | 'wellness'>('suites');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronize when parent changes language
  useEffect(() => {
    setActiveLang(initialLang);
  }, [initialLang]);

  // Safe normalized state with complete fallbacks
  const [formData, setFormData] = useState<PageContent>(() => {
    const raw = pages || ({} as any);
    return {
      intro: {
        eyebrow: {
          de: raw.intro?.eyebrow?.de || 'REFUGIUM SÜDTIROL',
          en: raw.intro?.eyebrow?.en || 'SOUTH TYROLEAN REFUGE',
          it: raw.intro?.eyebrow?.it || 'RIFUGIO IN ALTO ADIGE'
        },
        heading: {
          de: raw.intro?.heading?.de || 'Ein intimes Hideaway mit nur 16 Suiten & Apartments – eingebettet in jahrhundertealte Weinberge.',
          en: raw.intro?.heading?.en || 'An intimate sanctuary of just 16 suites & apartments – nestled amidst centuries-old vineyards.',
          it: raw.intro?.heading?.it || 'Un intimo rifugio di sole 16 suite e appartamenti – incastonato tra vigneti secolari.'
        },
        body1: {
          de: raw.intro?.body1?.de || 'LINGERS ist mehr als ein Boutique-Hotel. Es ist ein stilles Versprechen an das Verweilen: Wo der Blick über sanfte Rebhänge und die schroffen Zinnen der Dolomiten schweift, atmet der Geist auf.',
          en: raw.intro?.body1?.en || 'LINGERS is more than a boutique hotel. It is a quiet invitation to linger: where views unfurl over sun-dappled vine terraces and jagged Dolomite peaks, the soul naturally slows.',
          it: raw.intro?.body1?.it || 'LINGERS è più di un boutique hotel. È un invito discreto a fermarsi: dove lo sguardo spazia sui vigneti dorati e le guglie dolomitiche, la mente ritrova serenità.'
        },
        body2: {
          de: raw.intro?.body2?.de || 'Mit lediglich 16 Einheiten garantieren wir eine Atmosphäre absoluter Privatheit und persönlicher Fürsorge. Zeitgenössische Architektur aus Naturstein und heimischer Lärche verschmilzt organisch mit der alpinen Kulturlandschaft.',
          en: raw.intro?.body2?.en || 'With only 16 curated suites and apartments, we preserve an atmosphere of rare intimacy and attentive hospitality. Contemporary architecture in local stone and larch blends effortlessly into the alpine landscape.',
          it: raw.intro?.body2?.it || 'Con sole 16 unità abitative, garantiamo un\'atmosfera di rara privacy e accoglienza su misura. L\'architettura contemporanea in pietra e larice si fonde armonicamente con il paesaggio alpino.'
        },
        quote: {
          de: raw.intro?.quote?.de || '„Verweilen heißt nicht stehenbleiben, sondern dem Schönen Zeit schenken.“',
          en: raw.intro?.quote?.en || '“To linger does not mean to pause life, but to give beauty the time it deserves.”',
          it: raw.intro?.quote?.it || '“Fermarsi non significa restare immobili, ma donare al bello il tempo che merita.”'
        },
        quoteAuthor: raw.intro?.quoteAuthor || 'Familie Mair & das LINGERS Team',
        statSuites: raw.intro?.statSuites || '16 Suiten',
        statVineyard: raw.intro?.statVineyard || '300 Sonnentage',
        statSunDays: raw.intro?.statSunDays || '100% Ruhe'
      },
      suitesIntro: {
        heading: {
          de: raw.suitesIntro?.heading?.de || 'Suiten & Apartments',
          en: raw.suitesIntro?.heading?.en || 'Suites & Apartments',
          it: raw.suitesIntro?.heading?.it || 'Suite & Appartamenti'
        },
        subtitle: {
          de: raw.suitesIntro?.subtitle?.de || 'Reduzierte Eleganz, natürliche Texturen und raumhohe Ausblicke auf das Südtiroler Weinland.',
          en: raw.suitesIntro?.subtitle?.en || 'Understated elegance, raw organic textures and ceiling-high panoramic vistas of South Tyrolean vineyards.',
          it: raw.suitesIntro?.subtitle?.it || 'Eleganza essenziale, texture naturali e vetrate a tutta altezza con vista sui vigneti.'
        }
      },
      experienceIntro: {
        heading: {
          de: raw.experienceIntro?.heading?.de || 'Erlebnisse & Weite',
          en: raw.experienceIntro?.heading?.en || 'Experiences & Surroundings',
          it: raw.experienceIntro?.heading?.it || 'Esperienze & Territorio'
        },
        subtitle: {
          de: raw.experienceIntro?.subtitle?.de || 'Die Südtiroler Weinstraße entdecken – zwischen Zypressenalleen, Bergseen und alpinem Hochgefühl.',
          en: raw.experienceIntro?.subtitle?.en || 'Discover the South Tyrolean Wine Road – nestled between cypress paths, alpine lakes and exhilarating heights.',
          it: raw.experienceIntro?.subtitle?.it || 'Scoprite la Strada del Vino dell\'Alto Adige – tra viali di cipressi, laghi alpini e vette incantate.'
        }
      },
      culinaryIntro: {
        heading: {
          de: raw.culinaryIntro?.heading?.de || 'Frühstück & Nachmittags-Genuss',
          en: raw.culinaryIntro?.heading?.en || 'Breakfast & Afternoon Delights',
          it: raw.culinaryIntro?.heading?.it || 'Colazione & Delizie Pomeridiane'
        },
        subtitle: {
          de: raw.culinaryIntro?.subtitle?.de || 'Gelebte Regionalität, handverlesene Zutaten und stille Momente auf der Sonnenterrasse.',
          en: raw.culinaryIntro?.subtitle?.en || 'Rooted regionality, handpicked local produce and unhurried mornings on our sun terrace.',
          it: raw.culinaryIntro?.subtitle?.it || 'Autenticità del territorio, ingredienti scelti e momenti di quiete sulla terrazza panoramica.'
        },
        subtext: {
          de: raw.culinaryIntro?.subtext?.de || 'Wir glauben an ehrliche Kulinarik ohne Chichi: Produkte von benachbarten Bergbauernhöfen, duftender Espresso und feinster Wein direkt aus den Lagen um das Haus.',
          en: raw.culinaryIntro?.subtext?.en || 'We believe in honest, grounded cuisine: farm-fresh artisanal eggs, mountain cheeses from high pastures, and boutique wines harvested right around the estate.',
          it: raw.culinaryIntro?.subtext?.it || 'Crediamo in una cucina schietta e sincera: prodotti dei masi alpini vicini, caffè aromatico e i migliori vini delle colline circostanti.'
        }
      },
      wellnessIntro: {
        heading: {
          de: raw.wellnessIntro?.heading?.de || 'Wellness, Pool & Garten',
          en: raw.wellnessIntro?.heading?.en || 'Wellness, Pool & Garden',
          it: raw.wellnessIntro?.heading?.it || 'Wellness, Piscina & Giardino'
        },
        subtitle: {
          de: raw.wellnessIntro?.subtitle?.de || 'Ein Refugium der Ruhe für alle Sinne – ganzjährig beheizter Pool, Saunawärme und Liegewiesen.',
          en: raw.wellnessIntro?.subtitle?.en || 'A sensory sanctuary of stillness – year-round heated pool, therapeutic sauna heat and fragrant lawns.',
          it: raw.wellnessIntro?.subtitle?.it || 'Un\'oasi di pace per tutti i sensi – piscina riscaldata tutto l\'anno, sauna purificante e giardini fioriti.'
        },
        subtext: {
          de: raw.wellnessIntro?.subtext?.de || 'Kein lauter Spa-Rummel, sondern diskrete Entspannung. Lassen Sie den Blick über das Tal schweifen, während warmes Quellwasser Ihren Körper umhüllt.',
          en: raw.wellnessIntro?.subtext?.en || 'No crowded spa commotion, but rather bespoke tranquility. Rest your gaze upon the valley as warm alpine spring waters cocoon you.',
          it: raw.wellnessIntro?.subtext?.it || 'Nessun trambusto, solo pura tranquillità. Lasciate che lo sguardo si perda sulla valle mentre l\'acqua calda culla ogni pensiero.'
        }
      },
      aboutStory: {
        title: {
          de: raw.aboutStory?.title?.de || 'Unsere Geschichte & Philosophie',
          en: raw.aboutStory?.title?.en || 'Our Story & Philosophy',
          it: raw.aboutStory?.title?.it || 'La Nostra Storia & Filosofia'
        },
        subtitle: {
          de: raw.aboutStory?.subtitle?.de || 'Verwurzelt im Überetsch, gestaltet für anspruchsvolle Reisende.',
          en: raw.aboutStory?.subtitle?.en || 'Rooted in Überetsch viticulture, crafted for discerning wanderers.',
          it: raw.aboutStory?.subtitle?.it || 'Radicata nella tradizione dell\'Oltradige, creata per viaggiatori consapevoli.'
        },
        storyP1: {
          de: raw.aboutStory?.storyP1?.de || 'Aufgewachsen zwischen den Reben von Kaltern, hegten wir schon lange den Traum eines Ortes, an dem die Zeit langsamer fließt. Wo Gäste nicht nur übernachten, sondern ankommen, durchatmen und verweilen – daher der Name LINGERS.',
          en: raw.aboutStory?.storyP1?.en || 'Raised amidst the grapevines of Kaltern, we long harbored the vision of a haven where time gently unfurls. A destination where guests do not simply sleep, but arrive, exhale and truly linger – hence our name LINGERS.',
          it: raw.aboutStory?.storyP1?.it || 'Cresciuti tra le vigne di Caldaro, abbiamo sempre coltivato il sogno di un luogo in cui il tempo rallenta. Dove non si viene solo a dormire, ma ad approdare, respirare e indugiare – da qui il nome LINGERS.'
        },
        storyP2: {
          de: raw.aboutStory?.storyP2?.de || 'Gemeinsam mit lokalen Architekten und Handwerkern haben wir das Gebäude behutsam in die topografischen Terrassen des Weinbergs eingefügt. Verwendet wurden unbehandeltes Südtiroler Lärchenholz, Porphyr-Stein und mineralische Kalkputze.',
          en: raw.aboutStory?.storyP2?.en || 'Together with regional architects and artisans, we gently sculpted the retreat into the terraced topography of the vineyard. We honored local untreated larch timber, porphyry stone, and breathable lime plasters.',
          it: raw.aboutStory?.storyP2?.it || 'Insieme ad architetti e maestri artigiani locali, abbiamo inserito armoniosamente la struttura nei terrazzamenti della collina vitata, usando larice locale, pietra porfido e intonaci naturali.'
        },
        storyP3: {
          de: raw.aboutStory?.storyP3?.de || 'Heute empfangen wir als Gastgeberfamilie Reisende aus aller Welt mit diskretem Luxus, persönlicher Beratung für unverfälschte Naturerlebnisse und einem echten Lächeln.',
          en: raw.aboutStory?.storyP3?.en || 'Today, as a family of hosts, we welcome guests from across the globe with discreet luxury, personalized insider recommendations for untouched alpine paths, and genuine warmth.',
          it: raw.aboutStory?.storyP3?.it || 'Oggi, come famiglia di albergatori, accogliamo viaggiatori da tutto il mondo con lusso discreto, consigli preziosi per escursioni autentiche e un sorriso sincero.'
        },
        hostName: raw.aboutStory?.hostName || 'Katharina & Andreas Mair',
        hostRole: {
          de: raw.aboutStory?.hostRole?.de || 'Gastgeber & Gründer',
          en: raw.aboutStory?.hostRole?.en || 'Hosts & Founders',
          it: raw.aboutStory?.hostRole?.it || 'Host & Fondatori'
        },
        hostImage: raw.aboutStory?.hostImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
      },
      seo: {
        metaTitle: raw.seo?.metaTitle || 'LINGERS – Suites & Residence | Boutique Hotel South Tyrol',
        metaDescription: raw.seo?.metaDescription || 'Boutique luxury hotel in South Tyrol with 16 exclusive suites, heated outdoor infinity pool, vineyard setting, breakfast & afternoon delights.',
        keywords: raw.seo?.keywords || 'Boutique Hotel Südtirol, Suites South Tyrol, Kaltern, Kalterer See, Luxury Residence, Infinity Pool, Wine hotel, Dolomites',
        ogImage: raw.seo?.ogImage || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
      }
    };
  });

  const handleSave = async (dataToSave = formData) => {
    setIsSaving(true);
    try {
      await onSave(dataToSave);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving pages:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Helper for multi-language updates
  const updateMultiLang = (
    section: keyof PageContent,
    field: string,
    langCode: Language,
    val: string
  ) => {
    setFormData((prev) => {
      const sectionObj = { ...(prev[section] as any) };
      const fieldObj: MultiLangText = { ...(sectionObj[field] || { de: '', en: '', it: '' }) };
      fieldObj[langCode] = val;
      sectionObj[field] = fieldObj;
      return {
        ...prev,
        [section]: sectionObj
      };
    });
  };

  const getLangName = (code: Language) => {
    if (code === 'de') return 'Deutsch (DE)';
    if (code === 'en') return 'English (EN)';
    return 'Italiano (IT)';
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & ACTION TOOLBAR */}
      <div className="bg-white rounded-2xl border border-[#23201C]/10 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#9E7D53]/10 text-[#9E7D53] border border-[#9E7D53]/20">
              <Sparkles className="w-3 h-3" /> Brand Editorial & Storytelling
            </span>
            <span className="text-[11px] text-[#7D7468]">Alto Adige Luxury Retreat</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] tracking-tight">
            Brand Story, Pages & Narratives
          </h2>
          <p className="text-xs sm:text-sm text-[#5B544B] mt-1 max-w-2xl font-light">
            Manage the About Story, Hosts Biography, Homepage Architecture Manifesto, Section Introductions, and SEO Metadata.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          {onViewLiveAbout && (
            <button
              type="button"
              onClick={onViewLiveAbout}
              className="px-3.5 py-2 rounded-xl border border-[#23201C]/15 bg-[#FAF8F5] hover:bg-[#F5F2EB] text-[#1E1B18] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7D53]" />
              <span className="hidden sm:inline">View About Page</span>
            </button>
          )}

          {onViewLiveHome && (
            <button
              type="button"
              onClick={onViewLiveHome}
              className="px-3.5 py-2 rounded-xl border border-[#23201C]/15 bg-[#FAF8F5] hover:bg-[#F5F2EB] text-[#1E1B18] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#9E7D53]" />
              <span className="hidden sm:inline">View Home Manifesto</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className={`px-5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#9E7D53] hover:bg-[#8C6D44] active:bg-[#7A5E39] text-white'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved & Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS & LANGUAGE BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-[#23201C]/10 shadow-xs">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSubTab('about')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'about'
                ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>About Story & Hosts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('intro')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'intro'
                ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>Home Intro & Manifesto</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('sections')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'sections'
                ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>Section Introductions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('seo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'seo'
                ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>SEO & Social Share</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('preview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'preview'
                ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Editing Language Switcher */}
        <div className="flex items-center gap-1 self-end sm:self-auto shrink-0 bg-[#FAF8F5] p-1 rounded-xl border border-[#23201C]/10 text-xs">
          <span className="text-[11px] text-[#7D7468] px-2 font-medium">Edit in:</span>
          {(['de', 'en', 'it'] as Language[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setActiveLang(l);
                setShowAllLanguages(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs uppercase font-semibold transition-colors cursor-pointer ${
                activeLang === l && !showAllLanguages
                  ? 'bg-[#9E7D53] text-white shadow-xs'
                  : 'text-[#5B544B] hover:text-[#1E1B18] hover:bg-white'
              }`}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowAllLanguages(!showAllLanguages)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              showAllLanguages
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#5B544B] hover:text-[#1E1B18] hover:bg-white'
            }`}
            title="Edit all 3 languages simultaneously"
          >
            All Langs
          </button>
        </div>
      </div>

      {/* 3. MAIN PANEL: ABOUT STORY & HOSTS */}
      {activeSubTab === 'about' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Narrative Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Page Title & Subtitle Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#9E7D53]" />
                  <span>About Page Header & Subtitle</span>
                </h3>
                <span className="text-[11px] text-[#7D7468]">Appears at the top of /about</span>
              </div>

              {showAllLanguages ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {(['de', 'en', 'it'] as Language[]).map((l) => (
                    <div key={l} className="space-y-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#23201C]/8">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E7D53]">
                        {getLangName(l)}
                      </span>
                      <div>
                        <label className="block text-[11px] text-[#7D7468] mb-1 font-medium">Page Title</label>
                        <input
                          type="text"
                          value={formData.aboutStory.title[l] || ''}
                          onChange={(e) => updateMultiLang('aboutStory', 'title', l, e.target.value)}
                          className="w-full bg-white border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#7D7468] mb-1 font-medium">Subtitle</label>
                        <textarea
                          rows={2}
                          value={formData.aboutStory.subtitle[l] || ''}
                          onChange={(e) => updateMultiLang('aboutStory', 'subtitle', l, e.target.value)}
                          className="w-full bg-white border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                      Page Title ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.aboutStory.title[activeLang] || ''}
                      onChange={(e) => updateMultiLang('aboutStory', 'title', activeLang, e.target.value)}
                      placeholder="e.g. Our Story & Philosophy"
                      className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-sm font-medium text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                      Subtitle / Tagline ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.aboutStory.subtitle[activeLang] || ''}
                      onChange={(e) => updateMultiLang('aboutStory', 'subtitle', activeLang, e.target.value)}
                      placeholder="e.g. Rooted in Überetsch viticulture, crafted for discerning wanderers."
                      className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-sm text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3-Paragraph Brand Narrative */}
            <div className="bg-white p-6 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
                    <Quote className="w-4 h-4 text-[#9E7D53]" />
                    <span>Three-Part Brand Story Narrative</span>
                  </h3>
                  <p className="text-xs text-[#7D7468] mt-0.5">
                    The founding journey, sustainable architecture, and intimate hospitality philosophy.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#9E7D53] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#23201C]/8">
                  {activeLang.toUpperCase()} Mode
                </span>
              </div>

              {/* Paragraph 1: The Vision & Roots */}
              <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1E1B18] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#9E7D53] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Act I: The Vision & Viticulture Roots ({activeLang.toUpperCase()})</span>
                  </label>
                  <span className="text-[10px] text-[#7D7468] font-mono">
                    {formData.aboutStory.storyP1[activeLang]?.length || 0} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.aboutStory.storyP1[activeLang] || ''}
                  onChange={(e) => updateMultiLang('aboutStory', 'storyP1', activeLang, e.target.value)}
                  placeholder="Tell the story of growing up in Kaltern and the dream of creating LINGERS..."
                  className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs leading-relaxed text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              {/* Paragraph 2: Natural Architecture */}
              <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1E1B18] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#9E7D53] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Act II: Architecture, Larch Wood & Porphyry ({activeLang.toUpperCase()})</span>
                  </label>
                  <span className="text-[10px] text-[#7D7468] font-mono">
                    {formData.aboutStory.storyP2[activeLang]?.length || 0} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.aboutStory.storyP2[activeLang] || ''}
                  onChange={(e) => updateMultiLang('aboutStory', 'storyP2', activeLang, e.target.value)}
                  placeholder="Detail the collaboration with local artisans, untreated larch wood, and terraced vineyards..."
                  className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs leading-relaxed text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              {/* Paragraph 3: Personal Hospitality */}
              <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1E1B18] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#9E7D53] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Act III: Personal Hospitality & Welcoming Guests ({activeLang.toUpperCase()})</span>
                  </label>
                  <span className="text-[10px] text-[#7D7468] font-mono">
                    {formData.aboutStory.storyP3[activeLang]?.length || 0} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.aboutStory.storyP3[activeLang] || ''}
                  onChange={(e) => updateMultiLang('aboutStory', 'storyP3', activeLang, e.target.value)}
                  placeholder="Describe welcoming travelers with discreet luxury, personalized insider recommendations, and warmth..."
                  className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs leading-relaxed text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Host Biography Card & Image Side Pane */}
          <div className="lg:col-span-4 space-y-6">
            {/* Host Identity Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#9E7D53]" />
                  <span>Host & Founder Details</span>
                </h3>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-semibold">
                  Host Full Name(s)
                </label>
                <input
                  type="text"
                  value={formData.aboutStory.hostName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      aboutStory: { ...formData.aboutStory, hostName: e.target.value }
                    })
                  }
                  placeholder="e.g. Katharina & Andreas Mair"
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-3.5 py-2 text-xs font-medium text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-semibold">
                  Host Role / Title ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.aboutStory.hostRole[activeLang] || ''}
                  onChange={(e) => updateMultiLang('aboutStory', 'hostRole', activeLang, e.target.value)}
                  placeholder="e.g. Gastgeber & Gründer"
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-3.5 py-2 text-xs font-medium text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              {/* Host Portrait Image */}
              <div className="pt-2">
                <ImageUploader
                  label="Host Portrait Photo"
                  value={formData.aboutStory.hostImage}
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      aboutStory: { ...prev.aboutStory, hostImage: url }
                    }));
                  }}
                />
              </div>
            </div>

            {/* Live Host Card Preview Box */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#23201C]/10 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E7D53] font-semibold block">
                Live Host Card Render Preview
              </span>
              <div className="bg-white rounded-xl p-4 border border-[#23201C]/8 shadow-xs flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#9E7D53]/40 bg-neutral-200">
                  <img
                    src={formData.aboutStory.hostImage}
                    alt={formData.aboutStory.hostName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif-luxury text-base text-[#1E1B18] truncate">
                    {formData.aboutStory.hostName || 'Host Name'}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wider text-[#9E7D53] truncate">
                    {formData.aboutStory.hostRole[activeLang] || 'Host & Founder'}
                  </p>
                  <p className="text-[10px] text-[#7D7468] truncate mt-0.5">
                    Kaltern / Überetsch, Südtirol
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN PANEL: HOME INTRO & ARCHITECTURAL MANIFESTO */}
      {activeSubTab === 'intro' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#23201C]/10">
              <div>
                <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9E7D53]" />
                  <span>Homepage Architectural Manifesto & Intro Section</span>
                </h3>
                <p className="text-xs text-[#7D7468] mt-0.5">
                  Displayed directly beneath the Hero Slider on the Homepage to introduce the retreat's soul.
                </p>
              </div>
              <span className="text-xs font-mono text-[#9E7D53] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#23201C]/8">
                Editing: {activeLang.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Eyebrow Label */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Eyebrow Badge ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.intro.eyebrow[activeLang] || ''}
                  onChange={(e) => updateMultiLang('intro', 'eyebrow', activeLang, e.target.value)}
                  placeholder="e.g. REFUGIUM SÜDTIROL"
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              {/* Quote Author */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Quote Author Citation
                </label>
                <input
                  type="text"
                  value={formData.intro.quoteAuthor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intro: { ...formData.intro, quoteAuthor: e.target.value }
                    })
                  }
                  placeholder="e.g. Familie Mair & das LINGERS Team"
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                Main Serif Headline ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={2}
                value={formData.intro.heading[activeLang] || ''}
                onChange={(e) => updateMultiLang('intro', 'heading', activeLang, e.target.value)}
                placeholder="e.g. Ein intimes Hideaway mit nur 16 Suiten & Apartments – eingebettet in jahrhundertealte Weinberge."
                className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-3 text-base font-serif-luxury font-light text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
              />
            </div>

            {/* Narrative Paragraphs 1 & 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Body Narrative Paragraph 1 ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={5}
                  value={formData.intro.body1[activeLang] || ''}
                  onChange={(e) => updateMultiLang('intro', 'body1', activeLang, e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl p-3.5 text-xs leading-relaxed text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Body Narrative Paragraph 2 ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={5}
                  value={formData.intro.body2[activeLang] || ''}
                  onChange={(e) => updateMultiLang('intro', 'body2', activeLang, e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl p-3.5 text-xs leading-relaxed text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Editorial Philosophy Quote */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 space-y-2">
              <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
                Signature Philosophy Quote ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={2}
                value={formData.intro.quote[activeLang] || ''}
                onChange={(e) => updateMultiLang('intro', 'quote', activeLang, e.target.value)}
                placeholder="e.g. „Verweilen heißt nicht stehenbleiben, sondern dem Schönen Zeit schenken.“"
                className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-sm font-serif-luxury italic text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
              />
            </div>

            {/* 3 Luxury Key Statistics */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-3">
                Key Highlight Stats (Featured on Homepage)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 space-y-1.5">
                  <span className="text-[11px] text-[#7D7468] block">Stat 1: Scale / Suites</span>
                  <input
                    type="text"
                    value={formData.intro.statSuites}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        intro: { ...formData.intro, statSuites: e.target.value }
                      })
                    }
                    placeholder="16 Suiten"
                    className="w-full bg-white border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs font-medium text-[#1E1B18]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 space-y-1.5">
                  <span className="text-[11px] text-[#7D7468] block">Stat 2: Climate / Terroir</span>
                  <input
                    type="text"
                    value={formData.intro.statVineyard}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        intro: { ...formData.intro, statVineyard: e.target.value }
                      })
                    }
                    placeholder="300 Sonnentage"
                    className="w-full bg-white border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs font-medium text-[#1E1B18]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 space-y-1.5">
                  <span className="text-[11px] text-[#7D7468] block">Stat 3: Atmosphere</span>
                  <input
                    type="text"
                    value={formData.intro.statSunDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        intro: { ...formData.intro, statSunDays: e.target.value }
                      })
                    }
                    placeholder="100% Ruhe"
                    className="w-full bg-white border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs font-medium text-[#1E1B18]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MAIN PANEL: SECTION INTRODUCTIONS */}
      {activeSubTab === 'sections' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#23201C]/10">
              <div>
                <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#9E7D53]" />
                  <span>Homepage Section Introductions & Lead Narratives</span>
                </h3>
                <p className="text-xs text-[#7D7468] mt-0.5">
                  The curated introductory titles and explanatory subtitles preceding each major homepage module.
                </p>
              </div>

              {/* Section Selector Pills */}
              <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#23201C]/8 text-xs self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveSectionSubTab('suites')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeSectionSubTab === 'suites'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#5B544B] hover:text-[#1E1B18]'
                  }`}
                >
                  Suiten
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSectionSubTab('experiences')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeSectionSubTab === 'experiences'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#5B544B] hover:text-[#1E1B18]'
                  }`}
                >
                  Erlebnisse
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSectionSubTab('culinary')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeSectionSubTab === 'culinary'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#5B544B] hover:text-[#1E1B18]'
                  }`}
                >
                  Kulinarik
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSectionSubTab('wellness')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeSectionSubTab === 'wellness'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#5B544B] hover:text-[#1E1B18]'
                  }`}
                >
                  Wellness
                </button>
              </div>
            </div>

            {/* Suites Section Intro */}
            {activeSectionSubTab === 'suites' && (
              <div className="space-y-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D53]" />
                  <h4 className="font-semibold text-sm text-[#1E1B18]">Suites & Apartments Intro</h4>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Section Heading ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formData.suitesIntro.heading[activeLang] || ''}
                    onChange={(e) => updateMultiLang('suitesIntro', 'heading', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1E1B18]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Subtitle Narrative ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={formData.suitesIntro.subtitle[activeLang] || ''}
                    onChange={(e) => updateMultiLang('suitesIntro', 'subtitle', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs text-[#3D3831] leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Experiences Section Intro */}
            {activeSectionSubTab === 'experiences' && (
              <div className="space-y-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D53]" />
                  <h4 className="font-semibold text-sm text-[#1E1B18]">Experiences & Vineyards Intro</h4>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Section Heading ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formData.experienceIntro.heading[activeLang] || ''}
                    onChange={(e) => updateMultiLang('experienceIntro', 'heading', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1E1B18]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Subtitle Narrative ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={formData.experienceIntro.subtitle[activeLang] || ''}
                    onChange={(e) => updateMultiLang('experienceIntro', 'subtitle', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs text-[#3D3831] leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Culinary Section Intro */}
            {activeSectionSubTab === 'culinary' && (
              <div className="space-y-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D53]" />
                  <h4 className="font-semibold text-sm text-[#1E1B18]">Breakfast & Culinary Delights Intro</h4>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Section Heading ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formData.culinaryIntro.heading[activeLang] || ''}
                    onChange={(e) => updateMultiLang('culinaryIntro', 'heading', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1E1B18]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Subtitle Narrative ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={formData.culinaryIntro.subtitle[activeLang] || ''}
                    onChange={(e) => updateMultiLang('culinaryIntro', 'subtitle', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs text-[#3D3831] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Detailed Regional Philosophy Text ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={formData.culinaryIntro.subtext[activeLang] || ''}
                    onChange={(e) => updateMultiLang('culinaryIntro', 'subtext', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs text-[#3D3831] leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Wellness Section Intro */}
            {activeSectionSubTab === 'wellness' && (
              <div className="space-y-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#23201C]/8">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D53]" />
                  <h4 className="font-semibold text-sm text-[#1E1B18]">Wellness, Pool & Garden Sanctuary Intro</h4>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Section Heading ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formData.wellnessIntro.heading[activeLang] || ''}
                    onChange={(e) => updateMultiLang('wellnessIntro', 'heading', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1E1B18]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Subtitle Narrative ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={formData.wellnessIntro.subtitle[activeLang] || ''}
                    onChange={(e) => updateMultiLang('wellnessIntro', 'subtitle', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs text-[#3D3831] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                    Detailed Sanctuary Philosophy Text ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={formData.wellnessIntro.subtext[activeLang] || ''}
                    onChange={(e) => updateMultiLang('wellnessIntro', 'subtext', activeLang, e.target.value)}
                    className="w-full bg-white border border-[#23201C]/15 rounded-xl p-3 text-xs text-[#3D3831] leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. MAIN PANEL: SEO & SOCIAL SHARING */}
      {activeSubTab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#23201C]/10">
                <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#9E7D53]" />
                  <span>Search Engine Optimization (SEO)</span>
                </h3>
                <span className="text-[11px] text-[#7D7468]">Google Search Meta</span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Global Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaTitle: e.target.value }
                    })
                  }
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
                <span className="text-[10px] text-[#7D7468] mt-1 block">
                  Recommended: 50–60 characters ({formData.seo.metaTitle.length} characters)
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.seo.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaDescription: e.target.value }
                    })
                  }
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl p-3 text-xs leading-relaxed text-[#3D3831] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
                <span className="text-[10px] text-[#7D7468] mt-1 block">
                  Recommended: 120–160 characters ({formData.seo.metaDescription.length} characters)
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1.5 font-semibold">
                  Search Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.seo.keywords}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, keywords: e.target.value }
                    })
                  }
                  className="w-full bg-[#FAF8F5] border border-[#23201C]/15 rounded-xl px-4 py-2.5 text-xs text-[#1E1B18] focus:ring-2 focus:ring-[#9E7D53]/40 focus:outline-hidden"
                />
              </div>

              {/* OpenGraph Image */}
              <div className="pt-2">
                <ImageUploader
                  label="OpenGraph Social Share Image (1200x630px)"
                  value={formData.seo.ogImage}
                  onChange={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, ogImage: url }
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* Real-time SERP & Social Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google Search Result Preview */}
            <div className="bg-white p-5 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
                  Google Search Snippet Preview
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                  Indexed
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <Globe className="w-3 h-3 text-neutral-400" />
                  <span className="truncate">https://lingers-suites.com</span>
                </div>
                <h4 className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
                  {formData.seo.metaTitle || 'LINGERS – Suites & Residence'}
                </h4>
                <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
                  {formData.seo.metaDescription || 'Boutique luxury hotel in South Tyrol...'}
                </p>
              </div>
            </div>

            {/* Social Share Card Preview */}
            <div className="bg-white p-5 rounded-2xl border border-[#23201C]/10 shadow-xs space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#7D7468] font-semibold block">
                Social Media Card Preview (WhatsApp / X / FB)
              </span>
              <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-xs">
                <div className="aspect-12/6.3 bg-neutral-200 overflow-hidden">
                  <img
                    src={formData.seo.ogImage}
                    alt="Social Card Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5 bg-white space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                    lingers-suites.com
                  </span>
                  <h5 className="font-semibold text-xs text-neutral-900 line-clamp-1">
                    {formData.seo.metaTitle}
                  </h5>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                    {formData.seo.metaDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. MAIN PANEL: INTERACTIVE LIVE PREVIEW */}
      {activeSubTab === 'preview' && (
        <div className="space-y-4">
          {/* Viewport Width Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-[#23201C]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#9E7D53]" />
              <span className="text-xs font-semibold text-[#1E1B18]">Live Rendering Simulator:</span>
              <span className="text-xs text-[#7D7468]">Viewing in {getLangName(activeLang)}</span>
            </div>

            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#23201C]/8 text-xs">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'desktop' ? 'bg-[#1E1B18] text-white' : 'text-[#7D7468] hover:text-[#1E1B18]'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'tablet' ? 'bg-[#1E1B18] text-white' : 'text-[#7D7468] hover:text-[#1E1B18]'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'mobile' ? 'bg-[#1E1B18] text-white' : 'text-[#7D7468] hover:text-[#1E1B18]'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Device Mockup Canvas */}
          <div className="bg-[#EFECE6] p-4 sm:p-8 rounded-2xl border border-[#23201C]/10 flex justify-center overflow-x-auto">
            <div
              className={`bg-[#FAF8F5] transition-all duration-300 rounded-2xl shadow-xl overflow-hidden border border-[#23201C]/10 ${
                previewDevice === 'mobile'
                  ? 'w-[375px]'
                  : previewDevice === 'tablet'
                  ? 'w-[768px]'
                  : 'w-full max-w-5xl'
              }`}
            >
              {/* Simulated Browser Bar */}
              <div className="bg-[#1E1B18] px-4 py-2.5 flex items-center justify-between text-[11px] text-[#A69E90]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-[10px] text-white/60 ml-2">lingers-suites.com/about</span>
                </div>
                <span className="uppercase text-[10px] tracking-wider text-[#9E7D53]">Live Preview</span>
              </div>

              {/* Rendered About Story Section */}
              <div className="p-6 sm:p-12 space-y-10">
                <div className="text-center space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7D53] font-semibold">
                    {activeLang === 'de' ? 'Das Refugium & Die Gastgeber' : activeLang === 'it' ? 'Il Rifugio & Gli Host' : 'The Estate & Hosts'}
                  </span>
                  <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#1E1B18] tracking-tight">
                    {formData.aboutStory.title[activeLang] || 'Our Story & Philosophy'}
                  </h1>
                  <p className="text-sm text-[#5B544B] max-w-xl mx-auto font-light leading-relaxed">
                    {formData.aboutStory.subtitle[activeLang] || 'Rooted in Überetsch viticulture...'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-[#3D3831] font-light leading-relaxed">
                    <p>{formData.aboutStory.storyP1[activeLang]}</p>
                    <p>{formData.aboutStory.storyP2[activeLang]}</p>
                    <p>{formData.aboutStory.storyP3[activeLang]}</p>

                    <div className="pt-4 border-t border-[#23201C]/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
                          {formData.aboutStory.hostName}
                        </h4>
                        <span className="text-[10px] uppercase tracking-wider text-[#9E7D53]">
                          {formData.aboutStory.hostRole[activeLang]}
                        </span>
                      </div>
                      <span className="px-4 py-2 bg-[#9E7D53] text-white text-[10px] uppercase tracking-wider font-medium rounded-lg">
                        Contact Hosts
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-lg bg-neutral-200">
                      <img
                        src={formData.aboutStory.hostImage}
                        alt={formData.aboutStory.hostName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[9px] uppercase tracking-wider text-white/80">Kaltern, Südtirol</span>
                        <p className="font-serif-luxury text-sm font-light">„Herzliche Gastfreundschaft im Einklang mit der Natur.“</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
