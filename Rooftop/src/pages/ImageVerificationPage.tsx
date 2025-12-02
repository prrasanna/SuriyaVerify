import React, { useState, useRef } from "react";
import { Upload, X, ScanEye } from "lucide-react";
import { verifyImage } from "../services/geminiServices";
import type { VerificationResult } from "../types";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";

interface ImageVerificationPageProps {
  language: string;
}

const ImageVerificationPage: React.FC<ImageVerificationPageProps> = ({ language }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const processFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    setFileType(file.type);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image || !fileType) return;
    setIsLoading(true);
    setError(null);

    try {
      const base64Data = image.split(",")[1];
      const analysisResult = await verifyImage(base64Data, fileType);
      setResult(analysisResult);
    } catch (err) {
      setError((err as Error).message || "Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {!image ? (
        <div
          className="glass-pane p-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500 transition-all cursor-pointer group"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload size={40} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
                Drag & Drop an image or click to upload
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Supported formats: PNG, JPG, JPEG
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-pane p-6 rounded-3xl animate-fade-in">
          <div className="relative rounded-xl overflow-hidden shadow-lg mb-6 group bg-black/5">
            <img src={image} alt="Preview" className="w-full h-64 md:h-96 object-contain" />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex justify-center">
            {!isLoading && !result && (
              <button
                onClick={handleAnalyze}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-lg font-bold px-8 py-3 rounded-xl shadow-lg shadow-sky-500/30 hover:scale-105 transition-transform flex items-center gap-3"
              >
                <ScanEye size={24} /> Analyze Image
              </button>
            )}

            {isLoading && <Loader language={language} />}
          </div>

          {error && (
            <div className="mt-6 text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="animate-scale-in">
          <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6 neon-text">
            Image Analysis Result
          </h3>
          <div className="max-w-md mx-auto">
            <ResultCard result={result} imageUrl={image || undefined} language={language} />
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={clearImage} className="text-sky-600 dark:text-sky-400 hover:underline">
              Verify Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageVerificationPage;
