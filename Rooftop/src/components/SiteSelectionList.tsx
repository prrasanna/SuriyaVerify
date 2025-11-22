import React from 'react';
import type { VerificationResult } from '../types';
import { CheckSquare, Square, ListChecks } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

interface SiteSelectionListProps {
  sites: VerificationResult[];
  selectedSiteIds: Set<string>;
  onSelectionChange: (siteId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  language: string;
}

const SiteSelectionList: React.FC<SiteSelectionListProps> = ({
  sites,
  selectedSiteIds,
  onSelectionChange,
  onSelectAll,
  onDeselectAll,
  language
}) => {
  const { t } = useTranslations(language);

  return (
    <div className="glass-pane p-6 rounded-2xl h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h3 className="text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <ListChecks
            size={24}
            className="text-sky-600 dark:text-sky-400"
            style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }}
          />
          {t('selection.title')}
        </h3>

        <div className="flex items-center gap-2">
          <span className="tooltip-container">
            <button
              onClick={onSelectAll}
              className="text-xs font-semibold bg-white/50 text-sky-700 px-3 py-1.5 rounded-md hover:bg-white/80 dark:bg-slate-700/50 dark:text-sky-300 dark:hover:bg-slate-600/50 transition-colors border border-sky-200 dark:border-sky-800"
              data-tooltip={t('tooltip.select.all')}
            >
              {t('selection.all')}
            </button>
          </span>

          <span className="tooltip-container">
            <button
              onClick={onDeselectAll}
              className="text-xs font-semibold bg-white/50 text-slate-600 px-3 py-1.5 rounded-md hover:bg-white/80 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-600/50 transition-colors border border-slate-200 dark:border-slate-700"
              data-tooltip={t('tooltip.select.none')}
            >
              {t('selection.none')}
            </button>
          </span>
        </div>
      </div>

      <div
        className="overflow-y-auto pr-2 custom-scrollbar"
        style={{ maxHeight: '600px', scrollbarWidth: 'thin', scrollbarColor: '#38bdf8 transparent' }}
      >
        <ul className="space-y-2">
          {sites.map((site) => (
            <li
              key={site.sample_id}
              onClick={() => onSelectionChange(site.sample_id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedSiteIds.has(site.sample_id)
                  ? 'bg-sky-50/50 border-sky-200 dark:bg-sky-900/20 dark:border-sky-800'
                  : 'bg-white/20 border-transparent hover:bg-white/40 dark:bg-slate-800/30 dark:hover:bg-slate-700/50'
              }`}
              role="checkbox"
              aria-checked={selectedSiteIds.has(site.sample_id)}
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === ' ' || e.key === 'Enter') && onSelectionChange(site.sample_id)
              }
            >
              <div className="flex-shrink-0">
                {selectedSiteIds.has(site.sample_id) ? (
                  <CheckSquare className="text-sky-500 dark:text-sky-400" size={20} />
                ) : (
                  <Square className="text-slate-400 dark:text-slate-500" size={20} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-bold ${
                    selectedSiteIds.has(site.sample_id)
                      ? 'text-sky-800 dark:text-sky-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ID: {site.sample_id}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Lat: {site.lat?.toFixed(4)}, Lon: {site.lon?.toFixed(4)}
                </p>
              </div>

              <div
                className={`w-2 h-2 rounded-full ${
                  site.has_solar ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                title={site.has_solar ? 'Solar Detected' : 'No Solar'}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SiteSelectionList;
