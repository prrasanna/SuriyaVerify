import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  fileName: string;
  accept: string;
  description: string;
  language: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, fileName, accept, description, language }) => {
  const { t } = useTranslations(language);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full card-3d tooltip-container" style={{ perspective: '1000px' }}>
      <div 
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg transition-all duration-300 group neon-shadow-skyblue cursor-pointer ${
          dragActive 
            ? "border-sky-500 bg-sky-50 dark:bg-sky-900/30 scale-105 shadow-xl" 
            : "border-sky-400/50 bg-white/20 hover:bg-white/30 dark:bg-slate-800/20 dark:hover:bg-slate-800/40 dark:border-sky-500/30 dark:hover:border-sky-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        data-tooltip={t('tooltip.upload')}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
          {fileName ? (
            <>
              <div className="relative">
                <FileText className="w-12 h-12 mb-3 text-sky-600 dark:text-sky-400 transition-transform duration-500 transform group-hover:rotate-12" style={{filter: 'drop-shadow(0 0 8px #38bdf8)'}}/>
                <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-green-500 bg-white dark:bg-slate-900 rounded-full border-2 border-white dark:border-slate-900" />
              </div>
              <p className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[250px]">{fileName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('upload.change.file')}</p>
            </>
          ) : (
            <>
              <UploadCloud 
                className={`w-12 h-12 mb-3 text-sky-500 dark:text-sky-400 transition-all duration-300 ${dragActive ? 'scale-125 text-sky-600' : 'group-hover:scale-110'}`} 
                style={{filter: 'drop-shadow(0 0 8px #38bdf8)'}} 
              />
              <p className="mb-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
                {dragActive ? "Drop it here!" : t('upload.prompt')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
            </>
          )}
        </div>
        <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept={accept} 
            onChange={handleChange} 
        />
        {dragActive && (
            <div className="absolute inset-0 rounded-lg bg-sky-400/10 pointer-events-none animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;