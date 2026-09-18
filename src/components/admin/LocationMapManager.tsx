import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  Check,
  AlertTriangle,
  Copy,
  Sparkles,
  Sliders,
  Maximize2,
  FileCode,
  Save,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { extractMapEmbedSrc, isValidMapEmbedCode, DEFAULT_MAP_EMBED_CODE, DEFAULT_DIRECTIONS_URL } from '../../utils/mapUtils';
import { ContactInfo } from '../../types';

interface LocationMapManagerProps {
  contact: ContactInfo;
  onSave: (updatedContact: ContactInfo) => Promise<void> | void;
  showSaveSuccess?: (msg?: string) => void;
}

export const LocationMapManager: React.FC<LocationMapManagerProps> = ({
  contact,
  onSave,
  showSaveSuccess
}) => {
  // Sub-navigation within Contact & Footer
  const [activeSubTab, setActiveSubTab] = useState<'location' | 'general'>('location');

  // Local form state
  const [formData, setFormData] = useState<ContactInfo>(() => ({
    ...contact,
    phone1: contact.phone1 || contact.phone || '72593 32223',
    phone: contact.phone || contact.phone1 || '72593 32223',
    phone2: contact.phone2 || '89683 99764',
    email: contact.email || 'hotelaries764@gmail.com',
    address: contact.address || 'SBP, City of dreams, high ground road zirakpur. 140603',
    postalCode: contact.postalCode || '140603',
    city: contact.city || 'Zirakpur',
    region: contact.region || 'Punjab',
    country: contact.country || 'India',
    mapEmbedHtml: contact.mapEmbedHtml || DEFAULT_MAP_EMBED_CODE,
    directionsUrl: contact.directionsUrl || DEFAULT_DIRECTIONS_URL,
    mapTitle: contact.mapTitle || 'Location & Directions',
    showMap: contact.showMap !== false,
    mapHeight: contact.mapHeight || 450
  }));

  // Re-sync if parent contact updates externally
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...contact,
      phone1: contact.phone1 || contact.phone || prev.phone1 || '72593 32223',
      phone: contact.phone || contact.phone1 || prev.phone || '72593 32223',
      phone2: contact.phone2 || prev.phone2 || '89683 99764',
      email: contact.email || prev.email || 'hotelaries764@gmail.com',
      address: contact.address || prev.address || 'SBP, City of dreams, high ground road zirakpur. 140603',
      postalCode: contact.postalCode || prev.postalCode || '140603',
      city: contact.city || prev.city || 'Zirakpur',
      mapEmbedHtml: contact.mapEmbedHtml !== undefined ? contact.mapEmbedHtml : prev.mapEmbedHtml || DEFAULT_MAP_EMBED_CODE,
      directionsUrl: contact.directionsUrl || prev.directionsUrl || DEFAULT_DIRECTIONS_URL,
      mapTitle: contact.mapTitle || prev.mapTitle || 'Location & Directions',
      showMap: contact.showMap !== undefined ? contact.showMap : prev.showMap,
      mapHeight: contact.mapHeight || prev.mapHeight || 450
    }));
  }, [contact]);

  // Status & modal states
  const [isSaving, setIsSaving] = useState(false);
  const [localSuccessNotice, setLocalSuccessNotice] = useState<string | null>(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [replaceInput, setReplaceInput] = useState('');
  const [replaceError, setReplaceError] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  // Computed validity and extracted source
  const currentMapSrc = extractMapEmbedSrc(formData.mapEmbedHtml);
  const isEmbedValid = isValidMapEmbedCode(formData.mapEmbedHtml);

  // Save handler
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload: ContactInfo = {
        ...formData,
        phone: formData.phone1 || formData.phone,
        phoneFormatted: (formData.phone1 || formData.phone).replace(/\s+/g, ''),
        phone2Formatted: formData.phone2 ? formData.phone2.replace(/\s+/g, '') : '',
        mapEmbedUrl: currentMapSrc || formData.mapEmbedUrl || '',
        updatedAt: new Date().toISOString()
      };

      await onSave(payload);

      const successMsg = 'Location & Map settings successfully saved and published live!';
      setLocalSuccessNotice(successMsg);
      showSaveSuccess?.(successMsg);
      setTimeout(() => setLocalSuccessNotice(null), 4000);
    } catch (err: any) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Preview scroll handler
  const handleScrollToPreview = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Clear/Delete map confirmation
  const handleConfirmClearMap = () => {
    setFormData((prev) => ({
      ...prev,
      mapEmbedHtml: '',
      mapEmbedUrl: ''
    }));
    setIsClearModalOpen(false);
    setLocalSuccessNotice('Map embed code cleared. Click "Save Changes" to apply.');
    setTimeout(() => setLocalSuccessNotice(null), 4000);
  };

  // Replace map handler
  const handleApplyReplaceMap = () => {
    if (!replaceInput.trim()) {
      setReplaceError('Please paste an iframe embed code or map URL.');
      return;
    }

    if (!isValidMapEmbedCode(replaceInput)) {
      setReplaceError('The code does not appear to be a trusted map iframe from Google Maps or OpenStreetMap.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      mapEmbedHtml: replaceInput.trim(),
      mapEmbedUrl: extractMapEmbedSrc(replaceInput.trim()) || prev.mapEmbedUrl
    }));

    setIsReplaceModalOpen(false);
    setReplaceInput('');
    setReplaceError('');
    setLocalSuccessNotice('New map code applied! Please preview and click "Save Changes".');
    setTimeout(() => setLocalSuccessNotice(null), 4000);
  };

  // Restore initial default map code
  const handleRestoreDefaultMap = () => {
    setFormData((prev) => ({
      ...prev,
      mapEmbedHtml: DEFAULT_MAP_EMBED_CODE,
      mapEmbedUrl: extractMapEmbedSrc(DEFAULT_MAP_EMBED_CODE) || '',
      directionsUrl: DEFAULT_DIRECTIONS_URL
    }));
    setLocalSuccessNotice('Default Google Maps embed code restored. Remember to save changes.');
    setTimeout(() => setLocalSuccessNotice(null), 4000);
  };

  return (
    <div className="space-y-8" id="admin-location-map-cms">
      {/* 1. Header & Sub-Navigation Tabs */}
      <div className="border-b border-[#23201C]/10 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
              <span>Contact & Footer</span>
              <span>→</span>
              <span className="text-[#1E1B18]">Location & Map</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1E1B18] mt-1">
              Location, Address & Google Maps CMS
            </h2>
            <p className="text-xs text-[#7D7468] font-light mt-0.5">
              Manage your hotel address, interactive Google Maps iframe embed, navigation directions, and public display options.
            </p>
          </div>

          {/* Main Action: Save Changes */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="admin-btn-save-location"
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] disabled:opacity-50 text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-xs transition-all active:scale-[0.99]"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sub Tabs Toggle */}
        <div className="flex items-center gap-2 mt-6">
          <button
            type="button"
            id="tab-btn-location-map"
            onClick={() => setActiveSubTab('location')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'location'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'bg-white text-[#5B544B] hover:text-[#1E1B18] border border-[#23201C]/10'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>Location & Map</span>
            {formData.showMap ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Map is ON" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Map is OFF" />
            )}
          </button>

          <button
            type="button"
            id="tab-btn-general-footer"
            onClick={() => setActiveSubTab('general')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'general'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'bg-white text-[#5B544B] hover:text-[#1E1B18] border border-[#23201C]/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>General Contact & Footer</span>
          </button>
        </div>
      </div>

      {/* 2. Feedback Notifications */}
      {localSuccessNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{localSuccessNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setLocalSuccessNotice(null)}
            className="text-emerald-700 hover:text-emerald-950 text-xs px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 1: LOCATION & MAP */}
      {/* ========================================================================= */}
      {activeSubTab === 'location' && (
        <div className="space-y-8">
          {/* Quick Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#F5F2EB] rounded-xl border border-[#23201C]/8">
            <div className="flex items-center gap-2 text-xs text-[#5B544B]">
              <span className="font-semibold text-[#1E1B18]">Map Visibility:</span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase font-medium ${
                  formData.showMap
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-neutral-200 text-neutral-700 border border-neutral-300'
                }`}
              >
                {formData.showMap ? '● Map is Active (ON)' : '○ Map is Hidden (OFF)'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="admin-btn-preview-map"
                onClick={handleScrollToPreview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 text-[#1E1B18] text-xs font-medium rounded-lg border border-[#23201C]/15 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#9E7D53]" />
                <span>Preview Map</span>
              </button>

              <button
                type="button"
                id="admin-btn-replace-map"
                onClick={() => {
                  setReplaceInput('');
                  setReplaceError('');
                  setIsReplaceModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 text-[#1E1B18] text-xs font-medium rounded-lg border border-[#23201C]/15 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#9E7D53]" />
                <span>Replace Map</span>
              </button>

              <button
                type="button"
                id="admin-btn-clear-map"
                onClick={() => setIsClearModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg border border-red-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                <span>Clear / Delete Map</span>
              </button>

              <button
                type="button"
                id="admin-btn-restore-default-map"
                onClick={handleRestoreDefaultMap}
                title="Reset to default SBP City of Dreams Google Map"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 text-[#7D7468] hover:text-[#1E1B18] text-xs rounded-lg border border-[#23201C]/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#9E7D53]" />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>

          {/* Section: LOCATION INFORMATION */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#23201C]/10 bg-white shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#23201C]/8 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9E7D53]" />
                <h3 className="font-serif-luxury text-lg font-normal text-[#1E1B18]">
                  Location Information
                </h3>
              </div>
              <span className="text-[11px] text-[#7D7468]">Displayed beside the map on public website</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Hotel Address */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                  Hotel Address *
                </label>
                <input
                  id="admin-input-hotel-address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. SBP City of Dreams, Sector 115"
                  className="w-full border border-[#23201C]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53] focus:ring-1 focus:ring-[#9E7D53]"
                />
                <span className="block text-[11px] text-[#7D7468] mt-1 font-light">
                  Exact street address displayed in the public Location section.
                </span>
              </div>

              {/* City & Region Details */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                  City & State / Region
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City (e.g. Mohali)"
                    className="border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53]"
                  />
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="Region (e.g. Punjab)"
                    className="border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53]"
                  />
                </div>
              </div>

              {/* Postal Code & Country */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                  Postal Code & Country
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="Postal Code"
                    className="border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53]"
                  />
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Country (e.g. India)"
                    className="border border-[#23201C]/15 rounded-lg px-3 py-2 text-xs text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53]"
                  />
                </div>
              </div>

              {/* Phone 1 */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                  Phone 1 *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#9E7D53] absolute left-3 top-3" />
                  <input
                    id="admin-input-phone1"
                    type="text"
                    value={formData.phone1 || formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone1: e.target.value, phone: e.target.value })}
                    placeholder="72593 32223"
                    className="w-full border border-[#23201C]/15 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1E1B18] font-mono focus:outline-hidden focus:border-[#9E7D53]"
                  />
                </div>
              </div>

              {/* Phone 2 */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                  Phone 2
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#9E7D53] absolute left-3 top-3" />
                  <input
                    id="admin-input-phone2"
                    type="text"
                    value={formData.phone2 || ''}
                    onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                    placeholder="89683 99764"
                    className="w-full border border-[#23201C]/15 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1E1B18] font-mono focus:outline-hidden focus:border-[#9E7D53]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#9E7D53] absolute left-3 top-3" />
                  <input
                    id="admin-input-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hotelaries764@gmail.com"
                    className="w-full border border-[#23201C]/15 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1E1B18] font-mono focus:outline-hidden focus:border-[#9E7D53]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: GOOGLE MAP CONFIGURATION */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#23201C]/10 bg-white shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#23201C]/8 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#9E7D53]" />
                <h3 className="font-serif-luxury text-lg font-normal text-[#1E1B18]">
                  Google Map Embed & Display Settings
                </h3>
              </div>
              <span className="text-[11px] text-[#7D7468]">Controls iframe rendering & dimensions</span>
            </div>

            {/* Map Section Title */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                Map Section Title
              </label>
              <input
                id="admin-input-map-title"
                type="text"
                value={formData.mapTitle || ''}
                onChange={(e) => setFormData({ ...formData, mapTitle: e.target.value })}
                placeholder="e.g. Location & Directions, Where to Find Us"
                className="w-full border border-[#23201C]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53]"
              />
              <span className="block text-[11px] text-[#7D7468] mt-1 font-light">
                Headline displayed at the top of the Location section on the public website.
              </span>
            </div>

            {/* Show Map ON / OFF Switch */}
            <div className="p-4 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-semibold text-[#1E1B18]">Show Map ON / OFF</span>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md font-semibold ${
                      formData.showMap ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {formData.showMap ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
                <p className="text-xs text-[#7D7468] font-light mt-0.5">
                  Toggle whether the interactive Google Map is rendered in the public Location section.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  id="admin-toggle-show-map"
                  role="switch"
                  aria-checked={formData.showMap}
                  onClick={() => setFormData({ ...formData, showMap: !formData.showMap })}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#9E7D53] ${
                    formData.showMap ? 'bg-[#9E7D53]' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out flex items-center justify-center text-[10px] text-[#1E1B18] ${
                      formData.showMap ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  >
                    {formData.showMap ? <Check className="w-3.5 h-3.5 text-[#9E7D53]" /> : <EyeOff className="w-3 h-3 text-neutral-500" />}
                  </div>
                </button>
                <span className="text-xs font-medium text-[#1E1B18] w-12">
                  {formData.showMap ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>

            {/* Map Height Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#7D7468] font-medium">
                  Map Height: <span className="font-mono text-[#1E1B18] font-semibold">{formData.mapHeight || 450}px</span>
                </label>
                {/* Preset buttons */}
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-[#7D7468] text-[11px] mr-1 hidden sm:inline">Presets:</span>
                  {[350, 450, 550, 650].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setFormData({ ...formData, mapHeight: h })}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        formData.mapHeight === h
                          ? 'bg-[#1E1B18] text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-[#5B544B]'
                      }`}
                    >
                      {h}px
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  id="admin-range-map-height"
                  type="range"
                  min={250}
                  max={750}
                  step={25}
                  value={formData.mapHeight || 450}
                  onChange={(e) => setFormData({ ...formData, mapHeight: parseInt(e.target.value, 10) || 450 })}
                  className="flex-1 accent-[#9E7D53] cursor-pointer"
                />
                <input
                  id="admin-input-map-height"
                  type="number"
                  min={250}
                  max={800}
                  value={formData.mapHeight || 450}
                  onChange={(e) => setFormData({ ...formData, mapHeight: parseInt(e.target.value, 10) || 450 })}
                  className="w-20 border border-[#23201C]/15 rounded-lg px-2 py-1 text-xs text-center font-mono"
                />
              </div>
              <span className="block text-[11px] text-[#7D7468] font-light">
                Recommended: 450px for standard luxury viewports, 350px for compact layouts.
              </span>
            </div>

            {/* Google Maps Embed Code Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#7D7468] font-medium">
                  Google Maps Embed Code (iframe) *
                </label>
                {/* Validation Badge */}
                {formData.mapEmbedHtml?.trim() ? (
                  isEmbedValid ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3" /> Valid Map Embed Detected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertTriangle className="w-3 h-3" /> Untrusted / Incomplete Embed
                    </span>
                  )
                ) : (
                  <span className="text-[11px] text-neutral-500 italic">No embed code provided</span>
                )}
              </div>

              <textarea
                id="admin-textarea-map-embed"
                rows={4}
                value={formData.mapEmbedHtml || ''}
                onChange={(e) => setFormData({ ...formData, mapEmbedHtml: e.target.value })}
                placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
                className="w-full font-mono text-xs border border-[#23201C]/15 rounded-lg p-3 text-[#1E1B18] bg-white focus:outline-hidden focus:border-[#9E7D53] focus:ring-1 focus:ring-[#9E7D53] resize-y"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7D7468]">
                <p className="font-light">
                  Paste the complete <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">&lt;iframe&gt;</code> code copied from Google Maps (<em className="not-italic font-medium">Share → Embed a map</em>).
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.readText?.().then((text) => {
                        if (text) {
                          setFormData({ ...formData, mapEmbedHtml: text });
                          setLocalSuccessNotice('Pasted code from clipboard.');
                          setTimeout(() => setLocalSuccessNotice(null), 3000);
                        }
                      }).catch(() => {
                        alert('Please use Ctrl+V / Cmd+V to paste directly into the box.');
                      });
                    }}
                    className="text-[#9E7D53] hover:underline"
                  >
                    Paste from Clipboard
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mapEmbedHtml: '' })}
                    className="text-red-600 hover:underline"
                  >
                    Clear Box
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: DIRECTIONS */}
          <div className="p-6 sm:p-7 rounded-2xl border border-[#23201C]/10 bg-white shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#23201C]/8 pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#9E7D53]" />
                <h3 className="font-serif-luxury text-lg font-normal text-[#1E1B18]">
                  Directions & Navigation URL
                </h3>
              </div>
              <span className="text-[11px] text-[#7D7468]">Powers the "Get Directions" button</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7D7468] mb-1 font-medium">
                Google Maps Directions URL *
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <ExternalLink className="w-3.5 h-3.5 text-[#9E7D53] absolute left-3 top-3" />
                  <input
                    id="admin-input-directions-url"
                    type="url"
                    value={formData.directionsUrl || ''}
                    onChange={(e) => setFormData({ ...formData, directionsUrl: e.target.value })}
                    placeholder="https://www.google.com/maps/dir/?api=1&destination=..."
                    className="w-full border border-[#23201C]/15 rounded-lg pl-9 pr-3 py-2 text-xs text-[#1E1B18] font-mono focus:outline-hidden focus:border-[#9E7D53]"
                  />
                </div>

                {/* Preview / Get Directions Button */}
                <a
                  id="admin-btn-test-directions"
                  href={formData.directionsUrl || DEFAULT_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg shrink-0 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Test Directions Link</span>
                  <ExternalLink className="w-3 h-3 text-white/70" />
                </a>
              </div>
              <span className="block text-[11px] text-[#7D7468] mt-1 font-light">
                When visitors click "GET DIRECTIONS" on your website, they will be sent directly to turn-by-turn navigation for this URL.
              </span>
            </div>
          </div>

          {/* Section: LIVE MAP PREVIEW */}
          <div ref={previewRef} className="p-6 sm:p-7 rounded-2xl border border-[#23201C]/10 bg-white shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23201C]/8 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#9E7D53]" />
                <h3 className="font-serif-luxury text-lg font-normal text-[#1E1B18]">
                  Live Map Preview
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#7D7468]">
                  Status:{' '}
                  <strong className={formData.showMap ? 'text-emerald-700' : 'text-neutral-600'}>
                    {formData.showMap ? 'Visible on Site' : 'Hidden on Site (OFF)'}
                  </strong>
                </span>
                <span className="text-[#23201C]/20">|</span>
                <span className="text-[#7D7468] font-mono">
                  {formData.mapHeight || 450}px height · 100% width
                </span>
              </div>
            </div>

            {/* Map Frame Preview */}
            <div
              className="w-full rounded-xl overflow-hidden bg-[#ECE8E1] border border-[#23201C]/10 shadow-inner relative"
              style={{
                minHeight: '300px',
                height: `${formData.mapHeight || 450}px`
              }}
            >
              {currentMapSrc ? (
                <>
                  <iframe
                    id="admin-preview-iframe"
                    title="Google Maps Admin Preview"
                    src={currentMapSrc}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      width: '100%',
                      height: '100%',
                      display: 'block'
                    }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  {!formData.showMap && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center text-white pointer-events-none">
                      <EyeOff className="w-10 h-10 text-amber-400 mb-2" />
                      <p className="font-serif-luxury text-xl">Map is Currently Switched OFF</p>
                      <p className="text-xs text-white/80 max-w-sm mt-1">
                        The interactive map is disabled and hidden from the public website. Turn "Show Map" ON above to display it.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7D7468]">
                  <AlertTriangle className="w-10 h-10 text-[#9E7D53] mb-2" />
                  <p className="font-serif-luxury text-base text-[#1E1B18]">No Map Code Configured</p>
                  <p className="text-xs text-[#5B544B] max-w-sm mt-1 mb-4">
                    Paste a valid Google Maps embed code above or click "Reset to Default" to see the live map preview.
                  </p>
                  <button
                    type="button"
                    onClick={handleRestoreDefaultMap}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9E7D53] text-white text-xs rounded-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Load Default SBP City of Dreams Map</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom preview info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-[#7D7468]">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#9E7D53] shrink-0" />
                <span className="truncate">{formData.address || 'Address pending'}</span>
              </div>
              <a
                href={formData.directionsUrl || DEFAULT_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9E7D53] hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-between p-5 bg-[#FAF8F5] rounded-xl border border-[#23201C]/10">
            <div className="text-xs text-[#7D7468]">
              <span>Changes are saved immediately to both your database and local state.</span>
            </div>
            <button
              type="button"
              id="admin-btn-save-bottom"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] disabled:opacity-50 text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-xs transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 2: GENERAL CONTACT & FOOTER DETAILS */}
      {/* ========================================================================= */}
      {activeSubTab === 'general' && (
        <div className="p-6 sm:p-7 rounded-2xl border border-[#23201C]/10 bg-white shadow-xs space-y-6">
          <div className="border-b border-[#23201C]/8 pb-3">
            <h3 className="font-serif-luxury text-lg font-normal text-[#1E1B18]">
              General Identity & Footer Settings
            </h3>
            <p className="text-xs text-[#7D7468] font-light">
              Brand titles, tax numbers, and footer narrative configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Hotel Brand Name</label>
              <input
                type="text"
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                className="w-full border rounded-lg p-2.5 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full border rounded-lg p-2.5 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#7D7468] mb-1">VAT / MwSt. Number</label>
              <input
                type="text"
                value={formData.vatNumber || ''}
                onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                placeholder="Optional"
                className="w-full border rounded-lg p-2.5 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Instagram Handle / URL</label>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="hotelaries"
                className="w-full border rounded-lg p-2.5 text-xs bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Footer Short Description</label>
              <textarea
                rows={3}
                value={formData.footerDescription || ''}
                onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                className="w-full border rounded-lg p-2.5 text-xs bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Copyright Text</label>
              <input
                type="text"
                value={formData.copyrightText || ''}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                className="w-full border rounded-lg p-2.5 text-xs bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#23201C]/8">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-xs transition-all"
            >
              Save General Info
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CONFIRM CLEAR / DELETE MAP */}
      {/* ========================================================================= */}
      {isClearModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#23201C]/10 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-serif-luxury text-xl font-normal text-[#1E1B18]">
                Clear Google Maps Embed?
              </h4>
              <p className="text-xs text-[#5B544B] font-light leading-relaxed mt-2">
                Are you sure you want to clear/delete the Google Maps embed code? The interactive map will be removed from your website until a new embed code is saved.
              </p>
            </div>

            <div className="p-3 bg-red-50/70 rounded-xl border border-red-100 text-[11px] text-red-800">
              Note: You can always restore the default SBP City of Dreams map code at any time using the "Reset to Default" button.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#5B544B] hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-delete-map"
                onClick={handleConfirmClearMap}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Yes, Clear Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REPLACE MAP */}
      {/* ========================================================================= */}
      {isReplaceModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#23201C]/10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#23201C]/10 pb-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#9E7D53]" />
                <h4 className="font-serif-luxury text-xl font-normal text-[#1E1B18]">
                  Replace Google Map
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsReplaceModalOpen(false)}
                className="text-[#7D7468] hover:text-[#1E1B18] text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#5B544B] font-light leading-relaxed">
              Paste the new Google Maps embed iframe code or URL below. It will replace the existing map embed in the editor.
            </p>

            <div className="space-y-2">
              <textarea
                rows={4}
                value={replaceInput}
                onChange={(e) => {
                  setReplaceInput(e.target.value);
                  setReplaceError('');
                }}
                placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
                className="w-full font-mono text-xs border border-[#23201C]/15 rounded-lg p-3 text-[#1E1B18] focus:outline-hidden focus:border-[#9E7D53] focus:ring-1 focus:ring-[#9E7D53]"
              />

              {replaceError && (
                <p className="text-[11px] text-red-600 font-medium">
                  {replaceError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsReplaceModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#5B544B] hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-replace-map"
                onClick={handleApplyReplaceMap}
                className="px-5 py-2 rounded-lg bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Apply New Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
