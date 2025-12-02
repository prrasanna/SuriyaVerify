// src/services/geminiServices.ts
import type { VerificationResult, SiteData } from "../types";

/**
 * Mock delay helper
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Verify Solar Installation (mocked if backend not running)
 */
export const verifySolarInstallation = async (
  site: SiteData
): Promise<VerificationResult> => {
  try {
    // Uncomment the lines below if your backend is running
    /*
    const response = await fetch("http://localhost:3001/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityCode: site.sample_id }),
    });
    const data = await response.json();
    */

    // Mock data (works even without backend)
    await delay(500); // simulate network
    const data = {
      success: true,
      has_solar: true,
      confidence: 0.92,
      panel_count_est: 12,
      capacity_kw_est: 5,
      pv_area_sqm_est: 48,
      panel_type_est: "Mono-Si",
      qc_notes: ["Mock: Verified successfully"],
      message: "Mock verification",
    };

    return {
      sample_id: site.sample_id,
      qc_status: data.success ? "VERIFIABLE" : "NOT_VERIFIABLE",
      has_solar: data.has_solar ?? false,
      confidence: data.confidence ?? 0,
      panel_count_est: data.panel_count_est,
      capacity_kw_est: data.capacity_kw_est,
      pv_area_sqm_est: data.pv_area_sqm_est,
      panel_type_est: data.panel_type_est,
      image_metadata: {
        source: "Mock AI Verification",
        capture_date: new Date().toISOString().split("T")[0],
      },
      qc_notes: data.qc_notes ?? [data.message || "No details"],
      message: data.message,
    } as VerificationResult;
  } catch (err: any) {
    console.error(err);
    return {
      sample_id: site.sample_id,
      qc_status: "NOT_VERIFIABLE",
      has_solar: false,
      confidence: 0,
      image_metadata: {
        source: "Mock AI Verification",
        capture_date: new Date().toISOString().split("T")[0],
      },
      qc_notes: [err.message || "Unknown error"],
      message: err.message,
    };
  }
};

/**
 * Verify Image Upload (mocked)
 */
export const verifyImage = async (
  _base64Data: string,
  _mimeType: string
): Promise<VerificationResult> => {
  try {
    // Uncomment if backend is running
    /*
    const response = await fetch("http://localhost:3001/api/verify-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Data, mimeType }),
    });
    const data = await response.json();
    */

    // Mock response
    await delay(500); // simulate network
    const data = {
      success: true,
      has_solar: true,
      confidence: 0.88,
      panel_count_est: 8,
      capacity_kw_est: 4,
      pv_area_sqm_est: 35,
      panel_type_est: "Poly-Si",
      qc_notes: ["Mock: Image verified successfully"],
      message: "Mock image verification",
    };

    return {
      sample_id: `IMG-${Date.now()}`,
      qc_status: data.success ? "VERIFIABLE" : "NOT_VERIFIABLE",
      has_solar: data.has_solar ?? false,
      confidence: data.confidence ?? 0,
      panel_count_est: data.panel_count_est,
      capacity_kw_est: data.capacity_kw_est,
      pv_area_sqm_est: data.pv_area_sqm_est,
      panel_type_est: data.panel_type_est,
      image_metadata: {
        source: "Mock Direct Upload",
        capture_date: new Date().toISOString().split("T")[0],
      },
      qc_notes: data.qc_notes ?? [data.message || "No details"],
      message: data.message,
    } as VerificationResult;
  } catch (err: any) {
    console.error(err);
    return {
      sample_id: `IMG-${Date.now()}`,
      qc_status: "NOT_VERIFIABLE",
      has_solar: false,
      confidence: 0,
      image_metadata: {
        source: "Mock Direct Upload",
        capture_date: new Date().toISOString().split("T")[0],
      },
      qc_notes: [err.message || "Unknown error"],
      message: err.message,
    };
  }
};
