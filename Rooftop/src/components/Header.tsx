import React, { useState } from "react";
import {
  Sun,
  Moon,
  Globe,
  LayoutDashboard,
  Info,
  FileSignature,
} from "lucide-react";

// ✅ Correct import path
import { useTranslations } from "../hooks/useTranslations";

interface HeaderProps {
  currentPage: "verification" | "about" | "registration" | "map";
  setPage: (
    page: "verification" | "about" | "registration" | "map"
  ) => void;
  currentTheme: "light" | "dark";
  toggleTheme: () => void;
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

// ✅ Add languages HERE (fixes Object.entries error)
const languages: Record<string, string> = {
  en: "English",
  tn: "Tamil",
  hi: "Hindi",
  te: "Telugu",
};

const Header: React.FC<HeaderProps> = ({
  currentPage,
  setPage,
  currentTheme,
  toggleTheme,
  currentLanguage,
  setLanguage,
}) => {
  const { t } = useTranslations(currentLanguage);
  const [isEmblemHovered, setIsEmblemHovered] = useState(false);

  const navButtonClasses =
    "tooltip-container group flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all duration-300 border-b-2 outline-none relative";
  const activeClasses =
    "border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400";
  const inactiveClasses =
    "border-transparent text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300 hover:border-slate-300 dark:hover:border-slate-600";

  const navButtons = (
    <>
      <button
        onClick={() => setPage("verification")}
        className={`${navButtonClasses} ${
          currentPage === "verification" ? activeClasses : inactiveClasses
        }`}
        aria-current={currentPage === "verification" ? "page" : undefined}
      >
        <LayoutDashboard size={18} />
        <span className="hidden sm:inline">
          {t("nav.verification")}
        </span>
      </button>

      <button
        onClick={() => setPage("registration")}
        className={`${navButtonClasses} ${
          currentPage === "registration" ? activeClasses : inactiveClasses
        }`}
      >
        <FileSignature size={18} />
        <span className="hidden sm:inline">
          {t("nav.registration")}
        </span>
      </button>

      <button
        onClick={() => setPage("about")}
        className={`${navButtonClasses} ${
          currentPage === "about" ? activeClasses : inactiveClasses
        }`}
      >
        <Info size={18} />
        <span className="hidden sm:inline">{t("nav.about")}</span>
      </button>
    </>
  );

  return (
    <>
      {/* Full-Screen Tricolor Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 z-40 ${
          isEmblemHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(180deg, 
            rgba(255,153,51,0.2) 0%, 
            rgba(255,255,255,0.1) 50%, 
            rgba(19,136,8,0.2) 100%)`,
        }}
      />

      <header className="bg-transparent text-slate-800 dark:text-slate-200 relative z-50">
        <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-between w-full items-start">
              {/* LEFT SIDE BUTTONS */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white/30 dark:bg-slate-800/30 
                            hover:bg-white/50 dark:hover:bg-slate-700/50 border border-white/40 dark:border-slate-700 
                            transition-all"
                >
                  {currentTheme === "light" ? (
                    <Moon size={24} className="text-slate-700" />
                  ) : (
                    <Sun size={24} className="text-yellow-400" />
                  )}
                </button>

                {/* LANGUAGE DROPDOWN */}
                <div className="relative group">
                  <button
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white/30 dark:bg-slate-800/30 
                              hover:bg-white/50 dark:hover:bg-slate-700/50 border border-white/40 dark:border-slate-700"
                  >
                    <Globe size={24} />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full mt-2 w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md 
                                  rounded-lg shadow-xl border border-white/40 dark:border-slate-700 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300 pointer-events-none 
                                  group-hover:pointer-events-auto z-10">
                    <ul className="py-1">
                      {Object.entries(languages).map(([code, name]) => (
                        <li key={code}>
                          <button
                            onClick={() => setLanguage(code)}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              currentLanguage === code
                                ? "font-bold text-sky-600 dark:text-sky-400"
                                : "text-slate-700 dark:text-slate-300"
                            } hover:bg-sky-100/50 dark:hover:bg-sky-900/50`}
                          >
                            {name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CENTER LOGO */}
              <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {t("header.title")}
                </h1>
                <p className="text-yellow-600 dark:text-yellow-400 uppercase text-xs">
                  {t("header.subtitle")}
                </p>
              </div>

              {/* RIGHT EMBLEM */}
              <div
                className="cursor-pointer"
                onMouseEnter={() => setIsEmblemHovered(true)}
                onMouseLeave={() => setIsEmblemHovered(false)}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/180px-Emblem_of_India.svg.png"
                  className="h-16 sm:h-20"
                />
              </div>
            </div>
          </div>

          {/* NAV BUTTONS */}
          <nav className="flex items-center justify-center gap-8 w-full max-w-lg mt-4 border-b border-slate-300 dark:border-slate-700">
            {navButtons}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
