import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CalculationRecord, CalculatorDefinition, Quote, UserProfile } from '../types';
import { CALCULATORS } from '../data/calculators';
import { initAnalytics, trackEvent } from '../utils/analytics';

interface AppContextType {
  user: UserProfile | null;
  isPro: boolean;
  activeRoute: string;
  navigate: (path: string, queryParams?: Record<string, any>) => void;
  currentQuery: Record<string, string>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // Auth
  showAuthModal: boolean;
  authModalMode: 'login' | 'signup' | 'pro';
  openAuthModal: (mode?: 'login' | 'signup' | 'pro') => void;
  closeAuthModal: () => void;
  loginWithGoogle: (customEmail?: string) => void;
  loginWithEmail: (email: string, pass: string, name?: string) => void;
  logout: () => void;
  updateCompanyProfile: (profile: NonNullable<UserProfile['companyProfile']>) => void;
  upgradeToPro: () => void;
  downgradePro: () => void;
  // History & Saved
  historyCalculations: CalculationRecord[];
  savedCalculations: CalculationRecord[];
  addToHistory: (record: Omit<CalculationRecord, 'id' | 'createdAt'>) => void;
  saveCalculation: (record: Omit<CalculationRecord, 'id' | 'createdAt'>) => void;
  deleteSavedCalculation: (id: string) => void;
  clearHistory: () => void;
  // Favorites
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  // Popular calculations
  usageCounts: Record<string, number>;
  getCalculatorsSortedByPopularity: () => CalculatorDefinition[];
  // Quotes (Pro feature)
  quotes: Quote[];
  saveQuote: (quote: Quote) => void;
  deleteQuote: (id: string) => void;
  // Cookies
  cookieConsent: 'accepted' | 'rejected' | null;
  setCookieConsentState: (status: 'accepted' | 'rejected') => void;
  // Ad Preview toggle
  showAdPreview: boolean;
  toggleAdPreview: () => void;
  // Admin overrides
  adminOverrides: {
    disabledSlugs: string[];
    customTitles: Record<string, string>;
    customDescriptions: Record<string, string>;
    customFaqs: Record<string, Array<{ question: string; answer: string }>>;
  };
  updateAdminOverrides: (data: Partial<AppContextType['adminOverrides']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'hesapkutu_user';
const LOCAL_STORAGE_KEY_SAVED = 'hesapkutu_saved_calcs';
const LOCAL_STORAGE_KEY_HISTORY = 'hesapkutu_history_calcs';
const LOCAL_STORAGE_KEY_FAVS = 'hesapkutu_favorites';
const LOCAL_STORAGE_KEY_USAGE = 'hesapkutu_usage_counts';
const LOCAL_STORAGE_KEY_QUOTES = 'hesapkutu_quotes';
const LOCAL_STORAGE_KEY_COOKIE = 'hesapkutu_cookie_consent';
const LOCAL_STORAGE_KEY_ADMIN = 'hesapkutu_admin_overrides';
const LOCAL_STORAGE_KEY_AD_PREVIEW = 'hesapkutu_ad_preview';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [currentQuery, setCurrentQuery] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const res: Record<string, string> = {};
      params.forEach((v, k) => {
        res[k] = v;
      });
      return res;
    }
    return {};
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'pro'>('login');

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Saved calculations
  const [savedCalculations, setSavedCalculations] = useState<CalculationRecord[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_SAVED);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // History calculations
  const [historyCalculations, setHistoryCalculations] = useState<CalculationRecord[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_FAVS);
      return raw ? JSON.parse(raw) : ['yuzde-hesaplama', 'kdv-hesaplama', 'kar-zarar-hesaplama'];
    } catch {
      return ['yuzde-hesaplama', 'kdv-hesaplama'];
    }
  });

  // Usage counts for popular rankings
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USAGE);
      return raw
        ? JSON.parse(raw)
        : {
            'yuzde-hesaplama': 142,
            'kdv-hesaplama': 118,
            'kar-zarar-hesaplama': 95,
            'iskonto-hesaplama': 84,
            'yakit-hesaplama': 76,
            'kar-marji-hesaplama': 68,
            'metrekare-hesaplama': 54
          };
    } catch {
      return {};
    }
  });

  // Quotes
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_QUOTES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Cookie consent
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(() => {
    try {
      return (localStorage.getItem(LOCAL_STORAGE_KEY_COOKIE) as any) || null;
    } catch {
      return null;
    }
  });

  // Ad preview mode (default true in dev so reviewer sees AdSense infrastructure)
  const [showAdPreview, setShowAdPreview] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem(LOCAL_STORAGE_KEY_AD_PREVIEW);
      return val !== null ? val === 'true' : true;
    } catch {
      return true;
    }
  });

  // Admin overrides
  const [adminOverrides, setAdminOverrides] = useState<AppContextType['adminOverrides']>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN);
      return raw
        ? JSON.parse(raw)
        : {
            disabledSlugs: [],
            customTitles: {},
            customDescriptions: {},
            customFaqs: {}
          };
    } catch {
      return {
        disabledSlugs: [],
        customTitles: {},
        customDescriptions: {},
        customFaqs: {}
      };
    }
  });

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SAVED, JSON.stringify(savedCalculations));
  }, [savedCalculations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(historyCalculations));
  }, [historyCalculations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVS, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USAGE, JSON.stringify(usageCounts));
  }, [usageCounts]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_QUOTES, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    if (cookieConsent) {
      localStorage.setItem(LOCAL_STORAGE_KEY_COOKIE, cookieConsent);
      if (cookieConsent === 'accepted') {
        initAnalytics();
      }
    }
  }, [cookieConsent]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_AD_PREVIEW, String(showAdPreview));
  }, [showAdPreview]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN, JSON.stringify(adminOverrides));
  }, [adminOverrides]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(window.location.pathname || '/');
      const params = new URLSearchParams(window.location.search);
      const res: Record<string, string> = {};
      params.forEach((v, k) => {
        res[k] = v;
      });
      setCurrentQuery(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, queryParams?: Record<string, any>) => {
    let url = path;
    const cleanQuery: Record<string, string> = {};

    if (queryParams && Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          searchParams.set(k, String(v));
          cleanQuery[k] = String(v);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState({}, '', url);
    }
    setActiveRoute(path);
    setCurrentQuery(cleanQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    trackEvent('page_view', { path });
  };

  const isPro = useMemo(() => {
    return Boolean(user?.isPro);
  }, [user]);

  // Auth methods
  const openAuthModal = (mode: 'login' | 'signup' | 'pro' = 'login') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
    trackEvent('signup_started');
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const loginWithGoogle = (customEmail?: string) => {
    const email = customEmail || 'huseyinsbozdogan@gmail.com';
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email,
      name: email.split('@')[0].toUpperCase(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      isPro: false,
      role: email.includes('admin') || email === 'huseyinsbozdogan@gmail.com' ? 'admin' : 'user',
      companyProfile: {
        companyName: 'Örnek Ticaret Ltd.',
        phone: '+90 (555) 000-0000',
        address: 'İstanbul, Türkiye',
        taxOffice: 'Kadıköy VD',
        taxNumber: '1234567890'
      }
    };
    setUser(newUser);
    setShowAuthModal(false);
    trackEvent('signup_completed', { method: 'google' });
  };

  const loginWithEmail = (email: string, _pass: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email,
      name: name || email.split('@')[0],
      isPro: false,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
      companyProfile: {
        companyName: 'Firma / Şirket Adı'
      }
    };
    setUser(newUser);
    setShowAuthModal(false);
    trackEvent('signup_completed', { method: 'email' });
  };

  const logout = () => {
    setUser(null);
  };

  const updateCompanyProfile = (profile: NonNullable<UserProfile['companyProfile']>) => {
    if (!user) return;
    setUser({
      ...user,
      companyProfile: {
        ...user.companyProfile,
        ...profile
      }
    });
  };

  const upgradeToPro = () => {
    trackEvent('pro_clicked');
    if (!user) {
      openAuthModal('pro');
      return;
    }
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    setUser({
      ...user,
      isPro: true,
      proExpiresAt: expiry.toISOString().split('T')[0]
    });
    setShowAuthModal(false);
  };

  const downgradePro = () => {
    if (!user) return;
    setUser({
      ...user,
      isPro: false,
      proExpiresAt: undefined
    });
  };

  // Calculations history & saved
  const addToHistory = (record: Omit<CalculationRecord, 'id' | 'createdAt'>) => {
    const newRecord: CalculationRecord = {
      ...record,
      id: 'calc_' + Date.now() + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString()
    };
    setHistoryCalculations((prev) => [newRecord, ...prev.slice(0, 29)]);

    // Increment usage count for calculator
    setUsageCounts((prev) => ({
      ...prev,
      [record.toolSlug]: (prev[record.toolSlug] || 0) + 1
    }));

    trackEvent('calculator_used', { tool: record.toolSlug });
    trackEvent('calculator_result', { tool: record.toolSlug });
  };

  const saveCalculation = (record: Omit<CalculationRecord, 'id' | 'createdAt'>) => {
    const newRecord: CalculationRecord = {
      ...record,
      id: 'saved_' + Date.now() + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString()
    };
    setSavedCalculations((prev) => [newRecord, ...prev]);
  };

  const deleteSavedCalculation = (id: string) => {
    setSavedCalculations((prev) => prev.filter((c) => c.id !== id));
  };

  const clearHistory = () => {
    setHistoryCalculations([]);
  };

  // Favorites
  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(slug);
      const updated = exists ? prev.filter((s) => s !== slug) : [...prev, slug];
      if (!exists) {
        trackEvent('favorite_added', { tool: slug });
      }
      return updated;
    });
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  // Quotes
  const saveQuote = (quote: Quote) => {
    setQuotes((prev) => {
      const idx = prev.findIndex((q) => q.id === quote.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = quote;
        return copy;
      }
      return [quote, ...prev];
    });
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  const setCookieConsentState = (status: 'accepted' | 'rejected') => {
    setCookieConsent(status);
  };

  const toggleAdPreview = () => {
    setShowAdPreview((prev) => !prev);
  };

  const updateAdminOverrides = (data: Partial<AppContextType['adminOverrides']>) => {
    setAdminOverrides((prev) => ({
      ...prev,
      ...data
    }));
  };

  const getCalculatorsSortedByPopularity = () => {
    return [...CALCULATORS].sort((a, b) => {
      const countA = usageCounts[a.slug] || 0;
      const countB = usageCounts[b.slug] || 0;
      return countB - countA;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isPro,
        activeRoute,
        navigate,
        currentQuery,
        searchQuery,
        setSearchQuery,
        showAuthModal,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        logout,
        updateCompanyProfile,
        upgradeToPro,
        downgradePro,
        historyCalculations,
        savedCalculations,
        addToHistory,
        saveCalculation,
        deleteSavedCalculation,
        clearHistory,
        favorites,
        toggleFavorite,
        isFavorite,
        usageCounts,
        getCalculatorsSortedByPopularity,
        quotes,
        saveQuote,
        deleteQuote,
        cookieConsent,
        setCookieConsentState,
        showAdPreview,
        toggleAdPreview,
        adminOverrides,
        updateAdminOverrides
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
