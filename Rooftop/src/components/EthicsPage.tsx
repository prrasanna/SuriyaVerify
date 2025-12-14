import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface EthicsPageProps {
  language: string;
}

const EthicsPage: React.FC<EthicsPageProps> = ({ language }) => {
  const { t } = useTranslations(language);

  return (
    <div className="w-full animate-fadeIn bg-white dark:bg-slate-900 min-h-screen">
       <div className="container mx-auto px-4 py-12 max-w-4xl">
           
           {/* Header */}
           <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
               <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('ethics.title')}</h1>
               <p className="text-slate-600 dark:text-slate-400 text-lg">{t('ethics.subtitle')}</p>
           </div>

           <div className="space-y-12">
               
               {/* Privacy */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('ethics.privacy.title')}</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{t('ethics.privacy.desc')}</p>
                   <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed marker:text-slate-400">
                       <li><strong>Imagery:</strong> {t('ethics.privacy.p1').replace('Imagery:', '')}</li>
                       <li><strong>Data Retention:</strong> {t('ethics.privacy.p2').replace('Data Retention:', '')}</li>
                       <li><strong>Resolution:</strong> {t('ethics.privacy.p3').replace('Resolution:', '')}</li>
                   </ul>
               </section>

               {/* Methodology */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('ethics.method.title')}</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">{t('ethics.method.desc')}</p>
                   
                   <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg font-mono text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                       <p className="mb-2">{t('ethics.method.code.formula')}</p>
                       <p className="mb-2 text-blue-600 dark:text-blue-400">{t('ethics.method.code.assumption')}</p>
                       <p className="text-slate-500 italic">{t('ethics.method.code.ref')}</p>
                   </div>
               </section>

               {/* Bias */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('ethics.bias.title')}</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-4">{t('ethics.bias.desc')}</p>
                   <ul className="list-disc pl-5 space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed marker:text-slate-400">
                        <li><strong>Rural vs Urban:</strong> {t('ethics.bias.p1').replace('Rural vs Urban:', '')}</li>
                        <li><strong>Shadows:</strong> {t('ethics.bias.p2').replace('Shadows:', '')}</li>
                   </ul>
               </section>

               {/* Auditability */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('ethics.audit.title')}</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-4">{t('ethics.audit.desc')}</p>
                   <div className="pl-4 border-l-2 border-slate-300 dark:border-slate-700 space-y-1 text-slate-700 dark:text-slate-300 mb-4">
                       <p>{t('ethics.audit.l1')}</p>
                       <p>{t('ethics.audit.l2')}</p>
                       <p>{t('ethics.audit.l3')}</p>
                       <p>{t('ethics.audit.l4')}</p>
                   </div>
                   <p className="text-slate-600 dark:text-slate-400 italic text-sm">{t('ethics.audit.footer')}</p>
               </section>

           </div>
       </div>
    </div>
  );
};

export default EthicsPage;