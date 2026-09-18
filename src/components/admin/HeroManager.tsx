import React, { useState, useEffect } from 'react';
import { HeroConfig, HeroSlide, Language } from '../../types';
import { ImageUploader } from './ImageUploader';
import {
  Sliders,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Eye,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Info
} from 'lucide-react';

interface HeroManagerProps {
  hero: HeroConfig;
  lang: Language;
  onSave: (updatedHero: HeroConfig) => void | Promise<void>;
  onPreviewLive?: () => void;
}

export const HeroManager: React.FC<HeroManagerProps> = ({
  hero,
  lang: initialLang,
  onSave,
  onPreviewLive
}) => {
  // Local active editing language (allows quick toggle between DE / EN / IT inside the hero editor)
  const [activeLang, setActiveLang] = useState<Language>(initialLang);

  // Synchronize when parent changes language
  useEffect(() => {
    setActiveLang(initialLang);
  }, [initialLang]);

  // Safe normalized form state
  const getNormalizedHero = (source: any): HeroConfig => {
    return {
      autoSlide: source?.autoSlide ?? true,
      slideIntervalSeconds: source?.slideIntervalSeconds ?? 6,
      showOverlay: source?.showOverlay ?? true,
      mainTagline: {
        de: source?.mainTagline?.de || 'YOUR PLACE TO LINGER',
        en: source?.mainTagline?.en || 'YOUR PLACE TO LINGER',
        it: source?.mainTagline?.it || 'YOUR PLACE TO LINGER'
      },
      heroSubtitle: {
        de: source?.heroSubtitle?.de || 'Ein Refugium zwischen Weinbergen & Dolomiten in Südtirol',
        en: source?.heroSubtitle?.en || 'An intimate hideaway among South Tyrolean vineyards & the Dolomites',
        it: source?.heroSubtitle?.it || "Un intimo rifugio tra i vigneti e le Dolomiti dell'Alto Adige"
      },
      buttonInquiryText: {
        de: source?.buttonInquiryText?.de || 'Anfrage',
        en: source?.buttonInquiryText?.en || 'Inquiry',
        it: source?.buttonInquiryText?.it || 'Richiesta'
      },
      buttonBookText: {
        de: source?.buttonBookText?.de || 'Buchen',
        en: source?.buttonBookText?.en || 'Book Now',
        it: source?.buttonBookText?.it || 'Prenota'
      },
      slides: Array.isArray(source?.slides) && source.slides.length > 0
        ? source.slides.map((s: any, idx: number) => ({
            id: s.id || `hero-slide-${idx + 1}`,
            image: s.image || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
            title: {
              de: s.title?.de || 'YOUR PLACE TO LINGER',
              en: s.title?.en || 'YOUR PLACE TO LINGER',
              it: s.title?.it || 'YOUR PLACE TO LINGER'
            },
            subtitle: {
              de: s.subtitle?.de || 'Ruhe. Weite. Zeit für das Wesentliche.',
              en: s.subtitle?.en || 'Quietude. Expansiveness. Time for what matters.',
              it: s.subtitle?.it || 'Quiete. Orizzonti. Il tempo di vivere con lentezza.'
            },
            caption: {
              de: s.caption?.de || 'Überetsch, Südtirol',
              en: s.caption?.en || 'South Tyrol, Italy',
              it: s.caption?.it || 'Alto Adige, Italia'
            },
            active: s.active ?? true
          }))
        : [
            {
              id: 'hero-1',
              image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
              title: {
                de: 'YOUR PLACE TO LINGER',
                en: 'YOUR PLACE TO LINGER',
                it: 'YOUR PLACE TO LINGER'
              },
              subtitle: {
                de: 'Ruhe. Weite. Zeit für das Wesentliche.',
                en: 'Quietude. Expansiveness. Time for what matters.',
                it: 'Quiete. Orizzonti. Il tempo di vivere con lentezza.'
              },
              caption: {
                de: 'Überetsch, Südtirol',
                en: 'South Tyrol, Italy',
                it: 'Alto Adige, Italia'
              },
              active: true
            }
          ]
    };
  };

  const [formData, setFormData] = useState<HeroConfig>(() => getNormalizedHero(hero));
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'slides' | 'global' | 'preview'>('slides');

  // Preview simulator state
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);
  const [isSimulatorPlaying, setIsSimulatorPlaying] = useState(false);

  // Keep form updated if initial hero prop changes externally
  useEffect(() => {
    setFormData(getNormalizedHero(hero));
  }, [hero]);

  // Slideshow preview simulator timer
  useEffect(() => {
    if (!isSimulatorPlaying || formData.slides.length <= 1) return;
    const interval = setInterval(() => {
      setPreviewSlideIdx((prev) => (prev + 1) % formData.slides.length);
    }, Math.max(2000, formData.slideIntervalSeconds * 1000));
    return () => clearInterval(interval);
  }, [isSimulatorPlaying, formData.slides.length, formData.slideIntervalSeconds]);

  // Handle slide field change
  const handleSlideFieldChange = (
    idx: number,
    field: 'title' | 'subtitle' | 'caption',
    value: string
  ) => {
    const updated = [...formData.slides];
    const target = updated[idx];
    if (!target) return;

    updated[idx] = {
      ...target,
      [field]: {
        ...target[field],
        [activeLang]: value
      }
    };
    setFormData({ ...formData, slides: updated });
  };

  const handleSlideImageChange = async (idx: number, newImageUrl: string) => {
    const updated = [...formData.slides];
    if (!updated[idx]) return;
    updated[idx] = { ...updated[idx], image: newImageUrl };
    const newConfig = { ...formData, slides: updated };
    setFormData(newConfig);
    // Instant auto-save so when user goes to the main website, the image is already applied and live!
    setIsSaving(true);
    try {
      await onSave(newConfig);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.warn('Auto-save error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSlide = async () => {
    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      title: {
        de: 'NEUE IMPRESSION',
        en: 'NEW IMPRESSION',
        it: 'NUOVA IMPRESSIONE'
      },
      subtitle: {
        de: 'Weinberge, Stille und Südtiroler Gastfreundschaft.',
        en: 'Sun-drenched vineyards, silence, and alpine warmth.',
        it: 'Vigneti assolati, quiete e calda ospitalità altoatesina.'
      },
      caption: {
        de: 'Südtirol, Italien',
        en: 'South Tyrol, Italy',
        it: 'Alto Adige, Italia'
      },
      active: true
    };
    const updated = [...formData.slides, newSlide];
    const newConfig = { ...formData, slides: updated };
    setFormData(newConfig);
    setPreviewSlideIdx(updated.length - 1);
    try {
      await onSave(newConfig);
    } catch (e) {
      console.warn('Auto-save on add slide:', e);
    }
  };

  const handleDeleteSlide = async (idx: number) => {
    if (formData.slides.length <= 1) {
      alert('The hero section must retain at least one slide.');
      return;
    }
    const updated = formData.slides.filter((_, i) => i !== idx);
    const newConfig = { ...formData, slides: updated };
    setFormData(newConfig);
    if (previewSlideIdx >= updated.length) {
      setPreviewSlideIdx(Math.max(0, updated.length - 1));
    }
    try {
      await onSave(newConfig);
    } catch (e) {
      console.warn('Auto-save on delete slide:', e);
    }
  };

  const handleDuplicateSlide = async (idx: number) => {
    const src = formData.slides[idx];
    if (!src) return;
    const duplicated: HeroSlide = {
      ...JSON.parse(JSON.stringify(src)),
      id: `hero-${Date.now()}`,
      title: {
        ...src.title,
        [activeLang]: `${src.title[activeLang]} (Copy)`
      }
    };
    const updated = [...formData.slides];
    updated.splice(idx + 1, 0, duplicated);
    const newConfig = { ...formData, slides: updated };
    setFormData(newConfig);
    setPreviewSlideIdx(idx + 1);
    try {
      await onSave(newConfig);
    } catch (e) {
      console.warn('Auto-save on duplicate slide:', e);
    }
  };

  const handleMoveSlide = async (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= formData.slides.length) return;
    const updated = [...formData.slides];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    const newConfig = { ...formData, slides: updated };
    setFormData(newConfig);
    setPreviewSlideIdx(targetIdx);
    try {
      await onSave(newConfig);
    } catch (e) {
      console.warn('Auto-save on move slide:', e);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const currentPreviewSlide = formData.slides[previewSlideIdx] || formData.slides[0];

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#23201C]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#9E7D53]/15 text-[#9E7D53]">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
              First Impression & Storytelling
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-1">
            Hero Section & Changing Slideshow
          </h2>
          <p className="text-xs text-[#7D7468] mt-0.5">
            Configure visual rotating slides, high-contrast luxury typography, timing, and direct booking buttons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onPreviewLive && (
            <button
              type="button"
              onClick={async () => {
                await onSave(formData);
                onPreviewLive();
              }}
              className="px-3.5 py-2 rounded-lg border border-[#23201C]/15 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7D53]" />
              <span className="hidden sm:inline">View on Live Site</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium text-white transition-all flex items-center gap-2 shadow-xs ${
              savedSuccess
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#9E7D53] hover:bg-[#8C6D44]'
            } disabled:opacity-50`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" /> Saved Successfully
              </>
            ) : isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Save Hero Settings
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs and Language Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F5] p-2 rounded-xl border border-[#23201C]/8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('slides')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'slides'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#7D7468] hover:text-[#1E1B18] hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Slides Management ({formData.slides.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('global')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'global'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#7D7468] hover:text-[#1E1B18] hover:bg-white/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Global Settings & CTAs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'text-[#7D7468] hover:text-[#1E1B18] hover:bg-white/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Interactive Preview</span>
          </button>
        </div>

        {/* Content Language Switcher */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[11px] text-[#7D7468] font-medium hidden md:inline">
            Editing Language:
          </span>
          <div className="flex bg-white rounded-lg p-0.5 border border-[#23201C]/10 text-xs">
            {(['de', 'en', 'it'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase transition-all ${
                  activeLang === l
                    ? 'bg-[#9E7D53] text-white shadow-xs'
                    : 'text-[#7D7468] hover:text-[#1E1B18]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SLIDES MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'slides' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
                Rotating Photographic Slides
              </span>
              <span className="text-xs text-[#7D7468]">
                ({formData.slides.length} slides configured · {formData.slideIntervalSeconds}s interval)
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddSlide}
              className="px-3.5 py-2 bg-[#FAF8F5] border border-[#23201C]/20 hover:border-[#9E7D53] hover:bg-white text-[#1E1B18] text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#9E7D53]" />
              <span>Add New Slide</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.slides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="p-5 sm:p-6 rounded-2xl border border-[#23201C]/12 bg-white space-y-5 shadow-xs hover:border-[#9E7D53]/50 transition-colors"
              >
                {/* Slide Card Header: Index, Reordering & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#23201C]/8">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#1E1B18] text-[#FAF8F5] text-xs font-mono font-medium">
                      Slide 0{idx + 1}
                    </span>
                    <span className="text-xs font-serif-luxury text-[#1E1B18] font-medium truncate max-w-[200px] sm:max-w-xs">
                      {slide.title[activeLang] || 'Untitled Slide'}
                    </span>
                    {idx === 0 && (
                      <span className="text-[10px] uppercase tracking-wider bg-[#9E7D53]/15 text-[#9E7D53] px-2 py-0.5 rounded-full font-medium">
                        Initial Hero Slide
                      </span>
                    )}
                  </div>

                  {/* Actions: Move Up / Down, Duplicate, Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSlide(idx, 'up')}
                      title="Move slide earlier in rotation"
                      className="p-1.5 rounded-lg border border-[#23201C]/15 hover:bg-[#FAF8F5] text-[#1E1B18] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === formData.slides.length - 1}
                      onClick={() => handleMoveSlide(idx, 'down')}
                      title="Move slide later in rotation"
                      className="p-1.5 rounded-lg border border-[#23201C]/15 hover:bg-[#FAF8F5] text-[#1E1B18] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateSlide(idx)}
                      title="Duplicate this slide"
                      className="p-1.5 rounded-lg border border-[#23201C]/15 hover:bg-[#FAF8F5] text-[#1E1B18] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(idx)}
                      title="Delete slide"
                      className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Slide Card Body: Left Column Image Upload, Right Column Multilingual Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Image Selector */}
                  <div className="lg:col-span-5">
                    <ImageUploader
                      label={`Slide 0${idx + 1} Visual Asset`}
                      value={slide.image}
                      onChange={(url) => handleSlideImageChange(idx, url)}
                    />
                  </div>

                  {/* Text Properties */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Location / Caption Pill */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
                          Editorial Tag / Location Badge ({activeLang.toUpperCase()})
                        </label>
                        <span className="text-[10px] text-[#7D7468]">Shown in top pill</span>
                      </div>
                      <input
                        type="text"
                        value={slide.caption?.[activeLang] || ''}
                        onChange={(e) => handleSlideFieldChange(idx, 'caption', e.target.value)}
                        placeholder="e.g. Überetsch, Südtirol or Panorama Suite"
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>

                    {/* Main Headline */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-1">
                        Slide Main Headline ({activeLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={slide.title?.[activeLang] || ''}
                        onChange={(e) => handleSlideFieldChange(idx, 'title', e.target.value)}
                        placeholder="e.g. YOUR PLACE TO LINGER"
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs font-serif-luxury text-[#1E1B18] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>

                    {/* Subtitle / Descriptive Narrative */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-1">
                        Slide Subtitle / Narrative ({activeLang.toUpperCase()})
                      </label>
                      <textarea
                        rows={2}
                        value={slide.subtitle?.[activeLang] || ''}
                        onChange={(e) => handleSlideFieldChange(idx, 'subtitle', e.target.value)}
                        placeholder="e.g. Ruhe. Weite. Zeit für das Wesentliche."
                        className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs text-[#1E1B18] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                      />
                    </div>

                    {/* Quick Language Translation Overview Pills */}
                    <div className="pt-2 border-t border-[#23201C]/8 flex flex-wrap items-center gap-2 text-[11px] text-[#7D7468]">
                      <span className="font-medium text-[#1E1B18]">Language status:</span>
                      {(['de', 'en', 'it'] as const).map((l) => {
                        const hasContent = Boolean(slide.title?.[l] && slide.subtitle?.[l]);
                        return (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setActiveLang(l)}
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-medium flex items-center gap-1 ${
                              activeLang === l
                                ? 'ring-1 ring-[#9E7D53] bg-[#FAF8F5] text-[#9E7D53]'
                                : hasContent
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            <span>{l}</span>
                            {hasContent ? (
                              <span className="text-emerald-600">✓</span>
                            ) : (
                              <span className="text-amber-600">⋯</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GLOBAL SETTINGS & BUTTON LABELS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'global' && (
        <div className="space-y-6">
          {/* Slideshow Dynamics Card */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#23201C]/10 space-y-5">
            <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#9E7D53]" />
              Slideshow Behavior & Visual Overlays
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Auto Slide Toggle */}
              <div className="p-4 rounded-xl bg-white border border-[#23201C]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
                    Auto-Rotation
                  </span>
                  <input
                    type="checkbox"
                    id="hero-toggle-autoslide"
                    checked={formData.autoSlide}
                    onChange={(e) => setFormData({ ...formData, autoSlide: e.target.checked })}
                    className="w-4 h-4 accent-[#9E7D53] cursor-pointer"
                  />
                </div>
                <p className="text-xs text-[#1E1B18] font-medium">
                  {formData.autoSlide ? 'Crossfade Enabled' : 'Manual Navigation Only'}
                </p>
                <p className="text-[11px] text-[#7D7468]">
                  Automatically advances to the next photography slide after the specified interval.
                </p>
              </div>

              {/* Interval Stepper */}
              <div className="p-4 rounded-xl bg-white border border-[#23201C]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
                    Slide Interval
                  </span>
                  <span className="text-xs font-mono font-bold text-[#9E7D53]">
                    {formData.slideIntervalSeconds} seconds
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={formData.slideIntervalSeconds}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slideIntervalSeconds: parseInt(e.target.value, 10) || 6
                    })
                  }
                  className="w-full accent-[#9E7D53] cursor-pointer"
                />
                <p className="text-[11px] text-[#7D7468]">
                  Recommended: 6 seconds for a tranquil, meditative South Tyrolean luxury atmosphere.
                </p>
              </div>

              {/* Show Overlay Vignette Toggle */}
              <div className="p-4 rounded-xl bg-white border border-[#23201C]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#7D7468] font-semibold">
                    Luxury Dark Overlay
                  </span>
                  <input
                    type="checkbox"
                    id="hero-toggle-overlay"
                    checked={formData.showOverlay}
                    onChange={(e) => setFormData({ ...formData, showOverlay: e.target.checked })}
                    className="w-4 h-4 accent-[#9E7D53] cursor-pointer"
                  />
                </div>
                <p className="text-xs text-[#1E1B18] font-medium">
                  {formData.showOverlay ? 'Overlay Active' : 'Pure Raw Image'}
                </p>
                <p className="text-[11px] text-[#7D7468]">
                  Adds a delicate gradient vignette to guarantee crisp WCAG-compliant text legibility.
                </p>
              </div>
            </div>
          </div>

          {/* Global Fallback Taglines & Action Buttons Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#23201C]/10 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#23201C]/8">
              <div>
                <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
                  Global Taglines & Hero Action Buttons
                </h3>
                <p className="text-xs text-[#7D7468]">
                  These labels apply to the central hero booking bar and fallback text ({activeLang.toUpperCase()}).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Global Main Tagline */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-1">
                  Global Main Tagline ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.mainTagline?.[activeLang] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mainTagline: { ...formData.mainTagline, [activeLang]: e.target.value }
                    })
                  }
                  className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                />
              </div>

              {/* Global Hero Subtitle */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-1">
                  Global Subtitle ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.heroSubtitle?.[activeLang] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSubtitle: { ...formData.heroSubtitle, [activeLang]: e.target.value }
                    })
                  }
                  className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                />
              </div>

              {/* Inquiry Button Text */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-1">
                  Inquiry Button Label ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.buttonInquiryText?.[activeLang] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buttonInquiryText: {
                        ...formData.buttonInquiryText,
                        [activeLang]: e.target.value
                      }
                    })
                  }
                  placeholder="e.g. Anfrage / Inquiry / Richiesta"
                  className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                />
              </div>

              {/* Direct Booking Button Text */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-semibold mb-1">
                  Direct Booking Button Label ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.buttonBookText?.[activeLang] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buttonBookText: { ...formData.buttonBookText, [activeLang]: e.target.value }
                    })
                  }
                  placeholder="e.g. Buchen / Book Now / Prenota"
                  className="w-full border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#9E7D53]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE LIVE PREVIEW SIMULATOR TAB */}
      {/* ========================================================================= */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
                Real-Time Live Hero Simulator
              </h3>
              <p className="text-xs text-[#7D7468]">
                Interactive preview rendered with actual high-contrast typography, overlays, and controls.
              </p>
            </div>

            {/* Simulator Play/Pause & Step Controls */}
            <div className="flex items-center gap-2 bg-[#FAF8F5] p-1 rounded-lg border border-[#23201C]/10">
              <button
                type="button"
                onClick={() =>
                  setPreviewSlideIdx(
                    (prev) => (prev - 1 + formData.slides.length) % formData.slides.length
                  )
                }
                className="p-1.5 rounded hover:bg-white text-[#1E1B18] transition-colors"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsSimulatorPlaying(!isSimulatorPlaying)}
                className="px-2.5 py-1 rounded bg-[#1E1B18] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {isSimulatorPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Auto-Play
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPreviewSlideIdx((prev) => (prev + 1) % formData.slides.length)
                }
                className="p-1.5 rounded hover:bg-white text-[#1E1B18] transition-colors"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Simulated Viewport */}
          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden border border-[#23201C]/20 shadow-xl bg-black select-none">
            {/* Background Image */}
            <img
              src={currentPreviewSlide?.image}
              alt="Preview"
              className="w-full h-full object-cover transition-opacity duration-700"
            />

            {/* Simulated Luxury Overlays */}
            {formData.showOverlay && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75 pointer-events-none" />
                <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-black/15 to-black/45 pointer-events-none" />
              </>
            )}

            {/* Center Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 space-y-3 sm:space-y-4">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 bg-black/40 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D53] animate-pulse" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/90 font-medium">
                  {currentPreviewSlide?.caption?.[activeLang] || 'South Tyrol, Italy'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-luxury text-xl sm:text-3xl md:text-5xl font-light text-white tracking-[0.2em] uppercase max-w-2xl drop-shadow-md">
                {currentPreviewSlide?.title?.[activeLang] || formData.mainTagline?.[activeLang]}
              </h1>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-xs md:text-sm text-white/90 font-light tracking-wider max-w-lg drop-shadow-sm">
                {currentPreviewSlide?.subtitle?.[activeLang] || formData.heroSubtitle?.[activeLang]}
              </p>

              {/* Sample Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <span className="px-4 py-1.5 rounded-full bg-[#9E7D53] text-white text-[10px] sm:text-xs tracking-wider uppercase font-medium shadow-md">
                  {formData.buttonInquiryText?.[activeLang] || 'Inquiry'}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] sm:text-xs tracking-wider uppercase font-medium backdrop-blur-xs border border-white/30">
                  {formData.buttonBookText?.[activeLang] || 'Book Now'}
                </span>
              </div>
            </div>

            {/* Slide Index Pills in Simulator */}
            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-10">
              {formData.slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewSlideIdx(idx)}
                  className={`transition-all ${
                    previewSlideIdx === idx
                      ? 'w-8 h-1.5 bg-[#9E7D53] rounded-full'
                      : 'w-2 h-1.5 bg-white/40 hover:bg-white/70 rounded-full'
                  }`}
                  title={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
