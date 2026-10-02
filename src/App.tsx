import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CookieConsent } from './components/common/CookieConsent';
import { AuthModal } from './components/modals/AuthModal';
import { AiCalculatorModal } from './components/modals/AiCalculatorModal';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { UserAccountPage } from './pages/UserAccountPage';
import { QuoteGeneratorPage } from './pages/QuoteGeneratorPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CALCULATORS } from './data/calculators';

const MainRouter: React.FC = () => {
  const { activeRoute } = useApp();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Clean path (strip trailing slash if not root)
  const path = activeRoute === '/' ? '/' : activeRoute.replace(/\/$/, '');

  // Check if current route matches a calculator slug
  const matchedTool = CALCULATORS.find(
    (c) => `/${c.slug}` === path || `/${c.id}` === path
  );

  const renderCurrentPage = () => {
    if (path === '/') {
      return <HomePage onOpenAiModal={() => setIsAiModalOpen(true)} />;
    }

    if (matchedTool) {
      return (
        <CalculatorPage
          tool={matchedTool}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />
      );
    }

    if (path === '/hesabim' || path === '/account' || path === '/history') {
      return <UserAccountPage />;
    }

    if (path === '/teklif-olusturucu') {
      return <QuoteGeneratorPage />;
    }

    if (path === '/admin') {
      return <AdminPage />;
    }

    if (path === '/gizlilik-politikasi') {
      return <LegalPage type="gizlilik" />;
    }

    if (path === '/kullanim-kosullari') {
      return <LegalPage type="kullanim" />;
    }

    if (path === '/cerez-politikasi') {
      return <LegalPage type="cerez" />;
    }

    if (path === '/iletisim') {
      return <LegalPage type="iletisim" />;
    }

    if (path === '/hakkimizda') {
      return <LegalPage type="hakkimizda" />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header onOpenAiModal={() => setIsAiModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <AuthModal />
      <AiCalculatorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <CookieConsent />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
