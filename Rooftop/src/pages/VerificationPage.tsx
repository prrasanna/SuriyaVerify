import React, { useState } from "react";
import CsvVerificationPage from "./CsvVerificationPage";
import JsonVerificationPage from "./JsonVerificationPage";
import ImageVerificationPage from "./ImageVerificationPage"; // ✅ default import
import MapVerificationPage from "./MapVerificationPage";
import { FileText, FileJson, Image as ImageIcon, Map, ShieldCheck } from "lucide-react";

// Translations hook
type Translations = { [key: string]: string };
const defaultTranslations: Record<string, Translations> = {
  en: {
    "tab.csv": "CSV",
    "tab.json": "JSON",
    "tab.image": "Image",
    "tab.map": "Map",
    "verification.intro.title": "Verify your data",
    "verification.intro.desc": "Upload and verify files across formats.",
  },
};

function useTranslations(language: string) {
  const translations = defaultTranslations[language] || defaultTranslations["en"];
  const t = (key: string) => translations[key] || key;
  return { t };
}

interface VerificationPageProps {
  language: string;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ language }) => {
  const { t } = useTranslations(language);
  const [activeTab, setActiveTab] = useState<"csv" | "json" | "image" | "map">("csv");

  const tabs = [
    { id: "csv", label: t("tab.csv"), icon: FileText },
    { id: "json", label: t("tab.json"), icon: FileJson },
    { id: "image", label: t("tab.image"), icon: ImageIcon },
    { id: "map", label: t("tab.map"), icon: Map },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Intro Section */}
      <div className="text-center space-y-3 py-4">
        <div className="inline-flex items-center justify-center p-3 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-2 shadow-sm">
          <ShieldCheck size={32} className="text-sky-600 dark:text-sky-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 neon-text">
          {t("verification.intro.title")}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t("verification.intro.desc")}
        </p>
        
      </div>

      {/* Tabs */}
      <div className="flex justify-center w-full mb-8">
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "csv" | "json" | "image" | "map")
                }
                className={`
                  group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 outline-none border
                  ${
                    isActive
                      ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/30 dark:bg-sky-600 dark:border-sky-500"
                      : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-sky-300 dark:hover:border-sky-700"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="tracking-wide">{tab.label}</span>
              </button>
            );
          })}

        </div>
      </div>

      {/* Tab Content */}
      <div className="relative mt-6 min-h-[500px]">
        <div className={activeTab === "csv" ? "block animate-fade-in" : "hidden"}>
          <CsvVerificationPage language={language} />
        </div>
        <div className={activeTab === "json" ? "block animate-fade-in" : "hidden"}>
          <JsonVerificationPage language={language} />
        </div>
        <div className={activeTab === "image" ? "block animate-fade-in" : "hidden"}>
          <ImageVerificationPage language={language} />
        </div>
        <div className={activeTab === "map" ? "block animate-fade-in" : "hidden"}>
          <MapVerificationPage language={language} />
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
