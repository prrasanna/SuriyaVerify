import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import type { VerificationResult } from "../types";
import { useTranslations } from "../hooks/useTranslations";
import { verifySolarInstallation as geminiVerify } from "../services/geminiServices";

// Leaflet global type
declare global {
  interface Window {
    L: any;
  }
}

interface MapVerificationPageProps {
  language: string;
}

const MapVerificationPage: React.FC<MapVerificationPageProps> = ({ language }) => {

  const { t } = useTranslations(language);  // declare first

  // States
  const [lat, setLat] = useState<string>("28.6139");
  const [lng, setLng] = useState<string>("77.2090");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Map refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

// ---------------------------
// Initialize Leaflet Map
// ---------------------------
useEffect(() => {
  if (!window.L) {
    setError("Map library failed to load. Please refresh the page.");
    return;
  }

  if (!mapContainerRef.current || mapInstanceRef.current) return;

  try {
    const map = window.L.map(mapContainerRef.current, {
      center: [28.6139, 77.209],
      zoom: 19,
      zoomControl: false,
    });

    // ✅ ADD THIS PART — OSM TILE LAYER
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    window.L.control.zoom({ position: "bottomright" }).addTo(map);
    mapInstanceRef.current = map;

    const icon = window.L.divIcon({
      className: "custom-pin",
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#ea4335">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
             </svg>`,
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
      setLat(newLat.toFixed(6));
      setLng(newLng.toFixed(6));
      map.panTo([newLat, newLng]);
    });

    map.on("click", (e: any) => {
      const { lat: newLat, lng: newLng } = e.latlng;
      marker.setLatLng([newLat, newLng]);
      setLat(newLat.toFixed(6));
      setLng(newLng.toFixed(6));
      map.panTo([newLat, newLng]);
    });

    setTimeout(() => map.invalidateSize(), 200);
  } catch (err) {
    console.error("Map initialization error:", err);
    setError("Failed to initialize map.");
  }

  return () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    }
  };
}, []);


  // ---------------------------
  // Verify Using Gemini
  // ---------------------------
  const handleVerify = useCallback(async () => {
    const currentLat = parseFloat(lat);
    const currentLng = parseFloat(lng);

    if (isNaN(currentLat) || isNaN(currentLng)) {
      setError("Invalid coordinates. Please enter valid numbers.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const sitePrompt = `
      Analyze this site:
      sample_id: MAP-${Date.now()}
      lat: ${currentLat}
      lon: ${currentLng}
      Return ONLY valid JSON for VerificationResult.
    `;

    try {
      const raw = await geminiVerify(sitePrompt);
      const parsed = JSON.parse(raw);
      setResult(parsed);
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setIsLoading(false);
    }
  }, [lat, lng]);

  // ----------------------------------------
  // UI (Final Render)
  // ----------------------------------------
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">

      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

      {/* Input section */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-3">Map Verification</h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Latitude"
          />

          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Longitude"
          />

          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
          >
            Verify
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-3">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-blue-600 font-semibold mb-2">Loading...</div>
      )}

      {/* Result */}
      {result && (
        <pre className="bg-gray-100 p-4 rounded-lg shadow text-sm overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] rounded-lg shadow-lg border border-gray-300"
      ></div>
    </div>
  );
};

export default MapVerificationPage;
