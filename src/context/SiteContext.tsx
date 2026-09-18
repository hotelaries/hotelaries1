import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  SiteData, 
  Language, 
  Suite, 
  BookingInquiry, 
  MediaAsset, 
  ActivityLog,
  MultiLangText 
} from '../types';
import { initialSiteData } from '../data/initialData';
import { db, auth, testFirestoreConnection } from '../lib/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

interface SiteContextType {
  siteData: SiteData;
  updateSiteData: (newData: Partial<SiteData> | ((prev: SiteData) => Partial<SiteData>)) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportData: () => string;
  importData: (jsonString: string) => Promise<boolean>;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedSuite: Suite | null;
  setSelectedSuite: (suite: Suite | null) => void;
  isBookingModalOpen: boolean;
  openBookingModal: (prefill?: Partial<BookingInquiry>) => void;
  closeBookingModal: () => void;
  bookingPrefill: Partial<BookingInquiry> | null;
  inquiries: BookingInquiry[];
  submitInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  updateInquiryStatus: (id: string, status: BookingInquiry['status']) => Promise<void>;
  addBookingManually: (booking: Omit<BookingInquiry, 'id' | 'createdAt'>) => Promise<void>;
  
  // Media library
  mediaItems: MediaAsset[];
  addMediaItem: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;

  // Activity Logs
  activityLogs: ActivityLog[];
  logActivity: (action: string, details: string) => Promise<void>;

  // Authentication & Status
  currentUser: User | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (emailOrPass: string, pass?: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  isFirebaseConnected: boolean;
  isSyncing: boolean;

  t: (multi: MultiLangText | undefined, fallback?: string) => string;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
}

const SITE_CONTENT_DOC = 'main';
const STORAGE_KEY = 'aries_hotel_data_v2';
const INQUIRIES_STORAGE_KEY = 'aries_inquiries_v2';
const AUTH_STORAGE_KEY = 'aries_admin_auth_v2';

// Safe localStorage wrapper
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {}
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {}
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {}
  }
};

const VALID_PAGES = [
  'home',
  'suites',
  'skylounge',
  'experience',
  'wellness',
  'culinary',
  'gallery',
  'about',
  'contact',
  'admin'
] as const;

type ValidPage = (typeof VALID_PAGES)[number];

export const parseValidPage = (pathOrHash: string): ValidPage => {
  if (!pathOrHash) return 'home';
  const clean = pathOrHash
    .toLowerCase()
    .trim()
    .split('?')[0]
    .replace(/^#\/?/, '')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.html?$/i, '');

  if (clean === '' || clean === 'index' || clean === 'home' || clean.includes('dist')) {
    return 'home';
  }
  if (clean === 'admin' || clean.startsWith('admin/')) {
    return 'admin';
  }
  if (VALID_PAGES.includes(clean as ValidPage)) {
    return clean as ValidPage;
  }
  return 'home';
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Core Content State
  const [siteData, setSiteDataState] = useState<SiteData>(() => {
    try {
      const stored = safeStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          // Verify brand version and address freshness
          if (
            !parsed.brandVersion ||
            parsed.brandVersion < 3 ||
            parsed.contact?.hotelName?.includes('LINGERS') ||
            parsed.contact?.address?.includes('Sector 115')
          ) {
            return initialSiteData;
          }
          return {
            ...initialSiteData,
            ...parsed,
            hero: {
              ...initialSiteData.hero,
              ...(parsed.hero || {})
            },
            skyLounge: {
              ...initialSiteData.skyLounge,
              ...(parsed.skyLounge || {})
            }
          };
        }
      }
    } catch {}
    return initialSiteData;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = safeStorage.getItem('aries_lang_v2') as Language;
      if (stored && ['de', 'en', 'it'].includes(stored)) return stored;
    } catch {}
    return 'en';
  });

  const [currentPage, setCurrentPageState] = useState<string>('home');
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<Partial<BookingInquiry> | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const stored = safeStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'inq-sample-1',
        createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        arrivalDate: '2026-10-12',
        departureDate: '2026-10-18',
        adults: 2,
        children: 0,
        suiteId: 'suite-panorama-dolomiti',
        suiteName: 'Panorama Suite Dolomiti',
        pricePerNight: 580,
        totalAmount: 3480,
        guestName: 'Dr. Maximilian von Berg',
        guestEmail: 'm.berg@munich-advisors.de',
        guestPhone: '+49 89 231 445',
        notes: 'We celebrate our 10th anniversary. Looking forward to wine tasting and peaceful days.',
        status: 'confirmed',
        type: 'direct_booking'
      },
      {
        id: 'inq-sample-2',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        arrivalDate: '2026-11-04',
        departureDate: '2026-11-08',
        adults: 2,
        children: 0,
        suiteId: 'suite-garden-lagrein',
        suiteName: 'Garden Suite Lagrein',
        pricePerNight: 420,
        totalAmount: 1680,
        guestName: 'Chiara & Matteo Rossi',
        guestEmail: 'chiara.rossi@studio-rossi.it',
        guestPhone: '+39 02 884 9201',
        notes: 'Gradiremmo una suite silenziosa e se possibile il noleggio di due e-bike.',
        status: 'pending',
        type: 'inquiry'
      }
    ];
  });

  // Media items state
  const [mediaItems, setMediaItems] = useState<MediaAsset[]>(() => {
    const initialMedia: MediaAsset[] = initialSiteData.gallery.map((g, i) => ({
      id: `media-init-${i}`,
      url: g.url,
      title: g.title.en || g.title.de,
      category: g.category,
      createdAt: new Date().toISOString()
    }));
    return initialMedia;
  });

  // Activity logs
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      action: 'CMS Initialization',
      details: 'Cloud Firestore database live synchronization initialized',
      user: 'System Admin',
      timestamp: new Date().toISOString()
    }
  ]);

  // Firebase connection & Auth status
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return safeStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {}
    return false;
  });

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Log activity helper
  const logActivity = useCallback(async (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action,
      details,
      user: currentUser?.email || 'Administrator',
      timestamp: new Date().toISOString()
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);

    try {
      if (db) {
        await addDoc(collection(db, 'activity_logs'), {
          ...newLog,
          serverTimestamp: serverTimestamp()
        });
      }
    } catch (e) {
      console.warn('Activity log firestore sync notice:', e);
    }
  }, [currentUser]);

  // Test connection & setup real-time listener for site content
  useEffect(() => {
    let unsubscribeContent: (() => void) | undefined;
    let unsubscribeInquiries: (() => void) | undefined;
    let unsubscribeMedia: (() => void) | undefined;

    async function initFirestore() {
      try {
        const ok = await testFirestoreConnection();
        setIsFirebaseConnected(ok);

        const contentDocRef = doc(db, 'site_content', SITE_CONTENT_DOC);

        // Listen to live site content in Firestore
        unsubscribeContent = onSnapshot(contentDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const remoteData = docSnap.data() as Partial<SiteData>;
            if (remoteData && typeof remoteData === 'object') {
              const isOldBrand =
                !remoteData.brandVersion ||
                remoteData.brandVersion < 3 ||
                remoteData.contact?.hotelName?.includes('LINGERS') ||
                remoteData.contact?.address?.includes('Sector 115');
              if (isOldBrand) {
                const updated: SiteData = {
                  ...initialSiteData,
                  ...remoteData,
                  brandVersion: 3,
                  contact: {
                    ...initialSiteData.contact,
                    ...(remoteData?.contact || {}),
                    address: "SBP, City of dreams, high ground road zirakpur. 140603",
                    postalCode: "140603",
                    city: "Zirakpur",
                    region: "Punjab",
                    country: "India",
                    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=SBP+City+of+dreams+high+ground+road+zirakpur+140603"
                  },
                  lastUpdated: new Date().toISOString(),
                  updatedBy: 'address-upgrade'
                };
                setSiteDataState(updated);
                safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                setDoc(contentDocRef, updated).catch(e => console.warn('Address upgrade notice:', e));
                return;
              }

              setSiteDataState((current) => {
                const merged: SiteData = {
                  ...initialSiteData,
                  ...current,
                  ...remoteData,
                  brandVersion: 3,
                  contact: {
                    ...initialSiteData.contact,
                    ...(current?.contact || {}),
                    ...(remoteData?.contact || {})
                  },
                  hero: {
                    ...initialSiteData.hero,
                    ...(current?.hero || {}),
                    ...(remoteData?.hero || {})
                  },
                  skyLounge: {
                    ...initialSiteData.skyLounge,
                    ...(current?.skyLounge || {}),
                    ...(remoteData?.skyLounge || {})
                  }
                };
                safeStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                return merged;
              });
            }
          } else {
            // First time seeding default content to Firestore
            setDoc(contentDocRef, {
              ...initialSiteData,
              brandVersion: 3,
              lastUpdated: new Date().toISOString(),
              updatedBy: 'system-seed'
            }).catch((err) => console.warn('Seeding firestore notice:', err));
          }
        }, (err) => {
          console.warn('Firestore site_content listener warning:', err);
        });

        // Listen to inquiries collection
        const inqColRef = collection(db, 'inquiries');
        unsubscribeInquiries = onSnapshot(query(inqColRef, orderBy('createdAt', 'desc')), (snapshot) => {
          if (!snapshot.empty) {
            const list: BookingInquiry[] = [];
            snapshot.forEach((d) => {
              const data = d.data();
              list.push({
                id: d.id,
                ...data
              } as BookingInquiry);
            });
            setInquiries(list);
            safeStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list));
          }
        }, (err) => {
          console.warn('Inquiries listener warning:', err);
        });

        // Listen to media library collection
        const mediaColRef = collection(db, 'media');
        unsubscribeMedia = onSnapshot(mediaColRef, (snapshot) => {
          if (!snapshot.empty) {
            const list: MediaAsset[] = [];
            snapshot.forEach((d) => {
              list.push({ id: d.id, ...d.data() } as MediaAsset);
            });
            setMediaItems(list);
          }
        }, (err) => {
          console.warn('Media listener warning:', err);
        });

      } catch (err) {
        console.warn('Firebase setup initialization notice:', err);
      }
    }

    initFirestore();

    // Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsAdminLoggedIn(true);
        safeStorage.setItem(AUTH_STORAGE_KEY, 'true');
      }
    });

    return () => {
      unsubscribeContent?.();
      unsubscribeInquiries?.();
      unsubscribeMedia?.();
      unsubscribeAuth();
    };
  }, []);

  // Update site content with Firestore persistence
  const updateSiteData = async (newData: Partial<SiteData> | ((prev: SiteData) => Partial<SiteData>)) => {
    setIsSyncing(true);
    try {
      let resolvedPayload: SiteData | null = null;
      setSiteDataState((prev) => {
        const resolved = typeof newData === 'function' ? newData(prev) : newData;
        const payload: SiteData = {
          ...initialSiteData,
          ...prev,
          ...resolved,
          hero: {
            ...initialSiteData.hero,
            ...(prev?.hero || {}),
            ...(resolved?.hero || {})
          },
          lastUpdated: new Date().toISOString(),
          updatedBy: currentUser?.email || 'admin'
        };
        resolvedPayload = payload;
        safeStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        return payload;
      });

      if (resolvedPayload) {
        // Push to Firestore with merge
        const docRef = doc(db, 'site_content', SITE_CONTENT_DOC);
        await setDoc(docRef, resolvedPayload, { merge: true });

        // Synchronize siteSettings/contact for dedicated settings architecture
        if ((resolvedPayload as SiteData).contact) {
          try {
            const contactRef = doc(db, 'siteSettings', 'contact');
            const c = (resolvedPayload as SiteData).contact;
            await setDoc(contactRef, {
              hotelName: c.hotelName || 'Hotel Aries & Sky Lounge',
              address: c.address || '',
              phone1: c.phone || c.phone1 || '72593 32223',
              phone2: c.phone2 || '89683 99764',
              email: c.email || 'hotelaries764@gmail.com',
              mapEmbedHtml: c.mapEmbedHtml || '',
              directionsUrl: c.directionsUrl || '',
              mapTitle: c.mapTitle || 'Location & Directions',
              showMap: c.showMap !== false,
              mapHeight: c.mapHeight || 450,
              updatedAt: new Date().toISOString()
            }, { merge: true });
          } catch (syncErr) {
            console.warn('siteSettings/contact sync warning:', syncErr);
          }
        }

        await logActivity('Content Saved & Published', `Updated site content at ${new Date().toLocaleTimeString()}`);
      }

      showToast('Changes saved & published live to database!', 'success');
    } catch (err) {
      console.error('Error saving to Firestore:', err);
      showToast('Saved locally. Database sync will retry.', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  // Reset to default curated content
  const resetToDefaults = async () => {
    setIsSyncing(true);
    try {
      const payload = {
        ...initialSiteData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'reset-defaults'
      };
      setSiteDataState(payload);
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      const docRef = doc(db, 'site_content', SITE_CONTENT_DOC);
      await setDoc(docRef, payload);

      await logActivity('Reset Content', 'Reset all website content to pristine South Tyrol boutique defaults');
      showToast('Reset to pristine curated luxury content.', 'info');
    } catch (err) {
      console.error('Reset error:', err);
      showToast('Reset locally.', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  // Export JSON
  const exportData = () => {
    return JSON.stringify(siteData, null, 2);
  };

  // Import JSON
  const importData = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hero && parsed.suites && parsed.contact) {
        await updateSiteData(parsed);
        showToast('Site data imported successfully.', 'success');
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    showToast('Invalid JSON data format.', 'error');
    return false;
  };

  const setCurrentPage = (page: string) => {
    const valid = parseValidPage(page);
    setCurrentPageState(valid);
    try {
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        if (valid === 'home') {
          window.history.replaceState(null, '', '/');
        } else if (valid === 'admin') {
          const path = window.location.pathname.toLowerCase();
          const hash = window.location.hash.toLowerCase();
          if (path.startsWith('/admin')) {
            // Already on an admin path, preserve it
          } else if (hash.startsWith('#admin') || hash.startsWith('#/admin')) {
            // Already on an admin hash, preserve it
          } else {
            window.history.replaceState(null, '', '/admin/dashboard');
          }
        } else {
          window.history.replaceState(null, '', `/#${valid}`);
        }
      }
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {}
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      safeStorage.setItem('lingers_lang', lang);
    } catch {}
  };

  const openBookingModal = (prefill?: Partial<BookingInquiry>) => {
    setBookingPrefill(prefill || null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingPrefill(null);
  };

  // Submit inquiry (Guest public form)
  const submitInquiry = async (data: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: BookingInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Optimistic local update
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    safeStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));

    try {
      if (db) {
        await setDoc(doc(db, 'inquiries', newInquiry.id), newInquiry);
      }
    } catch (err) {
      console.warn('Inquiry Firestore sync notice:', err);
    }

    showToast(
      language === 'de'
        ? 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.'
        : language === 'it'
        ? 'Grazie! La vostra richiesta è stata inviata con successo.'
        : 'Thank you! Your reservation inquiry has been received.',
      'success'
    );
    closeBookingModal();
  };

  // Add booking manually from admin
  const addBookingManually = async (booking: Omit<BookingInquiry, 'id' | 'createdAt'>) => {
    const id = `book-${Date.now()}`;
    const newBooking: BookingInquiry = {
      ...booking,
      id,
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...inquiries];
    setInquiries(updated);
    safeStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'inquiries', id), newBooking);
      await logActivity('Booking Added', `Manually created booking for ${newBooking.guestName}`);
      showToast('Booking added successfully to database.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Booking saved locally.', 'info');
    }
  };

  // Delete inquiry
  const deleteInquiry = async (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    safeStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'inquiries', id));
      await logActivity('Inquiry Deleted', `Removed inquiry/booking record ${id}`);
      showToast('Inquiry removed from database.', 'info');
    } catch (err) {
      console.warn('Delete inquiry firestore warning:', err);
      showToast('Inquiry removed locally.', 'info');
    }
  };

  // Update inquiry status
  const updateInquiryStatus = async (id: string, status: BookingInquiry['status']) => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    setInquiries(updated);
    safeStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));

    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
      await logActivity('Inquiry Status Updated', `Updated status to ${status} for record ${id}`);
      showToast(`Status updated to ${status}.`, 'info');
    } catch (err) {
      console.warn('Update inquiry status firestore warning:', err);
      showToast(`Status updated to ${status}.`, 'info');
    }
  };

  // Media Library actions
  const addMediaItem = async (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const id = `media-${Date.now()}`;
    const item: MediaAsset = {
      ...asset,
      id,
      createdAt: new Date().toISOString()
    };
    setMediaItems((prev) => [item, ...prev]);

    try {
      await setDoc(doc(db, 'media', id), item);
      await logActivity('Media Asset Added', `Added image: ${item.title}`);
      showToast('Image registered in central Media Library.', 'success');
    } catch (e) {
      console.warn('Add media firestore notice:', e);
    }
  };

  const deleteMediaItem = async (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'media', id));
      await logActivity('Media Asset Deleted', `Deleted media asset ID ${id}`);
      showToast('Image removed from media library.', 'info');
    } catch (e) {
      console.warn('Delete media notice:', e);
    }
  };

  // Admin login: Supports both Firebase Auth and master administrative passphrase
  const loginAdmin = async (emailOrPass: string, pass?: string): Promise<boolean> => {
    // 1. If password only or master credentials
    if (!pass) {
      const p = emailOrPass.trim();
      if (p === 'admin' || p === 'lingers2025' || p.toLowerCase() === 'lingers') {
        setIsAdminLoggedIn(true);
        safeStorage.setItem(AUTH_STORAGE_KEY, 'true');
        await logActivity('Admin Login', 'Master administrative login authenticated');
        showToast('Welcome to LINGERS Management Console.', 'success');
        return true;
      }
    }

    // 2. Try Firebase Authentication with Email & Password
    try {
      const email = pass ? emailOrPass : 'admin@lingers.it';
      const password = pass || emailOrPass;
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user) {
        setIsAdminLoggedIn(true);
        safeStorage.setItem(AUTH_STORAGE_KEY, 'true');
        await logActivity('Admin Login', `Authenticated as ${cred.user.email}`);
        showToast(`Welcome, ${cred.user.email}`, 'success');
        return true;
      }
    } catch (authErr: any) {
      // If user input matches master credentials fallback, authenticate gracefully
      const p = (pass || emailOrPass).trim();
      if (p === 'admin' || p === 'lingers2025' || p.toLowerCase() === 'lingers') {
        setIsAdminLoggedIn(true);
        safeStorage.setItem(AUTH_STORAGE_KEY, 'true');
        await logActivity('Admin Login', 'Administrator signed in');
        showToast('Welcome to LINGERS Management Console.', 'success');
        return true;
      }
      showToast(authErr.message || 'Invalid credentials. (Hint: lingers2025 or admin)', 'error');
      return false;
    }
    return false;
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
    } catch {}
    setIsAdminLoggedIn(false);
    safeStorage.removeItem(AUTH_STORAGE_KEY);
    showToast('Logged out of Management Console.', 'info');
  };

  // Translation helper
  const t = (multi: MultiLangText | undefined, fallback: string = ''): string => {
    if (!multi) return fallback;
    return multi[language] || multi.en || multi.de || fallback;
  };

  return (
    <SiteContext.Provider
      value={{
        siteData,
        updateSiteData,
        resetToDefaults,
        exportData,
        importData,
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        selectedSuite,
        setSelectedSuite,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        bookingPrefill,
        inquiries,
        submitInquiry,
        deleteInquiry,
        updateInquiryStatus,
        addBookingManually,
        mediaItems,
        addMediaItem,
        deleteMediaItem,
        activityLogs,
        logActivity,
        currentUser,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isFirebaseConnected,
        isSyncing,
        t,
        showToast,
        toast
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
