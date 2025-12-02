
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { VerificationResult, SiteData } from '../types';
import { verifySolarInstallation } from '../services/geminiServices';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';
import { MapPin, Search, Crosshair, Navigation, Layers } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

declare global {
  interface Window {
    L: any;
  }
}

interface MapVerificationPageProps {
  language: string;
}

const MapVerificationPage: React.FC<MapVerificationPageProps> = ({ language }) => {
  const { t } = useTranslations(language);
  const [lat, setLat] = useState<string>('28.6139');
  const [lng, setLng] = useState<string>('77.2090');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [staticMapUrl, setStaticMapUrl] = useState<string>('');
  
  const [mapType, setMapType] = useState<'satellite' | 'normal'>('satellite');
  const [isMapReady, setIsMapReady] = useState(false);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  const safeUpdateView = useCallback((latitude: number, longitude: number) => {
      if (!mapInstanceRef.current || !markerRef.current) return;
      if (isNaN(latitude) || isNaN(longitude)) return;
      
      try {
          const newLatLng = new window.L.LatLng(latitude, longitude);
          markerRef.current.setLatLng(newLatLng);
          mapInstanceRef.current.flyTo(newLatLng, 19, { duration: 0.5 });
      } catch (e) {
          console.error("Safe update failed:", e);
      }
  }, []);

  useEffect(() => {
    if (!window.L) {
      setError("Map library failed to load. Please refresh the page.");
      return;
    }

    if (!mapContainerRef.current || mapInstanceRef.current) return;

    try {
        const map = window.L.map(mapContainerRef.current, {
            center: [28.6139, 77.2090],
            zoom: 19,
            zoomControl: false,
            preferCanvas: true,
        });
        
        window.L.control.zoom({ position: 'bottomright' }).addTo(map);

        mapInstanceRef.current = map;

        const icon = window.L.divIcon({
            className: 'custom-pin',
            html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#ea4335" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });

        const marker = window.L.marker([28.6139, 77.2090], { 
            draggable: true,
            icon: icon
        }).addTo(map);
        
        markerRef.current = marker;

        marker.on('dragend', (e: any) => {
            const { lat: newLat, lng: newLng } = e.target.getLatLng();
            if (!isNaN(newLat) && !isNaN(newLng)) {
                setLat(newLat.toFixed(6));
                setLng(newLng.toFixed(6));
                map.panTo([newLat, newLng], { animate: true, duration: 0.5 });
            }
        });

        map.on('click', (e: any) => {
            const { lat: newLat, lng: newLng } = e.latlng;
            if (!isNaN(newLat) && !isNaN(newLng)) {
                marker.setLatLng([newLat, newLng]);
                setLat(newLat.toFixed(6));
                setLng(newLng.toFixed(6));
                map.panTo([newLat, newLng], { animate: true, duration: 0.5 });
            }
        });

        setIsMapReady(true);

        setTimeout(() => {
            map.invalidateSize();
        }, 200);

    } catch (err) {
        console.error("Map initialization error:", err);
        setError("Failed to initialize map. Please verify your internet connection.");
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !window.L) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
    }

    const typeCode = mapType === 'satellite' ? 'y' : 'm';

    const layer = window.L.tileLayer(`https://{s}.google.com/vt/lyrs=${typeCode}&x={x}&y={y}&z={z}`, {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© Google',
        maxNativeZoom: 20
    });

    layer.addTo(map);
    tileLayerRef.current = layer;

  }, [mapType, isMapReady]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(lat);
    const lg = parseFloat(lng);
    
    if (!isNaN(l) && !isNaN(lg)) {
        safeUpdateView(l, lg);
    }
  };

  const handleVerify = useCallback(async () => {
    const currentLat = parseFloat(lat);
    const currentLng = parseFloat(lng);

    if (isNaN(currentLat) || isNaN(currentLng)) {
        setError("Invalid coordinates.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const site: SiteData = {
      sample_id: `MAP-${Date.now()}`,
      latitude: Number(lat),
      longitude: Number(lng),
      capture_date: undefined
    };

    const mapPreviewUrl = `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${currentLng},${currentLat}&z=19&l=sat&size=600,400`;
    setStaticMapUrl(mapPreviewUrl);

    try {
      const analysisResult = await verifySolarInstallation(site);
      setResult(analysisResult);
    } catch (err) {
      setError((err as Error).message || "Verification failed.");
    } finally {
      setIsLoading(false);
    }
  }, [lat, lng]);

  const handleLocateMe = () => {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
             const { latitude, longitude } = position.coords;
             if (!isNaN(latitude) && !isNaN(longitude)) {
                setLat(latitude.toFixed(6));
                setLng(longitude.toFixed(6));
                safeUpdateView(latitude, longitude);
             }
         }, () => {
             setError("Could not access your location.");
         });
     }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 neon-text">{t('map.title')}</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2">{t('map.description')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6 flex flex-col order-2 lg:order-1">
            <div className="glass-pane p-6 rounded-xl shadow-xl border border-white/40 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 text-lg">
                        <MapPin size={20} className="text-red-500" /> Location
                    </h3>
                    <button 
                        onClick={handleLocateMe}
                        className="text-xs font-bold bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors"
                    >
                        <Navigation size={12} /> Locate Me
                    </button>
                </div>
                <form onSubmit={handleSearch} className="space-y-5">
                    <div className="relative group">
                        <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[10px] font-bold uppercase text-sky-500 dark:text-sky-400 transition-all">
                            {t('map.latitude')}
                        </label>
                        <input 
                            type="number" step="any"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-sky-400 outline-none text-slate-800 dark:text-slate-200 font-mono font-medium tracking-wide"
                        />
                    </div>
                    <div className="relative group">
                        <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[10px] font-bold uppercase text-sky-500 dark:text-sky-400 transition-all">
                            {t('map.longitude')}
                        </label>
                        <input 
                            type="number" step="any"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-sky-400 outline-none text-slate-800 dark:text-slate-200 font-mono font-medium tracking-wide"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                    >
                        <Search size={16} /> {t('map.search')}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={handleVerify}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 border border-sky-400/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 group"
                    >
                         <Crosshair size={22} className={isLoading ? 'animate-spin' : 'group-hover:rotate-90 transition-transform duration-500'} />
                         <span className="text-lg">{isLoading ? t('button.analyzing') : t('map.verify')}</span>
                    </button>
                </div>
                
                {error && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}
            </div>
            
            {!isLoading && result && (
                 <div className="animate-fade-in mt-4">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 text-center neon-text">{t('image.analysis.result')}</h3>
                    <ResultCard result={result} imageUrl={staticMapUrl} language={language} />
                 </div>
            )}
            
            {isLoading && <div className="py-8 flex justify-center"><Loader language={language} /></div>}
        </div>

        <div className="lg:col-span-8 h-[500px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 relative group order-1 lg:order-2 z-0">
             <div ref={mapContainerRef} className="w-full h-full bg-slate-200 dark:bg-slate-800" id="map"></div>
             <div className="absolute top-4 left-4 z-[400]">
                 <button
                    onClick={() => setMapType(prev => prev === 'satellite' ? 'normal' : 'satellite')}
                    className="bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2 font-bold text-xs group"
                 >
                     <div className="p-1 bg-sky-100 dark:bg-sky-900/50 rounded-md group-hover:bg-sky-200 dark:group-hover:bg-sky-800 transition-colors">
                        <Layers size={16} className="text-sky-600 dark:text-sky-400" />
                     </div>
                     <span>{mapType === 'satellite' ? 'Satellite' : 'Street View'}</span>
                 </button>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[400] opacity-60 transition-opacity group-hover:opacity-30">
                <Crosshair size={48} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1} />
             </div>
        </div>
      </div>
    </div>
  );
};

export default MapVerificationPage;
