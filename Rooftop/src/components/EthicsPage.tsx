import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface EthicsPageProps {
  language: string;
}

const EthicsPage: React.FC<EthicsPageProps> = ({ language }) => {
     useTranslations(language);

  return (
    <div className="w-full animate-fadeIn bg-white dark:bg-slate-900 min-h-screen">
       <div className="container mx-auto px-4 py-12 max-w-4xl">
           
           {/* Header */}
           <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
               <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ethics, Privacy & Methodology</h1>
               <p className="text-slate-600 dark:text-slate-400 text-lg">Documentation on data usage, model assumptions, and privacy standards for SuryaVerify.</p>
           </div>

           <div className="space-y-12">
               
               {/* Privacy */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Privacy & Data Sources</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">SuryaVerify adheres to strict privacy guidelines. We do not process Personally Identifiable Information (PII) other than geospatial coordinates provided by the governance body.</p>
                   <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed marker:text-slate-400">
                       <li><strong>Imagery:</strong> All satellite imagery is sourced from commercially licensed providers (e.g., Mapbox, Google) or public open data. No drone surveillance is conducted without explicit permission.</li>
                       <li><strong>Data Retention:</strong> Processed images are transient and used solely for inference unless flagged for audit.</li>
                       <li><strong>Resolution:</strong>  Imagery is limited to roof-level resolution (30-50cm/pixel) to detect panels while preserving privacy of individuals on the ground.</li>
                   </ul>
               </section>

               {/* Methodology */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Capacity Assumption Methodology</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">To estimate the installed capacity (kW) from the visual area (m²), we utilize a transparent, conservative coefficient based on current market efficiency standards for polycrystalline and monocrystalline panels.</p>
                   
                   <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg font-mono text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                       <p className="mb-2">Formula: Capacity (kW) = Area (m²) × Packing Factor × Module Efficiency</p>
                       <p className="mb-2 text-blue-600 dark:text-blue-400">Assumption: 1 m² ≈ 0.18 kWp</p>
                       <p className="text-slate-500 italic">Reference: Standard residential 60/72-cell module efficiency (approx. 18-20%) with racking gaps.</p>
                   </div>
               </section>

               {/* Bias */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Bias Mitigation</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-4">We acknowledge potential performance disparities across different geographies.</p>
                   <ul className="list-disc pl-5 space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed marker:text-slate-400">
                        <li><strong>Rural vs Urban:</strong> Rural roofs often use materials (corrugated metal, blue tarps) that can be adversarial examples for standard computer vision models. Our model is fine-tuned on a diverse dataset of Indian roofing materials.</li>
                        <li><strong>Shadows:</strong>  High-density urban areas introduce shadowing. We utilize "Reason Codes" like heavy_shadow to explicitly flag these as NOT_VERIFIABLE rather than guessing.</li>
                   </ul>
               </section>

               {/* Auditability */}
               <section>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Auditability</h2>
                   <p className="text-slate-700 dark:text-slate-300 mb-4">Every decision made by the AI is accompanied by an artifact bundle:</p>
                   <div className="pl-4 border-l-2 border-slate-300 dark:border-slate-700 space-y-1 text-slate-700 dark:text-slate-300 mb-4">
                       <p>1. The source image snippet.</p>
                       <p>2. The overlay mask of detected panels.</p>
                       <p>3. The confidence score.</p>
                       <p>4. A timestamped log entry.</p>
                   </div>
                   <p className="text-slate-600 dark:text-slate-400 italic text-sm">This ensures that any subsidy disbursement can be manually audited if challenged.</p>
               </section>

           </div>
       </div>
    </div>
  );
};

export default EthicsPage;