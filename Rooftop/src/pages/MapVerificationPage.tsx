/* FINAL FIXED & OPTIMIZED MAPVERIFICATIONPAGE.TSX */

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { VerificationResult, SiteData } from "../types";
import { verifySolarInstallation } from "../services/geminiServices";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { MapPin, Search, Navigation, Layers } from "lucide-react";
import { useTranslations } from "../hooks/useTranslations";

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

  const [lat, setLat] = useState<string>("28.613900");
  const [lng, setLng] = useState<string>("77.209000");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [staticMapUrl, setStaticMapUrl] = useState<string>("");

  const [mapType, setMapType] = useState<"satellite" | "normal">("satellite");
  const [isMapReady, setIsMapReady] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  /* ---------------- SAFE UPDATE MAP FUNCTION ---------------- */
  const safeUpdateView = useCallback((latitude: number, longitude: number) => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    if (isNaN(latitude) || isNaN(longitude)) return;

    try {
      const newPoint = new window.L.LatLng(latitude, longitude);
      markerRef.current.setLatLng(newPoint);
      mapInstanceRef.current.flyTo(newPoint, 19, { duration: 0.6 });
    } catch (e) {
      console.error("Safe update failed:", e);
    }
  }, []);

  /* ---------------- MAP INITIALIZATION ---------------- */
  useEffect(() => {
    if (!window.L) {
      setError("Map failed to load. Refresh your page.");
      return;
    }

    if (mapInstanceRef.current || !mapContainerRef.current) return;

    try {
      const map = window.L.map(mapContainerRef.current, {
        center: [28.6139, 77.2090],
        zoom: 19,
        zoomControl: false,
        preferCanvas: true,
      });

      window.L.control.zoom({ position: "bottomright" }).addTo(map);
      mapInstanceRef.current = map;

      // MARKER
      const icon = window.L.divIcon({
        className: "custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#ea4335" stroke="#ffffff" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = window.L.marker([28.6139, 77.209], {
        draggable: true,
        icon,
      }).addTo(map);

      markerRef.current = marker;

      marker.on("dragend", (e: any) => {
        const { lat: newLat, lng: newLng } = e.target.getLatLng();
        if (!isNaN(newLat) && !isNaN(newLng)) {
          setLat(newLat.toFixed(6));
          setLng(newLng.toFixed(6));
          map.panTo([newLat, newLng], { animate: true });
        }
      });

      map.on("click", (e: any) => {
        const { lat: newLat, lng: newLng } = e.latlng;
        if (!isNaN(newLat) && !isNaN(newLng)) {
          marker.setLatLng([newLat, newLng]);
          setLat(newLat.toFixed(6));
          setLng(newLng.toFixed(6));
          map.panTo([newLat, newLng], { animate: true });
        }
      });

      setIsMapReady(true);

      setTimeout(() => map.invalidateSize(), 250);
    } catch (err) {
      setError("Map initialization error.");
      console.error(err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  /* ---------------- TILE LAYER HANDLING ---------------- */
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const typeCode = mapType === "satellite" ? "y" : "m";

    const layer = window.L.tileLayer(
      `https://{s}.google.com/vt/lyrs=${typeCode}&x={x}&y={y}&z={z}`,
      {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    layer.addTo(map);
    tileLayerRef.current = layer;
  }, [mapType, isMapReady]);

  /* ---------------- SEARCH BUTTON ---------------- */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const la = parseFloat(lat);
    const lo = parseFloat(lng);

    if (isNaN(la) || isNaN(lo)) return;
    safeUpdateView(la, lo);
  };

  /* ---------------- AI VERIFY FUNCTION ---------------- */
  const handleVerify = useCallback(async () => {
    const la = parseFloat(lat);
    const lo = parseFloat(lng);

    if (isNaN(la) || isNaN(lo)) {
      setError("Invalid coordinates.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const site: SiteData = {
      sample_id: `MAP-${Date.now()}`,
      latitude: la,
      longitude: lo,
      capture_date: undefined,
    };

    setStaticMapUrl(
      `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${lo},${la}&z=19&l=sat&size=600,400`
    );

    try {
      const output = await verifySolarInstallation(site);
      setResult(output);
    } catch (e: any) {
      setError(e.message || "Verification failed.");
    }

    setIsLoading(false);
  }, [lat, lng]);

  /* ---------------- LOCATE ME ---------------- */
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setError("Your device does not support GPS.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setLat(latitude.toFixed(6));
        setLng(longitude.toFixed(6));

        safeUpdateView(latitude, longitude);
      },
      () => setError("Unable to access your current location.")
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">{t("map.title")}</h2>
        <p className="text-slate-600">{t("map.description")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE PANEL */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          {/* Location Card */}
          <div className="glass-pane p-6 rounded-xl shadow-xl">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <MapPin size={20} /> Location
              </h3>
              <button
                onClick={handleLocateMe}
                className="text-xs bg-sky-100 px-3 py-1.5 rounded-full flex items-center gap-1"
              >
                <Navigation size={12} /> Locate Me
              </button>
            </div>

            {/* LAT & LNG */}
            <form onSubmit={handleSearch} className="space-y-5">
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="Latitude"
              />

              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="Longitude"
              />

              <button
                type="submit"
                className="w-full bg-slate-100 py-2.5 rounded-lg"
              >
                <Search size={16} /> Search
              </button>
            </form>

            {/* VERIFY BUTTON */}
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl"
              >
                {isLoading ? t("button.analyzing") : t("map.verify")}
              </button>
            </div>

            {error && <div className="mt-3 text-red-500">{error}</div>}
          </div>

          {/* RESULT CARD */}
          {result && !isLoading && (
            <ResultCard
              result={result}
              imageUrl={staticMapUrl}
              language={language}
            />
          )}

          {isLoading && (
            <div className="py-8 flex justify-center">
              <Loader language={language} />
            </div>
          )}
        </div>

        {/* MAP AREA */}
        <div className="lg:col-span-8 h-[500px] lg:h-[750px] rounded-2xl overflow-hidden relative shadow-xl">
          <div ref={mapContainerRef} className="w-full h-full bg-gray-200"></div>

          {/* MAP TYPE TOGGLE */}
          <div className="absolute top-4 left-4 z-[400]">
            <button
              onClick={() =>
                setMapType((prev) => (prev === "satellite" ? "normal" : "satellite"))
              }
              className="bg-white px-3 py-2 rounded-lg shadow"
            >
              <Layers size={16} /> {mapType === "satellite" ? "Satellite" : "Street"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVerificationPage;
