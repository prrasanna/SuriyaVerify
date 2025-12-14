import { useCallback } from 'react';
import { translations, defaultLang } from '../lib/translations';

export const useTranslations = (language: string) => {
  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>) => {
      const lang = language || defaultLang;

      let text =
        translations[key]?.[lang] ??
        translations[key]?.[defaultLang] ??
        key;

      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }

      return text;
    },
    [language]
  );

  return { t };
};
