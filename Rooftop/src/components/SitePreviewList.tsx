import React from 'react';
import type { SiteData } from '../types';
import { MapPin, CheckSquare, Square, LayoutList, Calendar, CheckCircle2 } from 'lucide-react';

interface SitePreviewListProps {
  sites: SiteData[];
  selectedIndices: Set<number>;
  onToggle: (index: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const SitePreviewList: React.FC<SitePreviewListProps> = ({
  sites,
  selectedIndices,
  onToggle,
  onSelectAll,
  onDeselectAll,
}) => {
  return (
    <div className="glass-pane rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl animate-fade-in">
      {/* Header */}
      <div className="bg-white/50 dark:bg-slate-800/50 p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <LayoutList size={24} className="text-sky-500" />
                Select Sites for Verification
            </h3>
            <div className="flex items-center gap-2 mt-2">
                <span className="bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-bold px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                    {sites.length} Total Found
                </span>
                <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800 flex items-center gap-1">
                    <CheckCircle2 size={10} /> {selectedIndices.size} Selected
                </span>
            </div>
        </div>
        
        <div className="flex gap-3">
             <button 
                onClick={onSelectAll}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-md hover:shadow-sky-500/30 active:scale-95"
             >
                Select All
             </button>
             <button 
                onClick={onDeselectAll}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all active:scale-95"
             >
                Deselect All
             </button>
        </div>
      </div>

      {/* List Area */}
      <div className="max-h-[450px] overflow-y-auto custom-scrollbar p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
        {sites.length === 0 ? (
            <div className="text-center py-10 text-slate-500">No sites found in data.</div>
        ) : (
            sites.map((site, index) => {
                const isSelected = selectedIndices.has(index);
                return (
                    <div 
                        key={index}
                        onClick={() => onToggle(index)}
                        className={`
                            group flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-200 relative overflow-hidden select-none
                            ${isSelected 
                                ? 'bg-white dark:bg-slate-800 border-sky-400 dark:border-sky-500 shadow-md transform scale-[1.01]' 
                                : 'bg-slate-100 dark:bg-slate-800/40 border-transparent hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 opacity-70 hover:opacity-100'}
                        `}
                    >
                        {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sky-500"></div>}
                        
                        <div className="flex items-center gap-4 pl-2">
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                                ${isSelected ? 'bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}
                            `}>
                                {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                            </div>
                            
                            <div>
                                <p className={`font-bold text-sm transition-colors ${isSelected ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                                    {site.sample_id ? site.sample_id : `Site ID #${index + 1}`}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                                        <MapPin size={10} className={isSelected ? "text-red-500" : "text-slate-400"} />
                                        {Number(site.latitude || 0).toFixed(4)}, {Number(site.longitude || 0).toFixed(4)}

                                    </p>
                                    {site.capture_date && (
                                        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                            <Calendar size={10} /> {site.capture_date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className={`
                            px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all
                            ${isSelected ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}
                        `}>
                            {isSelected ? 'Ready' : 'Skip'}
                        </div>
                    </div>
                );
            })
        )}
      </div>
      
      {/* Footer hint */}
      <div className="bg-sky-50 dark:bg-slate-800/80 p-3 text-center border-t border-sky-100 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
             Tip: Verify only necessary sites to save API usage.
          </p>
      </div>
    </div>
  );
};

export default SitePreviewList;