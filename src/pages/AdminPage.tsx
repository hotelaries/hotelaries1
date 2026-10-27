import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { Suite, Experience, GalleryImage, Testimonial, CulinaryItem, WellnessFeature } from '../types';
import { ImageUploader } from '../components/admin/ImageUploader';
import { HeroManager } from '../components/admin/HeroManager';
import { PagesManager } from '../components/admin/PagesManager';
import { LocationMapManager } from '../components/admin/LocationMapManager';
import { LogoManager } from '../components/admin/LogoManager';
import { RestaurantManager } from '../components/admin/RestaurantManager';
import { SkyBarManager } from '../components/admin/SkyBarManager';
import {
  LayoutDashboard,
  Sliders,
  BedDouble,
  Compass,
  Waves,
  Utensils,
  Image as ImageIcon,
  FileText,
  MessageSquareQuote,
  MapPin,
  Search,
  Inbox,
  LogOut,
  ExternalLink,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Menu,
  Eye,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Lock
} from 'lucide-react';

export type CanonicalAdminTab =
  | 'dashboard'
  | 'logo'
  | 'hero'
  | 'suites'
  | 'restaurant'
  | 'skylounge'
  | 'experiences'
  | 'wellness'
  | 'culinary'
  | 'gallery'
  | 'pages'
  | 'reviews'
  | 'contact'
  | 'seo'
  | 'bookings';

export type AdminTab = CanonicalAdminTab | 'overview' | 'testimonials' | 'inquiries';

export const TAB_ROUTES: Record<CanonicalAdminTab, string> = {
  dashboard: '/admin/dashboard',
  logo: '/admin/logo',
  hero: '/admin/hero',
  suites: '/admin/suites',
  restaurant: '/admin/restaurant',
  skylounge: '/admin/skylounge',
  experiences: '/admin/experiences',
  wellness: '/admin/wellness',
  culinary: '/admin/culinary',
  gallery: '/admin/gallery',
  pages: '/admin/pages',
  reviews: '/admin/reviews',
  contact: '/admin/contact',
  seo: '/admin/seo',
  bookings: '/admin/bookings'
};

export const getTabFromLocation = (): CanonicalAdminTab => {
  if (typeof window === 'undefined') return 'dashboard';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  const parseString = (str: string): CanonicalAdminTab | null => {
    if (str.includes('/admin/logo') || str.includes('admin/logo')) return 'logo';
    if (str.includes('/admin/hero') || str.includes('admin/hero')) return 'hero';
    if (str.includes('/admin/suites') || str.includes('admin/suites')) return 'suites';
    if (str.includes('/admin/restaurant') || str.includes('admin/restaurant') || str.includes('admin/dining')) return 'restaurant';
    if (str.includes('/admin/skylounge') || str.includes('admin/skylounge') || str.includes('admin/skybar')) return 'skylounge';
    if (str.includes('/admin/experiences') || str.includes('admin/experiences')) return 'experiences';
    if (str.includes('/admin/wellness') || str.includes('admin/wellness')) return 'wellness';
    if (str.includes('/admin/culinary') || str.includes('admin/culinary')) return 'culinary';
    if (str.includes('/admin/gallery') || str.includes('admin/gallery')) return 'gallery';
    if (str.includes('/admin/pages') || str.includes('admin/pages')) return 'pages';
    if (str.includes('/admin/reviews') || str.includes('admin/reviews') || str.includes('admin/testimonials')) return 'reviews';
    if (str.includes('/admin/contact') || str.includes('admin/contact')) return 'contact';
    if (str.includes('/admin/seo') || str.includes('admin/seo')) return 'seo';
    if (str.includes('/admin/bookings') || str.includes('admin/bookings') || str.includes('admin/inquiries')) return 'bookings';
    if (str.includes('/admin/dashboard') || str.includes('admin/dashboard') || str.includes('admin/overview')) return 'dashboard';
    return null;
  };

  const fromPath = parseString(path);
  if (fromPath) return fromPath;
  const fromHash = parseString(hash);
  if (fromHash) return fromHash;
  return 'dashboard';
};

export const AdminPage: React.FC = () => {
  const {
    siteData,
    updateSiteData,
    resetToDefaults,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    setCurrentPage,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    isFirebaseConnected,
    isSyncing,
    currentUser,
    t
  } = useSite();

  // Local login input state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Current active admin tab initialized from URL route
  const [activeTab, setActiveTab] = useState<CanonicalAdminTab>(() => getTabFromLocation());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  // Sync route on browser back/forward or hash change
  useEffect(() => {
    const handlePop = () => {
      const tab = getTabFromLocation();
      setActiveTab(tab);
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('popstate', handlePop);
    window.addEventListener('hashchange', handlePop);
    return () => {
      window.removeEventListener('popstate', handlePop);
      window.removeEventListener('hashchange', handlePop);
    };
  }, []);

  // If path is just /admin or /admin/, normalize to /admin/dashboard
  useEffect(() => {
    if (typeof window !== 'undefined' && isAdminLoggedIn) {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/') {
        window.history.replaceState({ tab: 'dashboard' }, '', '/admin/dashboard');
      }
    }
  }, [isAdminLoggedIn]);

  // Navigate to tab handler with URL update and scroll reset
  const navigateToTab = (rawTab: string) => {
    let tab: CanonicalAdminTab = 'dashboard';
    if (rawTab === 'overview' || rawTab === 'dashboard') tab = 'dashboard';
    else if (rawTab === 'hero') tab = 'hero';
    else if (rawTab === 'suites') tab = 'suites';
    else if (rawTab === 'experiences') tab = 'experiences';
    else if (rawTab === 'wellness') tab = 'wellness';
    else if (rawTab === 'culinary') tab = 'culinary';
    else if (rawTab === 'gallery') tab = 'gallery';
    else if (rawTab === 'pages') tab = 'pages';
    else if (rawTab === 'testimonials' || rawTab === 'reviews') tab = 'reviews';
    else if (rawTab === 'contact') tab = 'contact';
    else if (rawTab === 'seo') tab = 'seo';
    else if (rawTab === 'inquiries' || rawTab === 'bookings') tab = 'bookings';

    setActiveTab(tab);
    setIsMobileMenuOpen(false);

    const targetRoute = TAB_ROUTES[tab];
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState({ tab }, '', targetRoute);
    }

    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Editing language helper
  const [contentLang, setContentLang] = useState<'de' | 'en' | 'it'>('de');

  // Success Notification
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const showSaveSuccess = (msg = 'Changes saved successfully to live site!') => {
    setSaveNotice(msg);
    setTimeout(() => setSaveNotice(null), 3500);
  };

  // Login handler connected to SiteContext.loginAdmin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setLoginError('Please enter your username.');
      return;
    }
    if (!passwordInput.trim()) {
      setLoginError('Please enter your password.');
      return;
    }
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const success = await loginAdmin(usernameInput.trim(), passwordInput.trim());
      if (!success) {
        setLoginError('Invalid credentials. Please verify your username and password.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
  };

  // Export / Import JSON Backup
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hotel-aries-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSaveSuccess('Backup file exported!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.hero && json.suites) {
          await updateSiteData(json);
          showSaveSuccess('Backup successfully imported and restored!');
        } else {
          alert('Invalid backup structure.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // ==========================================
  // 1. LOGIN SCREEN
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1E1B18] flex items-center justify-center p-4">
        <div className="bg-[#FAF8F5] rounded-2xl max-w-md w-full p-8 shadow-2xl border border-white/20 text-[#23201C]">
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#9E7D53]/15 text-[#9E7D53] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold font-sans-clean">
              Management Portal
            </span>
            <h2 className="font-serif-luxury text-3xl font-light text-[#1E1B18]">
              HOTEL ARIES Admin
            </h2>
            <p className="text-xs text-[#7D7468]">
              Enter your access credentials to manage hotel content, rates, rooms & dining.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7D7468] font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="admin-username-input"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter your username..."
                autoComplete="username"
                className="w-full border border-[#23201C]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#9E7D53] bg-white text-[#1E1B18]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7D7468] font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="admin-password-input"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                autoComplete="current-password"
                className="w-full border border-[#23201C]/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#9E7D53] bg-white text-[#1E1B18]"
              />
              {loginError && <p className="text-xs text-red-600 mt-1.5">{loginError}</p>}
            </div>

            <button
              type="submit"
              id="admin-signin-button"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-lg transition-colors disabled:opacity-50 mt-2"
            >
              {isLoggingIn ? 'Signing In...' : 'Sign In to CMS'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-[#7D7468] hover:text-[#1E1B18] transition-colors"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN CMS DASHBOARD SHELL
  // ==========================================
  const navItems: Array<{
    id: CanonicalAdminTab;
    label: string;
    icon: any;
    route: string;
    badge?: number;
  }> = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, route: '/admin/dashboard' },
    { id: 'logo', label: 'Logo & Branding', icon: Sparkles, route: '/admin/logo' },
    { id: 'hero', label: 'Hero Section & Slider', icon: Sliders, route: '/admin/hero' },
    { id: 'suites', label: 'Rooms & Suites (26 Rooms)', icon: BedDouble, route: '/admin/suites' },
    { id: 'restaurant', label: 'Restaurant & Dining', icon: Utensils, route: '/admin/restaurant' },
    { id: 'skylounge', label: 'Rooftop Sky Bar', icon: Sparkles, route: '/admin/skylounge' },
    { id: 'experiences', label: 'Leisure & Activities', icon: Compass, route: '/admin/experiences' },
    { id: 'wellness', label: 'Wellness & Amenities', icon: Waves, route: '/admin/wellness' },
    { id: 'culinary', label: 'Culinary Schedule', icon: Utensils, route: '/admin/culinary' },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon, route: '/admin/gallery' },
    { id: 'pages', label: 'Brand Story & Pages', icon: FileText, route: '/admin/pages' },
    { id: 'reviews', label: 'Reviews & Highlights', icon: MessageSquareQuote, route: '/admin/reviews' },
    { id: 'contact', label: 'Contact & Footer', icon: MapPin, route: '/admin/contact' },
    { id: 'seo', label: 'SEO & Metadata', icon: Search, route: '/admin/seo' },
    {
      id: 'bookings',
      label: 'Bookings & Inquiries',
      icon: Inbox,
      route: '/admin/bookings',
      badge: inquiries.length > 0 ? inquiries.length : 2
    }
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-[#FAF8F5] text-[#23201C] flex flex-col">
      {/* 1. TOP ADMIN HEADER BAR - FIXED AT TOP (h-16, z-50) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1E1B18] text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between z-50 shadow-md border-b border-white/10 select-none">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-1 focus:ring-[#9E7D53]"
            aria-label={isMobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#9E7D53]" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            {siteData.contact.logo ? (
              <img
                src={siteData.contact.logo}
                alt="Logo"
                className="h-6 w-auto object-contain shrink-0"
              />
            ) : null}
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isSyncing ? 'bg-amber-400 animate-ping' : isFirebaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <h1 className="font-serif-luxury text-xl font-light tracking-wider uppercase text-white">
              HOTEL ARIES <span className="text-xs text-[#9E7D53] font-sans-clean font-semibold">CMS</span>
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-[#9E7D53] hidden sm:inline">
              {isSyncing ? 'Syncing...' : isFirebaseConnected ? 'Cloud Synced' : 'Offline Ready'}
            </span>
          </div>

          <span className="text-white/30 hidden sm:inline">|</span>

          {/* Quick Jump to Live Website */}
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 px-3 py-1.5 rounded-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#9E7D53]" />
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3 text-white/50" />
          </button>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser?.email && (
            <span className="text-[11px] text-white/60 hidden lg:inline font-mono">
              {currentUser.email}
            </span>
          )}

          {/* Active Editing Language Selector */}
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1 text-[11px]">
            <span className="text-white/60 px-1.5 hidden md:inline">Language:</span>
            {(['de', 'en', 'it'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setContentLang(lang)}
                className={`px-2 py-0.5 rounded text-[11px] uppercase font-medium transition-colors ${
                  contentLang === lang ? 'bg-[#9E7D53] text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportData}
            title="Export JSON Backup"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors hidden md:inline-flex"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Import JSON */}
          <label
            title="Import JSON Backup"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 cursor-pointer transition-colors hidden md:inline-flex"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
          </label>

          {/* Reset to Defaults */}
          <button
            type="button"
            onClick={async () => {
              if (confirm('Reset all website content back to factory default boutique data?')) {
                await resetToDefaults();
                showSaveSuccess('Content reset to factory defaults.');
              }
            }}
            title="Reset to Factory Defaults"
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save Success Notice Banner */}
      {saveNotice && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-emerald-600 text-white text-xs px-4 py-2 text-center font-medium flex items-center justify-center gap-2 shadow-md">
          <Check className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* 2. DESKTOP FIXED SIDEBAR (ATTACHED LEFT, STARTS AT TOP-16, FULL HEIGHT TO BOTTOM) */}
      <aside
        id="admin-desktop-sidebar"
        className="hidden md:flex flex-col fixed top-16 left-0 bottom-0 w-[280px] z-40 bg-[#FAF8F5] border-r border-[#23201C]/10 select-none shadow-xs"
        style={{ width: '280px' }}
      >
        {/* Pinned Branding / Status Header */}
        <div className="p-4 pb-2 shrink-0">
          <div className="p-3 bg-[#F5F2EB] rounded-xl border border-[#23201C]/8 text-xs text-[#7D7468]">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-semibold text-[#1E1B18]">Content CMS</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#9E7D53]/15 text-[#9E7D53] font-mono uppercase font-semibold">
                Live
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#7D7468]">
              {isFirebaseConnected
                ? 'Real-time sync to Cloud Firestore database active.'
                : 'Local storage fallback active with automatic sync.'}
            </p>
          </div>
        </div>

        {/* Scrollable Navigation List (Internal scrollbar if height is constrained) */}
        <nav
          id="admin-sidebar-nav"
          aria-label="Admin Sections Navigation"
          className="flex-1 overflow-y-auto px-4 py-2 space-y-1"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                id={`admin-nav-${item.id}`}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTab(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9E7D53] ${
                  isActive
                    ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                    : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#9E7D53]' : 'text-[#7D7468] group-hover:text-[#1E1B18]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold shrink-0 ml-2 ${
                      isActive ? 'bg-[#9E7D53] text-white' : 'bg-[#EFECE6] text-[#1E1B18]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Pinned Bottom Info */}
        <div className="p-4 pt-2 border-t border-[#23201C]/8 shrink-0 text-[11px] text-[#7D7468] flex items-center justify-between">
          <span className="truncate">{siteData.contact.hotelName}</span>
          <span className="font-mono text-[10px] text-[#9E7D53]">{siteData.contact.subtitle}</span>
        </div>
      </aside>

      {/* 3. MOBILE DRAWER OVERLAY & SIDEBAR */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/50 z-40 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="admin-mobile-drawer"
            className="fixed top-16 left-0 bottom-0 w-[280px] z-50 bg-[#FAF8F5] flex flex-col border-r border-[#23201C]/10 shadow-2xl md:hidden animate-in slide-in-from-left duration-200"
            style={{ width: '280px' }}
          >
            <div className="p-4 pb-2 shrink-0">
              <div className="p-3 bg-[#F5F2EB] rounded-xl border border-[#23201C]/8 text-xs text-[#7D7468]">
                <span className="font-semibold text-[#1E1B18] block mb-0.5">Content CMS</span>
                <p className="text-[11px] leading-relaxed">
                  {isFirebaseConnected
                    ? 'Real-time sync to Cloud Firestore database active.'
                    : 'Local storage fallback active with automatic sync.'}
                </p>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToTab(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.label}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                        : 'text-[#5B544B] hover:bg-[#F5F2EB] hover:text-[#1E1B18]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#9E7D53]' : 'text-[#7D7468]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold shrink-0 ml-2 ${
                          isActive ? 'bg-[#9E7D53] text-white' : 'bg-[#EFECE6] text-[#1E1B18]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#23201C]/8 shrink-0 flex items-center justify-between text-xs text-[#7D7468]">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentPage('home');
                }}
                className="text-[#9E7D53] hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> View Live Site
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* 4. MAIN CONTENT AREA - INDEPENDENT VERTICAL SCROLL, POSITIONED RIGHT OF FIXED SIDEBAR */}
      <main
        ref={mainContentRef}
        id="admin-main-scroll-container"
        className="fixed top-16 left-0 right-0 bottom-0 md:left-[280px] overflow-y-auto bg-[#FAF8F5]"
        tabIndex={-1}
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl border border-[#23201C]/8 p-6 sm:p-8 shadow-xs min-h-[calc(100vh-128px)]">
            {(activeTab === 'dashboard' || activeTab === 'overview') && (
              <OverviewPanel
                siteData={siteData}
                inquiries={inquiries}
                setActiveTab={navigateToTab}
                setCurrentPage={setCurrentPage}
              />
            )}

            {activeTab === 'logo' && (
              <LogoManager
                contact={siteData.contact}
                onSave={async (updatedContact) => {
                  await updateSiteData({ contact: updatedContact });
                  showSaveSuccess('Logo & Brand configuration saved and published!');
                }}
                showSaveSuccess={showSaveSuccess}
              />
            )}

            {activeTab === 'hero' && (
              <HeroManager
                hero={siteData.hero}
                lang={contentLang}
                onSave={async (updatedHero) => {
                  await updateSiteData({ hero: updatedHero });
                  showSaveSuccess('Hero slider configuration updated!');
                }}
                onPreviewLive={() => setCurrentPage('home')}
              />
            )}

            {activeTab === 'suites' && (
              <SuitesManager
                suites={siteData.suites}
                lang={contentLang}
                onSave={async (updatedSuites) => {
                  await updateSiteData({ suites: updatedSuites });
                  showSaveSuccess('Suites catalog updated!');
                }}
              />
            )}

            {activeTab === 'restaurant' && (
              <RestaurantManager
                restaurant={siteData.restaurant}
                lang={contentLang}
                onSave={async (updatedRestaurant) => {
                  await updateSiteData({ restaurant: updatedRestaurant });
                  showSaveSuccess('Restaurant settings updated and published!');
                }}
                showSaveSuccess={showSaveSuccess}
              />
            )}

            {activeTab === 'skylounge' && (
              <SkyBarManager
                skyLounge={siteData.skyLounge}
                lang={contentLang}
                onSave={async (updatedSkyLounge) => {
                  await updateSiteData({ skyLounge: updatedSkyLounge });
                  showSaveSuccess('Rooftop Sky Bar settings updated and published!');
                }}
                showSaveSuccess={showSaveSuccess}
              />
            )}

            {activeTab === 'experiences' && (
              <ExperiencesManager
                experiences={siteData.experiences}
                lang={contentLang}
                onSave={async (updatedExp) => {
                  await updateSiteData({ experiences: updatedExp });
                  showSaveSuccess('Experiences updated!');
                }}
              />
            )}

            {activeTab === 'wellness' && (
              <WellnessManager
                wellness={siteData.wellness}
                lang={contentLang}
                onSave={async (updatedWellness) => {
                  await updateSiteData({ wellness: updatedWellness });
                  showSaveSuccess('Wellness offerings updated!');
                }}
              />
            )}

            {activeTab === 'culinary' && (
              <CulinaryManager
                culinary={siteData.culinary}
                lang={contentLang}
                onSave={async (updatedCulinary) => {
                  await updateSiteData({ culinary: updatedCulinary });
                  showSaveSuccess('Culinary items updated!');
                }}
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryManager
                gallery={siteData.gallery}
                lang={contentLang}
                onSave={async (updatedGallery) => {
                  await updateSiteData({ gallery: updatedGallery });
                  showSaveSuccess('Gallery images updated!');
                }}
              />
            )}

            {activeTab === 'pages' && (
              <PagesManager
                pages={siteData.pages}
                lang={contentLang}
                onSave={async (updatedPages) => {
                  await updateSiteData({ pages: updatedPages });
                  showSaveSuccess('Brand Story & Page Narratives published live!');
                }}
                onViewLiveAbout={() => setCurrentPage('about')}
                onViewLiveHome={() => setCurrentPage('home')}
              />
            )}

            {(activeTab === 'reviews' || activeTab === 'testimonials') && (
              <TestimonialsManager
                testimonials={siteData.testimonials}
                lang={contentLang}
                onSave={async (updatedTests) => {
                  await updateSiteData({ testimonials: updatedTests });
                  showSaveSuccess('Testimonials updated!');
                }}
              />
            )}

            {activeTab === 'contact' && (
              <LocationMapManager
                contact={siteData.contact}
                onSave={async (updatedContact) => {
                  await updateSiteData({ contact: updatedContact });
                }}
                showSaveSuccess={showSaveSuccess}
              />
            )}

            {activeTab === 'seo' && (
              <SEOManager
                seo={siteData.seo}
                onSave={async (updatedSeo) => {
                  await updateSiteData({ seo: updatedSeo });
                  showSaveSuccess('SEO configuration updated!');
                }}
              />
            )}

            {(activeTab === 'bookings' || activeTab === 'inquiries') && (
              <InquiriesManager
                inquiries={inquiries}
                onUpdateStatus={updateInquiryStatus}
                onDelete={deleteInquiry}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: OVERVIEW
// =========================================================================
const OverviewPanel: React.FC<{
  siteData: any;
  inquiries: any[];
  setActiveTab: (t: AdminTab) => void;
  setCurrentPage: (p: any) => void;
}> = ({ siteData, inquiries, setActiveTab, setCurrentPage }) => {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
          HOTEL ARIES & SKY LOUNGE
        </span>
        <h2 className="font-serif-luxury text-3xl font-light text-[#1E1B18] mt-1">
          Content & Booking Dashboard
        </h2>
        <p className="text-xs text-[#7D7468] mt-1">
          Manage your boutique residence website in real-time. Changes are instantly published.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('suites')}
          className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 cursor-pointer hover:border-[#9E7D53] transition-colors"
        >
          <span className="text-xs text-[#7D7468]">Active Suites</span>
          <p className="font-serif-luxury text-3xl text-[#1E1B18] font-light mt-1">
            {siteData.suites.length}
          </p>
          <span className="text-[10px] text-[#9E7D53] mt-2 block flex items-center gap-1">
            Manage Suites <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div
          onClick={() => setActiveTab('gallery')}
          className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 cursor-pointer hover:border-[#9E7D53] transition-colors"
        >
          <span className="text-xs text-[#7D7468]">Gallery Photos</span>
          <p className="font-serif-luxury text-3xl text-[#1E1B18] font-light mt-1">
            {siteData.gallery.length}
          </p>
          <span className="text-[10px] text-[#9E7D53] mt-2 block flex items-center gap-1">
            View Photos <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div
          onClick={() => setActiveTab('experiences')}
          className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 cursor-pointer hover:border-[#9E7D53] transition-colors"
        >
          <span className="text-xs text-[#7D7468]">Experiences</span>
          <p className="font-serif-luxury text-3xl text-[#1E1B18] font-light mt-1">
            {siteData.experiences.length}
          </p>
          <span className="text-[10px] text-[#9E7D53] mt-2 block flex items-center gap-1">
            Curate Tours <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div
          onClick={() => setActiveTab('inquiries')}
          className="p-4 rounded-xl bg-[#FAF8F5] border border-[#23201C]/8 cursor-pointer hover:border-[#9E7D53] transition-colors"
        >
          <span className="text-xs text-[#7D7468]">Guest Inquiries</span>
          <p className="font-serif-luxury text-3xl text-[#1E1B18] font-light mt-1">
            {inquiries.length}
          </p>
          <span className="text-[10px] text-[#9E7D53] mt-2 block flex items-center gap-1">
            Check Inbox <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Quick Launchpad */}
      <div className="p-6 rounded-xl bg-[#F5F2EB] border border-[#23201C]/6 space-y-4">
        <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
          Quick Content Operations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveTab('hero')}
            className="p-3 rounded-lg bg-white border border-[#23201C]/10 text-left hover:border-[#9E7D53] transition-colors"
          >
            <span className="text-xs font-medium text-[#1E1B18] block">Edit Hero Slideshow</span>
            <span className="text-[11px] text-[#7D7468]">Change hero background photos & titles</span>
          </button>
          <button
            onClick={() => setActiveTab('suites')}
            className="p-3 rounded-lg bg-white border border-[#23201C]/10 text-left hover:border-[#9E7D53] transition-colors"
          >
            <span className="text-xs font-medium text-[#1E1B18] block">Add / Update Suite</span>
            <span className="text-[11px] text-[#7D7468]">Update prices, amenities and photos</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className="p-3 rounded-lg bg-white border border-[#23201C]/10 text-left hover:border-[#9E7D53] transition-colors"
          >
            <span className="text-xs font-medium text-[#1E1B18] block">Review Inquiries</span>
            <span className="text-[11px] text-[#7D7468]">Handle guest requests & reservations</span>
          </button>
        </div>
      </div>

      {/* Recent Inquiries Snippet */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
            Recent Inquiries
          </h3>
          <button
            onClick={() => setActiveTab('inquiries')}
            className="text-xs text-[#9E7D53] hover:underline"
          >
            View All ({inquiries.length})
          </button>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-[#7D7468] p-4 bg-[#FAF8F5] rounded-lg">
            No guest inquiries received yet. Submit a test booking via the website.
          </p>
        ) : (
          <div className="divide-y divide-[#23201C]/10 border border-[#23201C]/10 rounded-xl overflow-hidden">
            {inquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="p-4 bg-white flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#1E1B18]">{inq.guestName}</span>
                  <span className="text-[#7D7468] ml-2">({inq.guestEmail})</span>
                  <p className="text-[11px] text-[#7D7468] mt-0.5">
                    Dates: {inq.arrivalDate} – {inq.departureDate || 'flexible'} · {inq.adults} Guests · {inq.suiteName || 'Any Suite'}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-medium ${
                  inq.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: HERO MANAGER has been modularized into /src/components/admin/HeroManager.tsx

// =========================================================================
// SUB-PANEL: SUITES MANAGER
// =========================================================================
const SuitesManager: React.FC<{
  suites: Suite[];
  lang: 'de' | 'en' | 'it';
  onSave: (s: Suite[]) => void;
}> = ({ suites, lang, onSave }) => {
  const [suiteList, setSuiteList] = useState<Suite[]>([...suites]);
  const [editingSuite, setEditingSuite] = useState<Suite | null>(null);

  const handleAddSuite = () => {
    const newSuite: Suite = {
      id: `suite-${Date.now()}`,
      name: { de: 'Neue Suite', en: 'New Suite', it: 'Nuova Suite' },
      category: 'suite',
      size: '65 m²',
      maxGuests: 2,
      priceFrom: 290,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
      gallery: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85'],
      shortDesc: {
        de: 'Großzügige Suite mit freistehender Badewanne und Rebenblick.',
        en: 'Generous suite with freestanding tub and vineyard vistas.',
        it: 'Ampia suite con vasca panoramica e vista sui vigneti.'
      },
      fullDesc: {
        de: 'Elegante Suite mit naturbelassenem Lärchenholz und privater Panoramaterrasse.',
        en: 'Elegant suite crafted with natural larch and private sun deck.',
        it: 'Suite elegante realizzata in larice naturale con loggia panoramica.'
      },
      viewType: { de: 'Weinbergblick', en: 'Vineyard View', it: 'Vista Vigneti' },
      amenities: ['King Size Bed', 'Private Loggia', 'Rain Shower', 'Wine Cabinet', 'Air Conditioning'],
      highlights: [
        { de: 'Freistehende Badewanne', en: 'Freestanding Bathtub', it: 'Vasca Vista Valle' }
      ]
    };
    setSuiteList([...suiteList, newSuite]);
    setEditingSuite(newSuite);
  };

  const handleUpdateSuite = (updated: Suite) => {
    const next = suiteList.map((s) => (s.id === updated.id ? updated : s));
    setSuiteList(next);
    setEditingSuite(null);
    onSave(next);
  };

  const handleDeleteSuite = (id: string) => {
    if (confirm('Delete this suite?')) {
      const next = suiteList.filter((s) => s.id !== id);
      setSuiteList(next);
      onSave(next);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Accommodations & Capacity
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Rooms & Suites Manager (26 Total Rooms)
          </h2>
        </div>
        <button
          type="button"
          onClick={handleAddSuite}
          className="px-4 py-2 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Room Category
        </button>
      </div>

      {/* Capacity Overview Banner */}
      <div className="p-4 bg-[#FAF8F5] border border-[#9E7D53]/30 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#1E1B18] block font-serif-luxury">
            Hotel Room Inventory: 26 Total Rooms
          </span>
          <p className="text-[11px] text-[#7D7468]">
            Official Breakdown: <strong>24 Deluxe Rooms</strong> and <strong>2 Supreme Rooms</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 bg-white border border-[#23201C]/10 rounded-md font-mono text-[#1E1B18]">
            24 Deluxe
          </span>
          <span className="px-2.5 py-1 bg-[#9E7D53]/15 text-[#9E7D53] border border-[#9E7D53]/30 rounded-md font-mono font-semibold">
            2 Supreme
          </span>
        </div>
      </div>

      {/* Editing Modal / Drawer if active */}
      {editingSuite && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto text-[#23201C]">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-luxury text-2xl font-light">
                Edit Suite: {editingSuite.name[lang] || editingSuite.name.de}
              </h3>
              <button onClick={() => setEditingSuite(null)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
                  Suite Name ({lang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={editingSuite.name[lang] || ''}
                  onChange={(e) =>
                    setEditingSuite({
                      ...editingSuite,
                      name: { ...editingSuite.name, [lang]: e.target.value }
                    })
                  }
                  className="w-full border rounded-lg p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] uppercase text-[#7D7468] mb-1">Category</label>
                  <select
                    value={editingSuite.category}
                    onChange={(e: any) => setEditingSuite({ ...editingSuite, category: e.target.value })}
                    className="w-full border rounded-lg p-2 text-xs bg-white"
                  >
                    <option value="suite">Suite / Room</option>
                    <option value="apartment">Apartment</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-[#7D7468] mb-1">Room Count</label>
                  <input
                    type="number"
                    min={1}
                    value={editingSuite.roomCount ?? (editingSuite.id.includes('supreme') ? 2 : 24)}
                    onChange={(e) =>
                      setEditingSuite({
                        ...editingSuite,
                        roomCount: parseInt(e.target.value, 10) || 1
                      })
                    }
                    className="w-full border rounded-lg p-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-[#7D7468] mb-1">Size (m²)</label>
                  <input
                    type="text"
                    value={editingSuite.size}
                    onChange={(e) => setEditingSuite({ ...editingSuite, size: e.target.value })}
                    className="w-full border rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-[#7D7468] mb-1">Max Guests</label>
                  <input
                    type="number"
                    value={editingSuite.maxGuests}
                    onChange={(e) =>
                      setEditingSuite({ ...editingSuite, maxGuests: parseInt(e.target.value, 10) })
                    }
                    className="w-full border rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-[#7D7468] mb-1">Price From (€)</label>
                  <input
                    type="number"
                    value={editingSuite.priceFrom}
                    onChange={(e) =>
                      setEditingSuite({ ...editingSuite, priceFrom: parseInt(e.target.value, 10) })
                    }
                    className="w-full border rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <ImageUploader
                label="Primary Photo"
                value={editingSuite.image}
                onChange={(url) => setEditingSuite({ ...editingSuite, image: url })}
              />

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
                  Short Description ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={editingSuite.shortDesc[lang] || ''}
                  onChange={(e) =>
                    setEditingSuite({
                      ...editingSuite,
                      shortDesc: { ...editingSuite.shortDesc, [lang]: e.target.value }
                    })
                  }
                  className="w-full border rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
                  Full Description ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={editingSuite.fullDesc[lang] || ''}
                  onChange={(e) =>
                    setEditingSuite({
                      ...editingSuite,
                      fullDesc: { ...editingSuite.fullDesc, [lang]: e.target.value }
                    })
                  }
                  className="w-full border rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7468] font-medium mb-1">
                  Amenities (comma separated)
                </label>
                <input
                  type="text"
                  value={editingSuite.amenities.join(', ')}
                  onChange={(e) =>
                    setEditingSuite({
                      ...editingSuite,
                      amenities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full border rounded-lg p-2 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setEditingSuite(null)}
                className="px-4 py-2 border rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateSuite(editingSuite)}
                className="px-5 py-2 bg-[#9E7D53] text-white rounded-lg text-xs uppercase tracking-wider"
              >
                Save Suite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suites Table / Card List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suiteList.map((suite) => (
          <div
            key={suite.id}
            className="p-4 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-neutral-200 mb-3">
                <img src={suite.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                  €{suite.priceFrom} / Nacht
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#9E7D53] font-semibold">
                  {suite.category} · {suite.size}
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#9E7D53]/15 text-[#9E7D53]">
                  {suite.roomCount ?? (suite.id.includes('supreme') ? 2 : 24)} Rooms
                </span>
              </div>
              <h4 className="font-serif-luxury text-lg text-[#1E1B18] font-light">
                {suite.name[lang] || suite.name.de}
              </h4>
              <p className="text-xs text-[#7D7468] line-clamp-2 mt-1">
                {suite.shortDesc[lang] || suite.shortDesc.de}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#23201C]/10">
              <button
                onClick={() => setEditingSuite(suite)}
                className="text-xs text-[#9E7D53] hover:underline flex items-center gap-1 font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Details
              </button>
              <button
                onClick={() => handleDeleteSuite(suite.id)}
                className="text-xs text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: EXPERIENCES MANAGER
// =========================================================================
const ExperiencesManager: React.FC<{
  experiences: Experience[];
  lang: 'de' | 'en' | 'it';
  onSave: (e: Experience[]) => void;
}> = ({ experiences, lang, onSave }) => {
  const [list, setList] = useState<Experience[]>([...experiences]);

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...list];
    if (field === 'title' || field === 'shortDesc' || field === 'season') {
      next[idx] = { ...next[idx], [field]: { ...next[idx][field], [lang]: val } };
    } else {
      next[idx] = { ...next[idx], [field]: val };
    }
    setList(next);
  };

  const handleAdd = () => {
    const item: Experience = {
      id: `exp-${Date.now()}`,
      title: { de: 'Neue Entdeckung', en: 'New Adventure', it: 'Nuova Esperienza' },
      category: 'nature',
      season: { de: 'Ganzjährig', en: 'All Season', it: 'Tutto l\'anno' },
      duration: '3 Std.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
      shortDesc: {
        de: 'Erleben Sie die einzigartige Südtiroler Naturlandschaft.',
        en: 'Experience the pristine South Tyrolean natural scenery.',
        it: 'Scoprite gli scorci incontaminati dell\'Alto Adige.'
      },
      details: {
        de: 'Geführte Tour mit Einkehr in historischen Almhütten und Verkostung.',
        en: 'Guided tour with stops at historic alpine huts and regional tastings.',
        it: 'Tour guidato con sosta nelle baite storiche e degustazioni tipiche.'
      }
    };
    const next = [...list, item];
    setList(next);
    onSave(next);
  };

  const handleDelete = (id: string) => {
    const next = list.filter((item) => item.id !== id);
    setList(next);
    onSave(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Surroundings & Nature
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Experiences & Activities ({list.length})
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 border border-[#9E7D53] text-[#9E7D53] rounded-lg text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </button>
          <button
            type="button"
            onClick={() => onSave(list)}
            className="px-4 py-2 bg-[#9E7D53] text-white rounded-lg text-xs uppercase tracking-wider"
          >
            Save All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((exp, idx) => (
          <div key={exp.id} className="p-5 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#9E7D53] font-semibold">
                {exp.category}
              </span>
              <button onClick={() => handleDelete(exp.id)} className="text-red-600 text-xs">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <ImageUploader
              label="Cover Image"
              value={exp.image}
              onChange={(url) => handleUpdate(idx, 'image', url)}
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-[#7D7468]">Title ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={exp.title[lang] || ''}
                  onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                  className="w-full border rounded p-1.5 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#7D7468]">Duration</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleUpdate(idx, 'duration', e.target.value)}
                  className="w-full border rounded p-1.5 text-xs bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#7D7468]">Short Description ({lang.toUpperCase()})</label>
              <textarea
                rows={2}
                value={exp.shortDesc[lang] || ''}
                onChange={(e) => handleUpdate(idx, 'shortDesc', e.target.value)}
                className="w-full border rounded p-1.5 text-xs bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: WELLNESS MANAGER
// =========================================================================
const WellnessManager: React.FC<{
  wellness: WellnessFeature[];
  lang: 'de' | 'en' | 'it';
  onSave: (w: WellnessFeature[]) => void;
}> = ({ wellness, lang, onSave }) => {
  const [list, setList] = useState([...wellness]);

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...list];
    if (field === 'title' || field === 'desc' || field === 'tag') {
      next[idx] = { ...next[idx], [field]: { ...next[idx][field], [lang]: val } };
    } else {
      next[idx] = { ...next[idx], [field]: val };
    }
    setList(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Stillness & Water
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Wellness, Heated Pool & Saunas
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSave(list)}
          className="px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg"
        >
          Save Wellness Content
        </button>
      </div>

      <div className="space-y-6">
        {list.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] space-y-4">
            <h4 className="font-serif-luxury text-xl font-light text-[#1E1B18]">
              Wellness Feature: {item.title[lang] || item.title.de}
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <ImageUploader
                  label="Photo"
                  value={item.image}
                  onChange={(url) => handleUpdate(idx, 'image', url)}
                />
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#7D7468] mb-1">Tag / Temperature</label>
                    <input
                      type="text"
                      value={item.tag[lang] || ''}
                      onChange={(e) => handleUpdate(idx, 'tag', e.target.value)}
                      className="w-full border rounded-lg p-2 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#7D7468] mb-1">Title ({lang.toUpperCase()})</label>
                    <input
                      type="text"
                      value={item.title[lang] || ''}
                      onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                      className="w-full border rounded-lg p-2 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#7D7468] mb-1">Description ({lang.toUpperCase()})</label>
                  <textarea
                    rows={3}
                    value={item.desc[lang] || ''}
                    onChange={(e) => handleUpdate(idx, 'desc', e.target.value)}
                    className="w-full border rounded-lg p-2 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: CULINARY MANAGER
// =========================================================================
const CulinaryManager: React.FC<{
  culinary: CulinaryItem[];
  lang: 'de' | 'en' | 'it';
  onSave: (c: CulinaryItem[]) => void;
}> = ({ culinary, lang, onSave }) => {
  const [list, setList] = useState([...culinary]);

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...list];
    if (field === 'title' || field === 'desc') {
      next[idx] = { ...next[idx], [field]: { ...next[idx][field], [lang]: val } };
    } else {
      next[idx] = { ...next[idx], [field]: val };
    }
    setList(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Gourmet & Delights
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Culinary, Breakfast & Aperitivo
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSave(list)}
          className="px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg"
        >
          Save Culinary Content
        </button>
      </div>

      <div className="space-y-6">
        {list.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <ImageUploader
                  label="Culinary Photo"
                  value={item.image}
                  onChange={(url) => handleUpdate(idx, 'image', url)}
                />
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#7D7468] mb-1">Service Time</label>
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleUpdate(idx, 'time', e.target.value)}
                      className="w-full border rounded-lg p-2 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#7D7468] mb-1">Title ({lang.toUpperCase()})</label>
                    <input
                      type="text"
                      value={item.title[lang] || ''}
                      onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                      className="w-full border rounded-lg p-2 text-xs bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#7D7468] mb-1">Description ({lang.toUpperCase()})</label>
                  <textarea
                    rows={3}
                    value={item.desc[lang] || ''}
                    onChange={(e) => handleUpdate(idx, 'desc', e.target.value)}
                    className="w-full border rounded-lg p-2 text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: GALLERY MANAGER
// =========================================================================
const GalleryManager: React.FC<{
  gallery: GalleryImage[];
  lang: 'de' | 'en' | 'it';
  onSave: (g: GalleryImage[]) => void;
}> = ({ gallery, lang, onSave }) => {
  const [list, setList] = useState<GalleryImage[]>([...gallery]);
  const [newImageModal, setNewImageModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<'suites' | 'wellness' | 'vineyard' | 'culinary' | 'lifestyle'>('vineyard');
  const [newTitle, setNewTitle] = useState('');

  const handleAddImage = () => {
    if (!newUrl) return;
    const item: GalleryImage = {
      id: `img-${Date.now()}`,
      url: newUrl,
      category: newCategory,
      title: { de: newTitle || 'Impression', en: newTitle || 'Impression', it: newTitle || 'Impressione' }
    };
    const next = [item, ...list];
    setList(next);
    onSave(next);
    setNewImageModal(false);
    setNewUrl('');
    setNewTitle('');
  };

  const handleDelete = (id: string) => {
    const next = list.filter((img) => img.id !== id);
    setList(next);
    onSave(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Visual Portfolio
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Photo Gallery Manager ({list.length} Photos)
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setNewImageModal(true)}
          className="px-4 py-2 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {newImageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-serif-luxury text-xl">Add New Gallery Photograph</h3>
              <button onClick={() => setNewImageModal(false)}><X className="w-4 h-4" /></button>
            </div>

            <ImageUploader label="Upload or Select Photo" value={newUrl} onChange={setNewUrl} />

            <div>
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e: any) => setNewCategory(e.target.value)}
                className="w-full border rounded-lg p-2 text-xs"
              >
                <option value="suites">Suites & Residence</option>
                <option value="wellness">Wellness & Pool</option>
                <option value="vineyard">Vineyards & Mountains</option>
                <option value="culinary">Culinary & Breakfast</option>
                <option value="lifestyle">Lifestyle & Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#7D7468] mb-1">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Afternoon light over the valley"
                className="w-full border rounded-lg p-2 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button onClick={() => setNewImageModal(false)} className="px-3 py-1.5 text-xs border rounded-lg">
                Cancel
              </button>
              <button
                onClick={handleAddImage}
                disabled={!newUrl}
                className="px-4 py-1.5 bg-[#9E7D53] text-white text-xs uppercase rounded-lg disabled:opacity-50"
              >
                Add to Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-4/3 rounded-lg overflow-hidden border border-[#23201C]/10 bg-neutral-100"
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5 text-white">
              <span className="text-[9px] uppercase tracking-wider font-mono bg-black/60 px-1.5 py-0.5 rounded self-start">
                {img.category}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs truncate">{img.title[lang] || img.title.de}</span>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-1 rounded bg-red-600/80 hover:bg-red-600 text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: TESTIMONIALS MANAGER
// =========================================================================
const TestimonialsManager: React.FC<{
  testimonials: Testimonial[];
  lang: 'de' | 'en' | 'it';
  onSave: (t: Testimonial[]) => void;
}> = ({ testimonials, lang, onSave }) => {
  const [list, setList] = useState([...testimonials]);

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...list];
    if (field === 'quote') {
      next[idx] = { ...next[idx], quote: { ...next[idx].quote, [lang]: val } };
    } else {
      next[idx] = { ...next[idx], [field]: val };
    }
    setList(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Social Proof
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Reviews & Press Mentions
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSave(list)}
          className="px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg"
        >
          Save Reviews
        </button>
      </div>

      <div className="space-y-4">
        {list.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#7D7468]">Author Name</label>
                <input
                  type="text"
                  value={item.author}
                  onChange={(e) => handleUpdate(idx, 'author', e.target.value)}
                  className="w-full border rounded p-1.5 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#7D7468]">Role / Origin</label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleUpdate(idx, 'role', e.target.value)}
                  className="w-full border rounded p-1.5 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#7D7468]">Publication (Optional)</label>
                <input
                  type="text"
                  value={item.publication || ''}
                  onChange={(e) => handleUpdate(idx, 'publication', e.target.value)}
                  className="w-full border rounded p-1.5 text-xs bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#7D7468]">Quote ({lang.toUpperCase()})</label>
              <textarea
                rows={2}
                value={item.quote[lang] || ''}
                onChange={(e) => handleUpdate(idx, 'quote', e.target.value)}
                className="w-full border rounded p-1.5 text-xs bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: CONTACT & FOOTER → LOCATION & MAP
// =========================================================================
const ContactManager: React.FC<{
  contact: any;
  onSave: (c: any) => void;
  showSaveSuccess?: (msg?: string) => void;
}> = ({ contact, onSave, showSaveSuccess }) => {
  return (
    <LocationMapManager
      contact={contact}
      onSave={onSave}
      showSaveSuccess={showSaveSuccess}
    />
  );
};

// =========================================================================
// SUB-PANEL: SEO MANAGER
// =========================================================================
const SEOManager: React.FC<{
  seo: any;
  onSave: (s: any) => void;
}> = ({ seo, onSave }) => {
  const [data, setData] = useState({ ...seo });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Search Visibility
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            SEO & Social Sharing Metadata
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSave(data)}
          className="px-5 py-2.5 bg-[#9E7D53] hover:bg-[#8C6D44] text-white text-xs uppercase tracking-wider font-medium rounded-lg"
        >
          Save SEO Meta
        </button>
      </div>

      <div className="p-6 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] space-y-4">
        <div>
          <label className="block text-xs uppercase text-[#7D7468] mb-1">Meta Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full border rounded-lg p-2 text-xs bg-white"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-[#7D7468] mb-1">Meta Description</label>
          <textarea
            rows={3}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full border rounded-lg p-2 text-xs bg-white"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-[#7D7468] mb-1">Keywords</label>
          <input
            type="text"
            value={data.keywords}
            onChange={(e) => setData({ ...data, keywords: e.target.value })}
            className="w-full border rounded-lg p-2 text-xs bg-white"
          />
        </div>

        <ImageUploader
          label="Social Share Image (og:image)"
          value={data.ogImage}
          onChange={(url) => setData({ ...data, ogImage: url })}
        />
      </div>
    </div>
  );
};

// =========================================================================
// SUB-PANEL: INQUIRIES & RESERVATIONS
// =========================================================================
const InquiriesManager: React.FC<{
  inquiries: any[];
  onUpdateStatus: (id: string, status: 'pending' | 'confirmed' | 'archived') => void;
  onDelete: (id: string) => void;
}> = ({ inquiries, onUpdateStatus, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D53] font-semibold">
            Guest Requests
          </span>
          <h2 className="font-serif-luxury text-2xl font-light text-[#1E1B18]">
            Inquiries & Bookings ({inquiries.length})
          </h2>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-12 p-6 rounded-xl bg-[#FAF8F5] border border-dashed border-[#23201C]/15">
          <Inbox className="w-8 h-8 text-[#9E7D53] mx-auto mb-2 opacity-60" />
          <p className="text-xs text-[#7D7468]">
            No booking requests logged yet. You can submit one directly from the website to test!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-[#23201C]/10 bg-[#FAF8F5] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23201C]/10 pb-3">
                <div>
                  <span className="font-semibold text-sm text-[#1E1B18]">{item.guestName}</span>
                  <span className="text-xs text-[#7D7468] ml-2 font-mono">({item.guestEmail})</span>
                  {item.guestPhone && (
                    <span className="text-xs text-[#9E7D53] ml-2 font-mono">{item.guestPhone}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e: any) => onUpdateStatus(item.id, e.target.value)}
                    className="text-xs border rounded-md px-2 py-1 bg-white font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#5B544B]">
                <div>
                  <span className="text-[10px] uppercase text-[#7D7468] block">Dates</span>
                  <span className="font-medium text-[#1E1B18]">{item.arrivalDate} → {item.departureDate || 'flexible'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7D7468] block">Guests</span>
                  <span className="font-medium text-[#1E1B18]">{item.adults} Adults {item.children ? `· ${item.children} Children` : ''}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7D7468] block">Suite Preference</span>
                  <span className="font-medium text-[#9E7D53]">{item.suiteName || 'Any Suite'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#7D7468] block">Request Type</span>
                  <span className="font-medium capitalize">{item.type?.replace('_', ' ') || 'Inquiry'}</span>
                </div>
              </div>

              {item.notes && (
                <div className="p-3 bg-white rounded-lg border border-[#23201C]/6 text-xs text-[#3D3831]">
                  <span className="font-medium text-[#7D7468] block text-[10px] uppercase mb-0.5">Notes:</span>
                  {item.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
