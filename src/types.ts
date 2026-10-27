export type Language = 'de' | 'en' | 'it';

export interface MultiLangText {
  de: string;
  en: string;
  it: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: MultiLangText;
  subtitle: MultiLangText;
  caption?: MultiLangText;
  locationLabel?: MultiLangText;
  button1Text?: MultiLangText;
  button1Link?: string;
  button2Text?: MultiLangText;
  button2Link?: string;
  active?: boolean;
  displayOrder?: number;
}

export interface HeroConfig {
  slides: HeroSlide[];
  autoSlide: boolean;
  slideIntervalSeconds: number;
  showOverlay: boolean;
  mainTagline: MultiLangText;
  heroSubtitle: MultiLangText;
  buttonInquiryText: MultiLangText;
  buttonBookText: MultiLangText;
}

export interface Suite {
  id: string;
  name: MultiLangText;
  category: 'suite' | 'apartment' | 'penthouse' | 'Deluxe' | 'Supreme' | string;
  type?: 'suite' | 'apartment';
  size: string;
  maxGuests: number;
  bedrooms?: number;
  priceFrom: number;
  weekendPrice?: number;
  peakSeasonPrice?: number;
  offSeasonPrice?: number;
  currency?: string;
  availability?: 'available' | 'unavailable' | 'maintenance';
  status?: 'published' | 'draft' | 'archived';
  displayOrder?: number;
  roomCount?: number;
  image: string;
  gallery: string[];
  shortDesc: MultiLangText;
  fullDesc: MultiLangText;
  amenities: string[];
  highlights: MultiLangText[];
  viewType: MultiLangText;
  locationView?: string;
}

export interface Experience {
  id: string;
  title: MultiLangText;
  category: 'wine' | 'nature' | 'cycling' | 'culture';
  image: string;
  shortDesc: MultiLangText;
  details: MultiLangText;
  season: MultiLangText;
  duration: string;
  startingTime?: string;
  price?: string;
  ctaText?: MultiLangText;
  ctaLink?: string;
  status?: 'published' | 'draft' | 'archived';
  displayOrder?: number;
}

export interface WellnessFeature {
  id: string;
  title: MultiLangText;
  desc: MultiLangText;
  image: string;
  tag: MultiLangText;
  category?: 'pool' | 'sauna' | 'garden' | 'relaxation' | 'spa' | 'gym' | 'wifi' | 'parking' | string;
  temperature?: string;
  features?: string[];
  additionalImages?: string[];
  status?: 'published' | 'draft' | 'archived';
  displayOrder?: number;
}

export interface CulinaryItem {
  id: string;
  title: MultiLangText;
  desc: MultiLangText;
  time: string;
  image: string;
  category?: 'breakfast' | 'afternoon' | 'aperitivo' | 'wine' | 'restaurant' | 'skylounge' | 'dinner' | string;
  additionalImages?: string[];
  ctaText?: MultiLangText;
  status?: 'published' | 'draft' | 'archived';
  displayOrder?: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: MultiLangText;
  category: 'all' | 'hotel' | 'rooms' | 'skylounge' | 'dining' | 'amenities' | 'events' | 'suites' | 'wellness' | 'culinary' | 'lifestyle';
  caption?: MultiLangText;
  altText?: string;
  displayOrder?: number;
  featured?: boolean;
}

export interface RoomOverviewConfig {
  totalRooms: number;
  deluxeRoomsCount: number;
  supremeRoomsCount: number;
  heading?: MultiLangText;
  subtitle?: MultiLangText;
  description?: MultiLangText;
}

export interface RestaurantConfig {
  title: MultiLangText;
  subtitle?: MultiLangText;
  description: MultiLangText;
  mainImage: string;
  gallery: string[];
  highlights?: MultiLangText[];
  ctaText?: MultiLangText;
  ctaUrl?: string;
  status: 'published' | 'draft';
  visible?: boolean;
  openingHours?: MultiLangText;
  cuisine?: MultiLangText;
  tagline?: MultiLangText;
  features?: MultiLangText[];
  reservationCtaText?: MultiLangText;
  menuHighlights?: Array<{
    title: MultiLangText;
    desc: MultiLangText;
    price?: string;
  }>;
}

export interface SkyLoungeConfig {
  title: MultiLangText;
  subtitle: MultiLangText;
  description: MultiLangText;
  mainImage: string;
  gallery: string[];
  openingHours?: MultiLangText;
  menuLink?: string;
  reservationCtaText?: MultiLangText;
  ctaText?: MultiLangText;
  ctaUrl?: string;
  status: 'published' | 'draft';
  visible?: boolean;
  features?: MultiLangText[];
  nightAmbienceImage?: string;
  seatingCapacity?: string;
}

export interface Testimonial {
  id: string;
  quote: MultiLangText;
  author: string;
  role: string;
  publication?: string;
  rating: number;
  date?: string;
  avatar?: string;
  featured?: boolean;
  status?: 'published' | 'draft';
}

export interface PressItem {
  id: string;
  publication: string;
  title: string;
  logo?: string;
  link?: string;
  date: string;
  description: string;
  featured?: boolean;
}

export interface ContactInfo {
  hotelName: string;
  primaryName?: string;
  subtitle: string;
  address: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  phoneFormatted: string;
  phone1?: string;
  phone2?: string;
  phone2Formatted?: string;
  whatsapp?: string;
  email: string;
  bookingUrl: string;
  googleMaps?: string;
  mapEmbedUrl: string;
  mapEmbedHtml?: string;
  directionsUrl?: string;
  mapTitle?: string;
  showMap?: boolean;
  mapHeight?: number;
  updatedAt?: string;
  coordinates: string;
  latitude?: string;
  longitude?: string;
  openingHours?: string;
  instagram: string;
  facebook: string;
  youtube?: string;
  tiktok?: string;
  twitterX?: string;
  vatNumber: string;
  footerDescription?: string;
  copyrightText?: string;
  logo?: string;
  logoLight?: string;
  logoDark?: string;
  logoHeight?: number;
  logoDisplayMode?: 'logo_and_text' | 'logo_only' | 'text_only';
  logoShape?: 'natural' | 'rounded' | 'circle';
  showLogoInFooter?: boolean;
  showLogoInDrawer?: boolean;
  favicon?: string;
  heroDefaultImage?: string;
  primaryAccentColor?: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  structuredDataEnabled?: boolean;
}

export interface PageContent {
  intro: {
    eyebrow: MultiLangText;
    heading: MultiLangText;
    body1: MultiLangText;
    body2: MultiLangText;
    quote: MultiLangText;
    quoteAuthor: string;
    statSuites: string;
    statVineyard: string;
    statSunDays: string;
  };
  suitesIntro: {
    heading: MultiLangText;
    subtitle: MultiLangText;
  };
  experienceIntro: {
    heading: MultiLangText;
    subtitle: MultiLangText;
  };
  culinaryIntro: {
    heading: MultiLangText;
    subtitle: MultiLangText;
    subtext: MultiLangText;
  };
  wellnessIntro: {
    heading: MultiLangText;
    subtitle: MultiLangText;
    subtext: MultiLangText;
  };
  aboutStory: {
    title: MultiLangText;
    subtitle: MultiLangText;
    storyP1: MultiLangText;
    storyP2: MultiLangText;
    storyP3: MultiLangText;
    hostName: string;
    hostRole: MultiLangText;
    hostImage: string;
  };
  seo: SeoConfig;
}

export interface SiteData {
  brandVersion?: number;
  hero: HeroConfig;
  roomOverview?: RoomOverviewConfig;
  suites: Suite[];
  skyLounge: SkyLoungeConfig;
  restaurant?: RestaurantConfig;
  experiences: Experience[];
  wellness: WellnessFeature[];
  culinary: CulinaryItem[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  press?: PressItem[];
  contact: ContactInfo;
  pages: PageContent;
  lastUpdated?: string;
  updatedBy?: string;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  suiteId?: string;
  suiteName?: string;
  pricePerNight?: number;
  totalAmount?: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'archived' | 'cancelled';
  type: 'inquiry' | 'direct_booking';
}

export interface MediaAsset {
  id: string;
  url: string;
  title: string;
  altText?: string;
  caption?: string;
  category: string;
  fileSize?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  user: string;
  timestamp: string;
}
