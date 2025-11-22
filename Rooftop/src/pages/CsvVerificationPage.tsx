import React, { useState } from "react";
import { Upload, FileText, AlertCircle, Play } from "lucide-react";
import { useTranslations } from "../hooks/useTranslations";
import type { SiteData } from "../types";
import type { VerificationResult } from "../types";
import { verifySolarInstallation } from "../utils/verification";
import ResultsDashboard from "../pages/ResultsDashboard";
import Loader from "../components/Loader";


interface CsvVerificationPageProps {
  language: string;
}

const CsvVerificationPage: React.FC<CsvVerificationPageProps> = ({
  language,
}) => {
  const { t } = useTranslations(language);
  const [csvData, setCsvData] = useState<SiteData[]>([]);
  const [results, setResults] = useState<VerificationResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // -----------------------------
  // CSV file read handler
  // -----------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError(t("error.file_type"));
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

  // -----------------------------
  // CSV Parsing Function — FIXED
  // -----------------------------
  const parseCsv = (text: string) => {
    try {
      const lines = text.trim().split("\n");

      // Create a new array (FIX: parsedData undefined)
      const parsedData: SiteData[] = [];

      // Skip the header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split(",");
        if (parts.length >= 3) {
          parsedData.push({
            sample_id: parts[0].trim(),
            latitude: Number(parts[1].trim()), // ✔ convert to number
            longitude: Number(parts[2].trim()), // ✔ convert to number
          });
        }
      }

      if (parsedData.length === 0) {
        setError("No valid data found. Format: ID, Latitude, Longitude");
      } else {
        setCsvData(parsedData);
      }
    } catch (e) {
      setError(t("error.parse"));
    }
  };

  // -----------------------------
  // Batch Verification — FIXED
  // -----------------------------
  const handleVerify = async () => {
    if (csvData.length === 0) return;

    setIsLoading(true);
    setResults([]);
    setProgress(0);

    const newResults: VerificationResult[] = [];

    for (let i = 0; i < csvData.length; i++) {
      try {
        if (i > 0) await new Promise((r) => setTimeout(r, 1000));

        // FIX: verifySolarInstallation is imported correctly
        const result = await verifySolarInstallation(csvData[i]);

        newResults.push(result);
        setResults([...newResults]);
        setProgress(Math.round(((i + 1) / csvData.length) * 100));
      } catch (e) {
        console.error(`Error processing ${csvData[i].sample_id}`, e);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Upload Box */}
      <div className="glass-pane p-8 rounded-2xl text-center border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500 transition-colors">
        <input
          type="file"
          id="csv-upload"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="csv-upload"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="p-4 bg-sky-100 dark:bg-sky-900/30 rounded-full">
            <Upload size={32} className="text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
              {fileName || t("upload.title")}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("upload.drag")} (CSV)
            </p>
          </div>
        </label>
      </div>

      {/* Error Box */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* Preview Table */}
      {csvData.length > 0 && !results && (
        <div className="glass-pane p-6 rounded-2xl animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <FileText size={20} /> {t("preview.title")} ({csvData.length}{" "}
              sites)
            </h3>
            <button
              onClick={handleVerify}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <Play size={18} fill="currentColor" /> {t("button.verify_batch")}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-3 rounded-tl-lg">ID</th>
                  <th className="p-3">Latitude</th>
                  <th className="p-3 rounded-tr-lg">Longitude</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {csvData.slice(0, 5).map((row, i) => (
                  <tr key={i} className="text-slate-700 dark:text-slate-300">
                    <td className="p-3 font-mono">{row.sample_id}</td>
                    <td className="p-3">{row.latitude}</td>
                    <td className="p-3">{row.longitude}</td>
                  </tr>
                ))}
                {csvData.length > 5 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-3 text-center text-slate-500 italic"
                    >
                      ... and {csvData.length - 5} more rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="text-center py-8">
          <Loader language={language} />
          <div className="w-full max-w-md mx-auto h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 mt-2">{progress}% Complete</p>
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="animate-fade-in">
          <ResultsDashboard results={results} language={language} />
        </div>
      )}
    </div>
  );
};

export default CsvVerificationPage;
