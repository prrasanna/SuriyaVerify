
import React, { useState, useCallback } from 'react';
import type { VerificationResult } from "../types"
import { verifySolarInstallationFromImage } from '../services/geminiServices';
import FileUpload from '../components/FileUpload';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';
import { Rocket, Image as ImageIcon, Link } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

interface ImageVerificationPageProps {
  language: string;
}

const ImageVerificationPage: React.FC<ImageVerificationPageProps> = ({ language }) => {
  const { t } = useTranslations(language);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');

  const handleFileSelect = (file: File) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Invalid file type. Please upload an image (JPEG, PNG, WEBP).');
        return;
      }
      setFileName(file.name);
      setImageFile(file);
      setMimeType(file.type);
      setResult(null);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setImageBase64(dataUrl);
      };
      reader.onerror = () => {
        setError(`Failed to read the file: ${reader.error?.message}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlLoad = async () => {
    if (!urlInput) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setImageFile(null);
    setImageBase64('');
    
    try {
        // Basic URL validation
        new URL(urlInput); 

        let blob: Blob;

        try {
            // Attempt 1: Direct Fetch
            const response = await fetch(urlInput);
            if (!response.ok) throw new Error('Direct fetch failed');
            blob = await response.blob();
        } catch (directError) {
            console.warn("Direct fetch failed or blocked by CORS. Attempting via proxy...");
            // Attempt 2: CORS Proxy fallback
            // We use a public CORS proxy to bypass the restriction for the demo
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlInput)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
            blob = await response.blob();
        }
        
        // Robust MIME type check and correction
        if (!blob.type.startsWith('image/')) {
             // Fail fast if it's definitely a webpage or JSON error
             if (blob.type.includes('text/html') || blob.type.includes('application/json') || blob.type.includes('application/xml')) {
                 throw new Error('URL returned a webpage or text instead of an image.');
             }

             // If generic binary or empty, try to infer from URL extension
             const ext = new URL(urlInput).pathname.split('.').pop()?.toLowerCase();
             let newType = 'image/jpeg'; // Default assumption
             
             if (ext === 'png') newType = 'image/png';
             else if (ext === 'webp') newType = 'image/webp';
             else if (ext === 'gif') newType = 'image/gif';
             
             // Create a new blob with the corrected type
             blob = blob.slice(0, blob.size, newType);
        }
        
        setMimeType(blob.type);
        setFileName(urlInput); // Use URL as filename

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageBase64(e.target?.result as string);
            setIsLoading(false);
        };
        reader.onerror = () => {
            throw new Error('Failed to read downloaded image.');
        };
        reader.readAsDataURL(blob);

    } catch (err) {
        console.error(err);
        let msg = (err as Error).message;
        if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
             msg = t('error.url.fetch');
        } else if ((err as Error).name === 'TypeError' && msg.includes('URL')) {
            msg = t('error.url.invalid');
        }
        setError(msg);
        setIsLoading(false);
    }
  }

  const handleProcess = useCallback(async () => {
    if (!imageBase64) {
      setError("No image loaded.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Stripping the Data URL prefix to get the pure base64 string
      const pureBase64 = imageBase64.split(',')[1];
      // Determine mime type: prefer state, fallback to extracting from data URL, default to jpeg
      const type = mimeType || imageBase64.match(/^data:(.+);base64,/)?.[1] || 'image/jpeg';
      
      const analysisResult = await verifySolarInstallationFromImage(pureBase64, type);
      setResult(analysisResult);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred during image analysis.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageBase64, mimeType]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="flex justify-center items-center gap-4 mb-2">
            <div className="p-3 rounded-full glass-pane card-3d">
                <ImageIcon size={32} className="text-sky-600 dark:text-sky-400" style={{filter: 'drop-shadow(0 0 8px #38bdf8)'}} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center neon-text">{t('image.title')}</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-6 text-center">{t('image.description')}</p>
        
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                 <FileUpload 
                  onFileSelect={handleFileSelect} 
                  fileName={imageFile ? fileName : ''} 
                  accept="image/png, image/jpeg, image/webp"
                  description={t('upload.image.description')}
                  language={language}
                />
                {imageBase64 && (
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <p className="text-slate-800 dark:text-slate-200 font-semibold mb-2">{t('image.preview')}</p>
                        <img src={imageBase64} alt="Rooftop preview" className="rounded-lg shadow-lg max-h-48 w-auto border-2 border-sky-400/50 dark:border-sky-500/50 neon-shadow-skyblue" />
                    </div>
                )}
            </div>

            {/* URL Input Section */}
             <div className="w-full">
                <div className="flex items-center gap-4 w-full my-4">
                    <div className="h-px bg-slate-300 dark:bg-slate-700/50 flex-1"></div>
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-xs tracking-wider uppercase">{t('image.url.or')}</span>
                    <div className="h-px bg-slate-300 dark:bg-slate-700/50 flex-1"></div>
                </div>

                <div className="flex gap-2 w-full max-w-2xl mx-auto">
                    <div className="relative flex-grow group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link size={18} className="text-slate-400 group-focus-within:text-sky-500 dark:group-focus-within:text-sky-400 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 dark:focus:ring-sky-500 outline-none transition-all text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
                            placeholder={t('image.url.placeholder')}
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUrlLoad()}
                        />
                    </div>
                    <button 
                        onClick={handleUrlLoad}
                        disabled={isLoading || !urlInput}
                        className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm border border-slate-300 dark:border-slate-600"
                    >
                        {isLoading ? '...' : t('image.url.load')}
                    </button>
                </div>
            </div>
        </div>
        
        {error && <p className="text-red-700 dark:text-red-300 mt-4 text-center bg-red-200/50 dark:bg-red-500/20 p-3 rounded-lg border border-red-400/50 dark:border-red-500/30">{error}</p>}
        
      </div>
      
      {isLoading && <Loader language={language} />}
      
      {!isLoading && result && (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center neon-text">{t('image.analysis.result')}</h2>
            <ResultCard result={result} imageUrl={imageBase64} language={language} />
        </div>
      )}

      {imageBase64 && (
        <div className="sticky bottom-0 bg-white/30 backdrop-blur-lg p-4 border-t border-white/40 dark:bg-slate-900/50 dark:border-slate-700/50">
          <div className="max-w-4xl mx-auto flex justify-center">
            <span className="tooltip-container w-full sm:w-auto">
              <button
                onClick={handleProcess}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full sm:w-56 bg-sky-500/60 text-white font-bold py-3 px-6 rounded-lg shadow-lg border border-sky-400/50 hover:bg-sky-500/80 transition-all duration-300 disabled:bg-slate-300/50 disabled:text-slate-500 disabled:border-slate-400 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-sky-500/50 neon-shadow-skyblue dark:bg-fuchsia-600/60 dark:border-fuchsia-500/50 dark:hover:bg-fuchsia-600/80 dark:hover:shadow-fuchsia-500/50 dark:neon-shadow-fuchsia dark:disabled:bg-slate-700/50 dark:disabled:text-slate-400 dark:disabled:border-slate-600"
                data-tooltip={t('tooltip.process.image')}
              >
                <Rocket size={20} />
                {isLoading ? t('button.analyzing') : t('button.analyze')}
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageVerificationPage;