import { useState, useEffect } from 'react';
import Chatbot from '../src/components/Chatbot';
import Header from './components/Header';
import AboutPage from "./pages/AboutPage";
import MapVerificationPage from "./pages/MapVerificationPage";
import RegistrationPage from "./pages/RegistrationPage";
import VerificationPage from "./pages/VerificationPage";
import { useTranslations } from "./hooks/useTranslations";




type Page = 'verification' | 'about' | 'registration' | 'map';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [page, setPage] = useState<Page>('about');
  useTranslations(language);

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-sky-500/30`}>
      
      {/* Header */}
      <Header 
        currentPage={page}
        setPage={(p) => setPage(p)}
        currentTheme={theme}
        toggleTheme={toggleTheme}
        currentLanguage={language}
        setLanguage={setLanguage}
      />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8 relative z-0 pb-24">
         {page === 'about' && (
           <div className="animate-fadeIn">
             <AboutPage language={language} />
           </div>
         )}

         {page === 'map' && (
            <div className="animate-fadeIn">
              <MapVerificationPage language={language} />
            </div>
         )}

         {page === 'verification' && (
            <div className="animate-fadeIn">
              <VerificationPage language={language} />
            </div>
         )}

         {page === 'registration' && (
            <div className="mt-6 animate-fadeIn">
                <RegistrationPage language={language} />
            </div>
         )}
      </main>

      {/* Chatbot Component */}
      <Chatbot language={language} />
    </div>
  );
}