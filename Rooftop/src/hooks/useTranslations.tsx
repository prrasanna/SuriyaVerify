import { translations, defaultLang } from '../lib/translations';

type LanguageCode = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu';

export const useTranslations = (lang: string) => {
  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const langKey = lang as LanguageCode;
    // Find the translation for the given language, or fallback to the default language (English)
    let text = translations[key]?.[langKey] || translations[key]?.[defaultLang] || key;

    // Replace placeholders like {count}
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(`{${placeholder}}`, String(replacements[placeholder]));
        });
    }

    return text;
  };

  return { t };
};