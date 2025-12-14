import { useState, useEffect } from 'react';

import Chatbot from './components/Chatbot';
import Header from './components/Header';

// Pages (old + new both kept)
import AboutPage from './pages/AboutPage';
import HomePage from './components/HomePage';
import EthicsPage from './components/EthicsPage';
import MapVerificationPage from './pages/MapVerificationPage';
import RegistrationPage from './pages/RegistrationPage';
import VerificationPage from './pages/VerificationPage';

import { useTranslations } from './hooks/useTranslations';

// ✅ Extended Page type (old + new)
type Page =
  | 'home'
  | 'about'
  | 'verification'
  | 'registration'
  | 'map'
  | 'ethics';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // ✅ default page preserved but enhanced
  const [page, setPage] = useState<Page>('home');

  // ✅ Updated translation hook usage
  useTranslations(language);

  // ✅ Theme logic (unchanged)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className="
        min-h-screen
        transition-colors duration-500 ease-in-out
        bg-gray-50 dark:bg-slate-900
        text-slate-900 dark:text-white
        font-sans
        selection:bg-sky-500/30
      "
    >
      {/* Header */}
      <Header
        currentPage={page}
        setPage={(p) => setPage(p as Page)}
        currentTheme={theme}
        toggleTheme={toggleTheme}
        currentLanguage={language}
        setLanguage={setLanguage}
      />

      {/* Main Content */}
      <main className="relative z-0 pb-24">
        
        {page === 'home' && (
          <HomePage
            language={language}
            onNavigate={(p) => setPage(p as Page)}
          />
        )}

        {page === 'about' && (
          <div className="container mx-auto px-4 py-8 animate-fadeIn">
            <AboutPage language={language} />
          </div>
        )}

        {page === 'ethics' && (
          <EthicsPage language={language} />
        )}

        {page === 'map' && (
          <div className="container mx-auto px-4 py-8 animate-fadeIn">
            <MapVerificationPage language={language} />
          </div>
        )}

        {page === 'verification' && (
          <div className="container mx-auto px-4 py-8 animate-fadeIn">
            <VerificationPage language={language} />
          </div>
        )}

        {page === 'registration' && (
          <div className="container mx-auto px-4 py-8 mt-6 animate-fadeIn">
            <RegistrationPage language={language} />
          </div>
        )}

      </main>

      {/* Chatbot */}
      <Chatbot language={language} />
    </div>
  );
}
