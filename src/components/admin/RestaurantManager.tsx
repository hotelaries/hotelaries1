import React, { useState } from 'react';
import { RestaurantConfig, Language } from '../../types';
import { ImageUploader } from './ImageUploader';
import { Utensils, Plus, Trash2, Check, Clock, Eye, Sparkles } from 'lucide-react';

interface RestaurantManagerProps {
  restaurant?: RestaurantConfig;
  lang: Language;
  onSave: (updated: RestaurantConfig) => void | Promise<void>;
  showSaveSuccess?: (msg: string) => void;
}

export const RestaurantManager: React.FC<RestaurantManagerProps> = ({
  restaurant,
  lang: initialLang,
  onSave,
  showSaveSuccess
}) => {
  const [activeLang, setActiveLang] = useState<Language>(initialLang);
  const [formData, setFormData] = useState<RestaurantConfig>(() => ({
    title: restaurant?.title || {
      de: 'RESTAURANT & FINE DINING',
      en: 'RESTAURANT & FINE DINING',
      it: 'RISTORANTE & FINE DINING'
    },
    subtitle: restaurant?.subtitle || {
      de: 'Kulinarische Eleganz & Herzliche Gastfreundschaft',
      en: 'Culinary Elegance & Authentic Hospitality',
      it: 'Eleganza Culinaria & Ospitalità Autentica'
    },
    tagline: restaurant?.tagline || {
      de: 'Frische Zutaten, kreative Menüs & exzellente Weine',
      en: 'Fresh ingredients, creative menus & curated wines',
      it: 'Ingredienti freschi, menu creativi & vini selezionati'
    },
    description: restaurant?.description || {
      de: 'Unser hoteleigenes Restaurant empfängt Hotelgäste und Feinschmecker mit marktfrischer Küche.',
      en: 'Our hotel restaurant welcomes guests with freshly prepared regional delicacies and attentive service.',
      it: 'Il nostro ristorante accoglie gli ospiti con prelibatezze fresche preparate con cura.'
    },
    cuisine: restaurant?.cuisine || {
      de: 'Moderne & Regionale Spezialitäten',
      en: 'Contemporary & Regional Specialties',
      it: 'Specialità Contemporanee & Regionali'
    },
    openingHours: restaurant?.openingHours || {
      de: 'Täglich: Frühstück 07:00 – 10:30 | Mittag & Abend 12:00 – 23:00',
      en: 'Daily: Breakfast 07:00 – 10:30 | Lunch & Dinner 12:00 – 23:00',
      it: 'Tutti i giorni: Colazione 07:00 – 10:30 | Pranzo e Cena 12:00 – 23:00'
    },
    mainImage:
      restaurant?.mainImage ||
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85',
    gallery: restaurant?.gallery || [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85'
    ],
    status: restaurant?.status || 'published',
    visible: restaurant?.visible !== false,
    reservationCtaText: restaurant?.reservationCtaText || {
      de: 'Tisch im Restaurant reservieren',
      en: 'Reserve a Table',
      it: 'Prenota un Tavolo'
    },
    features: restaurant?.features || [
      {
        de: 'Täglich reichhaltiges Gourmet-Frühstücksbuffet',
        en: 'Daily gourmet breakfast buffet and specialty coffee',
        it: 'Ricca colazione a buffet con caffè artigianale'
      },
      {
        de: 'À-la-carte Mittag- und Abendmenüs mit saisonalem Fokus',
        en: 'A-la-carte lunch and dinner featuring seasonal produce',
        it: 'Menu pranzo e cena à la carte con prodotti di stagione'
      },
      {
        de: 'Zimmer- und Suiten-Service auf Wunsch verfügbar',
        en: 'In-room suite dining service upon request',
        it: 'Servizio in camera su richiesta'
      }
    ],
    menuHighlights: restaurant?.menuHighlights || [
      {
        title: { de: 'Frühstücks-Spezialitäten', en: 'Artisan Breakfast Spread', it: 'Colazione d’Autore' },
        desc: {
          de: 'Frische Backwaren, Eierspeisen nach Wunsch, Früchte & Barista-Kaffee.',
          en: 'Artisan breads, organic eggs made-to-order, local fruits, and barista brews.',
          it: 'Pani artigianali, uova preparate al momento, frutta fresca e caffè d’autore.'
        },
        price: 'Included'
      },
      {
        title: { de: 'Chef’s Seasonal Dinner', en: 'Chef’s Seasonal Dinner', it: 'Cena Stagionale dello Chef' },
        desc: {
          de: 'Modern interpretierte Spezialitäten aus regionalen Spitzenprodukten.',
          en: 'Contemporary creations crafted from select local ingredients.',
          it: 'Creazioni contemporanee realizzate con i migliori prodotti locali.'
        },
        price: 'A la carte'
      },
      {
        title: { de: 'Desserts & Digestif', en: 'Sweet Finishes & Spirits', it: 'Dolci & Distillati' },
        desc: {
          de: 'Hausgemachte Desserts, Kaffeespezialitäten und erlesene Digestifs.',
          en: 'Handmade desserts, specialty espresso, and premium post-dinner digestifs.',
          it: 'Dessert fatti in casa, espresso speciale e digestivi selezionati.'
        },
        price: 'From €8'
      }
    ]
  }));

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      if (showSaveSuccess) {
        showSaveSuccess('Restaurant configuration saved successfully!');
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
            <Utensils className="w-5 h-5 text-[#9E7D53]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold font-sans-clean">
              Dining CMS
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-1">
            Restaurant & Fine Dining Management
          </h2>
          <p className="text-xs text-[#7D7468] mt-1">
            Configure hotel restaurant branding, hours, images, menus, and table reservation options.
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
              ? 'Restaurant section is visible on live guest pages and navigation.'
              : 'Restaurant section is saved as draft and hidden from guests.'}
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
              Restaurant Title
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
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle ? formData.subtitle[activeLang] || '' : ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subtitle: { ...(formData.subtitle || {}), [activeLang]: e.target.value }
                })
              }
              className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
              Cuisine Type
            </label>
            <input
              type="text"
              value={formData.cuisine ? formData.cuisine[activeLang] || '' : ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cuisine: { ...(formData.cuisine || {}), [activeLang]: e.target.value }
                })
              }
              className="w-full border border-[#23201C]/15 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#9E7D53]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
              Service / Opening Hours
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
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
            Description Narrative
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
            Reservation CTA Button Text
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
          Restaurant Imagery & Gallery
        </h3>

        <ImageUploader
          label="Primary Featured Photograph"
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
                <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
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
          <span>{isSaving ? 'Saving...' : 'Save & Publish Restaurant'}</span>
        </button>
      </div>
    </div>
  );
};
