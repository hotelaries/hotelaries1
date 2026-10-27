import React, { useState, useRef } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  Check,
  Eye,
  Sliders,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Maximize2,
  Shield,
  Layers,
  Sun,
  Moon,
  Info
} from 'lucide-react';
import { LOGO_PRESETS, LogoPreset } from '../../utils/logoPresets';
import { ContactInfo } from '../../types';

interface LogoManagerProps {
  contact: ContactInfo;
  onSave: (updatedContact: ContactInfo) => Promise<void> | void;
  showSaveSuccess?: (msg?: string) => void;
}

export const LogoManager: React.FC<LogoManagerProps> = ({
  contact,
  onSave,
  showSaveSuccess
}) => {
  const { setCurrentPage, mediaItems } = useSite();

  // Local form state for logo settings
  const [logoUrl, setLogoUrl] = useState<string>(contact.logo || '');
  const [logoLightUrl, setLogoLightUrl] = useState<string>(contact.logoLight || '');
  const [logoHeight, setLogoHeight] = useState<number>(contact.logoHeight || 40);
  const [logoDisplayMode, setLogoDisplayMode] = useState<'logo_and_text' | 'logo_only' | 'text_only'>(
    contact.logoDisplayMode || (contact.logo ? 'logo_and_text' : 'text_only')
  );
  const [logoShape, setLogoShape] = useState<'natural' | 'rounded' | 'circle'>(
    contact.logoShape || 'natural'
  );
  const [showInFooter, setShowInFooter] = useState<boolean>(contact.showLogoInFooter !== false);
  const [showInDrawer, setShowInDrawer] = useState<boolean>(contact.showLogoInDrawer !== false);

  // Tab for adding/changing logo: 'upload' | 'url' | 'presets' | 'media'
  const [inputTab, setInputTab] = useState<'upload' | 'url' | 'presets' | 'media'>('upload');
  const [urlDraft, setUrlDraft] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light'>('dark');
  const [isSaving, setIsSaving] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload and client-side optimization to safe data URL
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose a valid image format (PNG, SVG, JPG, WebP). Transparent PNG or SVG is strongly recommended for hotel logos.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('File exceeds 8MB. Please select a smaller logo file.');
      return;
    }

    setUploadError(null);
    setIsProcessingFile(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setLogoUrl(result);
          if (logoDisplayMode === 'text_only') {
            setLogoDisplayMode('logo_and_text');
          }
          setLocalFeedback('Logo image loaded! Click "Save Logo & Brand" to publish live.');
          setTimeout(() => setLocalFeedback(null), 4000);
        }
        setIsProcessingFile(false);
      };
      reader.onerror = () => {
        setUploadError('Failed to read the file.');
        setIsProcessingFile(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Error processing logo file');
      setIsProcessingFile(false);
    }
  };

  // Apply URL draft
  const handleApplyUrl = () => {
    if (!urlDraft.trim()) {
      setUploadError('Please enter a valid image URL');
      return;
    }
    setLogoUrl(urlDraft.trim());
    if (logoDisplayMode === 'text_only') {
      setLogoDisplayMode('logo_and_text');
    }
    setUrlDraft('');
    setUploadError(null);
    setLocalFeedback('Logo URL applied! Remember to save changes.');
    setTimeout(() => setLocalFeedback(null), 4000);
  };

  // Select Preset
  const handleSelectPreset = (preset: LogoPreset) => {
    setLogoUrl(preset.svgDataUri);
    if (logoDisplayMode === 'text_only') {
      setLogoDisplayMode('logo_and_text');
    }
    setLocalFeedback(`Preset "${preset.name}" applied! Preview below and save.`);
    setTimeout(() => setLocalFeedback(null), 4000);
  };

  // Clear / Remove Logo
  const handleRemoveLogo = () => {
    setLogoUrl('');
    setLogoLightUrl('');
    setLogoDisplayMode('text_only');
    setLocalFeedback('Logo removed. The site will use classical serif typography branding.');
    setTimeout(() => setLocalFeedback(null), 4000);
  };

  // Save changes
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedContact: ContactInfo = {
        ...contact,
        logo: logoUrl.trim(),
        logoLight: logoLightUrl.trim(),
        logoHeight,
        logoDisplayMode,
        logoShape,
        showLogoInFooter: showInFooter,
        showLogoInDrawer: showInDrawer,
        updatedAt: new Date().toISOString()
      };

      await onSave(updatedContact);
      const msg = 'Logo & Brand settings successfully saved and published live!';
      setLocalFeedback(msg);
      showSaveSuccess?.(msg);
      setTimeout(() => setLocalFeedback(null), 4000);
    } catch (err: any) {
      console.error('Save logo error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const currentActiveLogo = logoUrl;

  return (
    <div className="space-y-8" id="admin-logo-manager">
      {/* 1. Top Title & Save Button Bar */}
      <div className="border-b border-[#23201C]/10 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
              <span>Brand & Identity</span>
              <span>→</span>
              <span className="text-[#1E1B18]">Logo Manager</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-1">
              Website Logo & Brand Emblem
            </h2>
            <p className="text-xs text-[#7D7468] font-light mt-0.5">
              Upload your custom hotel logo or emblem, choose display mode, adjust sizing, and preview in real time across light and dark modes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="admin-btn-save-logo"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] active:bg-[#785C36] text-white text-xs uppercase tracking-wider font-medium rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Logo & Brand'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Success Feedback */}
      {localFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{localFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setLocalFeedback(null)}
            className="text-emerald-700 hover:text-emerald-950 text-xs px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3. Live Interactive Preview Canvas */}
      <div className="bg-white rounded-2xl border border-[#23201C]/10 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#23201C]/8 pb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#9E7D53]" />
            <h3 className="text-xs uppercase tracking-wider text-[#1E1B18] font-semibold">
              Live Header & Brand Preview
            </h3>
          </div>

          {/* Preview Background Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-lg border border-[#23201C]/10 text-xs">
            <button
              type="button"
              onClick={() => setPreviewBg('dark')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                previewBg === 'dark'
                  ? 'bg-[#1E1B18] text-white shadow-xs'
                  : 'text-[#7D7468] hover:text-[#1E1B18]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark / Hero Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewBg('light')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                previewBg === 'light'
                  ? 'bg-white text-[#1E1B18] shadow-xs'
                  : 'text-[#7D7468] hover:text-[#1E1B18]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light / Scrolled Mode</span>
            </button>
          </div>
        </div>

        {/* The Simulated Header Preview */}
        <div
          className={`w-full rounded-xl p-6 sm:p-8 flex items-center justify-center transition-all duration-300 ${
            previewBg === 'dark'
              ? 'bg-[#181614] border border-white/10 text-white'
              : 'bg-[#FAF8F5] border border-[#23201C]/10 text-[#1E1B18]'
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center max-w-md">
            {/* Logo Image */}
            {currentActiveLogo && logoDisplayMode !== 'text_only' ? (
              <div className="flex items-center gap-3.5 justify-center">
                <img
                  src={currentActiveLogo}
                  alt={contact.hotelName || 'Hotel Logo'}
                  style={{
                    height: `${logoHeight}px`,
                    width: 'auto',
                    maxHeight: '80px'
                  }}
                  className={`object-contain transition-all duration-200 ${
                    logoShape === 'circle'
                      ? 'rounded-full'
                      : logoShape === 'rounded'
                      ? 'rounded-lg'
                      : ''
                  }`}
                />

                {/* If logo_and_text mode */}
                {logoDisplayMode === 'logo_and_text' && (
                  <div className="flex flex-col text-left">
                    <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.2em] uppercase font-light leading-tight">
                      {contact.hotelName || 'HOTEL ARIES'}
                    </span>
                    <span
                      className={`text-[9px] tracking-[0.35em] uppercase font-light mt-0.5 ${
                        previewBg === 'dark' ? 'text-white/75' : 'text-[#7D7468]'
                      }`}
                    >
                      {contact.subtitle || 'SKY LOUNGE'}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback Typography Only */
              <div className="flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.24em] uppercase font-light">
                  {contact.hotelName || 'HOTEL ARIES'}
                </span>
                <span
                  className={`text-[10px] tracking-[0.35em] uppercase font-light mt-1 ${
                    previewBg === 'dark' ? 'text-white/70' : 'text-[#7D7468]'
                  }`}
                >
                  {contact.subtitle || 'SKY LOUNGE'}
                </span>
              </div>
            )}

            <span className="text-[10px] uppercase font-mono tracking-widest text-[#9E7D53] mt-3">
              Mode: {logoDisplayMode.replace(/_/g, ' ')} · Height: {logoHeight}px
            </span>
          </div>
        </div>

        {/* Quick hint */}
        <div className="flex items-center justify-between text-xs text-[#7D7468] pt-1">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>Recommended format: Transparent PNG or SVG with 1:1 or horizontal aspect ratio.</span>
          </div>
          {currentActiveLogo && (
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Logo</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Add / Upload / Select Logo Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Methods to add logo (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-[#23201C]/10 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#23201C]/8 pb-4">
              <h3 className="text-sm font-serif-luxury text-[#1E1B18] font-medium uppercase tracking-wider">
                1. Choose Logo Source
              </h3>

              {/* Subtabs for logo input */}
              <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] rounded-lg border border-[#23201C]/10 text-xs">
                <button
                  type="button"
                  onClick={() => setInputTab('upload')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    inputTab === 'upload'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#7D7468] hover:text-[#1E1B18]'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setInputTab('presets')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    inputTab === 'presets'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#7D7468] hover:text-[#1E1B18]'
                  }`}
                >
                  Luxury Presets
                </button>
                <button
                  type="button"
                  onClick={() => setInputTab('url')}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${
                    inputTab === 'url'
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#7D7468] hover:text-[#1E1B18]'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Tab 1: Upload File */}
            {inputTab === 'upload' && (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#23201C]/20 hover:border-[#9E7D53] hover:bg-[#FAF8F5] rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] group-hover:bg-[#9E7D53]/10 text-[#9E7D53] flex items-center justify-center mb-3 transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-medium text-[#1E1B18]">
                    Click or drag & drop your Logo here
                  </h4>
                  <p className="text-xs text-[#7D7468] mt-1 max-w-sm mx-auto">
                    Supports transparent PNG, SVG, WebP, or high-res JPG (up to 8MB). Automatically optimized for instant mobile and desktop display.
                  </p>
                  <span className="inline-block mt-4 px-4 py-2 bg-[#FAF8F5] group-hover:bg-white text-xs text-[#1E1B18] font-medium rounded-lg border border-[#23201C]/10 transition-colors">
                    Browse Logo File
                  </span>
                </div>

                {isProcessingFile && (
                  <p className="text-xs text-[#9E7D53] animate-pulse text-center">
                    Processing and optimizing image...
                  </p>
                )}
              </div>
            )}

            {/* Tab 2: Luxury Presets */}
            {inputTab === 'presets' && (
              <div className="space-y-4">
                <p className="text-xs text-[#7D7468]">
                  Select an elegant, ready-to-use bespoke emblem crafted for Hotel Aries & Sky Lounge:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {LOGO_PRESETS.map((preset) => {
                    const isSelected = currentActiveLogo === preset.svgDataUri;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center relative group ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#9E7D53] ring-2 ring-[#9E7D53]/20 shadow-xs'
                            : 'bg-white border-[#23201C]/10 hover:border-[#9E7D53]/50'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#9E7D53] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="w-16 h-16 rounded-xl bg-[#181614] p-2 flex items-center justify-center mb-2.5 shadow-inner">
                          <img
                            src={preset.svgDataUri}
                            alt={preset.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h5 className="text-xs font-semibold text-[#1E1B18] leading-tight">
                          {preset.name}
                        </h5>
                        <p className="text-[10px] text-[#7D7468] mt-1 line-clamp-2">
                          {preset.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Image URL */}
            {inputTab === 'url' && (
              <div className="space-y-4">
                <label className="block text-xs font-medium text-[#1E1B18]">
                  Paste Direct Logo Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlDraft}
                    onChange={(e) => setUrlDraft(e.target.value)}
                    placeholder="https://example.com/hotel-aries-logo.png"
                    className="flex-1 px-3 py-2.5 bg-[#FAF8F5] border border-[#23201C]/15 rounded-lg text-xs focus:ring-1 focus:ring-[#9E7D53] focus:border-[#9E7D53] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2 bg-[#1E1B18] hover:bg-[#3D3831] text-white text-xs font-medium rounded-lg transition-colors shrink-0"
                  >
                    Apply URL
                  </button>
                </div>
                <p className="text-[11px] text-[#7D7468]">
                  Make sure the link points directly to an image file (e.g. ending in .png, .svg, .webp).
                </p>
              </div>
            )}

            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {uploadError}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Display Style & Dimensions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#23201C]/10 p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-serif-luxury text-[#1E1B18] font-medium uppercase tracking-wider border-b border-[#23201C]/8 pb-4">
              2. Display Style & Sizing
            </h3>

            {/* Display Mode Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#1E1B18]">
                Header Display Mode
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setLogoDisplayMode('logo_and_text')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    logoDisplayMode === 'logo_and_text'
                      ? 'bg-[#FAF8F5] border-[#9E7D53] ring-1 ring-[#9E7D53]'
                      : 'border-[#23201C]/10 hover:border-[#23201C]/25'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    logoDisplayMode === 'logo_and_text' ? 'border-[#9E7D53] bg-[#9E7D53]' : 'border-[#7D7468]'
                  }`}>
                    {logoDisplayMode === 'logo_and_text' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1E1B18] block">
                      Logo Emblem + Hotel Name
                    </span>
                    <span className="text-[11px] text-[#7D7468]">
                      Displays your emblem alongside HOTEL ARIES & SKY LOUNGE typography.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLogoDisplayMode('logo_only')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    logoDisplayMode === 'logo_only'
                      ? 'bg-[#FAF8F5] border-[#9E7D53] ring-1 ring-[#9E7D53]'
                      : 'border-[#23201C]/10 hover:border-[#23201C]/25'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    logoDisplayMode === 'logo_only' ? 'border-[#9E7D53] bg-[#9E7D53]' : 'border-[#7D7468]'
                  }`}>
                    {logoDisplayMode === 'logo_only' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1E1B18] block">
                      Logo Only (Full Wordmark)
                    </span>
                    <span className="text-[11px] text-[#7D7468]">
                      Replaces text with your standalone brand logo graphic.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLogoDisplayMode('text_only')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    logoDisplayMode === 'text_only'
                      ? 'bg-[#FAF8F5] border-[#9E7D53] ring-1 ring-[#9E7D53]'
                      : 'border-[#23201C]/10 hover:border-[#23201C]/25'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    logoDisplayMode === 'text_only' ? 'border-[#9E7D53] bg-[#9E7D53]' : 'border-[#7D7468]'
                  }`}>
                    {logoDisplayMode === 'text_only' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1E1B18] block">
                      Text Only (Default Serif)
                    </span>
                    <span className="text-[11px] text-[#7D7468]">
                      Keeps clean serif luxury lettering without an image mark.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Height Slider */}
            <div className="space-y-2 pt-2 border-t border-[#23201C]/8">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#1E1B18]">
                  Logo Height in Header
                </label>
                <span className="text-xs font-mono font-semibold text-[#9E7D53]">
                  {logoHeight}px
                </span>
              </div>
              <input
                type="range"
                min={24}
                max={72}
                step={2}
                value={logoHeight}
                onChange={(e) => setLogoHeight(Number(e.target.value))}
                className="w-full accent-[#9E7D53] cursor-pointer"
              />
              <div className="flex justify-between gap-1 text-[10px] text-[#7D7468]">
                <span>Compact (28px)</span>
                <span>Standard (40px)</span>
                <span>Large (60px)</span>
              </div>
            </div>

            {/* Logo Shape */}
            <div className="space-y-2 pt-2 border-t border-[#23201C]/8">
              <label className="block text-xs font-medium text-[#1E1B18]">
                Logo Corners
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['natural', 'rounded', 'circle'] as const).map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => setLogoShape(shape)}
                    className={`py-2 px-3 rounded-lg border capitalize text-center transition-all ${
                      logoShape === shape
                        ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                        : 'bg-[#FAF8F5] text-[#5B544B] border-[#23201C]/10 hover:border-[#23201C]/30'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Where to Display Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#23201C]/8">
              <label className="block text-xs font-medium text-[#1E1B18]">
                Visibility Placements
              </label>
              
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F5] border border-[#23201C]/8 cursor-pointer">
                <span className="text-xs text-[#1E1B18]">Show in Mobile Drawer Menu</span>
                <input
                  type="checkbox"
                  checked={showInDrawer}
                  onChange={(e) => setShowInDrawer(e.target.checked)}
                  className="w-4 h-4 accent-[#9E7D53] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F5] border border-[#23201C]/8 cursor-pointer">
                <span className="text-xs text-[#1E1B18]">Show in Footer</span>
                <input
                  type="checkbox"
                  checked={showInFooter}
                  onChange={(e) => setShowInFooter(e.target.checked)}
                  className="w-4 h-4 accent-[#9E7D53] rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
