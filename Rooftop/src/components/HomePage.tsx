import React from 'react';
import { Search, Zap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

interface HomePageProps {
  language: string;
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ language, onNavigate }) => {
  const { t } = useTranslations(language);

  return (
    <div className="w-full animate-fadeIn">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] text-white">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10 flex flex-col items-center text-center">
            
            {/* Governance Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-600 bg-slate-800/50 backdrop-blur-sm">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">PM Surya Ghar: Muft Bijli Yojana Governance
</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight max-w-5xl">
                Governance-Ready Remote <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Solar Verification <br/>
                </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                An auditable, AI-powered digital pipeline to verify rooftop solar installations across India. Ensuring subsidies reach genuine beneficiaries through remote sensing and computer vision.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => onNavigate('verification')}
                    className="px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold rounded-lg shadow-lg shadow-orange-900/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                    Start Verification <ArrowRight size={20} />
                </button>
                <button 
                    onClick={() => onNavigate('about')}
                    className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 text-white font-semibold rounded-lg backdrop-blur-sm transition-all hover:scale-105"
                >
                   About the Scheme
                </button>
            </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{t('PM Surya Ghar: Muft Bijli Yojana Governance').split(':')[0]} Core Capabilities</h2>
                  <p className="text-slate-500 dark:text-slate-400">Built for speed, accuracy, and accountability.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Search size={28} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Remote Fetch & Buffer Search</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                         Automatically retrieves high-res satellite imagery with smart buffer searching (±20m) to lock onto roof regions despite coordinate errors.
                      </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
                      <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Zap size={28} className="text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Detection & Quantification</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                          Detects PV presence and estimates panel count, area, and capacity (kW) using advanced computer vision models.
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
                      <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <ShieldCheck size={28} className="text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Auditable Explainability</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                          Generates "Reason Codes" and verifiable artifacts (masks/boxes) to justify every subsidy approval or rejection.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* About Scheme Section */}
      <section className="py-20 bg-[#FFFBEB] dark:bg-slate-950 border-t border-orange-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">About the Scheme</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Challenge Box */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2 block">CHALLENGE</span>
                    <h3 className="text-2xl font-serif italic text-slate-800 dark:text-slate-200 mb-4">"Has a rooftop solar system actually been installed here?"</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Field inspections are slow and costly. SuryaVerify solves this with a digital pipeline that generalizes across India's diverse roof types.
                    </p>
                </div>

                {/* Bullets */}
                <div className="space-y-4">
                    <SchemeItem text= "Target: 1 Crore households across India" />
                    <SchemeItem text="Launched: Feb 15, 2024 by PM Narendra Modi" />
                    <SchemeItem text="Savings: ~Rs. 75,000 Crore/year in electricity costs" />
                    <SchemeItem text="Goal: Free electricity via rooftop solar subsidies" />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const SchemeItem: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-4">
        <CheckCircle2 className="text-orange-500 flex-shrink-0" size={24} />
        <span className="text-lg text-slate-700 dark:text-slate-300 font-medium">{text}</span>
    </div>
)

export default HomePage;