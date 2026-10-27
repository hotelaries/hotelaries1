import React, { useState } from 'react';
import { SkyLoungeConfig, Language } from '../../types';
import { ImageUploader } from './ImageUploader';
import { Sparkles, Plus, Trash2, Check, Clock, Eye } from 'lucide-react';

interface SkyBarManagerProps {
  skyLounge: SkyLoungeConfig;
  lang: Language;
  onSave: (updated: SkyLoungeConfig) => void | Promise<void>;
  showSaveSuccess?: (msg: string) => void;
}

export const SkyBarManager: React.FC<SkyBarManagerProps> = ({
  skyLounge,
  lang: initialLang,
  onSave,
  showSaveSuccess
}) => {
  const [activeLang, setActiveLang] = useState<Language>(initialLang);
  const [formData, setFormData] = useState<SkyLoungeConfig>(() => ({
    title: skyLounge.title || {
      de: 'ROOFTOP SKY BAR & LOUNGE',
      en: 'ROOFTOP SKY BAR & LOUNGE',
      it: 'ROOFTOP SKY BAR & LOUNGE'
    },
    subtitle: skyLounge.subtitle || {
      de: 'Über den Dächern – Panoramablick, Cocktails & Abendatmosphäre',
      en: 'Above the Ordinary – Panoramic Rooftop Bar & Lounge',
      it: 'Sopra la Città – Vista Panoramica, Cocktail & Atmosfera'
    },
    description: skyLounge.description || {
      de: 'Unsere exklusive Rooftop Sky Bar verbindet stilvolles Design, spektakuläre Aussichten und meisterhafte Drinks.',
      en: 'Our open-air rooftop sky bar elevates every evening with panoramic skyline horizons, curated craft cocktails, and ambient music.',
      it: 'Il nostro rooftop sky bar unisce un design raffinato, panorami mozzafiato e cocktail d’autore.'
    },
    openingHours: skyLounge.openingHours || {
      de: 'Täglich ab 17:00 bis 01:00 Uhr',
      en: 'Daily from 17:00 till 01:00 AM',
      it: 'Tutti i giorni dalle 17:00 alle 01:00'
    },
    mainImage:
      skyLounge.mainImage ||
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85',
    gallery: skyLounge.gallery || [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85'
    ],
    status: skyLounge.status || 'published',
    visible: skyLounge.visible !== false,
    reservationCtaText: skyLounge.reservationCtaText || {
      de: 'Tisch in der Sky Lounge anfragen',
      en: 'Reserve at Sky Lounge',
      it: 'Prenota alla Sky Lounge'
    },
    features: skyLounge.features || [
      {
        de: '360° Panorama-Blick über die Skyline und Landschaft',
        en: '360° panoramic horizon and city skyline vistas',
        it: 'Vista panoramica a 360° sulla skyline'
      },
      {
        de: 'Signature Cocktails, erlesene Weine & feine Aperitifs',
        en: 'Signature artisan cocktails, select wines & craft spirits',
        it: 'Cocktail d’autore, vini pregiati e distillati ricercati'
      },
      {
        de: 'Exklusive Lounge-Musik & abendliche Beleuchtung',
        en: 'Curated ambient lounge sounds and sunset lighting',
        it: 'Musica lounge rilassante e illuminazione serale'
      }
    ],
    seatingCapacity: skyLounge.seatingCapacity || '45 Open-Air Seats'
  }));

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      if (showSaveSuccess) {
        showSaveSuccess('Rooftop Sky Bar configuration updated successfully!');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const addGalleryImage = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setFormData({
        ...formData,
        gallery: [...formData.gallery, url.trim()]
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23201C]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9E7D53]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold font-sans-clean">
              Rooftop CMS
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-1">
            Rooftop Sky Bar & Lounge Manager
          </h2>
          <p className="text-xs text-[#7D7468] mt-1">
            Manage rooftop branding, sunset hours, seating capacity, photo gallery, and reservation settings.
          </p>
        </div>

        {/* Action button & Lang Switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-lg text-xs">
            {(['de', 'en', 'it'] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                className={`px-2.5 py-1 rounded-md uppercase font-mono font-medium transition-colors ${
                  activeLang === l ? 'bg-[#1E1B18] text-white' : 'text-[#7D7468] hover:text-[#1E1B18]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg flex items-center gap-2 shadow-xs transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {/* Visibility and Status Toggle */}
      <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#23201C]/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#1E1B18] block">Publication Status</span>
          <p className="text-[11px] text-[#7D7468]">
            {formData.status === 'published'
              ? 'Sky Bar is active and accessible via navigation, home page, and direct URL.'
              : 'Sky Bar is in draft mode.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, status: 'published' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              formData.status === 'published'
                ? 'bg-[#9E7D53] text-white'
                : 'bg-white border border-[#23201C]/15 text-[#7D7468]'
            }`}
          >
            Published
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, status: 'draft' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              formData.status === 'draft'
                ? 'bg-[#1E1B18] text-white'
                : 'bg-white border border-[#23201C]/15 text-[#7D7468]'
            }`}
          >
            Draft
          </button>
        </div>
      </div>

      {/* Core Details (Multi-lang) */}
      <div className="bg-white p-6 rounded-xl border border-[#23201C]/10 space-y-4">
        <h3 className="font-serif-luxury text-lg text-[#1E1B18] font-light">
          Content & Messaging ({activeLang.toUpperCase()})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title[activeLang] || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { ...formData.title, [activeLang]: e.target.value }
                })
              }
              className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
              Subtitle / Headline
            </label>
            <input
              type="text"
              value={formData.subtitle[activeLang] || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subtitle: { ...formData.subtitle, [activeLang]: e.target.value }
                })
              }
              className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
              Opening Hours
            </label>
            <input
              type="text"
              value={formData.openingHours ? formData.openingHours[activeLang] || '' : ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  openingHours: { ...(formData.openingHours || {}), [activeLang]: e.target.value }
                })
              }
              className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
              Seating Capacity Label
            </label>
            <input
              type="text"
              value={formData.seatingCapacity || ''}
              onChange={(e) => setFormData({ ...formData, seatingCapacity: e.target.value })}
              placeholder="e.g. 45 Open-Air Seats"
              className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description[activeLang] || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: { ...formData.description, [activeLang]: e.target.value }
              })
            }
            className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
            Reservation CTA Text
          </label>
          <input
            type="text"
            value={formData.reservationCtaText ? formData.reservationCtaText[activeLang] || '' : ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                reservationCtaText: {
                  ...(formData.reservationCtaText || {}),
                  [activeLang]: e.target.value
                }
              })
            }
            className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
          />
        </div>
      </div>

      {/* Primary Photo and Gallery */}
      <div className="bg-white p-6 rounded-xl border border-[#23201C]/10 space-y-4">
        <h3 className="font-serif-luxury text-lg text-[#1E1B18] font-light">
          Rooftop Visuals & Gallery
        </h3>

        <ImageUploader
          label="Featured Rooftop Photograph"
          value={formData.mainImage}
          onChange={(url) => setFormData({ ...formData, mainImage: url })}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium">
              Gallery Photos ({formData.gallery.length})
            </label>
            <button
              type="button"
              onClick={addGalleryImage}
              className="text-xs text-[#9E7D53] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Image URL
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {formData.gallery.map((url, idx) => (
              <div key={idx} className="relative aspect-16/10 rounded-lg overflow-hidden border group bg-neutral-100">
                <img src={url} alt={`Sky Bar ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-600/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button Bar */}
      <div className="flex justify-end gap-4 pt-4 border-t border-[#23201C]/10">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg flex items-center gap-2 shadow-sm transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save & Publish Sky Bar'}</span>
        </button>
      </div>
    </div>
  );
};
