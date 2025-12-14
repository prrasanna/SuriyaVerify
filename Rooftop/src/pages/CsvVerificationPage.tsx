import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, RefreshCw, Rocket } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';
import type { SiteData, VerificationResult } from '../types';
import { verifySolarInstallation } from '../services/geminiServices';
import ResultsDashboard from '../pages/ResultsDashboard';
import SitePreviewList from '../components/SitePreviewList';

interface CsvVerificationPageProps {
  language: string;
}

type Step = 'UPLOAD' | 'PREVIEW' | 'PROCESSING' | 'RESULTS';

const CsvVerificationPage: React.FC<CsvVerificationPageProps> = ({ language }) => {
  const { t } = useTranslations(language);

  const [step, setStep] = useState<Step>('UPLOAD');
  const [csvData, setCsvData] = useState<SiteData[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError(t('error.file_type'));
      return;
    }

    setFileName(file.name);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCsv(text);
    };
    reader.readAsText(file);
  };

  const parseCsv = (text: string) => {
    try {
      const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
      const parsedData: SiteData[] = [];
      const startIdx = lines[0].toLowerCase().includes('id') ? 1 : 0;

      for (let i = startIdx; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim());
        if (parts.length >= 3) {
          parsedData.push({
            sample_id: parts[0],
            latitude: Number(parts[1]),
            longitude: Number(parts[2]),
            capture_date: parts[3] ? parts[3] : undefined,
          });
        }
      }

      if (parsedData.length === 0) {
        setError('No valid data found. Format: ID, Latitude, Longitude');
        return;
      }

      setCsvData(parsedData);
      setSelectedIndices(new Set(parsedData.map((_, i) => i)));
      setStep('PREVIEW');
    } catch {
      setError(t('error.parse'));
    }
  };

  const handleVerify = async () => {
    const indicesToVerify = Array.from(selectedIndices);
    if (indicesToVerify.length === 0) return;

    setStep('PROCESSING');
    setResults([]);
    setProgress(0);

    const newResults: VerificationResult[] = [];
    const sitesToVerify = indicesToVerify.map((i) => csvData[i]);

    for (let i = 0; i < sitesToVerify.length; i++) {
      try {
        if (i > 0) await new Promise((r) => setTimeout(r, 800)); // visual delay
        const result = await verifySolarInstallation(sitesToVerify[i]);
        newResults.push(result);
        setResults([...newResults]);
        setProgress(Math.round(((i + 1) / sitesToVerify.length) * 100));
      } catch (e) {
        console.error(`Error processing ${sitesToVerify[i].sample_id}`, e);
      }
    }

    setTimeout(() => setStep('RESULTS'), 1000);
  };

  const handleReset = () => {
    setStep('UPLOAD');
    setCsvData([]);
    setSelectedIndices(new Set());
    setResults([]);
    setFileName(null);
    setError(null);
    setProgress(0);
  };

  const toggleSelection = (index: number) => {
    const newSet = new Set(selectedIndices);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    setSelectedIndices(newSet);
  };

  const selectAll = () => setSelectedIndices(new Set(csvData.map((_, i) => i)));
  const deselectAll = () => setSelectedIndices(new Set());

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn min-h-[600px]">
      {/* File info bar */}
      {step !== 'UPLOAD' && (
        <div className="text-center mb-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            <FileText className="text-sky-500" size={16} />
            <span className="font-bold text-slate-700 dark:text-slate-200">{fileName}</span>
            <button
              onClick={handleReset}
              className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-red-100 hover:text-red-500 transition-colors"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Upload step */}
      {step === 'UPLOAD' && (
        <div className="glass-pane p-12 rounded-3xl text-center border-2 border-dashed border-sky-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500 transition-all duration-300 group">
          <input
            type="file"
            id="csv-upload"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer flex flex-col items-center gap-6 w-full h-full justify-center py-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full group-hover:bg-sky-400/40 transition-colors"></div>
              <div className="relative p-6 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-xl shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
                <Upload size={48} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-200 mb-2">Upload File</h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg">Drag & Drop or Click to Upload</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded inline-block">
                Format: ID, Latitude, Longitude
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 shadow-sm animate-shake">
          <AlertCircle size={24} /> <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Preview step */}
      {step === 'PREVIEW' && (
        <div className="space-y-6 animate-scale-in">
          <SitePreviewList
            sites={csvData}
            selectedIndices={selectedIndices}
            onToggle={toggleSelection}
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
          />
          <div className="flex flex-col sm:flex-row justify-center pt-6 gap-4">
            <button
              onClick={handleVerify}
              disabled={selectedIndices.size === 0}
              className="group relative bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-lg font-bold px-12 py-4 rounded-2xl shadow-xl shadow-fuchsia-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              <div className="flex items-center gap-3">
                <Rocket size={24} className="group-hover:animate-bounce" />
                <span>Start Verification ({selectedIndices.size})</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Processing step */}
      {step === 'PROCESSING' && (
        <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
          <div className="relative w-40 h-40 mx-auto mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-200 dark:text-slate-800"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * progress) / 100}
                className="text-sky-500 transition-all duration-300 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">{progress}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 neon-text">
            AI Verification in Progress...
          </h3>
        </div>
      )}

      {/* Results step */}
      {step === 'RESULTS' && (
        <div className="animate-fade-in space-y-8">
          <ResultsDashboard results={results} language={language} />
          <div className="flex justify-center gap-4 py-8 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleReset}
              className="bg-slate-800 dark:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 shadow-lg"
            >
              <RefreshCw size={20} /> Verify Another Batch
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvVerificationPage;
