/**
 * Elegant SVG preset logos for Hotel Aries & Sky Lounge.
 * These can be used directly or as inspiration while the user uploads their own branding.
 */

export interface LogoPreset {
  id: string;
  name: string;
  description: string;
  category: 'emblem' | 'monogram' | 'crest';
  svgDataUri: string;
  previewBackground: 'dark' | 'light';
}

// 1. Golden Aries Celestial Crest (Detailed luxury horns & star)
const svgAriesCrest = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
  <defs>
    <linearGradient id="ariesGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8D5B5"/>
      <stop offset="50%" stop-color="#C5A065"/>
      <stop offset="100%" stop-color="#9E7D53"/>
    </linearGradient>
    <linearGradient id="ariesGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DFBD86" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#9E7D53" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <circle cx="80" cy="80" r="74" stroke="url(#ariesGold)" stroke-width="2" stroke-dasharray="4 2" opacity="0.6"/>
  <circle cx="80" cy="80" r="66" stroke="url(#ariesGold)" stroke-width="1" opacity="0.4"/>
  <!-- Aries Symbol / Crown Structure -->
  <path d="M80 34 L80 114" stroke="url(#ariesGold)" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Left Horn -->
  <path d="M80 56 C74 42, 54 36, 42 46 C32 54, 34 70, 46 76 C56 80, 68 72, 70 64" fill="none" stroke="url(#ariesGold)" stroke-width="4" stroke-linecap="round"/>
  <!-- Right Horn -->
  <path d="M80 56 C86 42, 106 36, 118 46 C128 54, 126 70, 114 76 C104 80, 92 72, 90 64" fill="none" stroke="url(#ariesGold)" stroke-width="4" stroke-linecap="round"/>
  <!-- Central Star of Aries -->
  <polygon points="80,22 83,29 90,30 85,35 86,42 80,38 74,42 75,35 70,30 77,29" fill="url(#ariesGold)"/>
  <!-- Base Pedestal / Wing Accent -->
  <path d="M60 118 L80 126 L100 118" stroke="url(#ariesGold)" stroke-width="2" stroke-linecap="round"/>
  <circle cx="80" cy="132" r="2.5" fill="url(#ariesGold)"/>
</svg>`;

// 2. Minimalist Aries Ram Horns Emblem (Modern luxury hotel mark)
const svgModernEmblem = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
  <defs>
    <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2E3C6"/>
      <stop offset="60%" stop-color="#C5A065"/>
      <stop offset="100%" stop-color="#8C6D44"/>
    </linearGradient>
  </defs>
  <!-- Stylized Geometric Aries 'A' and Horns -->
  <path d="M80 28 L116 120 L102 120 L80 62 L58 120 L44 120 Z" fill="url(#goldGrad2)"/>
  <path d="M54 94 L106 94" stroke="url(#goldGrad2)" stroke-width="3"/>
  <!-- Sweeping Horn Arcs -->
  <path d="M80 50 Q48 24 38 48 Q28 72 52 74 Q68 76 74 62" fill="none" stroke="url(#goldGrad2)" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M80 50 Q112 24 122 48 Q132 72 108 74 Q92 76 86 62" fill="none" stroke="url(#goldGrad2)" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="80" cy="18" r="3" fill="url(#goldGrad2)"/>
</svg>`;

// 3. Sky Lounge Rooftop Horizon Crest
const svgSkyLoungeCrest = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
  <defs>
    <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E8D0"/>
      <stop offset="100%" stop-color="#9E7D53"/>
    </linearGradient>
  </defs>
  <!-- Diamond Luxury Shield -->
  <polygon points="80,18 142,80 80,142 18,80" fill="none" stroke="url(#goldGrad3)" stroke-width="2"/>
  <polygon points="80,26 134,80 80,134 26,80" fill="none" stroke="url(#goldGrad3)" stroke-width="1" opacity="0.5"/>
  <!-- Central 'A' & Constellation Stars -->
  <text x="80" y="94" font-family="'Cinzel', 'Playfair Display', serif" font-size="44" font-weight="300" fill="url(#goldGrad3)" text-anchor="middle">A</text>
  <!-- Constellation points -->
  <circle cx="80" cy="40" r="3.5" fill="url(#goldGrad3)"/>
  <line x1="80" y1="44" x2="80" y2="56" stroke="url(#goldGrad3)" stroke-width="1.5"/>
  <circle cx="80" cy="120" r="2.5" fill="url(#goldGrad3)"/>
  <circle cx="46" cy="80" r="2" fill="url(#goldGrad3)"/>
  <circle cx="114" cy="80" r="2" fill="url(#goldGrad3)"/>
</svg>`;

// Helper to turn raw SVG string into safe data URI
const toDataUri = (svgStr: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svgStr)}`;

export const LOGO_PRESETS: LogoPreset[] = [
  {
    id: 'preset-aries-crest',
    name: 'Aries Celestial Crest',
    description: 'Refined golden astrological horns with star pinnacle and royal circular frame.',
    category: 'crest',
    svgDataUri: toDataUri(svgAriesCrest),
    previewBackground: 'dark'
  },
  {
    id: 'preset-modern-emblem',
    name: 'Modern Aries Monogram',
    description: 'Contemporary architectural A-frame with sleek sweeping ram horn curves.',
    category: 'emblem',
    svgDataUri: toDataUri(svgModernEmblem),
    previewBackground: 'dark'
  },
  {
    id: 'preset-sky-diamond',
    name: 'Sky Lounge Diamond Crest',
    description: 'Geometric luxury diamond shield featuring signature serif A monogram.',
    category: 'monogram',
    svgDataUri: toDataUri(svgSkyLoungeCrest),
    previewBackground: 'dark'
  }
];
