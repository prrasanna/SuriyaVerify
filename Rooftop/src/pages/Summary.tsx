import React, { useMemo } from "react";
import type { VerificationResult } from "../types";
import { CheckCircle2, XCircle, AlertTriangle, ListChecks } from "lucide-react";
import { useTranslations } from "../hooks/useTranslations";

interface SummaryProps {
  results: VerificationResult[];
  language: string;
}

const Summary: React.FC<SummaryProps> = ({ results, language }) => {
  const { t } = useTranslations(language);
  const summary = useMemo(() => {
    return results.reduce(
      (acc, result) => {
        acc.total++;
        if (result.qc_status === "NOT_VERIFIABLE") {
          acc.unverifiable++;
        } else if (result.has_solar) {
          acc.verified++;
        } else {
          acc.notPresent++;
        }
        return acc;
      },
      { total: 0, verified: 0, notPresent: 0, unverifiable: 0 }
    );
  }, [results]);

  const SummaryCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    count: number;
    colorClass: string;
    tooltip: string;
  }> = ({ icon, title, count, colorClass, tooltip }) => (
    <div
      className="glass-pane p-4 rounded-lg shadow-lg flex items-center gap-4 transition-all hover:border-sky-400/50 dark:hover:border-sky-500/50"
      data-tooltip={tooltip}
    >
      <div
        className={`p-3 rounded-full ${colorClass}`}
        style={{ boxShadow: "0 0 10px currentColor" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-50">
          {count}
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <SummaryCard
        icon={<ListChecks size={24} className="animate-pulse-sky" />}
        title={t("summary.total")}
        count={summary.total}
        colorClass="bg-sky-500/30 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
        tooltip={t("tooltip.summary.total")}
      />
      <SummaryCard
        icon={<CheckCircle2 size={24} className="animate-pulse-green" />}
        title={t("summary.verified")}
        count={summary.verified}
        colorClass="bg-green-500/30 text-green-600 dark:bg-green-500/20 dark:text-green-400"
        tooltip={t("tooltip.summary.verified")}
      />
      <SummaryCard
        icon={<XCircle size={24} className="animate-pulse-red" />}
        title={t("summary.not_present")}
        count={summary.notPresent}
        colorClass="bg-red-500/30 text-red-600 dark:bg-red-500/20 dark:text-red-400"
        tooltip={t("tooltip.summary.not_present")}
      />
      <SummaryCard
        icon={<AlertTriangle size={24} className="animate-pulse-yellow" />}
        title={t("summary.unverifiable")}
        count={summary.unverifiable}
        colorClass="bg-yellow-500/30 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
        tooltip={t("tooltip.summary.unverifiable")}
      />
    </div>
  );
};

export default Summary;
