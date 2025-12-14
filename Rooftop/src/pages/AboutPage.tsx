import React from "react";
import {
  Target,
  Zap,
  ShieldCheck,
  Sun,
  Home,
  LayoutGrid,
  IndianRupee,
  CheckCircle2,
  FileText,
  Settings,
  ArrowRight,
} from "lucide-react";

// Local fallback for useTranslations when ../hooks/useTranslations is not available.
// This provides a minimal t(key) resolver and avoids a missing-module compile error.
// Expand defaultTranslations with real keys as needed for your app.
const defaultTranslations: Record<string, Record<string, string>> = {
  en: {
    "about.title": "About the Scheme",
    "about.scheme.name": "Solar Subsidy Scheme",
    "about.scheme.tagline": "Bringing clean energy to every home",
    "about.eligibility.title": "Eligibility",
    "about.subsidy.title": "Subsidy Structure",
    "about.process.title": "Application Process",
    "about.step.1": "Submit Application",
    "about.step.2": "Verification",
    "about.step.3": "Installation",
    "about.step.4": "Inspection",
    "about.step.5": "Receive Subsidy",
    "about.scheme.heading": "Scheme Benefits",
    "about.scheme.description": "Key benefits of the solar subsidy scheme.",
    "about.tool.heading": "Tool Benefits",
    "about.tool.description": "How this tool helps applicants.",
    "about.benefit.financial.title": "Financial Savings",
    "about.benefit.financial.desc": "Reduce electricity bills over time.",
    "about.benefit.clean.title": "Clean Energy",
    "about.benefit.clean.desc": "Reduce carbon footprint.",
    "about.benefit.independence.title": "Energy Independence",
    "about.benefit.independence.desc": "Less reliance on grid power.",
    "about.benefit.economic.title": "Economic Growth",
    "about.benefit.economic.desc": "Create local jobs and demand.",
    "about.benefit.transparency.title": "Transparency",
    "about.benefit.transparency.desc": "Clear process and status updates.",
    "about.benefit.efficiency.title": "Efficiency",
    "about.benefit.efficiency.desc": "Faster application processing.",
    "about.benefit.insights.title": "Insights",
    "about.benefit.insights.desc": "Data-driven decision making.",
    "about.benefit.trust.title": "Trust",
    "about.benefit.trust.desc": "Reliable partner ecosystem.",
  },
};

export const useTranslations = (language: string) => {
  const t = (key: string) => {
    const lang = language || "en";
    return (defaultTranslations[lang] && defaultTranslations[lang][key]) || key;
  };
  return { t };
};

interface AboutPageProps {
  language: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const { t } = useTranslations(language);
  return (
    <div className="max-w-5xl mx-auto text-slate-800 dark:text-slate-200 space-y-12 pb-12">
      <style>{`
        @keyframes uv-flow {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        .uv-ray-path {
          /* UV Gradient: Yellow (Sun) -> Violet (UV) */
          background: repeating-linear-gradient(90deg, transparent, transparent 6px, #fbbf24 6px, #a855f7 12px);
          background-size: 200% 100%;
          animation: uv-flow 1s linear infinite;
          height: 3px;
          width: 100%;
          position: absolute;
          border-radius: 2px;
          opacity: 0.8;
        }

        @keyframes electron-flow {
           0% { background-position: 0 0; }
           100% { background-position: 20px 0; }
        }
        .electron-wire {
           height: 4px;
           width: 100%;
           background-color: rgba(148, 163, 184, 0.3); /* Slate-400 with opacity */
           border-radius: 2px;
           position: relative;
           overflow: hidden;
        }
        .electron-particles {
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           /* Dots: Cyan electrons */
           background-image: radial-gradient(circle, #38bdf8 2px, transparent 2.5px);
           background-size: 20px 100%; /* Distance between electrons */
           animation: electron-flow 0.5s linear infinite;
        }
      `}</style>

      {/* Hero / Header Section */}
      <div className="p-6 md:p-8 text-center space-y-4">
        <h2 className="text-4xl font-bold neon-text text-slate-900 dark:text-white">
          {t("about.title")}
        </h2>
        <h3
          className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400"
          style={{ textShadow: "0 0 5px rgba(234, 179, 8, 0.2)" }}
        >
          {t("about.scheme.name")}
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto italic">
          "{t("about.scheme.tagline")}"
        </p>
      </div>

      {/* Scheme Flow Animation Container */}
      <div className="flex items-center justify-between w-full max-w-lg mx-auto relative px-4 sm:px-8 py-4">
        {/* Sun Node */}
        <div className="flex flex-col items-center z-10 relative group">
          <Sun
            size={48}
            className="text-yellow-400 sun-icon group-hover:scale-110 transition-transform"
            style={{ filter: "drop-shadow(0 0 8px #facc15)" }}
          />
          <span className="mt-2 text-xs font-bold uppercase text-yellow-600 dark:text-yellow-400 tracking-wider">
            Sun
          </span>
        </div>

        {/* UV Rays: Sun -> Panel */}
        <div className="flex-grow mx-3 relative h-8 flex flex-col justify-center">
          <div className="uv-ray-path" style={{ top: "30%" }}></div>
          <div
            className="uv-ray-path"
            style={{ top: "50%", animationDelay: "-0.5s" }}
          ></div>
          <div
            className="uv-ray-path"
            style={{ top: "70%", animationDelay: "-0.2s" }}
          ></div>
        </div>

        {/* Panel Node */}
        <div className="flex flex-col items-center z-10 relative group">
          <div className="transform perspective-500 rotate-x-12 bg-slate-800 p-2 rounded border border-sky-500/30 shadow-lg group-hover:border-sky-400 transition-colors">
            <LayoutGrid
              size={32}
              className="text-sky-400 panel-icon"
              strokeWidth={1.5}
            />
          </div>
          <span className="mt-2 text-xs font-bold uppercase text-sky-600 dark:text-sky-400 tracking-wider">
            Solar Panel
          </span>
        </div>

        {/* Electron Flow: Panel -> House */}
        <div className="flex-grow mx-3 relative flex items-center">
          <div className="electron-wire">
            <div className="electron-particles"></div>
          </div>
        </div>

        {/* House Node */}
        <div className="flex flex-col items-center z-10 relative group">
          <div className="relative">
            <Home
              size={48}
              className="text-slate-600 dark:text-slate-300 group-hover:text-slate-500 dark:group-hover:text-white transition-colors"
            />
            <Zap
              size={20}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-pulse"
              fill="currentColor"
            />
          </div>
          <span className="mt-2 text-xs font-bold uppercase text-slate-600 dark:text-slate-300 tracking-wider">
            Home
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Eligibility Section */}
        <div className="glass-pane p-6 rounded-2xl border-l-4 border-sky-500 dark:border-sky-400 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <CheckCircle2 className="text-sky-500" /> Eligibility Criteria
          </h3>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
              <div className="min-w-[6px] h-[6px] rounded-full bg-sky-400 mt-2"></div>
              <span>Must be an Indian citizen.</span>
            </li>

            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
              <div className="min-w-[6px] h-[6px] rounded-full bg-sky-400 mt-2"></div>
              <span>Should own a house with a suitable rooftop.</span>
            </li>

            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
              <div className="min-w-[6px] h-[6px] rounded-full bg-sky-400 mt-2"></div>
              <span>Must have a valid electricity connection.</span>
            </li>

            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
              <div className="min-w-[6px] h-[6px] rounded-full bg-sky-400 mt-2"></div>
              <span>No prior solar subsidy should have been availed.</span>
            </li>
          </ul>
        </div>

        {/* Subsidy Structure Section */}
        <div className="glass-pane p-6 rounded-2xl border-l-4 border-green-500 dark:border-green-400 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <IndianRupee className="text-green-500" />{" "}
            {t("about.subsidy.title")}
          </h3>
          <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="p-3 font-bold text-slate-700 dark:text-slate-300">
                    Capacity
                  </th>
                  <th className="p-3 font-bold text-slate-700 dark:text-slate-300">
                    Subsidy Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="bg-white/50 dark:bg-slate-900/50">
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    1 kW
                  </td>
                  <td className="p-3 font-bold text-green-600 dark:text-green-400">
                    ₹ 30,000
                  </td>
                </tr>
                <tr className="bg-white/50 dark:bg-slate-900/50">
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    2 kW
                  </td>
                  <td className="p-3 font-bold text-green-600 dark:text-green-400">
                    ₹ 60,000
                  </td>
                </tr>
                <tr className="bg-white/50 dark:bg-slate-900/50">
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    3 kW +
                  </td>
                  <td className="p-3 font-bold text-green-600 dark:text-green-400">
                    ₹ 78,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Process - Timeline */}
      <div className="glass-pane p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-white to-green-500 opacity-50"></div>
        <h3 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
          {t("about.process.title")}
        </h3>
        <div className="flex flex-wrap justify-center gap-8 relative z-10">
          <ProcessStep
            number="1"
            icon={<FileText size={20} />}
            label={t("about.step.1")}
          />
          <ArrowRight className="hidden md:block text-slate-400 mt-4" />
          <ProcessStep
            number="2"
            icon={<Settings size={20} />}
            label={t("about.step.2")}
          />
          <ArrowRight className="hidden md:block text-slate-400 mt-4" />
          <ProcessStep
            number="3"
            icon={<Zap size={20} />}
            label={t("about.step.3")}
          />
          <ArrowRight className="hidden md:block text-slate-400 mt-4" />
          <ProcessStep
            number="4"
            icon={<ShieldCheck size={20} />}
            label={t("about.step.4")}
          />
          <ArrowRight className="hidden md:block text-slate-400 mt-4" />
          <ProcessStep
            number="5"
            icon={<IndianRupee size={20} />}
            label={t("about.step.5")}
            isLast
          />
        </div>
      </div>

      {/* Benefits & Tool Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scheme Benefits */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400 flex items-center gap-3">
            <Zap size={28} /> {t("about.scheme.heading")}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("about.scheme.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <BenefitCard
              title={t("about.benefit.financial.title")}
              description={t("about.benefit.financial.desc")}
            />
            <BenefitCard
              title={t("about.benefit.clean.title")}
              description={t("about.benefit.clean.desc")}
            />
            <BenefitCard
              title={t("about.benefit.independence.title")}
              description={t("about.benefit.independence.desc")}
            />
            <BenefitCard
              title={t("about.benefit.economic.title")}
              description={t("about.benefit.economic.desc")}
            />
          </div>
        </div>

        {/* Tool Benefits */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-3">
            <Target size={28} /> {t("about.tool.heading")}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("about.tool.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <BenefitCard
              title={t("about.benefit.transparency.title")}
              description={t("about.benefit.transparency.desc")}
            />
            <BenefitCard
              title={t("about.benefit.efficiency.title")}
              description={t("about.benefit.efficiency.desc")}
            />
            <BenefitCard
              title={t("about.benefit.insights.title")}
              description={t("about.benefit.insights.desc")}
            />
            <BenefitCard
              title={t("about.benefit.trust.title")}
              description={t("about.benefit.trust.desc")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessStep: React.FC<{
  number: string;
  icon: React.ReactNode;
  label: string;
  isLast?: boolean;
}> = ({ number, icon, label, isLast }) => (
  <div className="flex flex-col items-center gap-3 group">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 ${
        isLast
          ? "bg-green-500 shadow-green-500/30"
          : "bg-sky-500 shadow-sky-500/30"
      }`}
    >
      {icon}
    </div>
    <div className="text-center">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        Step {number}
      </div>
      <div className="font-bold text-slate-700 dark:text-slate-200">
        {label}
      </div>
    </div>
  </div>
);

const BenefitCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="bg-white/40 p-4 rounded-lg border border-white/30 hover:bg-white/60 dark:bg-slate-800/40 dark:hover:bg-slate-700/60 dark:border-slate-700/50 transition-colors">
    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1">
      <ShieldCheck size={16} className="text-green-600 dark:text-green-400" />{" "}
      {title}
    </h4>
    <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
      {description}
    </p>
  </div>
);

export default AboutPage;
