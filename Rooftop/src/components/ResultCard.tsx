import React from 'react';
import type { VerificationResult, QCStatus } from '../types'; // type-only import

import {
  Check, X, EyeOff, MapPin, Hash, BarChart, Zap,
  CheckSquare, ChevronDown, Lightbulb, Power,
  Ruler, Maximize
} from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

// QC STATUS STYLES — now using string keys, not enum values
const QC_STATUS_CONFIG: Record<QCStatus, any> = {
  VERIFIABLE: {
    bgColor: 'bg-green-500/30 dark:bg-green-500/20',
    textColor: 'text-green-700 dark:text-green-400',
    borderColor: 'border-green-400/50 dark:border-green-500/30',
    icon: <Check size={16} className="animate-pulse-green" />,
  },
  NOT_VERIFIABLE: {
    bgColor: 'bg-yellow-500/30 dark:bg-yellow-500/20',
    textColor: 'text-yellow-700 dark:text-yellow-400',
    borderColor: 'border-yellow-400/50 dark:border-yellow-500/30',
    icon: <EyeOff size={16} className="animate-pulse-yellow" />,
  },
};

interface ResultCardProps {
  result: VerificationResult;
  imageUrl?: string;
  language: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, imageUrl, language }) => {
  const { t } = useTranslations(language);

 const qcConfig =
  QC_STATUS_CONFIG[result.qc_status] ?? {
    bgColor: 'bg-slate-400/30',
    textColor: 'text-slate-700 dark:text-slate-300',
    borderColor: 'border-slate-400/50',
    icon: <X size={16} />,
  };


  const hasSolar = result.has_solar;
  const hasPotential =
    !hasSolar &&
    result.potential_panel_count_est !== undefined &&
    result.potential_panel_count_est > 0;

  return (
    <div className="glass-pane rounded-xl shadow-lg overflow-hidden group hover:shadow-sky-500/50 hover:border-sky-400/50 dark:hover:shadow-fuchsia-500/40 dark:hover:border-fuchsia-500/50 flex flex-col transition-all duration-300 hover:-translate-y-1">

      {/* IMAGE */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
          src={imageUrl || `https://5.imimg.com/data5/SELLER/Default/2023/12/365947499/RW/UW/VB/89519488/15kw-on-grid-solar-power-system-1000x1000.jpeg`}
          alt="Rooftop satellite view"
        />

        <div
          className={`absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${qcConfig.bgColor} ${qcConfig.textColor} border ${qcConfig.borderColor}`}
        >
          {qcConfig.icon}
          {result.qc_status.replace('_', ' ')}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-4 flex-grow flex flex-col">

        {/* ID + SOLAR STATUS */}
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Hash size={14} /> ID: {result.sample_id}
          </p>

          <div
            className={`flex items-center gap-2 font-bold ${
              hasSolar ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {hasSolar ? (
              <Check size={20} className="animate-icon-pop animate-pulse-green" />
            ) : (
              <X size={20} className="animate-icon-pop animate-pulse-red" />
            )}
            <span>
              {hasSolar
                ? t('result.card.solar.present')
                : t('result.card.solar.absent')}
            </span>
          </div>
        </div>

        {/* COORDINATES */}
        {result.lat !== undefined && result.lon !== undefined && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1">
            <MapPin size={14} /> {result.lat.toFixed(4)}, {result.lon.toFixed(4)}
          </p>
        )}

        {/* MAIN INFO */}
        <div className="grid grid-cols-3 gap-3 text-center mb-4">

          <InfoItem
            label={t('result.card.confidence')}
            value={`${((result.confidence ?? 0) * 100).toFixed(0)}%`}
            icon={<BarChart size={18} className="text-sky-500 dark:text-sky-400" />}
          />

          <InfoItem
            label={t('result.card.panels')}
            value={result.panel_count_est ?? 'N/A'}
            icon={<CheckSquare size={18} className="text-indigo-500 dark:text-indigo-400" />}
          />

          <InfoItem
            label={t('result.card.capacity')}
            value={
              result.capacity_kw_est !== undefined
                ? `${result.capacity_kw_est.toFixed(1)} kW`
                : 'N/A'
            }
            icon={<Zap size={18} className="text-orange-500 dark:text-orange-400" />}
          />
        </div>

        {/* POTENTIAL */}
        {hasPotential && (
          <div className="mt-2 mb-4 pt-4 border-t border-dashed border-slate-400/30 dark:border-slate-600/30">
            <details className="group open:bg-yellow-50/50 dark:open:bg-yellow-900/10 rounded-lg transition-colors">
              <summary className="p-2 text-center text-sm font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2 cursor-pointer list-none hover:opacity-80 select-none">
                <Lightbulb size={16} />
                {t('result.card.potential.title')}
                <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
              </summary>

              <div className="px-2 pb-3">
                <div className="grid grid-cols-2 gap-3 text-center mb-3">

                  <InfoItem
                    label={t('result.card.potential.panels')}
                    value={result.potential_panel_count_est}
                    icon={<Ruler size={18} className="text-yellow-500" />}
                  />

                  <InfoItem
                    label={t('result.card.potential.capacity')}
                    value={
                      result.potential_capacity_kw_est
                        ? `${result.potential_capacity_kw_est.toFixed(1)} kW`
                        : 'N/A'
                    }
                    icon={<Power size={18} className="text-yellow-500" />}
                  />

                </div>

                <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-yellow-200/50 dark:border-yellow-700/30 shadow-sm space-y-2">

                  {result.potential_pv_area_sqm_est !== undefined && (
                    <div className="flex justify-between items-center border-b pb-1.5">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Maximize size={12} /> Potential Area
                      </span>
                      <span className="font-mono font-bold">
                        {result.potential_pv_area_sqm_est.toFixed(1)} m²
                      </span>
                    </div>
                  )}

                  {result.potential_placement_recommendation && (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-yellow-700 dark:text-yellow-500">
                        Optimal Placement
                      </span>
                      <p className="leading-relaxed pl-1 border-l-2 border-yellow-300">
                        {result.potential_placement_recommendation}
                      </p>
                    </div>
                  )}

                  {result.potential_panel_type_recommendation && (
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="font-semibold text-yellow-700 dark:text-yellow-500">
                        Recommended Tech
                      </span>
                      <p className="pl-1">{result.potential_panel_type_recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            </details>
          </div>
        )}

        {/* AUDIT */}
        <div className="mt-auto pt-4 border-t border-slate-400/30 dark:border-slate-700/50">
          <details className="group">
            <summary className="text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer list-none flex justify-between items-center hover:text-sky-600">
              {t('result.card.audit.details')}
              <ChevronDown size={20} className="transition-transform group-open:rotate-180" />
            </summary>

            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 space-y-2">

              {result.panel_type_est && (
                <p><strong>Panel Type Est:</strong> {result.panel_type_est}</p>
              )}

              <p>
                <strong>PV Area Est:</strong>{' '}
                {result.pv_area_sqm_est?.toFixed(1)} m²
              </p>

              <p><strong>QC Notes:</strong></p>
              <ul className="list-disc list-inside pl-2">
                {result.qc_notes?.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>

              {result.image_metadata && (
                <p className="pt-1">
                  <strong>Image:</strong> {result.image_metadata.source} (
                  {result.image_metadata.capture_date})
                </p>
              )}
            </div>
          </details>
        </div>

      </div>
    </div>
  );
};

const InfoItem: React.FC<{
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div>
    <div className="flex justify-center items-center gap-1.5 text-slate-600 dark:text-slate-300 mb-1">
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </div>
    <p className="text-lg font-bold text-slate-800 dark:text-slate-50">
      {value ?? 'N/A'}
    </p>
  </div>
);

export default ResultCard;
