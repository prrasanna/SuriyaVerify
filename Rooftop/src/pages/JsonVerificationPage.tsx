import React, { useState } from 'react';
import { FileJson, AlertCircle, Play } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

import type { SiteData } from "../types";
import type { VerificationResult } from "../types";

import ResultsDashboard from './ResultsDashboard';
import Loader from '../components/Loader';

// ⭐ Correct import for your verification function
import { verifySolarInstallation } from "../utils/verification";

interface JsonVerificationPageProps {
  language: string;
}

const JsonVerificationPage: React.FC<JsonVerificationPageProps> = ({ language }) => {
  const { t } = useTranslations(language);

  const [jsonInput, setJsonInput] = useState<string>('');
  const [results, setResults] = useState<VerificationResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setError(null);
  };

  const validateAndParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!Array.isArray(parsed)) {
        throw new Error("Root must be an array of objects");
      }

      // Basic validation
      const validData = parsed.filter(
        (item) => item.sample_id && item.latitude && item.longitude
      );

      if (validData.length === 0) {
        throw new Error(
          "No valid entries found. Required keys: sample_id, latitude, longitude"
        );
      }

      return validData as SiteData[];

    } catch (e) {
      setError((e as Error).message);
      return null;
    }
  };

  const handleVerify = async () => {
    const data = validateAndParse();
    if (!data) return;

    setIsLoading(true);
    setResults([]);
    setProgress(0);

    const newResults: VerificationResult[] = [];

    for (let i = 0; i < data.length; i++) {
      try {
        if (i > 0) await new Promise((r) => setTimeout(r, 1000));

        const result = await verifySolarInstallation(data[i]);

        newResults.push(result);
        setResults([...newResults]);
        setProgress(Math.round(((i + 1) / data.length) * 100));

      } catch (err) {
        console.error(`Error processing ${data[i].sample_id}`, err);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="glass-pane p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <FileJson size={20} className="text-yellow-500" /> JSON Input
          </h3>

          <button
            onClick={handleVerify}
            disabled={isLoading || !jsonInput}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Play size={18} fill="currentColor" /> {t("button.verify_batch")}
          </button>
        </div>

        <textarea
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder={`[\n  {\n    "sample_id": "S-001",\n    "latitude": "28.6139",\n    "longitude": "77.2090"\n  }\n]`}
          className="w-full h-64 p-4 font-mono text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-sky-400 outline-none"
        />

        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle size={16} /> {error}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <Loader language={language} />
          <div className="w-full max-w-md mx-auto h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="animate-fade-in">
          <ResultsDashboard results={results} language={language} />
        </div>
      )}
    </div>
  );
};

export default JsonVerificationPage;
