import React, { useState } from 'react';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { languages } from '../lib/translations';
import { useTranslations } from '../hooks/useTranslations';


interface HeaderProps {
  currentPage: string;
  setPage: (page: any) => void;
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, currentTheme, toggleTheme, currentLanguage, setLanguage }) => {
  const { t } = useTranslations(currentLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ page, label, icon }: { page: string; label: string; icon?: React.ReactNode }) => (
      <button 
        onClick={() => { setPage(page); setMobileMenuOpen(false); }}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex items-center gap-2
            ${currentPage === page 
                ? 'text-[#EA580C] bg-orange-50 dark:bg-orange-900/20' 
                : 'text-slate-600 dark:text-slate-300 hover:text-[#EA580C] hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
      >
        {icon}
        {label}
      </button>
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Branding Area */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
            <Sun className="text-[#EA580C] animate-pulse-yellow" size={28} />
            <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                    {t('header.brand')}
                </span>
                <div className="flex gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded uppercase tracking-wide">
                        {t('header.badge.scheme')}
                    </span>
                     <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded uppercase tracking-wide hidden sm:inline-block">
                        {t('header.badge.tool')}
                    </span>
                </div>
            </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
             <NavItem page="home" label={t('nav.home')} />
             <NavItem page="registration" label={t('nav.apply')} />
             <NavItem page="verification" label={t('nav.verify')} />
             <NavItem page="about" label={t('nav.about')} />
             <NavItem page="ethics" label={t('nav.ethics')} />
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                title={t(currentTheme === 'light' ? 'tooltip.theme.dark' : 'tooltip.theme.light')}
            >
                {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language Selector */}
            <div className="relative group">
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                    <Globe size={20} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-1 hidden group-hover:block animate-fadeIn">
                    {Object.entries(languages).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => setLanguage(code)}
                            className={`w-full text-left px-4 py-2 text-sm ${currentLanguage === code ? 'text-[#EA580C] font-bold bg-orange-50 dark:bg-orange-900/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-fadeIn p-4 flex flex-col gap-2 shadow-lg">
             <NavItem page="home" label={t('nav.home')} />
             <NavItem page="registration" label={t('nav.apply')} />
             <NavItem page="verification" label={t('nav.verify')} />
             <NavItem page="about" label={t('nav.about')} />
             <NavItem page="ethics" label={t('nav.ethics')} />
          </div>
      )}
    </header>
  );
};

export default Header;