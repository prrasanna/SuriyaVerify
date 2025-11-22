import React from 'react';
import type { VerificationResult } from "../types"
import ResultCard from "../components/ResultCard";
import Summary from './Summary';

// ❗ useTranslations is inside hooks folder
import { useTranslations } from '../hooks/useTranslations';

interface ResultsDashboardProps {
  results: VerificationResult[];
  language: string;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, language }) => {
  const { t } = useTranslations(language);

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          {t('results.title')}
        </h2>

        <Summary results={results} language={language} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <ResultCard key={result.sample_id} result={result} language={language} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDashboard;
