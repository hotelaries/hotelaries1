import React, { useEffect } from 'react';
import { SiteProvider, useSite, parseValidPage } from './context/SiteContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SuiteDetailModal } from './components/SuiteDetailModal';
import { BookingModal } from './components/BookingModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { SuitesPage } from './pages/SuitesPage';
import { SkyLoungePage } from './pages/SkyLoungePage';
import { ExperiencePage } from './pages/ExperiencePage';
import { WellnessPage } from './pages/WellnessPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage } = useSite();

  // Reset scroll and normalize URL on initial load and refresh
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }

        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

        // If URL was corrupted or redirected to /dist/, normalize back to root / immediately
        if (path.includes('dist')) {
          window.history.replaceState(null, '', '/');
          setCurrentPage('home');
          window.scrollTo({ top: 0, behavior: 'auto' });
          return;
        }

        // Only explicitly route to admin if requested, otherwise show Home page on refresh
        if (hash === 'admin' || hash.startsWith('admin/') || path === '/admin' || path.startsWith('/admin/')) {
          setCurrentPage('admin');
        } else if (hash && hash !== 'home') {
          const parsed = parseValidPage(hash);
          setCurrentPage(parsed);
        } else {
          setCurrentPage('home');
          window.history.replaceState(null, '', '/');
        }

        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } catch {
      // Safe fallback
    }
  }, [setCurrentPage]);

  // Handle browser back and forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      try {
        if (typeof window === 'undefined') return;
        const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
        const path = window.location.pathname.toLowerCase();

        if (hash === 'admin' || hash.startsWith('admin/') || path === '/admin' || path.startsWith('/admin/')) {
          setCurrentPage('admin');
        } else if (hash) {
          setCurrentPage(parseValidPage(hash));
        } else {
          setCurrentPage('home');
        }
      } catch (err) {
        console.warn('Navigation notice:', err);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [setCurrentPage]);

  const isAdmin = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#23201C] flex flex-col font-sans-clean antialiased selection:bg-[#9E7D53] selection:text-white">
      {/* Universal Header (Shows on guest pages) */}
      {!isAdmin && <Header isHeroPage={currentPage === 'home'} />}

      {/* Main Page Content with Guaranteed Fallback to HomePage */}
      <main className="flex-1 w-full">
        {currentPage === 'suites' ? (
          <SuitesPage />
        ) : currentPage === 'skylounge' ? (
          <SkyLoungePage />
        ) : currentPage === 'experience' ? (
          <ExperiencePage />
        ) : currentPage === 'wellness' ? (
          <WellnessPage />
        ) : currentPage === 'gallery' ? (
          <GalleryPage />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : currentPage === 'contact' ? (
          <ContactPage />
        ) : currentPage === 'admin' ? (
          <AdminPage />
        ) : (
          <HomePage />
        )}
      </main>

      {/* Universal Footer (Shows on guest pages) */}
      {!isAdmin && <Footer />}

      {/* Global Modals */}
      <SuiteDetailModal />
      <BookingModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <SiteProvider>
        <AppContent />
      </SiteProvider>
    </ErrorBoundary>
  );
}
