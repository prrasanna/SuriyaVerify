import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface LoaderProps {
    language: string;
}

const Loader: React.FC<LoaderProps> = ({ language }) => {
  const { t } = useTranslations(language);
  return (
    <div className="flex flex-col items-center justify-center my-12 animate-fadeIn">
      <div className="w-16 h-16 border-4 border-sky-500 dark:border-sky-400 border-t-transparent border-solid rounded-full animate-spin" style={{boxShadow: '0 0 10px #0ea5e9'}}></div>
      <p className="mt-6 text-lg font-semibold text-slate-800 dark:text-slate-200 neon-text">{t('loader.title')}</p>
      <p className="text-slate-600 dark:text-slate-400 mt-2">{t('loader.subtitle')}</p>
    </div>
  );
};

export default Loader;